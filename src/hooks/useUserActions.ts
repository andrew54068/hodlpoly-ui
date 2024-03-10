import { useCallback } from 'react'
import { getConnectedWalletClient, publicClient } from 'src/config/clients'
import { FOMOPOLY_PROXY_ADDRESS } from 'src/constants'
import { useAccount, useSwitchChain } from 'wagmi'
import { blastSepolia } from 'wagmi/chains'
import fomopolyAbi from 'src/abi/fomopoly'
import { getContract } from 'viem'
import { NumberType } from 'src/types'
import useUserFomopolyData from './useUserFomopolyData'
import { logClickRollTheDice, logClickBuyLand } from 'src/services/Amplitude/log'

const CHAIN_ID = blastSepolia.id
export default function useUserActions() {
  const { userSteps, allLandPrices, allPropsPrices } = useUserFomopolyData()
  const { address = '0x0', chainId } = useAccount()

  const { switchChainAsync } = useSwitchChain()
  const checkChain = async () => {
    if (chainId !== CHAIN_ID) {
      await switchChainAsync({ chainId: CHAIN_ID })
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
    return { hash, steps, latestPosition: positionAfterMove }
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

  const buyProp = async (prop: number) => {
    const contract = await getContractClient();
    await checkChain()
    if (!contract) return;
    const propPrice = allPropsPrices[prop];

    const hash = await contract.write.buyProps([prop, 1], {
      value: propPrice,
    });

    return hash
  }

  const worldWideTravel = async (position: number) => {
    const contract = await getContractClient();
    await checkChain()
    if (!contract) return;

    const hash = await contract.write.worldWideTravel([position]);
    await publicClient.waitForTransactionReceipt({ hash });

    return hash
  }

  const flipLandPrice = async (position: number) => {
    const contract = await getContractClient();
    await checkChain()
    if (!contract) return;

    const hash = await contract.write.flipLandPrice([position]);
    await publicClient.waitForTransactionReceipt({ hash });

    return hash
  }


  const claimReward = async () => {
    const contract = await getContractClient();
    await checkChain()
    if (!contract) return;
    console.log('after checking')
    const hash = await contract.write.claimReward();
    // await publicClient.waitForTransactionReceipt({ hash });

    return hash
  }



  return { rollTheDice, buyLand, buyProp, getContractClient, worldWideTravel, claimReward, flipLandPrice }

} 