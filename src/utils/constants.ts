import { InventoryItem, ShopItem } from "src/components/Menu";

export const NAVBAR_HIGHT = 75

export const shopItems: ShopItem[] = [
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Land Protector",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "World Wide Traveler",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Fomo Box",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Special Dice / High",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Special Dice / Low",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Special Dice / Odd",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
    {
        image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
        name: "Special Dice / Even",
        desc: "You can protect your land 1 time wen someone step on you land.",
    },
];

export const inventoryItems: InventoryItem[] = shopItems.map(value => {
    return {
        ...value,
        amount: Math.floor(Math.random() * 10)
    }
})