export type IPart = {[key: string]: {width: number, height: number}};

export type ISize = {[key: number]: IPart};

export interface IProduct {
    id?: number;
    name: string;
    parts: string[];
    sizes: ISize;
}
