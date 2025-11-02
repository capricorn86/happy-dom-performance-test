# Happy DOM vs JSDOM Benchmark Suite

Performance benchmarks comparing [Happy DOM](https://github.com/capricorn86/happy-dom) and [JSDOM](https://github.com/jsdom/jsdom).

## Features

- 🚀 18 comprehensive DOM operation benchmarks
- 📊 Side-by-side performance comparison with speedup metrics
- 🔧 Support for testing against local library repositories (including monorepos)
- 📦 TypeScript implementation with full type safety
- ⚡ Native TypeScript execution (no compilation needed)

## Requirements

- **Node.js >= 24.11.0** (native TypeScript support)

## Installation

```bash
npm install
```

## Usage

### Run All Benchmarks

Run benchmarks for both libraries and display comparison:

```bash
npm run bench
```

Sample output:

```
============================================================
Running Happy DOM Benchmarks
============================================================
  Import Library                                    15.234ms
  Parse HTML                                        45.123ms
  Serialize HTML                                    22.456ms
  ...

============================================================
Running JSDOM Benchmarks
============================================================
  Import Library                                   125.678ms
  Parse HTML                                       234.567ms
  Serialize HTML                                    89.234ms
  ...

============================================================
Performance Comparison
============================================================
Benchmark                                Happy DOM       JSDOM    Speedup
------------------------------------------------------------
Import Library                             15.234ms    125.678ms   8.25x faster
Parse HTML                                 45.123ms    234.567ms   5.20x faster
...
```

### Run Individual Library Benchmarks

Test only Happy DOM:

```bash
npm run bench:happy-dom
```

Test only JSDOM:

```bash
npm run bench:jsdom
```

### Test Against Local Repositories

To test changes in local development versions of happy-dom or jsdom:

1. Clone the library repository as a sibling directory:
```bash
cd ..
git clone https://github.com/capricorn86/happy-dom.git
# or
git clone https://github.com/jsdom/jsdom.git
cd happy-dom-performance-test
```

2. **Important**: Ensure the local repository is built:
```bash
cd ../happy-dom
npm install
npm run build  # or whatever the build command is
cd ../happy-dom-performance-test
```

3. Run benchmarks with local libraries:
```bash
npm run bench:local
```

The benchmark suite will automatically detect and use local repositories from:
- `../happy-dom` (including monorepo structure in `packages/happy-dom`)
- `../jsdom`

### Advanced Usage

Use command-line flags for more control:

```bash
# Run only JSDOM benchmarks using local repository
npm run bench -- --library=jsdom --use-local

# Force comparison mode
npm run bench -- --compare

# Show help
npm run bench -- --help
```

## Benchmarks Included

The suite tests these DOM operations:

### Library Operations
- **Import Library** - Module loading time
- **Parse HTML** - Document parsing from HTML string
- **Serialize HTML** - Converting DOM back to HTML string

### Query Operations
- **querySelector** - Single element selection
- **querySelectorAll** - Multiple element selection by:
  - Tag name (`li`)
  - Class name (`.flex-shrink-0`)
  - Attribute (`[aria-label]`)
  - Attribute contains (`[class~="flex-shrink-0"]`)
  - Pseudo-class (`:nth-child(2n+1)`)
- **getElementById** - ID-based lookup (100 iterations)
- **getElementsByClassName** - Class-based collection
- **getElementsByTagName** - Tag-based collection

### DOM Manipulation
- **createElement + append** - Creating and appending elements (1000 iterations)
- **innerHTML (set)** - Setting element content
- **innerHTML (get)** - Reading element content
- **setAttribute** - Attribute modification (1000 iterations)
- **classList operations** - Adding, removing, toggling classes (3000 operations)

### Advanced Features
- **Custom Element** - Web Components with Shadow DOM

## Development

### Type Checking

Run TypeScript type checking without emitting files:

```bash
npm run typecheck
```

### Project Structure

```
lib/
├── adapters/           # Library-specific DOM adapters
│   ├── happy-dom-adapter.ts
│   └── jsdom-adapter.ts
├── benchmarks/         # Benchmark test definitions
│   └── index.ts
├── runner/             # Benchmark execution engine
│   └── benchmark-suite.ts
├── utils/              # Utility functions
│   ├── loader.ts       # Library loading logic
│   └── reporter.ts     # Results formatting
├── data/               # Test data
│   ├── HTMLPage.ts     # Sample HTML document
│   └── CustomElement.ts # Custom element for testing
├── types.ts            # TypeScript type definitions
├── cli.ts              # Command-line interface
└── benchmark.ts        # Main entry point
```

### Adding New Benchmarks

1. Add your benchmark function to `lib/benchmarks/index.ts`:
```typescript
function benchNewOperation(lib: DOMAdapter): BenchmarkMetadata {
    const doc = lib.createDocument('<html><body></body></html>');
    // Your benchmark code here
    return { count: operationCount };
}
```

2. Add it to the benchmarks array in `getBenchmarks()`:
```typescript
{ name: 'New Operation', fn: benchNewOperation }
```

The benchmark suite will automatically include it in all runs.

## Contributing

Contributions are welcome! Please ensure:
- TypeScript code passes type checking (`npm run typecheck`)
- New benchmarks follow existing patterns
- Documentation is updated for new features
