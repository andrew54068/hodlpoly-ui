import { PropsType } from "src/types";
import { ShopItem } from "src/components/GameMenu";
import landFlipper from "src/assets/props/landFlipper.svg";
import worldWideTraveler from "src/assets/props/worldWideTraveler.svg";
import highDice from "src/assets/props/highDice.svg";
import lowDice from "src/assets/props/lowDice.svg";
import oddDice from "src/assets/props/oddDice.svg";
import evenDice from "src/assets/props/evenDice.svg";
import ticket from "src/assets/props/ticket.svg";

export const chainSessionStorageKey = "chainId";

export const NAVBAR_HIGHT = 75;
export const MAX_DISPLAY_ETHER_DIGITS = 8;

export const shopItems: ShopItem[] = [
  {
    image: landFlipper,
    name: "Land Flipper",
    desc: "Increases the price of a specified owned land by 200%, reducing the likelihood of other players purchasing it.",
    prop: PropsType.TitleDeed,
  },
  {
    image: ticket,
    name: "Ticket",
    desc: "Ticket to treasure! Increase your chance with every ticket for the prize pool.",
    prop: PropsType.Ticket,
  },
  {
    image: worldWideTraveler,
    name: "WorldWide Traveler",
    desc: "Instantly travel to a specified land on the board.",
    prop: PropsType.WorldWideTravel,
  },
  {
    image: highDice,
    name: "Special Dice / High",
    desc: "Rolls higher numbers (4,5,6) to navigate you closer to your target land.",
    prop: PropsType.HighDice,
  },
  {
    image: lowDice,
    name: "Special Dice / Low",
    desc: "Rolls lower numbers (1,2,3) to navigate you closer to your target land.",
    prop: PropsType.LowDice,
  },
  {
    image: oddDice,
    name: "Special Dice / Odd",
    desc: "Rolls odd numbers (1,3,5) to navigate you closer to your target land.",
    prop: PropsType.OddDice,
  },
  {
    image: evenDice,
    name: "Special Dice / Even",
    desc: "Rolls even numbers (2,4,6) to navigate you closer to your target land.",
    prop: PropsType.EvenDice,
  },
];
