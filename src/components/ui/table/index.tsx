import { TableActionsEnum } from "src/helpers/enums/table_actions_enums"
import { TableHeaderProps } from "src/helpers/interfaces/header_data_interface"
import { TableDataInterface } from "src/helpers/interfaces/table_data_inreface"
import { headerRowClass, tableContainerClass, tableDataClass, tableHeaderClassFixed, tableHeaderClassNormal } from "./styles"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "src/store"
import { ROUTES } from "src/routes"
import { deleteUser, setTableDataToInitial, sortTableData } from "@/slices/table_action_slices"
import { useEffect, useState } from "react"
import Modal from "../modal"
import { transformUserData } from "src/helpers/utils"
import { TableBodyProps, TableDataRowProps, TableProps } from "@/interface/table_component_interface"





const Table = (props: TableProps) => {
    const { data, header, fixedHeader = false, onRowClicked = () => { }, persistFilter = false, height } = props


    return (

        <div className={` overflow-scroll`} style={{height:`${height}px`}}>
           <table className={tableContainerClass}>
                <TableHeader headerData={header} fixedHeader={fixedHeader} persistFilter={persistFilter} />
                <TableBody data={data} onRowClicked={(rowData) => onRowClicked(rowData)} />
           </table>
        </div>

    )
}







//made a separate table header component to maximize code readability

const TableHeader = (props: TableHeaderProps) => {

    const { headerData, fixedHeader, persistFilter } = props
    const dispatch = useAppDispatch()
    const sortingFilters = useAppSelector((state) => state.tableSlice.sortingFiltersData)
    const [sortingFilter, setSortingFilter] = useState(sortingFilters)
    const fixedClass = fixedHeader ? "sticky w-full top-0" : ""

    const handleSort = (headerKey: string, e: any) => {
        dispatch(sortTableData({ headerKey: headerKey, sortType: e.target.value, persistFilter: persistFilter }))
  }

    useEffect(() => {

        if (!persistFilter) {
            dispatch(setTableDataToInitial())
        } else {
            setSortingFilter(sortingFilters)
        }
    }, [sortingFilters, persistFilter])

    return (
        <thead className={fixedHeader?tableHeaderClassFixed:tableHeaderClassNormal}>
            <tr className={fixedClass}>
                {
                    headerData.map((headerData, index) => {
                        const selectedFilter = persistFilter ? sortingFilter.filter((data) => data.key == headerData.key)[0]?.sortType : ""
                        return (
                            <th className={headerRowClass} key={headerData.key}>
                                {headerData.title}
                                {headerData.sort && (
                                    <div className="p-2">
                                        <select value={persistFilter ? selectedFilter : ""} className="border border-red-700 ml-5 " onChange={(e) => handleSort(headerData.key, e)}>
                                            <option value="" selected disabled hidden>Sort By</option>
                                            <option>asc</option>
                                            <option>desc</option>
                                            <option>none</option>
                                        </select>
                                    </div>
                                )}
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
    const { data, onRowClicked } = props
    return (
        <tbody className="max-h-[10px]">
            {
                data.map((userData: TableDataInterface, index: number) => {
                    const transformedData = transformUserData(userData)
                    return (
                        <TableDataRow key={userData.name} tableData={transformedData} onRowClicked={(rowData) => onRowClicked(rowData)} />
                    )
                })
            }
        </tbody>

    )
}




//table data row


const TableDataRow = (props: TableDataRowProps) => {
    const { tableData, onRowClicked } = props
    const blacklistedDataRows=["userId","email","address"]
    return (
        <tr className="border-solid ml-5">
            {
                Object.entries(tableData).map((rowData, index: number) => {
                    const rowKey = rowData[0]

                    let rowValue = rowData[1]

                    return (
                        <>
                            {!blacklistedDataRows.includes(rowKey) &&
                                (rowKey !== "actions" ? (<td key={rowKey} className={tableDataClass} onClick={() => onRowClicked(tableData)}>
                                    {rowValue}
                                </td>) : (<TableActions key={rowKey} tableActions={rowValue} tableData={tableData} />))
                            }
                        </>
                    )

                })
            }
        </tr>
    )
}


//making render of table actions separately

interface TableActionProps {
    tableActions: TableActionsEnum[],
    tableData: TableDataInterface

}
const TableActions = (props: TableActionProps) => {
    const { tableActions, tableData } = props
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false)
    const router = useRouter()
    const dispatch = useAppDispatch()

    const handleTableActionClick = (action: TableActionsEnum) => {
        if (action == TableActionsEnum.VIEW) {
            router.push({
                pathname: ROUTES.USER_DETAILS(tableData.userId)
            })
        } else if (action == TableActionsEnum.DELETE) {
            setShowDeleteModal(true)
        } else if (action == TableActionsEnum.EDIT) {
            router.push({
                pathname: ROUTES.USER_EDIT(tableData.userId)
            })
        }
    }

    return (
        <>
            <td className="flex justify-around border border-slate-300">
                {
                    tableActions.map((action, index: number) => {
                        return <button onClick={() => handleTableActionClick(action)} className={"cursor-pointer text-center underline ml-2 "} key={action}>{action}</button>
                    })
                }
            </td>

            {
                showDeleteModal && (

                    <Modal handleClose={() => setShowDeleteModal(false)} show={showDeleteModal}>
                        <h3 className="text-center">Please confirm  to delete this record</h3>
                        <div className="flex items-center justify-center  space-x-10 mt-10">
                            <button className="bg-black text-white p-2 rounded-[5px]" onClick={() => dispatch(deleteUser({ userId: tableData.userId }))}>YES</button>
                            <button className="bg-red-500 p-2 rounded-[5px]" onClick={() => setShowDeleteModal(false)}>NO</button>
                        </div>

                    </Modal>
                )
            }

        </>
    )
}

export default Table;
