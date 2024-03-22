import { HIcon } from '@h-plus/components'
import type { App } from 'vue'

const _components = [HIcon]

const _install = (app: App) => {
  _components.forEach(component => {
    app.use(component)
  })
}

export default { install: _install }
export * from '@h-plus/components'