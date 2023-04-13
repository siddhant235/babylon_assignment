import Modal from '@/components/ui/modal'
import { TableBodyProps } from '@/interface/table_component_interface'
import { TableDataInterface } from '@/interface/table_data_inreface'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { transformUserData } from 'src/helpers/utils'
import { ROUTES } from 'src/routes'
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

  const getDataValue = (dataKey:string, value:string) => {
    if (dataKey == "dateOfBirth") {
      return JSON.stringify(value)
    } else if (dataKey == "indianCitizen") {
      return JSON.stringify(value)
    } else {
      return value
    }
  }

  const handleBack = () => {
    router.back()
  }
  const handleEdit = () => {
    router.push({
      pathname: ROUTES.USER_EDIT(userId)
    })
  }
  return (
    <div className={""}>

      <Modal show={true} >
        <div>
          <button className='bg-slate-300 p-2 rounded-[5px]' onClick={() => handleBack()}>Back</button>
          <button className='bg-slate-300 p-2 ml-5 rounded-[5px]' onClick={() => handleEdit()}>Edit</button>
          <p className='text-20 mb-5 text-center font-bold'>User Details</p>
          <div className='space-y-5'>
            {
              Object.entries(userDetails).map((data, index) => {

                const dataKey = data[0]
                const dataValue = getDataValue(dataKey, data[1])

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
