/*
 * 负责 State —— 添加状态类型与初始化状态值
 *
 * */

import { FetchTokenResult } from '@wagmi/core'

// token列表
export type TokenList = { tokenList: ({ balance?: string } & FetchTokenResult)[] }

// token列表初始值
export const initTokenList: TokenList = { tokenList: [] }

export type State = TokenList

export const initialState: State = {
  ...initTokenList,
}
