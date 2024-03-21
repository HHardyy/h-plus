/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 01:35:45
 * @Description:
 */

/**
 * @name:
 * @param {string} path
 * @param {string} dirName
 * @return {*}
 * @desc:
 */
import { series, parallel, src, dest } from "gulp"
import { buildConfig } from "./utils/config"
import { bundleDir, projectRootDir } from "./utils/path"
import path from "path"
import ts from 'gulp-typescript'
import { _withTashname } from "./utils"


export const buildPackages = (_path: string, dirName: string) => {

  const _tasks = Object.entries(buildConfig).map(([module, config]) => {
    const output = path.resolve(_path, config.output.name)
    return series(
      // @ts-ignore 打包
      _withTashname(`build:${_path}`, () => {
        const tsConfig = path.resolve(projectRootDir, 'tsconfig.json')
        const inputs = ['**/*.ts', '!gulpfile.ts', '!node_modules']
        return src(inputs).pipe(ts.createProject(tsConfig, {
          declaration: true,
          strict: false,
          module: config.module
        })()).pipe(dest(output))
      }),
      // 复制到dist   下的es，lib
      _withTashname(`copy:${_path}`, () => {
        return src(`${output}/**`).pipe(dest(path.resolve(bundleDir, `${config.output.name}/${dirName}`)))
      })
    )
  })
  return parallel(..._tasks)
}