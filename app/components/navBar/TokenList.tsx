'use client'

import { TokenList } from '@/app/model/initialState'
import { ethers } from 'ethers'

type Props = {
  visible: boolean
  onClose: () => void
  onOpen: () => void
  data: TokenList
}
const TokenList: React.FC<Props> = ({ visible, onClose, onOpen, data }) => {
  return (
    <div
      className={`w-[300px] h-[420px]  bg-neutral-300 rounded-md text-rose-500 p-2 transition opacity-0 transform scale-95 duration-700 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <p className='font-bold text-xl'>Your token list</p>
      {data.tokenList.map(i => (
        <div key={i.symbol}>
          {`name: ${i.name}`} - {`amount: ${ethers.formatEther(BigInt(i?.balance || ''))}`}
        </div>
      ))}
    </div>
  )
}

export default TokenList
