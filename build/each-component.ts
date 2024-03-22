/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 11:10:56
 * @Description:
 */

import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import ts2 from 'rollup-plugin-typescript2'
import path, { format } from 'path'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import { parallel } from 'gulp'
import { rollup, OutputOptions } from 'rollup'
import { sync } from 'fast-glob'
import { componentDir } from "./utils/path"
import { buildConfig } from './utils/config'
import { pathRewWriter } from './utils'

const _buildEach = async () => {
  const _files = sync('*', {
    cwd: componentDir,
    onlyDirectories: true
  })
  const _builds = _files.map(async (file: string) => {
    const _entry = path.resolve(componentDir, file, 'index.ts')
    const _config = {
      input: _entry,
      plugins: [
        nodeResolve(),
        ts2(),
        vue(),
        commonjs()
      ],
      external: (id) => /^vue/.test(id) || /^@h-plus/.test(id)
    }
    const _bundle = await rollup(_config)
    const _options = Object.values(buildConfig).map(config => ({
      format: config.format,
      file: path.resolve(config.output.path, `components/${file}/index.js`),
      paths: pathRewWriter(config.output.name)
    }))
    await Promise.all(_options.map(option => _bundle.write(option as OutputOptions)))
  })

  return Promise.all(_builds)
}

export const buildEachComponent = parallel(_buildEach)