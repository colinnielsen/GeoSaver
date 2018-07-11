import React from 'react'
import { Header, Segment } from 'semantic-ui-react'

const PageHeader = (props) => (
    <Segment clearing>
        <Header as='h3' onClick={props.dashboardRedirect} floated='right' id="tagline">
            Save your photos!
            {props.loggedIn ? <button className="ui button" onClick={props.logout}>Logout</button> : <button className="ui button" onClick={props.loginButton}>Login</button>}
        </Header>
        <Header onClick={props.landingPageRedirect} as='h2' floated='left' id="geosaver">GeoSaver</Header>
    </Segment>
)

export default PageHeader
