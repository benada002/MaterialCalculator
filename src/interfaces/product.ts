export type IPart = Map<string, number>;

export type ISize = Map<number, IPart>;

export interface IProduct {
    id?: number;
    name: string;
    parts: string[];
    sizes: ISize;
}
