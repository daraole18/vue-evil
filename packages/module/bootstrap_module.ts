import { inject, provide } from 'vue'
import { Provider, ReflectiveInjector } from 'injection-js'
import { InjectorKey, VUE_APP } from './module_token'
import { VueModuleScanner } from './scanner'

export function bootstrapModule(Module: any, rootModule?: ReflectiveInjector) {
  const scanner = new VueModuleScanner()

  const { providers, startupModules } = scanner.scanModule(Module)
  let RootInjector: ReflectiveInjector

  if (rootModule) {
    RootInjector = rootModule
  } else {
    //@ts-ignore
    RootInjector = inject<ReflectiveInjector>(InjectorKey, undefined)
  }

  const app = RootInjector?.get(VUE_APP)

  // const { providers, vueModules } = analysisModule(Module);
  const ChildRootInjector = ReflectiveInjector.resolveAndCreate(
    [...(providers || []), ...startupModules],
    RootInjector
  )

  startupModules.map((sm: Provider) => {
    ChildRootInjector.get(sm, null)
  })

  if (rootModule) {
    app.provide(InjectorKey, ChildRootInjector)
  } else {
    provide(InjectorKey, ChildRootInjector)
  }
  return ChildRootInjector
  // startup();
}
