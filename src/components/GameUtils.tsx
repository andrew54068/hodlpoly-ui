import {
  Button,
  Switch,
  Image,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dice from "src/assets/dice.png";
import GameMenu from "./GameMenu";
import { NAVBAR_HIGHT } from "src/utils/constants";
import { BalanceBoard } from "./BalanceBoard";
import { UserProfile } from "./UserProfile";
import { LeaderBoard } from "./LeaderBoard";
import useUserActions from "src/hooks/useUserActions";
import { NumberType } from "src/types";
import BuyLandModal from "src/components/BuyLandModal";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";

export default function GameUtils({
  outterSharedMargin,
  onHeatMapSwitchClick,
  isHeatMapMode,
  hideAllOptions,
  setIsWaitingForMoving,
  setCurrentMoveSteps,
}: {
  outterSharedMargin: number;
  onHeatMapSwitchClick: () => void;
  isHeatMapMode: boolean;
  hideAllOptions: boolean;
  setIsWaitingForMoving: (isWaiting: boolean) => void;
  setCurrentMoveSteps: (steps: number) => void;
}) {
  const { refetchPlayer, refetchAllLandPrices } = useUserFomopolyData();
  const { rollTheDice, buyLand } = useUserActions();
  const {
    isOpen: isBuyLandModalOpen,
    onOpen: onBuyLandModalOpen,
    onClose: onBuyLandModalClose,
  } = useDisclosure();

  const onClickMove = async () => {
    try {
      setIsWaitingForMoving(true);
      const { steps = 0 } = (await rollTheDice(NumberType.Any)) || {};
      setCurrentMoveSteps(steps);
      refetchPlayer();
      refetchAllLandPrices();
      setTimeout(() => {
        onBuyLandModalOpen();
      }, 3000);
    } catch (e) {
      console.error(e);
      setIsWaitingForMoving(false);
    }
  };

  const onClickBuyLand = async () => {
    const hash = await buyLand();
    console.log("hash :", hash);
  };

  return (
    <>
      {!isHeatMapMode && !hideAllOptions && (
        <>
          <Flex
            position="absolute"
            w="100%"
            top={`${outterSharedMargin}px`}
            justifyContent="space-between"
            alignItems="center"
            p="0px 52px"
          >
            <UserProfile minWidth="96px" />
            <LeaderBoard
              mx="16px"
              maxWidth="700px"
              minWidth="300px"
              height="52px"
              justifyContent="center"
            />
            <BalanceBoard width="180px" height="52px" />
          </Flex>

          <GameMenu
            position="absolute"
            width="60px"
            height="204px"
            right={`${outterSharedMargin}px`}
            top={`${156 + NAVBAR_HIGHT}px`}
            p="0px"
            m="0px"
          />

          <Button
            width="146px"
            height="146px"
            position="absolute"
            bottom={`${outterSharedMargin + 146 + 30}px`}
            right={`${outterSharedMargin}px`}
            onClick={onClickBuyLand}
            _hover={{
              background:
                "0px 25px 60px -15px rgba(3, 3, 3, 0.20), 0px 25px 60px -15px rgba(3, 3, 3, 0.12), 0px 0px 7px 0px #222",
              boxShadow:
                "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), 0px 0px 7px 0px #222",
              linearGradient: "(270deg, #FFF -26.8%, #000 30.45%)",
            }}
            _active={{
              background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
              boxShadow:
                "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), -6px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
              transform: "scale(0.98)",
            }}
            boxShadow="0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)"
            background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
            borderRadius="16.22px"
          >
            <Flex direction="column" alignItems="center">
              <Image src={dice}></Image>
              <Text
                color="#FFFFFF"
                textAlign="center"
                fontFamily="Inter"
                fontSize="26px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="35.689px"
                letterSpacing="-0.72px"
              >
                Buy Land!
              </Text>
            </Flex>
          </Button>

          <Button
            width="146px"
            height="146px"
            position="absolute"
            bottom={`${outterSharedMargin}px`}
            right={`${outterSharedMargin}px`}
            onClick={onClickMove}
            _hover={{
              background:
                "0px 25px 60px -15px rgba(3, 3, 3, 0.20), 0px 25px 60px -15px rgba(3, 3, 3, 0.12), 0px 0px 7px 0px #222",
              boxShadow:
                "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), 0px 0px 7px 0px #222",
              linearGradient: "(270deg, #FFF -26.8%, #000 30.45%)",
            }}
            _active={{
              background: "linear-gradient(270deg, #FFF -26.8%, #000 30.45%)",
              boxShadow:
                "0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12), -6px 1px 0px 0px rgba(0, 0, 0, 0.40) inset",
              transform: "scale(0.98)",
            }}
            boxShadow="0px 25px 60px -15px rgba(16, 24, 40, 0.20), 0px 25px 60px -15px rgba(16, 24, 40, 0.12)"
            background="linear-gradient(270deg, #FFF -26.8%, #000 30.45%)"
            borderRadius="16.22px"
          >
            <Flex direction="column" alignItems="center">
              <Image src={dice}></Image>
              <Text
                color="#FFFFFF"
                textAlign="center"
                fontFamily="Inter"
                fontSize="36px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="35.689px"
                letterSpacing="-0.72px"
              >
                GO!
              </Text>
            </Flex>
          </Button>
        </>
      )}

      {!hideAllOptions && (
        <Switch
          position="absolute"
          left={`${outterSharedMargin}px`}
          bottom={`${outterSharedMargin}px`}
          size="lg"
          colorScheme="red"
          onChange={onHeatMapSwitchClick}
        />
      )}

      <BuyLandModal isOpen={isBuyLandModalOpen} onClose={onBuyLandModalClose} />
    </>
  );
}
