import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { pathToFileURL } from 'url';

let useLocal = false;

export function setUseLocal(value: boolean): void {
    useLocal = value;
}

function resolveLocalPackage(name: string): string | null {
    const localPath = join(process.cwd(), '..', name);
    
    if (!existsSync(localPath)) {
        return null;
    }

    // Try monorepo structure first (e.g., packages/happy-dom)
    const monorepoPath = join(localPath, 'packages', name);
    if (existsSync(monorepoPath)) {
        const packageJsonPath = join(monorepoPath, 'package.json');
        if (existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
            const mainFile = packageJson.main || 'index.js';
            return join(monorepoPath, mainFile);
        }
    }

    // Try direct package structure
    const packageJsonPath = join(localPath, 'package.json');
    if (existsSync(packageJsonPath)) {
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
        const mainFile = packageJson.main || packageJson.module || 'index.js';
        return join(localPath, mainFile);
    }

    return null;
}

export async function loadLibrary(name: string): Promise<any> {
    if (useLocal) {
        const resolvedPath = resolveLocalPackage(name);
        if (resolvedPath && existsSync(resolvedPath)) {
            console.log(`Using local ${name} from: ${resolvedPath}`);
            const fileUrl = pathToFileURL(resolvedPath).href;
            return await import(fileUrl);
        } else {
            const localPath = join(process.cwd(), '..', name);
            console.warn(`Local ${name} not found at ${localPath}, using npm package`);
        }
    }
    return await import(name);
}
