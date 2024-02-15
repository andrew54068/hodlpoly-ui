
import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
import { useAccount, useReadContract } from 'wagmi'
import fomopolyAbi from 'src/abi/fomopoly'


export default function useUserFomopolyData() {
  const { address = '' } = useAccount()

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
  const { data: allLandPrices = [] } = useReadContract({
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


  return { allLandPrices, landAmount, userSteps, userOwnedLands }
}