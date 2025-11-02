# Changelog

## [2.0.0] - 2024-11-01

### Major Rewrite
Complete modernization of the benchmark suite with TypeScript and enhanced features.

### Added
- TypeScript implementation with full type safety across all modules
- 9 additional benchmark tests (18 total, up from 9)
- Local repository support with intelligent monorepo detection
- Modular architecture with separate adapters, benchmarks, runner, and utils
- CLI with multiple execution modes and help documentation
- Comprehensive README with usage examples and architecture documentation
- Type checking script (`npm run typecheck`)
- `.node-version` file for better version manager support

### Changed
- Migrated from JavaScript to TypeScript with native execution (Node.js 24.11.0+)
- Updated from happy-dom 9.20.3 → 15.7.4
- Updated from jsdom 22.0.0 → 25.0.1
- Restructured project with organized directory layout
- Enhanced benchmark reporting with operation counts and speedup metrics
- Improved error handling and benchmark isolation

### Removed
- Old JavaScript test files (`happy-dom.test.js`, `jsdom.test.js`)
- Manual test execution in favor of unified benchmark runner

## [1.0.0] - Previous
- Initial JavaScript-based benchmark suite
- Basic comparison of happy-dom and jsdom
- 9 benchmark tests
