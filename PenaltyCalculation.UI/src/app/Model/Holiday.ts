import { Country } from "./Country";

export interface Holiday{
    id:number,
    holidayDate:Date,
    countryId:number,
    country:Country
}