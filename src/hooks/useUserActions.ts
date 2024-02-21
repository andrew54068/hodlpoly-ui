import { useCallback } from 'react'
import { getConnectedWalletClient, publicClient } from 'src/config/clients'
import { FOMOPOLY_PROXY_ADDRESS } from 'src/constants'
import { useAccount, useSwitchChain } from 'wagmi'
import { goerli } from 'wagmi/chains'
import fomopolyAbi from 'src/abi/fomopoly'
import { getContract } from 'viem'
import { NumberType } from 'src/types'
import useUserFomopolyData from './useUserFomopolyData'
import { logClickRollTheDice, logClickBuyLand } from 'src/services/Amplitude/log'


const CHAIN_ID = goerli.id
export default function useUserActions() {
  const { userSteps, allLandPrices } = useUserFomopolyData()
  const { address = '0x0', chainId } = useAccount()

  const { switchChain } = useSwitchChain()
  const checkChain = async () => {
    if (chainId !== CHAIN_ID) {
      await switchChain({ chainId: CHAIN_ID })
    }
  }



  const getContractClient = useCallback(async () => {
    const walletClient = await getConnectedWalletClient({ address })

    if (!walletClient) return
    const contract = getContract({
      address: FOMOPOLY_PROXY_ADDRESS,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient }
    })

    return contract
  }, [address])


  const rollTheDice = async (moveType: NumberType) => {
    const contract = await getContractClient()
    await checkChain()
    if (!contract) return

    const [positionBeforeMove] = await contract.read.getPlayer([address])

    const hash = await contract.write.move([moveType])
    await publicClient.waitForTransactionReceipt({ hash })

    const [positionAfterMove] = await contract.read.getPlayer([address])
    const steps = positionAfterMove - positionBeforeMove

    if (window.fomopolyMap) {
      window.fomopolyMap.triggerMoveForward(steps);
    }

    logClickRollTheDice()
    return hash
  }

  const buyLand = async () => {
    const contract = await getContractClient()
    await checkChain()
    if (!contract || !address) return

    const landPrice = allLandPrices[userSteps]

    const hash = await contract.write.buyLand([], { value: landPrice })
    // @todo: update user land status after tx ended
    logClickBuyLand()
    return hash
  }


  return { rollTheDice, buyLand, getContractClient }

} 