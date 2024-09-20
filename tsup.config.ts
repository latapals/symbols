import { defineConfig } from 'tsup';

export default defineConfig({
	dts: true,
	clean: true,
	format: 'esm',
	outDir: 'build',
	entry: ['src/index.ts'],
	define: { 'process.env.NODE_ENV': '"production"' },
});
