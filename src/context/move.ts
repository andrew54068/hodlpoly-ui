import { createContext } from "react";

const MoveContext = createContext<{
  isWaitingForMoving: boolean,
  setIsWaitingForMoving: (isWaitingForMoving: boolean) => void,
  currentMoveSteps: number,
  setCurrentMoveSteps: (currentMoveSteps: number) => void,
}>({
  isWaitingForMoving: false,
  setIsWaitingForMoving: () => undefined,
  currentMoveSteps: 0,
  setCurrentMoveSteps: () => undefined,
});


export default MoveContext