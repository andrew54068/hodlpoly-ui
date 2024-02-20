import { NumberType, PropsType } from "src/types";

export const getNumberType = (propType: PropsType): NumberType | null => {
    switch (propType) {
        case PropsType.OddDice:
            return NumberType.Odd
        case PropsType.EvenDice:
            return NumberType.Even
        case PropsType.LowDice:
            return NumberType.Low
        case PropsType.HighDice:
            return NumberType.High
        default:
            return null
    }
}