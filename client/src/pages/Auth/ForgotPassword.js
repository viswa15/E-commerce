import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {toast} from 'react-toastify'
import Layout from '../../components/Layout/Layout'
import "../../styles/AuthStyles.css";

const ForgotPassword = () => {
    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault();
        try {
          const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {email, newPassword, answer });
          if (res && res.data.success) {
            toast.success(res.data && res.data.message);
            
            navigate("/login");
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.log(error);
          toast.error("Something Went Wrong");
        }
      }

  return (
    <div>
        <Layout title={'Forgot Password - Ecommerce App'}>
        <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className='title'>RESET PASSWORD</h4>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder='Enter Your Email'
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={newPassword}
              onChange={(e)=>setNewPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder='Enter Your Password'
              required
            />
          </div>  
          <div className="mb-3">
            <input
              type="password"
              value={answer}
              onChange={(e)=>setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder='Enter Your Favourite Sport'
              required
            />
          </div> 
          <button type="submit" className="btn btn-primary">
            RESET
          </button>
        </form>
      </div>
        </Layout>
    </div>
  )
}

export default ForgotPassword