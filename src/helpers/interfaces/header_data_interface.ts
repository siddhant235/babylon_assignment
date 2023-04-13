import { TableSortEnum } from "../enums/table_actions_enums"
import { TableDataInterface } from "./table_data_inreface"

export interface HeaderDataInterface {
    key: string,
    title: string,
    sort: boolean
}[]

export interface TableHeaderProps{
    headerData:HeaderDataInterface[],
    fixedHeader:boolean,
    persistFilter:boolean
}


export interface TableBodyProps{
    data:TableDataInterface[],
    onRowClicked:(rowData:TableDataInterface)=>void
}

export interface TableDataRowProps{
    tableData:TableDataInterface,
    onRowClicked:(rowData:TableDataInterface)=>void
}


export interface SortingFilterInterface{
   key:string,
   sortType:TableSortEnum
}[]