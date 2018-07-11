import React from 'react'

class Signup extends React.Component {

    handleSubmit(e) {
        e.preventDefault()
        const username = this.refs.username.value
        const password = this.refs.password.value
        this.props.signUp(username, password)
    }

    render() {
        return (
            <div className='signupForm'>
                <h3>Please Sign Up!</h3>
                <form className="ui form" ref="login-form" onSubmit={this.handleSubmit.bind(this)} >
                    <div className="field">
                        <label>Enter username</label>
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

export default Signup