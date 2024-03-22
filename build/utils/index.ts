/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-21 20:50:26
 * @Description:
 */
import { spawn } from "child_process"
import { projectRootDir } from "./path"

/**
 * @name:
 * @param {*} T
 * @return {*}
 * @desc:
 */
export const _withTashname = <T extends object>(name: string, fn: T) => Object.assign(fn, { displayName: name })

/**
 * @name:
 * @param {string} _command
 * @return {*}
 * @desc:
 */
export const run = async (_command: string) => {
  return new Promise((resolve) => {
    const [cmd, ...args] = _command.split(' ')
    console.log('projectRootDir: ', projectRootDir)
    console.log(cmd, args)
    const _progress = spawn(cmd, args, {
      cwd: projectRootDir,
      stdio: 'inherit',
      shell: true
    })
    _progress.on('close', resolve)
  })
}

export { }