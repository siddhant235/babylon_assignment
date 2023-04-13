import type { NextPage } from 'next'
import Modal from '@/components/ui/modal'
import Table from '@/components/ui/table'
import { TableData } from '@/data/table_data'
import { HeaderData } from '@/data/header'


interface UserProps {

}
const Users = (props: UserProps) => {
    return (
        // <div className={"w-full h-[100vh]"}>
        //     <div className='bg-[#ccc] text-white text-20'>
        //         <p className='text-center'>This is users page</p>

              

        //         <Modal handleClose={()=>{} } show={true}>
        // <p className='text-10'>hello</p>
        //   </Modal>
        //     </div>
        // </div>
        <Table data={TableData} header={HeaderData} />
    )
}

export default Users
