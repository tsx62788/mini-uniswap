'use client'

import { ADDRESSES, ERC20_BOO_ABI, ERC20_XDD_ABI, IWETH_ABI, NAV_ITEMS } from '@/app/constants'
import { Uni } from '@web3uikit/icons'
import Link from 'next/link'
import { Input, InputGroup, InputRightElement, Tooltip, useBoolean, useMediaQuery } from '@chakra-ui/react'
import { Search2Icon } from '@chakra-ui/icons'
import Connector from './Connector'
import { BsCoin } from 'react-icons/bs'
import TokenList from './TokenList'
import { useAccount, useNetwork, useContractRead, useContractReads, useToken } from 'wagmi'
import { useCallback, useEffect } from 'react'
import { useStore, useTokenList } from '@/app/model'
import { FetchTokenResult } from '@wagmi/core'

const NavBarPage = () => {
  const { setTokenList } = useStore()
  const tl = useTokenList()
  const [isLargerThan768] = useMediaQuery('(min-width: 768px)')
  const [visible, setVisible] = useBoolean(false)
  const { isConnected, address } = useAccount()
  const { chain } = useNetwork()
  const booTokenContract = {
    address: chain ? ADDRESSES[chain.id].booToken : undefined,
    abi: ERC20_BOO_ABI,
  }
  const xddTokenContract = {
    address: chain ? ADDRESSES[chain.id].xddToken : undefined,
    abi: ERC20_XDD_ABI,
  }
  const daiTokenContract = {
    address: chain ? ADDRESSES[chain.id].Dai : undefined,
    abi: IWETH_ABI,
  }
  const wethTokenContract = {
    address: chain ? ADDRESSES[chain.id].IWeth : undefined,
    abi: IWETH_ABI,
  }

  // 获取 token 信息
  const { data: booToken } = useToken({ address: chain ? ADDRESSES[chain.id].booToken : undefined })
  const { data: xddToken } = useToken({ address: chain ? ADDRESSES[chain.id].xddToken : undefined })
  const { data: Dai } = useToken({ address: chain ? ADDRESSES[chain.id].Dai : undefined })
  const { data: IWeth } = useToken({ address: chain ? ADDRESSES[chain.id].IWeth : undefined })

  // 获取当前账户每种 token 的 balance
  const {
    data,
  }: {
    data?: (
      | {
          error: Error
          result?: undefined
          status: 'failure'
        }
      | {
          error?: undefined
          result: BigInt
          status: 'success'
        }
    )[]
  } = useContractReads({
    contracts: [
      { ...booTokenContract, functionName: 'balanceOf', args: [address ? address : ''] },
      { ...xddTokenContract, functionName: 'balanceOf', args: [address ? address : ''] },
      { ...daiTokenContract, functionName: 'balanceOf', args: [address ? address : ''] },
      { ...wethTokenContract, functionName: 'balanceOf', args: [address ? address : ''] },
    ],
  })

  const handleTokenList = useCallback(() => {
    if (booToken && xddToken && Dai && IWeth && data) {
      const tokenList: ({ balance?: string } & FetchTokenResult)[] = [booToken, xddToken, Dai, IWeth]
      for (let index = 0; index < tokenList.length; index++) {
        tokenList[index].balance = (data[index]?.result || '').toString()
      }
      setTokenList({ tokenList })
    }
  }, [booToken, data, xddToken, Dai, IWeth, setTokenList])

  // 设置当前账户的 tokenList
  useEffect(() => {
    handleTokenList()
  }, [handleTokenList])

  return (
    <div className='grid grid-cols-7 justify-between items-center gap-4 mx-auto my-8 w-11/12'>
      <div className=' grid grid-cols-2 justify-between items-center col-span-3'>
        <Uni fontSize='100px' className='hidden md:block' title='Uniswap' />
        <div className='hidden md:block'>
          <div className='grid grid-cols-3 justify-between items-center gap-1'>
            {isLargerThan768
              ? NAV_ITEMS.map(i => (
                  <Link href={i.url} key={i.url}>
                    <div className='hover:text-rose-500 truncate'>{i.name}</div>
                  </Link>
                ))
              : NAV_ITEMS.map(i => (
                  <Tooltip key={i.url} label={i.name} bg='red.500' hasArrow>
                    <Link href={i.url}>
                      <div className='hover:text-rose-500 truncate'>{i.name}</div>
                    </Link>
                  </Tooltip>
                ))}
          </div>
        </div>
      </div>
      <InputGroup className='hidden md:block col-span-2'>
        <Input placeholder='Searching everything you want...' />
        <InputRightElement>
          <Search2Icon />
        </InputRightElement>
      </InputGroup>
      <div className={`${isConnected ? '' : 'col-span-2 col-end-8 md:ml-32'}`}>
        <Connector />
      </div>
      {isConnected && (
        <div className='cursor-pointer relative w-[30px] col-start-9'>
          <div className='rounded-md bg-neutral-300'>
            <BsCoin fontSize={30} color='#ea337a' onMouseEnter={setVisible.on} onMouseLeave={setVisible.off} />
          </div>
          <div className=' absolute top-[30px] right-[0px]'>
            <TokenList visible={visible} onClose={setVisible.off} onOpen={setVisible.on} data={{ tokenList: tl }} />
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBarPage
