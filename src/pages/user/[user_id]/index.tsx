import Modal from '@/components/ui/modal'
import { TableBodyProps } from '@/interface/table_component_interface'
import { TableDataInterface } from '@/interface/table_data_inreface'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { transformUserData } from 'src/helpers/utils'
import { useAppSelector } from 'src/store'

const UserDetails: NextPage = () => {
  const router = useRouter()
  const tableData = useAppSelector((state) => (state.tableSlice.tableData))
  const [userId, setUserId] = useState<string>(router.query.user_id as string)

  useEffect(() => {

    if (router.query) {

      setUserId(router.query.user_id as string)
    }
  }, [router.isReady, router.query])



  if (!userId) {
    return <>Loading.....</>
  }



  let userDetails: TableDataInterface = tableData.filter((user: TableDataInterface) => user.userId == userId)[0]
  userDetails = transformUserData(userDetails)

  return (
    <div className={""}>
      <Modal show={true} >
        <div>
          <p className='text-20 mb-5 text-center font-bold'>User Details</p>
          <div className='space-y-5'>
            {
              Object.entries(userDetails).map((data, index) => {

                const dataKey = data[0]
                const dataValue = data[1]

                return (
                  <>
                    {dataKey !== "actions" && <div className='flex space-x-5'>
                      <p className='font-bold uppercase'>{dataKey}</p>
                      <p className='font-normal'>{dataValue}</p>
                    </div>
                    }
                  </>
                )
              })
            }
          </div>
        </div>

      </Modal>
    </div>
  )
}

export default UserDetails;
