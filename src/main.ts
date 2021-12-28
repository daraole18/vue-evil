import { VueFactory } from 'packages'
import { AppModule } from './app/app.module'

VueFactory().create(AppModule).mount('#app')
