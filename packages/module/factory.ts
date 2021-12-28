import '@abraham/reflection'

import { ReflectiveInjector } from 'injection-js'
import { App, Component, ComputedOptions, createApp, MethodOptions } from 'vue'
import { bootstrapModule } from './bootstrap_module'
import { InjectorKey, VUE_APP } from './module_token'
import { VueModuleScanner } from './scanner'

export class VueFactoryStatic {
  constructor() {
    // this.app.provide(InjectorKey, this.RootInjector);
  }

  create(module: any) {
    const scanner = new VueModuleScanner()
    const app = createApp(scanner.scanBootstrap(module))
    const RootInjector = ReflectiveInjector.resolveAndCreate([
      {
        useValue: app,
        provide: VUE_APP
      }
    ])

    bootstrapModule(module, RootInjector)
    // setupDirective(this.app, ChildRootInjector);

    return app
  }
}
export const VueFactory = () => {
  return new VueFactoryStatic()
}
