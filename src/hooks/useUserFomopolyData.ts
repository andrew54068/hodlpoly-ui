
import { FMP_PROXY_ADDRESS, FOMOPOLY_PROXY_ADDRESS } from 'src/constants'
import { useAccount, useReadContract, useBalance } from 'wagmi'
import fomopolyAbi from 'src/abi/fomopoly'
import fmpAbi from 'src/abi/fmp'


export default function useUserFomopolyData() {
  const { address = '0x0' } = useAccount()
  const userBalance = useBalance({ address })

  const { data: landAmount } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'maxLands',
  })
  console.log('landAmount :', landAmount);

  const { data: [userSteps] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getPlayer',
    args: [address]
  }) || {}


  // @todo: show land price on the map 
  const { data: allLandPrices = [] }: { data?: bigint[] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getAllLandPrice',
    args: [0, landAmount]
  })

  const { data: userOwnedLands = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: 'getPlayerOwnedLandIDs',
    args: [address]
  })

  const { data: fmpBalance = BigInt(0) } = useReadContract({
    abi: fmpAbi.abi,
    address: FMP_PROXY_ADDRESS,
    functionName: 'balanceOf',
    args: [address]
  })
  console.log('fmpBalance :', fmpBalance.toString());

  return {
    allLandPrices,
    landAmount,
    userSteps,
    userOwnedLands,
    userBalance: userBalance.data?.value || BigInt(0),
    fmpBalance
  }
}