import { Holiday } from "./Holiday";

export interface Country{
    id: number,
    name: string,
    currencyCode: string,
    weekEnd: number,
    holidays: Holiday[]
}