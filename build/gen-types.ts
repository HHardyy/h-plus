import { ModuleKind, Project, ScriptTarget, SourceFile } from "ts-morph"
import { _checkAndGetSrc, bundleDir, hPlusDir, projectRootDir } from "./utils/path"
import glob from "fast-glob"
import { parallel, series } from "gulp"

import path from "path"
import fs from 'fs/promises'
import { buildConfig } from "./utils/config"
import { _withTashname, run } from "./utils"
/*
 * @version:
 * @Author: Hardy
 * @Date: 2024-03-22 15:24:22
 * @Description:
 */

const genEntryType = async () => {
  const _files = await glob('*.ts', {
    cwd: hPlusDir,
    absolute: true,
    onlyFiles: true
  })

  const _project = new Project({
    compilerOptions: {
      module: ModuleKind.ESNext,
      allowJs: true,
      declaration: true,
      emitDeclarationOnly: true,
      noEmitOnError: false,
      outDir: path.resolve(bundleDir, 'entry/types'),
      target: ScriptTarget.ESNext,
      rootDir: hPlusDir,
      strict: false
    },
    skipAddingFilesFromTsConfig: true,
    tsConfigFilePath: path.resolve(projectRootDir, 'tsconfig.json'),
    skipFileDependencyResolution: true
  })

  const _sourceFiles: SourceFile[] = []
  _files.forEach(f => {
    const _sourceFile = _project.addSourceFileAtPath(f)
    _sourceFiles.push(_sourceFile)
  })

  await _project.emit({ emitOnlyDtsFiles: true })
  const _tasks = _sourceFiles.map(async (sourceFile: SourceFile) => {
    const _emitOutput = sourceFile.getEmitOutput()
    for (const outputFile of _emitOutput.getOutputFiles()) {
      console.log(2)
      const _filePath = outputFile.getFilePath()
      await fs.mkdir(path.dirname(_filePath), { recursive: true })
      await fs.writeFile(_filePath, outputFile.getText().replaceAll('@h-plus', '.'), 'utf8')
    }
  })
  await Promise.all(_tasks)
}


export const _copyEntryTypes = async () => {
  const _src = await _checkAndGetSrc(path.resolve(bundleDir, "entry/types"))
  const _copy = async (module) => {
    const _outputPath = await _checkAndGetSrc(path.resolve(bundleDir, buildConfig[module].output.path))
    console.log('copy ============', _outputPath)
    return run(`cp -r ${_src}/* ${_outputPath}/`)
  }
  const _cmds = [_copy('esm'), _copy('cjs')]
  await Promise.all(_cmds)
}


export  const _genEntryType = series(genEntryType, _copyEntryTypes)