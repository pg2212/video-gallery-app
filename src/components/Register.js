import React, {useState} from 'react'
import axios from 'axios'
import {useForm} from 'react-hook-form'
import {useHistory} from 'react-router-dom' 


function Register() {
  let {register, handleSubmit, formState:{errors}} = useForm()

  let [profilePic,setProfilePic] = useState(null)
  const profilePicSelect = (e)=>{ 
    setProfilePic(e.target.files[0])
  }

  let history = useHistory()

  const onRegisterSubmit = async(userObj)=>{
   let formData = new FormData()
    formData.append('photo', profilePic,profilePic.name)
    formData.append('userObj', JSON.stringify(userObj))
    let response = await axios.post('/users/register', formData)
    console.log(response)
    let payload = response.data
    if(payload.message === 'user created'){
      alert('user registered successfully')
      history.push('/login')
    }
    else{
      alert('username is already taken')
    }
  }
    return (
        <div className="container-fluid text-light ">
          
            <form className=" col-8 col-md-6 mx-auto mt-5" onSubmit={handleSubmit(onRegisterSubmit)}> 
          
            <label htmlFor="name">Enter Name </label>
                <input type="text" className="form-control  mb-3" id="name"  {...register("name", {required:true})}/>
                
              
            <div className=" mb-3">
            <label for="email">Enter Email</label>  
  <input type="email" className="form-control " id="email"    {...register("email", {required:true})}/>
  
</div>
{errors.email?.type==='required' && <p className="alert alert-danger">*username required</p>}
<div className=" mb-3">
<label for="phoenumber">Enter Phone Number</label>
                <input type="text" className="form-control"  id="phonenumber"  {...register("phonenumber", {required:true})} />
               
              </div>
<div class="mb-3">
<label for="password">Create Password</label>
  <input type="password" className="form-control "  id="pasword"   {...register("password", {required:true})} />
  
</div>
<div class="mb-3">
  <input type="file" className="form-control " name="photo"  id="photo" onChange={profilePicSelect} />
  <label for="photo"></label>
</div>
<button className="btn btn-success mt-3 mb-5 w-50 d-block mx-auto">Sign Up</button>
</form>

        </div>
    )
}

export default Register
