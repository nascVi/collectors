import {useRef} from 'react'
import { createUser } from '../fauna/models';
import {useNavigate} from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  if (localStorage.getItem('user')) {
    navigate.push('/')
  }
  const name= useRef()
  const email = useRef()
  const password = useRef()
  const username = useRef()
  const confirm_password = useRef()
  const LoginUser = async (e) => {
    e.preventDefault()
    const body = {
      email: email.current.value,
      name: name.current.value,
      username: username.current.value,
      password: password.current.value
    }
    if (body.name && body.password && body.email && body.username && body.password === confirm_password.current.value) {
      const user = await createUser(body.name, body.email, body.username, body.password)
      if (!user) {
        alert('Email or username has been chosen')
      } else {
        localStorage.setItem('userId', user.id)
        localStorage.setItem('username', user.username)
        localStorage.setItem('email', user.email)
        navigate.push('/')
        alert('Account created sucessfully, signing you in...')
      }
    } else if (!name || !email || !username || !password) {
      alert('You didn\'t pass any value')
    } else {
      alert('Password and confirm password fields must be equal')
    }

    console.log(body)
  }

  return (
    <form className="form-horizontal">
      <div className="form-group">
        <label className="control-label col-sm-4">Name: </label>
        <input ref={name} type="text" className="form-control mx-md-3 col-sm-4" placeholder="Enter Name" />
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4">Email address</label>
        <input ref={email} type="email" className="form-control mx-md-3 col-sm-4" placeholder="Enter email" />
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4">Username: </label>
        <input ref={username} type="text" className="form-control mx-md-3 col-sm-4" placeholder="Enter username" />
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4">Password</label>
        <input ref={password} type="password" className="form-control mx-md-3 col-sm-4"  placeholder="Password" />
      </div>
      <div className="form-group">
        <label className="control-label col-sm-4">Confirm Password</label>
        <input ref={confirm_password} type="password" className="form-control mx-md-3 col-sm-4" placeholder="Password" />
      </div>
      <div className="form-group">
        <div className="col-sm-5"></div>
        <button onClick={LoginUser}  type="submit" className="btn btn-primary col-sm-2">Signup</button>
      </div>
  </form>
  )
}
