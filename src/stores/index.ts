import { ref, computed } from 'vue'
import { getApiList } from '../../server'
import { defineStore } from 'pinia'
import type { Children, RootObject, Total } from '@/types/Result'

export const useStore = defineStore('counter', {
  state: () => {
    return {
      list: <RootObject>{},
      items: <Children[]>[],
      chinaTotal: <Total>{},
    }
  },
  actions: {
    async getList() {
      const result = await getApiList()
      this.list = result.data
      this.items = result.data.data.children
      this.chinaTotal = result.data.data.total
    }
  },
  getters: {}

})
