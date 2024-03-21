/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 02:12:04
 * @Description:
 */
import path from "path";
import { bundleDir } from "./path";

export const buildConfig = {
  esm: {
    module: 'esnext',
    format: 'esm',
    output: {
      name: 'es',
      path: path.resolve(bundleDir, 'es')
    }
  },
  cjs: {
    module: 'CommonJs',
    format: 'cjs',
    output: {
      name: 'lib',
      path: path.resolve(bundleDir, 'lib')
    },
    bundle: {
      path: 'vue3-component/lib'
    }
  }
}

export type BuildConfigType = typeof buildConfig;