import buble from '@rollup/plugin-buble';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import match from 'rollup-plugin-match';
import empty from 'rollup-plugin-empty';
import combine from 'rollup-plugin-combine';
import copy from 'rollup-plugin-copy';
import replaceImports from 'rollup-plugin-replace-imports';
import camelcase from 'camelcase';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const banner = `/* ${pkg.name}.js v${pkg.version} (c) 2021-${new Date().getFullYear()} `
             + 'Jesse Feng Released under the MIT License. */';
const globalName = camelcase(pkg.name);

export default [{
  input: 'src/**/*.js',
  plugins: [
    empty({
      silent: false,
      dir: 'dist'
    }),
    copy({
      verbose: true,
      targets: [
        { src: 'package.json', dest: 'dist' },
        { src: 'README.md', dest: 'dist' },
        { src: 'types/index.d.ts', dest: 'dist' }
      ]
    }),
    match(),
    combine({
      outputDir: true,
      camelCase: false
    }),
    buble()
  ],
  output: [
    {
      banner,
      dir: 'dist/es',
      format: 'es'
    },
    {
      banner,
      dir: 'dist',
      format: 'cjs',
      exports: 'auto',
      plugins: [
        replaceImports((n) => n.replace('/es/', '/'))
      ]
    }
  ]
}, {
  input: 'src/**/*.js',
  plugins: [
    match(),
    combine({
      camelCase: false
    }),
    nodeResolve(),
    commonjs(),
    buble()
  ],
  output: [{
    banner,
    file: 'dist/umd.js',
    name: globalName,
    format: 'umd',
    exports: 'auto'
  }, {
    banner,
    file: 'dist/umd.min.js',
    name: globalName,
    format: 'umd',
    exports: 'auto',
    plugins: [terser({
      output: { preamble: banner }
    })]
  }, {
    banner,
    file: 'dist/iife.js',
    name: globalName,
    format: 'iife'
  }, {
    banner,
    file: 'dist/iife.min.js',
    name: globalName,
    format: 'iife',
    plugins: [terser({
      output: { preamble: banner }
    })]
  }]
}];
