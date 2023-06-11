'use client'

import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { WagmiConfig } from 'wagmi'
import { chains, wagmiConfig } from '@/app/config/wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

type Props = { children: React.ReactNode }

const Wrapper: React.FC<Props> = ({ children }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <CacheProvider>
          <ChakraProvider>{children}</ChakraProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default Wrapper
