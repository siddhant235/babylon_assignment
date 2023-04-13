import { TableActionsEnum } from "src/helpers/enums/table_actions_enums"
import { HeaderDataInterface, TableBodyProps, TableDataRowProps, TableHeaderProps } from "src/helpers/interfaces/header_data_interface"
import { TableDataInterface } from "src/helpers/interfaces/table_data_inreface"
import { headerRowClass, tableContainerClass, tableDataClass, tableHeaderClass } from "./styles"
import { useRouter } from "next/router"
import { useAppDispatch, useAppSelector } from "src/store"
import { ROUTES } from "src/routes"
import { deleteUser, setTableDataToInitial, sortTableData } from "@/slices/table_action_slices"
import { useEffect, useState } from "react"
import Modal from "../modal"
import { transformUserData } from "src/helpers/utils"
import { SortingFilters } from "@/data/header"


interface TableProps {
    data: TableDataInterface[],
    header: HeaderDataInterface[],
    fixedHeader?: boolean,
    onRowClicked?: (rowData:TableDataInterface) => void,
    persistFilter?: boolean,
    height?: number
}

const Table = (props: TableProps) => {
    const { data, header, fixedHeader = false, onRowClicked=()=>{}, persistFilter=false, height } = props
    const tableHeight = `h-[${height}px]`
   
    return (
        <div className={`flex w-full h-full items-center justify-center p-20`}>
            <table className={tableContainerClass}>
                <TableHeader headerData={header} fixedHeader={fixedHeader} persistFilter={persistFilter} />
                <TableBody data={data} onRowClicked={(rowData)=>onRowClicked(rowData)}  />
            </table>
        </div>
    )
}







//made a separate table header component to maximize code readability

const TableHeader = (props: TableHeaderProps) => {

    const { headerData, fixedHeader ,persistFilter } = props
    const dispatch=useAppDispatch()
    const sortingFilters=useAppSelector((state)=>state.tableSlice.sortingFiltersData)
    const [sortingFilter,setSortingFilter]=useState(sortingFilters)
    const fixedClass = fixedHeader ? "fixed" : ""

    const handleSort=(headerKey:string,e:any)=>{
        dispatch(sortTableData({headerKey:headerKey,sortType:e.target.value,persistFilter:persistFilter}))
       
    }
  console.log("sorting",sortingFilters)
    useEffect(()=>{

        if(!persistFilter){
            dispatch(setTableDataToInitial())
        }else{
            setSortingFilter(sortingFilters)
        }
    },[sortingFilters,persistFilter])
    return (
        <thead className={tableHeaderClass + fixedClass}>
            <tr>
                {
                    headerData.map((headerData, index) => {
                        console.log(headerData.key)
                     const selectedFilter=persistFilter?sortingFilter.filter((data)=>data.key==headerData.key)[0].sortType:""
                     console.log("selected filter",selectedFilter,sortingFilters)  
                     return (
                            <th className={headerRowClass} key={headerData.key}>
                                {headerData.title}
                                {headerData.sort && (
                                    <div className="p-2">
                                        <select value={persistFilter ? selectedFilter:""} className="border border-red-700 ml-5 " onChange={(e)=>handleSort(headerData.key,e)}>
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
    const { data,onRowClicked } = props
    return (
        <tbody className="">
            {
                data.map((userData: TableDataInterface, index: number) => {
                    const transformedData = transformUserData(userData)
                    return (
                        <TableDataRow key={userData.name} tableData={transformedData} onRowClicked={(rowData)=>onRowClicked(rowData)}/>
                    )
                })
            }
        </tbody>

    )
}




//table data row


const TableDataRow = (props: TableDataRowProps) => {
    const { tableData,onRowClicked } = props

    return (
        <tr className="border-solid">
            {
                Object.entries(tableData).map((rowData, index: number) => {
                    const rowKey = rowData[0]

                    let rowValue = rowData[1]

                    return (
                        <>
                            {rowKey !== "userId" &&
                                (rowKey !== "actions" ? (<td key={rowKey} className={tableDataClass} onClick={()=>onRowClicked(tableData)}>
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
            {
                tableActions.map((action, index: number) => {
                    return <td onClick={() => handleTableActionClick(action)} className={"cursor-pointer "} key={action}>{action}</td>
                })
            }

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
