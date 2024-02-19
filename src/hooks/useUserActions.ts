import { useCallback } from 'react'
import { getConnectedWalletClient, publicClient } from 'src/config/clients'
import { FOMOPOLY_ADDRESS_TESTNET } from 'src/constants'
import { useAccount } from 'wagmi'
import fomopolyAbi from 'src/abi/fomopoly'
import { getContract } from 'viem'
import { NumberType } from 'src/types'
import useUserFomopolyData from './useUserFomopolyData'

export default function useUserActions() {
  const { address = '0x0' } = useAccount()
  const { userSteps, allLandPrices } = useUserFomopolyData()

  const getContractClient = useCallback(async () => {
    const walletClient = await getConnectedWalletClient({ address })

    if (!walletClient) return
    const contract = getContract({
      address: FOMOPOLY_ADDRESS_TESTNET,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient }
    })

    return contract
  }, [address])


  const rollTheDice = async (moveType: NumberType) => {
    const contract = await getContractClient()
    if (!contract) return

    const [positionBeforeMove] = await contract.read.getPlayer([address])

    const hash = await contract.write.move([moveType])
    await publicClient.waitForTransactionReceipt({ hash })

    const [positionAfterMove] = await contract.read.getPlayer([address])
    const steps = positionAfterMove - positionBeforeMove

    if (window.fomopolyMap) {
      window.fomopolyMap.triggerMoveForward(steps);
    }

    return hash
  }

  const buyLand = async () => {
    const contract = await getContractClient()
    if (!contract || !address) return

    // @todo: check if the user has owned the land
    const landPrice = allLandPrices[userSteps]

    const hash = await contract.write.buyLand([], { value: landPrice })
    // @todo: update user land status after tx ended
    return hash
  }


  return { rollTheDice, buyLand, getContractClient }

} 