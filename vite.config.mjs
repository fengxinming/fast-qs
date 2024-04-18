import typescript from '@rollup/plugin-typescript';
import { defineConfig, build } from 'vite';
import combine from 'vite-plugin-combine';
import cp from 'vite-plugin-cp';
import external from 'vite-plugin-external';
import camelCase from 'camelcase';

import pkg from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    minify: false,
    lib: {
      formats: ['es', 'cjs'],
      fileName: '[name]'
    }
  },
  plugins: [
    combine({
      src: ['src/**/*.ts', '!src/*.d.ts'],
      target: 'src/index.ts'
    }),
    typescript({
      tsconfig: './tsconfig.build.json'
    }),
    external({
      externalizeDeps: Object.keys(pkg.dependencies)
    }),
    cp({
      targets: [
        { src: 'src/*.d.ts', dest: 'dist' }
      ]
    }),
    {
      name: 'umd',
      async closeBundle() {
        await build({
          configFile: false,
          build: {
            emptyOutDir: false,
            minify: 'terser',
            lib: {
              entry: 'dist/index.mjs',
              name: camelCase(pkg.name),
              formats: ['umd'],
              fileName: '[name]'
            }
          }
        });
      }
    }
  ],
  test: {
    dir: 'test'
  }
});
