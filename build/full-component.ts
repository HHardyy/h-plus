/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 10:25:55
 * @Description:
 */
import commonjs from '@rollup/plugin-commonjs'
import vue from 'rollup-plugin-vue'
import ts2 from 'rollup-plugin-typescript2'
import path from 'path'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import { parallel } from 'gulp'
import { rollup, OutputOptions } from 'rollup'

import { bundleDir, hPlusDir } from './utils/path'

/**
 * @name: 组件库全量打包任务
 * @return {*}
 * @desc:
 */
const _buyildFull = async () => {
  const _config = {
    input: path.resolve(hPlusDir, 'index.ts'),
    plugins: [
      nodeResolve(),
      ts2(),
      vue(),
      commonjs()
    ],
    external: (id) => /^vue/.test(id)
  }

  // 兼顾组件库在浏览器和import两种方式使用, 也就是umd/esm
  const _buildConfig = [
    {
      format: 'umd',
      file: path.resolve(bundleDir, 'index.js'),
      name: 'HPlus',
      exports: "named",
      globals: { // 使用全局vue
        vue: 'Vue'
      }
    },
    {
      format: 'esm',
      file: path.resolve(bundleDir, 'index.esm.js')
    }
  ]

  const _bundle = await rollup(_config)

  return Promise.all(_buildConfig.map(config => _bundle.write(config as OutputOptions)))
}


/**
 * @name: gulp的一个任务名叫buildFullComponent
 * @return {*}
 * @desc:
 */
export const buildFullComponent = parallel(_buyildFull)