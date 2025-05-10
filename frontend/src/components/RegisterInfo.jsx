import React from 'react'
import { useNavigate } from 'react-router-dom';


function RegisterInfo({register,edit,deleteData}) {
  // const navigate = useNavigate(); 
  // const edit = (id) => {
  //   if (window.confirm('Are You Sure You Want to Edit?')) {
  //     navigate(`/edit/${id}`); 
  //   }
  // };
  const navigate = useNavigate();

  const dataEdit =async (id) => {
    if(window.confirm('Are You Sure Edit')){
      const response = register.find((x) => x._id === id)
      edit(response)
      navigate('/');

    }
  }
  return (
    <>
    <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">NAME</th>
      <th scope="col">Email</th>
      <th scope="col">Event Type</th>
      <th scope="col">Participants</th>
      <th scope="col">Event Date</th>
      <th scope="col">Description</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>
    {register.map((items,index) => {
        return (
<tr key={index}>
      <th scope="row">{index + 1}</th>
      <td>{items.name}</td>
      <td>{items.email}</td>
      <td>{items.eventtype}</td>
      <td>
  {items.participants.map((participant, index) => (
    <span key={index}>
      {participant}
      {index < items.participants.length - 1 && ","}
    </span>
  ))}
   </td>
      <td>{items.eventdate}</td>
      <td>{items.description}</td>
      <td><button type='button' onClick={() => {dataEdit(items._id)}}>Edit</button></td>
      <td><button type='button' onClick={() => {deleteData(items._id)}}>Delete</button></td>
    </tr>
        )
    })}
  
   
  </tbody>
</table>
    </>
  )
}

export default RegisterInfo