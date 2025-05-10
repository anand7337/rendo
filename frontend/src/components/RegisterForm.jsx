import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import './RegisterForm.css'
import Select from "react-select";


 const eventTypeOptions = ['Workshop', 'Seminar', 'Conference'];
 const participantOptions = ['John', 'Jane', 'Doe', 'Alice', 'Bob'];

function RegisterForm({addData,updateReg,updateNew}) {

    const[formState,setFormState] = useState({
      name:'',
      email:'',
      eventtype:'',
      participants: [],
      eventdate:'',
      description:''
     })
  const [loading, setLoading] = useState(false);

// const options = [
//     { value: "John", label: "John" },
//     { value: "Jane", label: "Jane" },
//     { value: "Doe", label: "Doe" },
//     { value: "Alice", label: "Alice" },
//      { value: "Bob", label: "Bob" },
//   ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  // const handleChange = (selected) => {
  //   setSelectedOptions(selected);
  // };  

const options = [
        { value: "John", label: "John" },
    { value: "Jane", label: "Jane" },
    { value: "Doe", label: "Doe" },
    { value: "Alice", label: "Alice" },
     { value: "Bob", label: "Bob" },
  ];

  // const handleChange = (selected) => {
  //   setSelectedOptions(selected ? selected.map((option) => option.value) : []);
  // };

    // const hadelChange = (e) => {
    //   const { name, value, type, checked } = e.target;
    //   if (type === "checkbox") {
    //     setFormState((prev) => {
    //       const participants = prev.participants || [];
    //       if (checked) {
    //         return { ...prev, participants: [...participants, value] };
    //       } else {
    //         return { ...prev, participants: participants.filter((p) => p !== value) };
    //       }
    //     });
    //   } else {
    //     setFormState((prev) => ({
    //       ...prev,
    //       [name]: value,
    //     }));
    //   }
    // };
    
const hadelChange = (e) => {
  // if (!e.target) return;
  // const { name, value, type } = e.target;
  // if (type === "select-multiple") {
  //   const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
  //   setFormState((prev) => ({
  //     ...prev,
  //     [name]: selectedOptions,
  //   }));
  // } else {
  //   setFormState((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // }
let val = e.target.value
    setFormState(pre => ({...pre, [e.target.name]:val})) 
};


      
const hadelChangee = (selectedOptions) => {
   const selectedValues = selectedOptions.map(option => option.value);
    setFormState(prevState => ({
      ...prevState,
      participants: selectedValues,
    }));
};

  const currentDate = new Date().toISOString().split('T')[0];



useEffect(() => {
    if(updateReg){
        setFormState({
            name:updateReg.name,
            email:updateReg.email,
            eventtype:updateReg.eventtype,
            participants:updateReg.participants,
            eventdate:updateReg.eventdate,
            description:updateReg.description,
        })
    }else{
        setFormState({name:'', email:'', eventtype:'', participants:'', eventdate:'', description:''})
    }
},[updateReg])

const formSubmit = async (e) =>{
    e.preventDefault()
   if(updateReg){
  const update = {...updateReg,...formState}
   updateNew(update)
    toast.success('Event Updated successfully!');
   } else{
    addData(formState)
    toast.success('Event created successfully!');
   }
   setLoading(true);
    try {
      // Simulate a form submission with a timeout or actual API call
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Replace this with your API call
      console.log('Form submitted');
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setLoading(false);
    }
   setFormState({name:'', email:'', eventtype:'', participants:'', eventdate:'', description:''})
}  
  return (
    <>
      {/* <h3>{updateReg ? 'Update Form' : 'Add Form'}</h3>
      <form onSubmit={formSubmit}>
  <div className="form-group">
    <input type="text" className="form-control"  name='name'  value={formState.name}  placeholder="Enter Name..."  onChange={hadelChange}/>
  </div>

  <div className="form-group">
    <input type="email" className="form-control"  name='email' value={formState.email} placeholder="Enter Email.."  onChange={hadelChange}/>
  </div>
  <div className="form-group">
    <select name="eventtype" className="form-control" onChange={hadelChange} value={formState.eventtype} >
         <option value="">Select one</option>
            {eventTypeOptions.map((option) => (
           <option key={option} value={option}>
            {option}
              </option>
            ))}
    </select>
  </div>
  
  <div className="form-group">
  <label className="form-label">Participants:</label>
  <div className="form-check form-check-inline">
    {participantOptions.map((participant, index) => (
      <div key={index}>
        <input
          className="form-check-input"
          type="checkbox"
          name="participants"
          value={participant} 
          checked={formState.participants?.includes(participant)} 
          onChange={hadelChange}
        />
        <label className="form-check-label">
          {participant}
        </label>
      </div>
    ))}
  </div>
</div>


  <div className="form-group">
    <input type="date" className="form-control" name='eventdate'  value={formState.eventdate}    onChange={hadelChange}/>
  </div>
  <div className="form-group">
    <textarea name="description" className="form-control" value={formState.description}  onChange={hadelChange} placeholder='Enter....'></textarea>
  </div>
  <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? 'Submitting...' : updateReg ? 'Update Submit' : 'Add Submit'}
      </button>
</form> */}

 <div className="form-container">
    <div className="form-header">{updateReg ? 'Update  Event' : 'Create New Event'}</div>
    <form onSubmit={formSubmit}>
      <div className='mb-4 mt-3'>
        <label  className="form-label">Event Name</label>
        <input type="text" className="form-control"  name='name'  value={formState.name}  placeholder="Enter Name"  onChange={hadelChange} />
      </div>

      <div className='mb-4'>
        <label className="form-label">Email</label>
        <input type="email" className="form-control"  name='email' value={formState.email} placeholder="Enter Email"  onChange={hadelChange} />
      </div>

      <div className='mb-4'>
        <label  className="form-label">Event Type</label>
        <select className="form-select" name="eventtype"  onChange={hadelChange} value={formState.eventtype}>
         <option value="">Select one</option>
            {eventTypeOptions.map((option) => (
           <option key={option} value={option}>
            {option}
              </option>
            ))}
    </select>
      </div>

      {/* <div className="form-group mb-3">
  <label className="form-label">Participants:</label>
  <div className="form-check form-check-inline">
    {participantOptions.map((participant, index) => (
      <div key={index}>
        <input
          className="form-check-input"
          type="checkbox"
          name="participants"
          value={participant} 
          checked={formState.participants?.includes(participant)} 
          onChange={hadelChange}
        />
        <label className="form-check-label">
          {participant}
        </label>
      </div>
    ))}
  </div>
</div> */}



<div className='mb-4'>
      <label  className="form-label">Select Participants</label>
      <Select
        options={options}
        name="participants"
        isMulti
        onChange={hadelChangee}
     value={options.filter(option => formState.participants.includes(option.value))}  // Filter options based on the selected values
        placeholder="Choose participants"
      />
    </div>


      <div className='mb-4'>
        <label className="form-label">Event Date</label>
        <input type="date" className="form-control" name='eventdate' min={currentDate}   value={formState.eventdate}    onChange={hadelChange}/>
      </div>

      <div className='mb-4'>
        <label  className="form-label">Description</label>
        <textarea name="description" className="form-control" value={formState.description}  onChange={hadelChange}rows="3" placeholder="Add a description (optional)"></textarea>
      </div>
        <button
        type="submit"
        className="btn btn-primary w-100"
        disabled={loading}
      >
        {loading ? 'Submitting...' : updateReg ? 'Update Event' : 'Create Event'}
      </button>
      {/* <button type="submit" className="btn btn-primary w-100">Create Event</button> */}
    </form>
  </div>


    </>
  )
}

export default RegisterForm