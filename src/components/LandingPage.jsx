import React from 'react'
import logo from '../assets/logo.png'
const LandingPage = (props) => {
    return (
        <div className="landingpage">
            <h1>Welcome to GeoSaver!</h1>
            <h3>Save your photos based on the location you took them.</h3>
            <h4>Don't lose track of that awesome photo spot!</h4>
            <img src={logo} alt="logo" />
            <button className="ui button " onClick={props.signUp}>Sign Up!</button>
        </div>
    )
}

export default LandingPage