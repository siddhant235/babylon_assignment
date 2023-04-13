import Modal from '@/components/ui/modal'
import { HeaderData } from '@/data/header'
import { TableDataInterface } from '@/types/table_data_inreface'
import dynamic from 'next/dynamic'
import { useAppSelector } from 'src/store'
const Table = dynamic(() => import("@/components/ui/table"), {
    ssr: false
})

interface UserProps {

}
const Users = (props: UserProps) => {
    const tableData = useAppSelector((state) => (state.tableSlice.tableData))

    const handleRowClicked = (rowData: TableDataInterface) => {
        //after clicking on a row in the logs you can see the clciked record
        console.log("row clicked", rowData)
        return rowData;
    }
    return (

       <div>
           { tableData.length>0 ?( <Table data={tableData} header={HeaderData} 
        onRowClicked={(rowData: TableDataInterface) => handleRowClicked(rowData)} 
        height={10} persistFilter={true}
         />):(
             <Modal show={true}>
                 <p className='text-20 font-bold '>No Records Found</p>

             </Modal>
         )}
       </div>
    )
}

export default Users
