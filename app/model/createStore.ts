/*
 * 负责创建 Store 的方法与 Action 方法
 *
 * */
import { create } from 'zustand'
import { persist, devtools } from 'zustand/middleware'

import type { State, TokenList } from './initialState'
import { initialState } from './initialState'

interface Action {
  setTokenList: (qty: TokenList) => void
}

export type Store = State & Action

export const useStore = create<Store>()((set, get) => ({
  ...initialState,
  setTokenList: qty => {
    set({ ...qty })
  },
}))

/**
 * 
 * 这里如果要持久化中间件persist，数据会储存在localStorage或者sessionStorage（选用session需要配置）里，
刷新和关闭网页之后，数据依然能恢复
其他比如devtools等中间件类似用法，再次包裹复合使用也可以

 export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      ...initialState,
      setTokenList: qty => {
        set({ ...qty })
      },
    }),
    { name: 'app-uniswap' }
  )
)
 */
