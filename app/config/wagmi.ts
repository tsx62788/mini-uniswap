import { configureChains, createConfig } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, sepolia, hardhat } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'

// Step1 配置链
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    polygon,
    arbitrum,
    optimism,
    ...(process.env.NEXT_PUBLIC_ENABLE_LOCAL_NETWORK ? [hardhat] : []),
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS ? [sepolia] : []),
  ],
  [alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_ID! }), publicProvider()]
)
// Step2 配置connectors
const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains,
})
// Step3 创建配置并导出
const wagmiConfig = createConfig({ publicClient, webSocketPublicClient, connectors, autoConnect: true })

export { chains, wagmiConfig }
