import { Switch, Image, Flex, Text, useDisclosure } from "@chakra-ui/react";
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
import { GameMenuTopMargin, GoButtonSize } from "./MainPage";

export default function GameUtils({
  outterSharedMargin,
  onHeatMapSwitchClick,
  isHeatMapMode,
  hideAllOptions,
  setIsWaitingForMoving,
  setCurrentMoveSteps,
}: {
  outterSharedMargin: number[];
  onHeatMapSwitchClick: () => void;
  isHeatMapMode: boolean;
  hideAllOptions: boolean;
  setIsWaitingForMoving: (isWaiting: boolean) => void;
  setCurrentMoveSteps: (steps: number) => void;
}) {
  const { refetchPlayer, refetchAllLandPrices, refetchUserOwnedLands } =
    useUserFomopolyData();
  const { rollTheDice, buyLand, waitForTransaction } = useUserActions();
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
    if (hash) {
      await waitForTransaction(hash);
      console.log("hash confirmed!, ", hash);
      await refetchUserOwnedLands()
    } else {
      console.log(`failed to get hash`);
    }
  };

  return (
    <>
      {!isHeatMapMode && !hideAllOptions && (
        <>
          <Flex
            position="absolute"
            w="100%"
            top={outterSharedMargin.map((value) => `${value}px`)}
            justifyContent="space-between"
            alignItems="center"
            p={outterSharedMargin.map((value) => `0px ${value}px`)}
            gap={["10px", "15px", "20px"]}
          >
            <UserProfile flexShrink={0.5} />
            <LeaderBoard flexShrink={1} />
            <RewardBoard flexShrink={0} />
          </Flex>

          <GameMenu
            position="absolute"
            width="60px"
            height="204px"
            right={outterSharedMargin.map((value) => `${value}px`)}
            top={GameMenuTopMargin.map((value) => `${value + NAVBAR_HIGHT}px`)}
            p="0px"
            m="0px"
          />

          <RoundButton
            width={GoButtonSize.map((value) => `${value}px`)}
            position="absolute"
            bottom={outterSharedMargin.map(
              (value, index) => `${value + GoButtonSize[index] + 12}px`
            )}
            right={outterSharedMargin.map((value) => `${value}px`)}
            onClick={onClickBuyLand}
          >
            Buy Land!
          </RoundButton>

          <GoButton
            position="absolute"
            bottom={outterSharedMargin.map((value) => `${value}px`)}
            right={outterSharedMargin.map((value) => `${value}px`)}
            onClick={onClickMove}
          >
            <Flex
              direction="column"
              alignItems="center"
              rowGap={["3px", "5px", "6px"]}
            >
              <Image boxSize={["40px", "55px", "69px"]} src={dice}></Image>
              <Text
                color="background.dark"
                textAlign="center"
                fontFamily="Inter"
                fontSize={["25px", "30px", "36px"]}
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
          left={outterSharedMargin.map((value) => `${value}px`)}
          bottom={outterSharedMargin.map((value) => `${value}px`)}
          size="lg"
          onChange={onHeatMapSwitchClick}
        />
      )}

      <BuyLandModal isOpen={isBuyLandModalOpen} onClose={onBuyLandModalClose} />
    </>
  );
}
