/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 20:55:13
 * @Description:
 */
import path from "path";
import fs from 'fs'

export const projectRootDir = path.resolve(__dirname, '../../')

export const bundleDir = path.resolve(__dirname, '../../dist')

export const hPlusDir = path.resolve(__dirname, '../../packages/h-plus')

export const componentDir = path.resolve(projectRootDir, 'packages/components')

export const _checkAndGetSrc = (path: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    let _c = false
    const _check = () => {
      setTimeout(() => {
        _c = fs.existsSync(path)
        if (_c) {
          resolve(path)
        } else {
          _check()
        }
      }, 100);
    }
    _check()
    setTimeout(() => {
      if (!_c) {
        reject(fs.accessSync(path))
      } else {
        resolve(path)
      }
    }, 3000);
  })
}