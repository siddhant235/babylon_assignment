import { TableDataInterface } from "./table_data_inreface"

export interface HeaderDataInterface {
    key: string,
    title: string,
    sort: boolean
}[]

export interface TableHeaderProps{
    headerData:HeaderDataInterface[],
    fixedHeader:boolean
}


export interface TableBodyProps{
    data:TableDataInterface[]
}

export interface TableDataRowProps{
    tableData:TableDataInterface
}