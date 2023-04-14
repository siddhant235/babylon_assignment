import Modal from '@/components/ui/modal'
import { tableActions } from '@/data/table_data'
import { editUser } from '@/slices/table_action_slices'
import { TableDataInterface } from '@/interface/table_data_inreface'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { transformUserData } from 'src/helpers/utils'
import { useAppSelector } from 'src/store'
import { useAppDispatch } from 'src/store'

const UserEdit: NextPage = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const tableData = useAppSelector((state) => (state.tableSlice.tableData))
  const editableFields = ["name", "age", "dateOfBirth", "indianCitizen","email","address"]

  const [userData, setUserData] = useState<any>()
  const [showUpdateSuccess, setShowUpdateSuccess] = useState<boolean>(false)

  useEffect(() => {

    if (router.query.user_id && !userData) {

      const userDetails: TableDataInterface = tableData.filter((data: TableDataInterface) => data.userId == router.query.user_id)[0]

      const transformedUserData = transformUserData(userDetails)
      setUserData(transformedUserData)
    }
  }, [router])



  if (!userData) {
    return <>Loading.....</>
  }


  const handleChange = (e: any) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    })

  }


  const handleEdit = async () => {
    const dob = userData.dateOfBirth.split("/")
    const year = dob[2]
    const day = dob[0]
    const month = dob[1]

    const editedData = {
      userId: userData.userId,
      name: userData.name,
      age: userData.age,
      dateOfBirth: new Date(`${year}-${month}-${day}`),
      indianCitizen: userData.indianCitizen == "NO" ? false : true,
      actions: tableActions,
      email:userData.email,
      address:userData.address
    }
console.log("edited data",editedData)
    dispatch(editUser({ editedData: editedData }))
    setShowUpdateSuccess(true)
    setTimeout(() => {
      router.back()
    }, 500)


  }

  const handleBack=()=>{
    router.back()
  }
  return (

    <div>
      <Modal show={true} >
      <button className='bg-slate-300 p-2 rounded-[5px]' onClick={() => handleBack()}>Back</button>
        <div className={"flex flex-col items-center justify-center"}>
          <p className='text-[16px] text-center font-bold mb-10'>Edit user details</p>
          <div className='space-y-5'>
            {
              Object.entries(userData).map((data: any, index) => {

                const dataKey = data[0]
                const dataValue = data[1]

                return (
                  <>

                    {dataKey !== "actions" && <div className='flex space-x-5'>
                      <p className='font-bold uppercase'>{dataKey}</p>
                      {editableFields.includes(dataKey) ? <input type="text" name={dataKey} defaultValue={userData[dataKey]} className='font-normal border bodrer-black-700 focus' onChange={(e) => handleChange(e)} /> : <p className='font-normal'>{dataValue}</p>}
                    </div>
                    }

                  </>
                )
              })
            }
          </div>
          <button className='bg-green-500 text-white rounded-[5px] p-2 mt-10' onClick={() => handleEdit()}>Confirm</button>
        </div>
      </Modal>
      {
        showUpdateSuccess && <Modal show={true} >
          <p className='font-bold text-center text-20'>Details Updated Succcessfully</p>
        </Modal>
      }
    </div>

  )
}

export default UserEdit;

