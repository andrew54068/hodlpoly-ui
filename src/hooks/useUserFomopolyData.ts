
import { FMP_PROXY_ADDRESS, FOMOPOLY_PROXY_ADDRESS } from 'src/constants'
import { useAccount, useReadContract, useBalance } from 'wagmi'
import { goerli } from 'wagmi/chains'
import fomopolyAbi from 'src/abi/fomopoly'
import fmpAbi from 'src/abi/fmp'

const CHAIN_ID = goerli.id

export default function useUserFomopolyData() {
  const { address = '0x0' } = useAccount()
  const userBalance = useBalance({ address })

  const { data: landAmount } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'maxLands',
    chainId: CHAIN_ID
  })

  const { data: [systemPool] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getSystemPool',
    chainId: CHAIN_ID
  })

  const { data: [userSteps] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getPlayer',
    args: [address],
    chainId: CHAIN_ID
  }) || {}


  // @todo: show land price on the map 
  const { data: allLandPrices = [] }: { data?: bigint[] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getAllLandPrice',
    args: [0, landAmount],
    chainId: CHAIN_ID
  })

  const { data: userOwnedLands = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getPlayerOwnedLandIDs',
    args: [address],
    chainId: CHAIN_ID
  })

  const { data: fmpBalance = BigInt(0) } = useReadContract({
    abi: fmpAbi.abi,
    address: FMP_PROXY_ADDRESS,
    functionName: 'balanceOf',
    args: [address],
    chainId: CHAIN_ID
  })
  console.log('fmpBalance :', fmpBalance.toString());

  return {
    allLandPrices,
    systemPool,
    landAmount,
    userSteps,
    userOwnedLands,
    userBalance: userBalance.data?.value || BigInt(0),
    fmpBalance,
  }
}