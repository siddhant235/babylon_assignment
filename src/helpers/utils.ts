import { TableSortEnum } from "./enums/table_actions_enums";
import { TableDataInterface } from "./interfaces/table_data_inreface";

export const transformUserData = (userData: TableDataInterface) => {
    const dateOfBirth = userData.dateOfBirth.toLocaleString(undefined, {
        month: "2-digit",
        day: "2-digit",
        year: "numeric"

    })
    const isNRI = userData.indianCitizen ? "YES" : "NO"

    return {
        ...userData,
        dateOfBirth: dateOfBirth,
        indianCitizen: isNRI
    }
}


export const sortArrayByKey = (arr, key: string, sortType: TableSortEnum) => {
    let sortedArr;
    console.log("util", arr, key, sortType)
    if (sortType == TableSortEnum.ASC) {
        sortedArr = arr.slice().sort((a, b) => (a[key] < b[key]) ? -1 : 1);
        return sortedArr
    } else if (sortType == TableSortEnum.DESC) {
        sortedArr = arr.slice().sort((a, b) => (a[key] < b[key]) ? 1 : -1);
        return sortedArr;
    } else {
        return arr;
    }

};