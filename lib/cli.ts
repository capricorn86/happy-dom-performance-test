import type { BenchmarkOptions } from './types.ts';

export function parseArgs(argv: string[]): BenchmarkOptions {
    const args = argv.slice(2);
    const options: BenchmarkOptions = {
        library: null,
        useLocal: false,
        compare: false,
    };

    for (const arg of args) {
        if (arg.startsWith('--library=')) {
            options.library = arg.split('=')[1];
        } else if (arg === '--use-local') {
            options.useLocal = true;
        } else if (arg === '--compare') {
            options.compare = true;
        } else if (arg === '--help' || arg === '-h') {
            options.help = true;
        }
    }

    return options;
}

export function printHelp(): void {
    console.log(`
🚀 DOM Library Benchmark Suite

Usage: npm run bench [options]

Options:
  --library=<name>    Run benchmarks for specific library (happy-dom or jsdom)
  --use-local         Use local library repositories from parent directory
  --compare           Show comparison between libraries (default when both run)
  --help, -h          Show this help message

Examples:
  npm run bench                      # Run all benchmarks and compare
  npm run bench:happy-dom            # Run only Happy DOM benchmarks
  npm run bench:jsdom                # Run only JSDOM benchmarks
  npm run bench:local                # Run with local library repositories
  npm run bench -- --library=jsdom   # Run specific library
    `);
}
