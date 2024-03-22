/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 20:40:17
 * @Description:
 */
import { series, parallel } from "gulp";
import { _withTashname, run } from "./utils";
// 1、打包样式
// 2、打包工具方法
// 3、打包所有组件
// 4、打包每个组件
// 5、生成组件库
// 6、发布组件
export default series(
  // @ts-ignore
  _withTashname('clean', async () => run('rm -rf ./dist')),
  _withTashname('buildPackages', async () => run('pnpm run --parallel build')),
  // 调用build 将参数buildFullComponent传递到gulp，调用export的buildFullComponent方法
  _withTashname('buildFullComponent', async () => run('pnpm run build buildFullComponent'))  // buildFullComponent变成参数传入调用的命令
)

export * from './full-component'