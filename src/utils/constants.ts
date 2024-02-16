import { ShopItem } from "src/components/GameMenu";
import Protector from "src/assets/protector.svg?react";
// import WorldWideTraveler from "src/assets/worldWideTraveler.svg?react";
import OddDise from "src/assets/oddDise.svg?react";
import HighDise from "src/assets/highDise.svg?react";
import EvenDise from "src/assets/evenDise.svg?react";
import LowDise from "src/assets/lowDise.svg?react";

export const NAVBAR_HIGHT = 75

export const shopItems: ShopItem[] = [
    {
        image: Protector,
        name: "Land Protector",
        desc: "Increases the price of a specified owned land by 200%, reducing the likelihood of other players purchasing it.",
    },
    // {
    //     image: WorldWideTraveler,
    //     name: "World Wide Traveler",
    //     desc: "Instantly travel to a specified land on the board.",
    // },
    {
        image: HighDise,
        name: "Special Dice / High",
        desc: "Rolls higher numbers (4,5,6) to navigate you closer to your target land.",
    },
    {
        image: LowDise,
        name: "Special Dice / Low",
        desc: "Rolls lower numbers (1,2,3) to navigate you closer to your target land.",
    },
    {
        image: OddDise,
        name: "Special Dice / Odd",
        desc: "Rolls odd numbers (1,3,5) to navigate you closer to your target land.",
    },
    {
        image: EvenDise,
        name: "Special Dice / Even",
        desc: "Rolls even numbers (2,4,6) to navigate you closer to your target land.",
    },
    {
        image: EvenDise,
        name: "Ticket",
        desc: "Ticket to treasure! Increase your chance with every ticket for the prize pool.",
    },
];