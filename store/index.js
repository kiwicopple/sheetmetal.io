import { observable, runInAction, action, computed } from 'mobx'
import * as Helpers from '~/lib/Helpers'

class RootStoreSingleton {
  @observable account = {}

  constructor() {
    console.log('Creating new RootStoreSingleton')
    this.initialDataFilled = false
  }

}
const RootStore = new RootStoreSingleton()
export default RootStore
