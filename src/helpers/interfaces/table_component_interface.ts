import { TableSortEnum } from "../enums/table_actions_enums"
import { HeaderDataInterface } from "./header_data_interface"
import { TableDataInterface } from "./table_data_inreface"

export interface TableProps {
    data: TableDataInterface[],
    header: HeaderDataInterface[],
    fixedHeader?: boolean,
    onRowClicked?: (rowData: TableDataInterface) => void,
    persistFilter?: boolean,
    height?: number
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