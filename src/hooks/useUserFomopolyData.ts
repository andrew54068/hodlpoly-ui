import { FMP_PROXY_ADDRESS, FOMOPOLY_PROXY_ADDRESS } from "src/constants";
import { useAccount, useReadContract, useBalance } from "wagmi";
import fomopolyAbi from "src/abi/fomopoly";
import fmpAbi from "src/abi/fmp";
import { chainSessionStorageKey } from "src/utils/constants";
import { zircuitTestnet } from "src/config/chains";

const CHAIN_ID = Number(
  sessionStorage.getItem(chainSessionStorageKey) ?? zircuitTestnet.id
);

export default function useUserFomopolyData() {
  const { address = "0x0" } = useAccount();
  const _userBalance = useBalance({ address, chainId: CHAIN_ID });

  const { data: landAmount } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "maxLands",
    chainId: CHAIN_ID,
  });

  const { data: [systemPool, accRewardPerShare] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getSystemPool",
    chainId: CHAIN_ID,
  });

  const {
    data: [userSteps, userLandAmount, rewardDebt] = [],
    refetch: refetchPlayer,
  } =
    useReadContract({
      abi: fomopolyAbi.abi,
      address: FOMOPOLY_PROXY_ADDRESS,
      functionName: "getPlayer",
      args: [address],
      chainId: CHAIN_ID,
    }) || {};

  // @todo: show land price on the map
  const {
    data: allLandPrices = [],
    refetch: refetchAllLandPrices,
  }: {
    data?: bigint[];
    refetch: () => void;
  } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getAllLandPrice",
    args: [0, landAmount],
    chainId: CHAIN_ID,
  });

  const { data: userOwnedLands = [], refetch: refetchUserOwnedLands } =
    useReadContract({
      abi: fomopolyAbi.abi,
      address: FOMOPOLY_PROXY_ADDRESS,
      functionName: "getPlayerOwnedLandIDs",
      args: [address],
      chainId: CHAIN_ID,
    });

  const { data: fmpBalance = BigInt(0) } = useReadContract({
    abi: fmpAbi.abi,
    address: FMP_PROXY_ADDRESS,
    functionName: "balanceOf",
    args: [address],
    chainId: CHAIN_ID,
  });

  const { data: userProps, refetch: refetchUserProps } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getPlayerProps",
    args: [address],
    chainId: CHAIN_ID,
  });

  const { data: allPropsPrices = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getPropPricesETH",
    args: [],
    chainId: CHAIN_ID,
  });

  const { data: [userPendingReward = BigInt(0)] = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_PROXY_ADDRESS,
    functionName: "getLatestPendingReward",
    args: [address],
    chainId: CHAIN_ID,
  });

  const playerClaimableReward =
    BigInt(userLandAmount ?? 0) * (accRewardPerShare ?? BigInt(0)) -
    (rewardDebt ?? BigInt(0));

  return {
    allLandPrices,
    refetchAllLandPrices,
    systemPool,
    landAmount,
    userSteps,
    refetchPlayer,
    userOwnedLands,
    refetchUserOwnedLands,
    userBalance: _userBalance.data?.value || BigInt(0),
    fmpBalance,
    userProps,
    refetchUserProps,
    playerClaimableReward,
    allPropsPrices,
    userPendingReward,
  };
}
