import { getDefaultWallets, connectorsForWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { goerli, mainnet } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'

const walletConnectProjectId = '38fd2c2ab67071c96266c66680145e74'
const alchemyKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === 'development' ? [goerli] : [])],
  [
    publicProvider(),
    alchemyProvider({
      apiKey: alchemyKey
    })
  ],
)

const { wallets } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

const connectors = connectorsForWallets([
  ...wallets
])

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
