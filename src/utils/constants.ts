import { PropsType } from "src/types";
import { ShopItem } from "src/components/GameMenu";
import protector from "src/assets/protector.png";
import highDice from "src/assets/highDice.png";
import lowDice from "src/assets/lowDice.png";
import oddDice from "src/assets/oddDice.png";
import evenDice from "src/assets/evenDice.png";
import ticket from "src/assets/ticket.png";

export const NAVBAR_HIGHT = 75

export const shopItems: ShopItem[] = [
    {
        image: protector,
        name: "Land Protector",
        desc: "Increases the price of a specified owned land by 200%, reducing the likelihood of other players purchasing it.",
        prop: PropsType.TitleDeed
    },
    // {
    //     image: WorldWideTraveler,
    //     name: "World Wide Traveler",
    //     desc: "Instantly travel to a specified land on the board.",
    // },
    {
        image: highDice,
        name: "Special Dice / High",
        desc: "Rolls higher numbers (4,5,6) to navigate you closer to your target land.",
        prop: PropsType.HighDice
    },
    {
        image: lowDice,
        name: "Special Dice / Low",
        desc: "Rolls lower numbers (1,2,3) to navigate you closer to your target land.",
        prop: PropsType.LowDice
    },
    {
        image: oddDice,
        name: "Special Dice / Odd",
        desc: "Rolls odd numbers (1,3,5) to navigate you closer to your target land.",
        prop: PropsType.OddDice
    },
    {
        image: evenDice,
        name: "Special Dice / Even",
        desc: "Rolls even numbers (2,4,6) to navigate you closer to your target land.",
        prop: PropsType.EvenDice
    },
    {
        image: ticket,
        name: "Ticket",
        desc: "Ticket to treasure! Increase your chance with every ticket for the prize pool.",
        prop: PropsType.Ticket
    },
];