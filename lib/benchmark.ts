#!/usr/bin/env node

import { parseArgs, printHelp } from './cli.ts';
import { setUseLocal } from './utils/loader.ts';
import { compareResults } from './utils/reporter.ts';
import { BenchmarkSuite } from './runner/benchmark-suite.ts';
import { HappyDOMAdapter } from './adapters/happy-dom-adapter.ts';
import { JSDOMAdapter } from './adapters/jsdom-adapter.ts';

async function main(): Promise<void> {
    const options = parseArgs(process.argv);

    if (options.help) {
        printHelp();
        return;
    }

    console.log('\n🚀 DOM Library Benchmark Suite\n');

    if (options.useLocal) {
        console.log('📦 Using local library repositories\n');
        setUseLocal(true);
    }

    let happyDOMResults, jsdomResults;

    if (!options.library || options.library === 'happy-dom') {
        const adapter = new HappyDOMAdapter();
        await adapter.initialize();
        const happyDOMSuite = new BenchmarkSuite('Happy DOM', () => adapter);
        happyDOMResults = await happyDOMSuite.run();
    }

    if (!options.library || options.library === 'jsdom') {
        const adapter = new JSDOMAdapter();
        await adapter.initialize();
        const jsdomSuite = new BenchmarkSuite('JSDOM', () => adapter);
        jsdomResults = await jsdomSuite.run();
    }

    if (happyDOMResults && jsdomResults && (options.compare || !options.library)) {
        compareResults(happyDOMResults, jsdomResults);
    }

    console.log('\n✅ Benchmarks complete!\n');
}

main().catch(console.error);
