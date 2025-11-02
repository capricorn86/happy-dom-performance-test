import { performance } from 'perf_hooks';
import { getBenchmarks } from '../benchmarks/index.ts';
import { printHeader, printResult, printError } from '../utils/reporter.ts';
import type { BenchmarkResult, DOMAdapter } from '../types.ts';

export class BenchmarkSuite {
    private name: string;
    private setupFn: () => DOMAdapter;
    private results: BenchmarkResult[] = [];

    constructor(name: string, setupFn: () => DOMAdapter) {
        this.name = name;
        this.setupFn = setupFn;
    }

    async run(): Promise<BenchmarkResult[]> {
        printHeader(`Running ${this.name} Benchmarks`);

        const lib = this.setupFn();
        const benchmarks = getBenchmarks();

        for (const benchmark of benchmarks) {
            try {
                const result = await this.runBenchmark(lib, benchmark);
                this.results.push(result);
                printResult(result.name, result.time, result.count);
            } catch (error) {
                printError(benchmark.name);
                if (error instanceof Error) {
                    console.error(`    ${error.message}`);
                }
            }
        }

        return this.results;
    }

    private async runBenchmark(lib: DOMAdapter, benchmark: { name: string; fn: (lib: DOMAdapter) => any }): Promise<BenchmarkResult> {
        const start = performance.now();
        const metadata = await benchmark.fn(lib);
        const end = performance.now();
        
        return {
            name: benchmark.name,
            time: end - start,
            count: metadata?.count
        };
    }
}
