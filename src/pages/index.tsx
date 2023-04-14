import Modal from '@/components/ui/modal'
import { HeaderData } from '@/data/header'
import { TableDataInterface } from '@/interface/table_data_inreface'
import dynamic from 'next/dynamic'
import { useAppSelector } from 'src/store'
const Table = dynamic(() => import("@/components/ui/table"), {
    ssr: false
})


const Users = () => {
    const tableData = useAppSelector((state) => (state.tableSlice.tableData))

    const handleRowClicked = (rowData: TableDataInterface) => {
        //after clicking on a row in the logs you can see the clciked record
        console.log("row clicked", rowData)
        return rowData;
    }
    return (

        <div>
            {tableData.length > 0 ? (
                <Table data={tableData} header={HeaderData}
                fixedHeader={true} // by default false
                onRowClicked={(rowData: TableDataInterface) => handleRowClicked(rowData)}
                // height={180}  // by default full
                persistFilter={true}   //by default false
            />) : (
                <Modal show={true}>
                    <p className='text-20 font-bold '>No Records Found</p>
              </Modal>
            )}
        </div>
    )
}

export default Users
