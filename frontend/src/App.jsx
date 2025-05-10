import React, {  useEffect, useState } from 'react'
import RegisterForm from './components/RegisterForm'
import RegisterInfo from './components/RegisterInfo'
import axios from 'axios'
import {BrowserRouter , Routes, Route, Navigate} from 'react-router-dom'
import RegisterNew from './components/RegisterNew'
import { Toaster } from 'react-hot-toast';

function App() {
  const[register,setRegister]=useState([ ])
  const [updateReg,setUpdateReg] = useState(null)

  const fetchdata =  async () => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/events`)
      setRegister(response.data)
    }catch(error){
     console.error('fetch error', error);
    }
  }

  useEffect(() => {
    fetchdata()
  },[])

  const addData = async (newData) => {
    try{
       await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/events`, newData)
      fetchdata()
    }catch(error){
     console.error("Insert error",error);
    }
  }


  // const dataEdit =async (id) => {
  //   if(window.confirm('Are You Sure Edit')){
  //     const response = register.find((x) => x._id === id)
  //     setUpdateReg(response)
  //     navigate('/');

  //   }
  // }

  const updateNew = async (updateForm) => {
    try{
       await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/events/${updateForm._id}`,updateForm)
      setUpdateReg(null)
      fetchdata()
    }catch(error){
      console.log('update error',error);
    }
  }

  const deleteData = async (id) => {
    if(window.confirm('Are you Sure Delete')){
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/events/${id}`)
      setRegister((pre) => pre.filter((del) => del._id !== id))
    }
  
  }

  return (
    <>
<BrowserRouter>
<Toaster position="top-center"  reverseOrder={false} />
<Routes>
  <Route path='/create-event' element={<RegisterForm addData={addData}  updateReg={updateReg} updateNew={updateNew}/>}/>
  <Route path="*" element={<Navigate to="/create-event" replace />} />
  <Route path='/view' element={<RegisterInfo register={register} edit={setUpdateReg} deleteData={deleteData}/>}/>
  <Route path='/new' element={<RegisterNew />}/>
</Routes>
</BrowserRouter>
    </>
  )
}

export default App