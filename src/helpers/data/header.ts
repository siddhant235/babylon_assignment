import { HeaderDataInterface } from "@/interface/header_data_interface";
import { TableSortEnum } from "../enums/table_actions_enums";
import { SortingFilterInterface } from "../interfaces/table_component_interface";

export const HeaderData: HeaderDataInterface[] = [
    {
        key: 'name',
        title: 'name',
        sort: true
    } ,
    {
        key: 'age',
        title: 'age',
        sort: true
    },
    {
        key: 'dateOfBirth',
        title: 'dob',
        sort: true
    },
    {
        key: 'indianCitizen',
        title: 'NRI',
        sort: false
    },
    {
        key: 'actions',
        title: 'actions               ',
        sort: false
    }

]

export const SortingFilters:SortingFilterInterface[]=[
    {
        key: 'name',
        sortType: TableSortEnum.DEFAULT
    } ,
    {
        key: 'age',
        sortType: TableSortEnum.DEFAULT
    },
    {
        key: 'dateOfBirth',
        sortType: TableSortEnum.DEFAULT
    },
    {
        key: 'isIndianCitizen',
        sortType: TableSortEnum.DEFAULT
    },
    {
        key: 'actions',
        sortType: TableSortEnum.DEFAULT
    }
]

