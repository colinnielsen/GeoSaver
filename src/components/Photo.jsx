import React from 'react'
import { Card, Button, Modal, Form } from 'semantic-ui-react'

class Photo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picName: props.picName,
            picUrl: props.picUrl,
            coords: props.coords,
            modalOpen: false
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
        let id = this.props.photoId
        const data = { picName, picUrl, coords }
        const token = window.localStorage.token
        const url = "https://geosaverbackend.herokuapp.com/"
        fetch(url + 'users/updatePhoto/' + id, {
            method: 'PUT',
            headers: new Headers({
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }),
            body: JSON.stringify(data)
        })
            .then(() => this.handleClose())
            .then(() => this.props.getData())
    }


    deletePhoto() {
        var id = this.props.photoId
        var token = window.localStorage.token
        const url = "https://geosaverbackend.herokuapp.com/"
        fetch(url + 'users/' + id, {
            method: 'delete',
            headers: new Headers({
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            })
        })
            .then(response => response.json())
            .then(response => this.props.getData(response))
    }

    handleOpen = () => this.setState({ modalOpen: true })

    handleClose = () => {
        this.setState({ modalOpen: false })
    }


    render() {
        return (
            <div className="cardHolder">
                <Card
                    image={this.props.picUrl}
                    header={this.props.picName}
                    meta='by you'
                    description={this.props.coords}
                    extra={(< a >
                        <Button circular icon='x' onClick={this.deletePhoto.bind(this)} />
                        <Modal open={this.state.modalOpen} trigger={<Button circular icon='edit' onClick={this.handleOpen} />}>
                            <Modal.Header>Edit your photo</Modal.Header>
                            <Modal.Content >
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Field>
                                        <label>Photo Name</label>
                                        <input name="picName" type="text" value={this.state.picName} onChange={this.handleChange} placeholder={this.props.picName} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Photo Url</label>
                                        <input name="picUrl" type="url" value={this.state.picUrl} onChange={this.handleChange} placeholder={this.props.picUrl} />
                                    </Form.Field>
                                    <Form.Field>
                                        <label>Coordinates</label>
                                        <input name="coords" className="coords" type="text" required pattern="\d.*[ewEW]$" value={this.state.coords} onChange={this.handleChange} />
                                        <div className="coordError">Use proper coordinate format - example (40.0150° N, 105.2705° W)</div>
                                    </Form.Field>
                                    <Button type='submit' value="Submit">Submit</Button>
                                    <Button value='close' onClick={this.handleClose}>Close</Button>
                                </Form>
                            </Modal.Content>
                        </Modal>
                    </ a >)}
                />
            </div>
        )
    }
}
export default Photo