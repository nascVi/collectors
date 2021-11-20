import {useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import {loginUser} from '../fauna/models'

export default function SignIn() {
  let navigate = useNavigate()
  if (localStorage.getItem('userId')) {
  navigate.push('/') 
  }
  const email = useRef('')
  const password = useRef('')

  const LoginUser = async (e) => {
    e.preventDefault()
    const body = {
      email: email.current.value,
      password: password.current.value
    }
    // Handle login logic
    if (!body.email || !body.password) {
      alert('You need to input an email and password')
    } else {
      const user = await loginUser(body.email, body.password)
      console.log(user)
      if (user) {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)
        navigate.push('/')
      } else {
        alert('Invalid email or password')
      }
    }
  }
  return (
    <form className="form-horizontal">
    <div className="form-group">
      <label className="control-label col-sm-4">Email address: </label>
      <input ref={email} type="email" className="form-control mx-md-3 col-sm-4" placeholder="Enter email" />
    </div>
    <div className="form-group">
      <label className="control-label col-sm-4">Password: </label>
      <input ref={password} type="password" className="form-control mx-md-3 col-sm-4" placeholder="Password" />
    </div>
    <div className="form-group">
        <div className="col-sm-5"></div>
        <button onClick={LoginUser}  type="submit" className="btn btn-primary col-sm-2">Signin</button>
      </div>
  </form>
  )
}
