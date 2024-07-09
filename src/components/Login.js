
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {useState,useEffect} from 'react'
import {useForm} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {userLogin} from '../redux-store/userSlice'


function Login({show,handleClose}) {
    let { register, handleSubmit, formState: {errors} } = useForm()
    let {userObj, isSuccess, invalidLoginMessage }= useSelector(state=>state.user)
    let dispatch = useDispatch()
    let history = useHistory()
    let [userCredentials,setUserCredentials] = useState({
        userType:'',
        email:'',
        password:''
    })
   
    function onLoginFormSubmit(userCredentialsObj)
    {
        console.log(userCredentialsObj)
      setUserCredentials(userCredentialsObj)
        dispatch(userLogin(userCredentialsObj))
    }

   console.log("show",show)
 
  useEffect(()=>{
    if(isSuccess && userCredentials.userType === 'user'){
        alert('welcome user')
       handleClose();
       history.push(`/userdashboard/${userObj.name}`)
    }
    if(isSuccess && userCredentials.userType === 'admin'){
        alert('welcome admin')
       handleClose();
       history.push(`/admindashboard/${userObj.name}`)
    }
 },[isSuccess,userCredentials])
    return(
        <div>
          
            
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Login</Modal.Title>
          {invalidLoginMessage && <h2 className="text-center text-danger"> {invalidLoginMessage} </h2>} 
          <button
          type="submit"
          className="btn-close"
          onClick={handleClose}
        ></button>
        </Modal.Header>
        <Modal.Body>
        <form className="mx-auto w-100" onSubmit={handleSubmit(onLoginFormSubmit)}>
             {/* user type */}
             <div className="form-check form-check-inline">
             <input className="form-check-input" type="radio" name="userType" id="user" value="user" {...register("userType",{required:true})} />
                <label className="form-check-label" for="user">User</label>
               </div>
               <div class="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="userType" id="admin" value="admin" {...register("userType",{required:true})} />
                   <label className="form-check-label" for="admin">Admin</label>
                   </div>
               {/* username */}
            <div className="form-floating mb-3">
  <input type="text" id="email" className="form-control w-100" placeholder="Email" 
  {...register("email",{required:true})} />
  <label for="email">Email</label>
  </div>
 {errors.email?.type==='required' && <p className="alert alert-danger">*username required</p>}
           {/* password */}
           <div className="form-floating mb-3">
  <input type="password" id="password" className="form-control w-100"  placeholder="Password" 
  {...register("password",{required:true})} />
  <label for="password">Password</label>
  </div>
 {errors.password?.type==='required' && <p className="alert alert-danger">*password required</p>}
 <Button variant="primary" type="submit">
            Sign In
          </Button>
 </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onclick = {()=> {history.push('/register'); 
          handleClose();}}>
           sign Up
          </Button>
          
        </Modal.Footer>
      </Modal>
    </div>    
    )
}

export default Login
