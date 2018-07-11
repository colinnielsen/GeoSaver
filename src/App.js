import React, { Component } from 'react';
import './App.css';
import Login from './components/Login.jsx'
import DashBoard from './components/DashBoard.jsx'
import PageHeader from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Signup from './components/Signup'


class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.signUp = this.signUp.bind(this)
  }

  componentDidMount() {
    this.checkLogin()
  }

  login(username, password) {
    const url = "http://localhost:3000/"
    const data = { username, password }

    fetch(url + "auth/login", {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          window.localStorage.token = data.token
          this.setState({
            loggedIn: true
          })
        } else {
          alert(data.error)
        }
      })
  }

  checkLogin() {
    const token = window.localStorage.token
    if (token) {
      this.setState({ loggedIn: true })
    }
  }

  loginButton() {
    window.location = '/login'
  }

  signUpRedirect() {
    window.location = '/signup'
  }

  landingPageRedirect() {
    window.location = '/'
  }

  dashboardRedirect() {
    window.location = '/dashboard'
  }

  logout() {
    this.setState({ loggedIn: false })
    delete window.localStorage.token
  }


  signUp(username, password) {
    let url = "http://localhost:3000/"
    let data = { username, password }
    fetch(url + "auth/signup", {
      method: 'POST',
      headers: new Headers({
        'Content-type': 'application/json'
      }),
      body: JSON.stringify(data)
    })
      .then(() => this.login(username, password))
  }

  goToSignup = () => {
    if (this.state.goToSignup) {
      return <Redirect to="/signup" />
    }
  }


  render() {
    return (
      <div className="App">
        <PageHeader loginButton={this.loginButton} loggedIn={this.state.loggedIn} logout={this.logout} dashboardRedirect={this.dashboardRedirect} landingPageRedirect={this.landingPageRedirect} />
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={() => <LandingPage signUp={this.signUpRedirect} />} />
            <Route path="/signup" render={() => (this.state.loggedIn ? (<Redirect to="/dashboard" />) : (<Signup signUp={this.signUp} />))} />
            <Route path="/login" render={() => (this.state.loggedIn ? (<Redirect to="/dashboard" />) : (<Login login={this.login} />))} />
            <Route path="/dashboard" render={() => (!this.state.loggedIn ? (<Redirect to="/login" />) : (<DashBoard redirectState={this.redirectState} />))} />
          </Switch>
        </BrowserRouter>
        <Footer />
      </div>
    );
  }
}

export default App;
