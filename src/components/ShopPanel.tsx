import { Flex, SimpleGrid, TabPanel } from "@chakra-ui/react";
import { Props, ShopItem } from "./GameMenu";
import fomopolyAbi from "src/abi/fomopoly";
import { useCallback, useState } from "react";
import { PropButton } from "./PropButton";
import { SelectedPropCard } from "./SelectedPropCard";
import { useAccount, useReadContract } from "wagmi";
import { getConnectedWalletClient, publicClient } from "src/config/clients";
import { getContract } from "viem";
import { FOMOPOLY_ADDRESS_TESTNET } from "src/constants";

interface ShopPanelProps {
  items: ShopItem[];
  onUpdateAmount: () => void;
}

export const ShopPanel = ({ items, onUpdateAmount }: ShopPanelProps) => {
  const [selectedItem, setSelectedItem] = useState<ShopItem>(items[0]);
  const { address = "" } = useAccount();

  const getContractClient = useCallback(async () => {
    const walletClient = await getConnectedWalletClient({ address });

    if (!walletClient) return;
    const contract = getContract({
      address: FOMOPOLY_ADDRESS_TESTNET,
      abi: fomopolyAbi.abi,
      client: { public: publicClient, wallet: walletClient },
    });

    return contract;
  }, [address]);

  console.log(`💥 Props.OddDice: ${JSON.stringify(Props.OddDice, null, "  ")}`);

  const { data: allPropsPrices = [] } = useReadContract({
    abi: fomopolyAbi.abi,
    address: FOMOPOLY_ADDRESS_TESTNET,
    functionName: "getPropPricesETH",
    args: [],
  });

  const onClickBuyProp = async (item: ShopItem) => {
    const contract = await getContractClient();
    if (!contract) return;
    const propPrice = allPropsPrices[item.prop];
    console.log("propPrice :", propPrice);

    const hash = await contract.write.buyProps([item.prop], {
      value: propPrice,
    });
    console.log("hash :", hash);
    onUpdateAmount()
  };

  return (
    <TabPanel p="24px">
      <Flex alignItems="start" justifyContent="space-between" columnGap="24px">
        <SimpleGrid columns={3} spacing="20px" m="0px">
          {items.map((item) => {
            return (
              <PropButton
                key={item.name}
                item={item}
                onClickItem={setSelectedItem}
              />
            );
          })}
        </SimpleGrid>
        <SelectedPropCard
          item={selectedItem}
          actionTitle="Buy"
          onClickActionItem={onClickBuyProp}
        />
      </Flex>
    </TabPanel>
  );
};
