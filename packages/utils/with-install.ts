/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 19:25:28
 * @Description:
 */
import type { App, Component, Plugin } from 'vue'


// 必须导出， 否则生成不了.d.ts文件
export type SFCWithInstallType<T> = T & Plugin

/**
 * @name:
 * @param {*} T
 * @return {*}
 * @desc:
 */
export const _withInstall = <T>(comp: Component) => {
  (comp as SFCWithInstallType<T>).install = function (app: App) {
    app.component(comp.name!, comp)
  }
  return comp as SFCWithInstallType<T>
}