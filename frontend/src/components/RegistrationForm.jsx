import React, { Component } from 'react'
import './RegistrationForm.css'

export class RegistrationForm extends Component {

    useSate = {
        username: '',
        password: '',
        email: '',
        phone: '',
        address: ''
    }
  render() {
    return (
      <div className='registration-form-container'>
      <form className='registration-form'>
            <input type="text" placeholder="username" />
            <input type="password" placeholder="password" />
            <input type="email" placeholder="email" />
            <button>Register</button>
        </form>
        </div>
    )
  }
}

export default RegistrationForm