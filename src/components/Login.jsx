import React from 'react'

class Login extends React.Component {

  handleSubmit(e) {
    e.preventDefault()
    const username = this.refs.username.value
    const password = this.refs.password.value

    this.props.login(username, password)
  }

  render() {
    return (
      <div className="inputwrapper">
        <form className="ui form" ref="login-form" onSubmit={this.handleSubmit.bind(this)} >
          <div className="field">
            <label>Enter Username</label>
            <input ref="username" placeholder="username" type="text" className="username" />
          </div>
          <div className="field">
            <label>Enter Password</label>
            <input ref="password" placeholder="password" type="password" className="password" />
          </div>
          <button type="submit" className="ui button">Submit</button>
        </ form >
      </div>
    )
  }

}

export default Login
