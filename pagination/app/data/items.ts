// app/data/items.ts

export const items: Item[] = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Item ${i + 1}`,
}));


export interface Item {
    id: number;
    name: string;
}
