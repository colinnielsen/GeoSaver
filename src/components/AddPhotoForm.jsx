import React from 'react'
import { Button, Form } from 'semantic-ui-react'

class AddPhotoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picName: '',
            picUrl: '',
            coords: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit() {
        let picName = this.state.picName
        let picUrl = this.state.picUrl
        let coords = this.state.coords
        const data = { picName, picUrl, coords }
        const token = window.localStorage.token
        fetch('http://localhost:3000/users/addPhoto', {
            method: 'POST',
            headers: new Headers({
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }),
            body: JSON.stringify(data)
        }).then(() => this.props.switchToDash())
    }


    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Form.Field>
                    <label>Photo Name</label>
                    <input name="picName" type="text" value={this.state.value} onChange={this.handleChange} required />
                </Form.Field>
                <Form.Field>
                    <label>Photo Url</label>
                    <input name="picUrl" type="text" value={this.state.value} onChange={this.handleChange} required />
                </Form.Field>
                <Form.Field>
                    <label>Coordinates</label>
                    <input name="coords" type="text" value={this.state.value} onChange={this.handleChange} required />
                </Form.Field>
                <Button type='submit' value="Submit">Submit</Button>
            </Form>
        )
    }
}

export default AddPhotoForm
