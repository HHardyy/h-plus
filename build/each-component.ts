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
import fs from 'fs/promises'
import fss from 'fs'
import * as VueCompiler from '@vue/compiler-sfc'

import { nodeResolve } from '@rollup/plugin-node-resolve'
import { parallel } from 'gulp'
import { rollup, OutputOptions } from 'rollup'
import glob, { sync } from 'fast-glob'
import { OutputFile, Project, SourceFile } from 'ts-morph'
import { _checkAndGetSrc, bundleDir, componentDir, projectRootDir } from "./utils/path"
import { buildConfig } from './utils/config'
import { pathRewWriter, run } from './utils'

/**
 * @name: 打包每个组件
 * @return {*}
 * @desc:
 */
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

/**
 * @name:生成type
 * @return {*}
 * @desc:
 */
const _genTypes = async () => {
  const _peoject = new Project({
    compilerOptions: {
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: true,
      outDir: path.resolve(bundleDir, 'types'),
      baseUrl: projectRootDir,
      paths: { '@h-plus/*': ['packages//*'] },
      skipLibCheck: true,
      strict: true
    },
    tsConfigFilePath: path.resolve(projectRootDir, 'tsconfig.json'),
    skipAddingFilesFromTsConfig: true
  })

  const _filePaths: Promise<string[]> = glob('**/*', {   //**任意文件， *任意目录
    cwd: componentDir,
    onlyFiles: true,
    absolute: true
  })

  const _sourceFiles: SourceFile[] = []

  await Promise.all((await _filePaths).map(async function (file: string) {
    if (file.endsWith('.vue')) {
      const _content = await fs.readFile(file, 'utf8')
      const sfc = VueCompiler.parse(_content)
      const { script } = sfc.descriptor
      if (script) {
        // const _scriptContent = script.content
        const _sourceFile = _peoject.createSourceFile(file + '.ts')
        _sourceFiles.push(_sourceFile)
      }
    } else {
      const _sourceFile = _peoject.addSourceFileAtPath(file) // 所有ts文件都放在一起，发射成.d.ts
      _sourceFiles.push(_sourceFile)
    }
  }))
  await _peoject.emit({ emitOnlyDtsFiles: true }) // 默认放内存
  const _tasks = _sourceFiles.map(async (sourceFile: SourceFile) => {
    const _emitOutput = sourceFile.getEmitOutput()
    const _taskss = _emitOutput.getOutputFiles().map(async (outputFile: OutputFile) => {
      const _filePath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(_filePath), { recursive: true })
      await fs.writeFile(_filePath, pathRewWriter('es')(outputFile.getText()))
    })
    await Promise.all(_taskss)
  })
  await Promise.all(_tasks)
}


/**
 * @name: 复制d.ts文件
 * @return {*}
 * @desc:
 */
const _copyTypes = async () => {
  const _src = await _checkAndGetSrc(path.resolve(bundleDir, 'types/components'))
  const _copy = async (module) => {
    const _output = await _checkAndGetSrc(path.resolve(bundleDir, module, 'components'))
    return run(`cp -r ${_src}/* ${_output}`)
  }
  const _cmds = [_copy('es'), _copy('lib')]
  await Promise.all(_cmds)
}

const _buildComponentEntry = async () => {
  const _config = {
    input: path.resolve(componentDir, 'index.ts'),
    plugins: [ts2()],
    external: () => true
  }

  const _bundle = await rollup(_config)

  return Promise.all(
    Object.values(buildConfig)
      .map(config => ({
        format: config.format,
        file: path.resolve(config.output.path, 'components/index.js')
      }))
      .map((config) => _bundle.write(config as OutputOptions))
  )
}

export const buildEachComponent = parallel(_buildEach, _genTypes, _copyTypes, _buildComponentEntry)