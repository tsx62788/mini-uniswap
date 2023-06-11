/*
 * 自定义state hooks
 * 可以根据参数自定义查询state
 * 也可以先查询其他state的数据，根据数据值再查询想要的数据
 *
 * */
import { useStore } from './createStore'
import { shallow } from 'zustand/shallow'

export const useTokenList = () => useStore(({ tokenList }) => tokenList, shallow)
