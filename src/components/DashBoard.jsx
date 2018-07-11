import React from 'react';
import Photo from './Photo'
import AddPhotoForm from './AddPhotoForm'
import Photogrid from './Photogrid'


class DashBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            logout: false,
            photos: [],
            switchToAdd: false
        }
        this.switchToAdd = this.switchToAdd.bind(this)
        this.switchToDash = this.switchToDash.bind(this)
        this.renderCards = this.renderCards.bind(this)
        this.getData = this.getData.bind(this)
    }

    getData() {
        const token = window.localStorage.token
        const url = "https://geosaverbackend.herokuapp.com/"
        fetch(url + "users/dashboard", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(resJSON => this.setState({ photos: resJSON.data }))
            .catch(data => console.log(data.error))

    }

    renderCards() {
        const photos = this.state.photos
        if (photos.length > 0) {
            return photos.map(photo => {
                return <Photo getData={this.getData} picUrl={photo.picUrl} photoId={photo.id} key={photo.id} picName={photo.picName} coords={photo.coords} />
            })
        }
    }

    switchToAdd() {
        this.setState({ switchToAdd: true })
    }

    switchToDash() {
        this.setState({ switchToAdd: false })
    }

    checkPhotos() {
        if (this.state.photos.length === 0) {
            return <h2>no photos yet... add a photo to get started</h2>
        }
    }

    render() {
        return (
            <div className="dashboard ui">
                {this.checkPhotos()}
                {this.state.switchToAdd ? <AddPhotoForm switchToDash={this.switchToDash} /> :
                    <Photogrid photos={this.state.photos} renderCards={this.renderCards} getData={this.getData} />
                }
                {!this.state.switchToAdd && <button className="ui button" onClick={this.switchToAdd} > Add A photo!</button>}
            </div >
        );
    }
}

export default DashBoard;