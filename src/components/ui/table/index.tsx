import { HeaderDataInterface, TableBodyProps, TableDataRowProps, TableHeaderProps } from "src/helpers/interfaces/header_data_interface"
import { TableDataInterface } from "src/helpers/interfaces/table_data_inreface"
import { headerRowClass, tableContainerClass, tableHeaderClass } from "./styles"

interface TableProps {
    data: TableDataInterface[],
    header: HeaderDataInterface[],
    fixedHeader?: boolean,
    onRowClicked?: () => void,
    persistFilter?: boolean,
    height?: number
}

const Table = (props: TableProps) => {
    const { data, header, fixedHeader = false, onRowClicked, persistFilter, height } = props
    const tableHeight = `h-${[height]}`

    return (
        <table className={tableContainerClass + tableHeight}>

            <TableHeader headerData={header} fixedHeader={fixedHeader} />
            <TableBody data={data} />

        </table>
    )
}







//made a separate table header component to maximize code readability

const TableHeader = (props: TableHeaderProps) => {

    const { headerData, fixedHeader } = props

    const fixedClass = fixedHeader ? "fixed" : ""
    return (
        <thead className={tableHeaderClass + fixedClass}>
            <tr>
                {
                    headerData.map((headerData, index) => {

                        return (
                            <th className={headerRowClass} key={headerData.key}>
                                {headerData.title}
                            </th>
                        )
                    })
                }
            </tr>
        </thead>
    )
}




//table body component 

const TableBody = (props: TableBodyProps) => {

    const { data } = props

    return (

        <tbody>
            {
                data.map((tableData: TableDataInterface, index: number) => {
                    return (
                        <TableDataRow key={tableData.name} tableData={tableData} />
                    )
                })
            }
        </tbody>

    )
}




//table data row


const TableDataRow = (props: TableDataRowProps) => {

    const { tableData } = props
   console.log(tableData)
    return (
        <tr>
            {
                Object.entries(tableData).map((rowData, index: number) => {
                    const rowKey = rowData[0]
                    console.log(rowKey)
                    let rowValue = rowKey=="dateOfBirth"?"15/07/1999":rowData[1]

                    return (

                        <>
                            {
                                rowKey !== "actions" ? <td key={rowKey}>
                                    {rowValue}
                                </td> : <></>
                            }
                        </>
                    )

                })
            }
        </tr>
    )
}


//making render of table actions separately

const TableActions=()=>{

    return (
        <>
        
        </>
    )
}

export default Table;
