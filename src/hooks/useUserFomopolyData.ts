
import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
import { useAccount, useReadContract, useBalance } from 'wagmi'
import fomopolyAbi from 'src/abi/fomopoly'


export default function useUserFomopolyData() {
  const { address = '0x0' } = useAccount()
  const userBalance = useBalance({ address })

  const { data: landAmount } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: 'maxLands',
  })
  console.log('landAmount :', landAmount);

  const { data: [userSteps] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: 'getPlayer',
    args: [address]
  }) || {}


  // @todo: show land price on the map 
  const { data: allLandPrices = [] }: { data?: bigint[] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: 'getAllLandPrice',
    args: [0, landAmount]
  })

  const { data: userOwnedLands = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: 'getPlayerOwnedLandIDs',
    args: [address]
  })


  return {
    allLandPrices,
    landAmount,
    userSteps,
    userOwnedLands,
    userBalance
  }
}