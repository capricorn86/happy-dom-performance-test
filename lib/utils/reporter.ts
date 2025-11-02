import type { BenchmarkResult } from '../types.ts';

export function printHeader(title: string): void {
    console.log(`\n${'='.repeat(60)}`);
    console.log(title);
    console.log('='.repeat(60));
}

export function printResult(name: string, time: number, count?: number): void {
    const countInfo = count ? ` (${count} ops)` : '';
    console.log(`  ${name.padEnd(40)} ${time.toFixed(3).padStart(10)}ms${countInfo}`);
}

export function printError(name: string): void {
    console.log(`  ${name.padEnd(40)} ${'ERROR'.padStart(10)}`);
}

export function compareResults(happyDOMResults: BenchmarkResult[], jsdomResults: BenchmarkResult[]): void {
    printHeader('Performance Comparison');
    console.log('Benchmark'.padEnd(40) + 'Happy DOM'.padStart(12) + 'JSDOM'.padStart(12) + 'Speedup'.padStart(10));
    console.log('-'.repeat(60));

    let happyDOMTotal = 0;
    let jsdomTotal = 0;

    for (let i = 0; i < happyDOMResults.length; i++) {
        const hdResult = happyDOMResults[i];
        const jsResult = jsdomResults[i];

        happyDOMTotal += hdResult.time;
        jsdomTotal += jsResult.time;

        const speedup = jsResult.time / hdResult.time;
        const speedupStr = speedup >= 1 
            ? `${speedup.toFixed(2)}x faster`
            : `${(1/speedup).toFixed(2)}x slower`;

        console.log(
            hdResult.name.padEnd(40) +
            hdResult.time.toFixed(3).padStart(10) + 'ms' +
            jsResult.time.toFixed(3).padStart(10) + 'ms' +
            speedupStr.padStart(16)
        );
    }

    console.log('-'.repeat(60));
    const totalSpeedup = jsdomTotal / happyDOMTotal;
    const totalSpeedupStr = totalSpeedup >= 1
        ? `${totalSpeedup.toFixed(2)}x faster`
        : `${(1/totalSpeedup).toFixed(2)}x slower`;

    console.log(
        'TOTAL'.padEnd(40) +
        happyDOMTotal.toFixed(3).padStart(10) + 'ms' +
        jsdomTotal.toFixed(3).padStart(10) + 'ms' +
        totalSpeedupStr.padStart(16)
    );
}
