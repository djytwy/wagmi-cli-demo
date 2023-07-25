import { defineConfig } from '@wagmi/cli'
import { etherscan, react, blockExplorer } from '@wagmi/cli/plugins'
import { erc20ABI } from 'wagmi'
import { mainnet, arbitrum, sepolia } from 'wagmi/chains'


const etherscanKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY as string

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [
    {
      name: 'erc20',
      abi: erc20ABI,
    },
  ],
  plugins: [
    etherscan({
      apiKey: 'KUABE7BCA49VGQ3NQYUYMIG7BSEIPW52BH',
      // apiKey: etherscanKey,
      chainId: mainnet.id,
      contracts: [
        {
          name: 'ENS',
          address: {
            [mainnet.id]: '0x314159265dd8dbb310642f98f50c066173c1259b',
            [sepolia.id]: '0x112234455c3a32fd11230c42e7bccd4a84e02010',
          },
        },
      ],
    }),
    react(),
    // blockExplorer({
    //   apiKey: '',
    //   baseUrl: 'https://api.arbiscan.io/api',
    //   contracts: [
    //     {
    //       name: 'sperax',
    //       address: '0xD74f5255D557944cf7Dd0E45FF521520002D5748'
    //     }
    //   ]
    // })
  ],
})
