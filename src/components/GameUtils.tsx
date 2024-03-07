import {
  Switch,
  Image,
  Flex,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import dice from "src/assets/dice.svg";
import GameMenu from "./GameMenu";
import { NAVBAR_HIGHT } from "src/utils/constants";
import { RewardBoard } from "./RewardBoard";
import { UserProfile } from "./UserProfile";
import { LeaderBoard } from "./LeaderBoard";
import useUserActions from "src/hooks/useUserActions";
import { NumberType } from "src/types";
import BuyLandModal from "src/components/BuyLandModal";
import useUserFomopolyData from "src/hooks/useUserFomopolyData";
import { GoButton } from "./Buttons/GoButton";
import { RoundButton } from "./Buttons/RoundButton";
import useCheckLogin from "src/hooks/useCheckLogin";

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
  const checkLogin = useCheckLogin();
  const {
    isOpen: isBuyLandModalOpen,
    onOpen: onBuyLandModalOpen,
    onClose: onBuyLandModalClose,
  } = useDisclosure();

  const onClickMove = async () => {
    const isUserLogin = checkLogin();
    if (!isUserLogin) return;

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
    const isUserLogin = checkLogin();
    if (!isUserLogin) return;

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
            <UserProfile/>
            <LeaderBoard
              mx="16px"
              maxWidth="700px"
              minWidth="300px"
              height="52px"
              justifyContent="center"
            />
            <RewardBoard width="180px" height="52px" />
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

          <RoundButton
            width="146px"
            position="absolute"
            bottom={`${outterSharedMargin + 146 + 12}px`}
            right={`${outterSharedMargin}px`}
            onClick={onClickBuyLand}
          >
            Buy Land!
          </RoundButton>

          <GoButton
            position="absolute"
            bottom={`${outterSharedMargin}px`}
            right={`${outterSharedMargin}px`}
            onClick={onClickMove}
          >
            <Flex direction="column" alignItems="center" rowGap="6px">
              <Image src={dice}></Image>
              <Text
                color="background.dark"
                textAlign="center"
                fontFamily="Inter"
                fontSize="36px"
                fontStyle="normal"
                fontWeight="500"
                lineHeight="35px"
                letterSpacing="-0.72px"
              >
                GO!
              </Text>
            </Flex>
          </GoButton>
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
