import { Props, ShopItem } from "src/components/GameMenu";
import Protector from "src/assets/protector.svg?react";
// import WorldWideTraveler from "src/assets/worldWideTraveler.svg?react";
import OddDice from "src/assets/oddDice.svg?react";
import HighDice from "src/assets/highDice.svg?react";
import EvenDice from "src/assets/evenDice.svg?react";
import LowDice from "src/assets/lowDice.svg?react";

export const NAVBAR_HIGHT = 75

export const shopItems: ShopItem[] = [
    {
        image: Protector,
        name: "Land Protector",
        desc: "Increases the price of a specified owned land by 200%, reducing the likelihood of other players purchasing it.",
        prop: Props.TitleDeed
    },
    // {
    //     image: WorldWideTraveler,
    //     name: "World Wide Traveler",
    //     desc: "Instantly travel to a specified land on the board.",
    // },
    {
        image: HighDice,
        name: "Special Dice / High",
        desc: "Rolls higher numbers (4,5,6) to navigate you closer to your target land.",
        prop: Props.HighDice
    },
    {
        image: LowDice,
        name: "Special Dice / Low",
        desc: "Rolls lower numbers (1,2,3) to navigate you closer to your target land.",
        prop: Props.LowDice
    },
    {
        image: OddDice,
        name: "Special Dice / Odd",
        desc: "Rolls odd numbers (1,3,5) to navigate you closer to your target land.",
        prop: Props.OddDice
    },
    {
        image: EvenDice,
        name: "Special Dice / Even",
        desc: "Rolls even numbers (2,4,6) to navigate you closer to your target land.",
        prop: Props.EvenDice
    },
    {
        image: EvenDice,
        name: "Ticket",
        desc: "Ticket to treasure! Increase your chance with every ticket for the prize pool.",
        prop: Props.EvenDice
    },
];