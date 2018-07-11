import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
const isValidCoordinates = require('is-valid-coordinates')

export default class SimpleExample extends Component {

    mapThroughPhotos(photos) {
        if (photos.length > 0) {
            return photos.map(photo => this.drawMarker(photo))
        }
    }

    drawMarker(photo) {
        var incomingCoords = photo.coords.split(',').map(coord => typeof parseFloat(coord) !== 'number')
        if (incomingCoords[0] || incomingCoords[1]) {
            alert("please use valid coordinate format")
        } else {
            let position = photo.coords.split(',').map(coord => {
                switch (coord.split('°')[1].trim().toLowerCase()) {
                    case "n" || "e":
                        return parseFloat(coord.split('°')[0].trim())
                    case "w" || "s":
                        return parseFloat("-" + coord.split('°')[0].trim())
                }
            })
            if (isValidCoordinates(position[1], position[0])) {
                return (
                    <Marker key={photo.id} position={position}>
                        <Popup>
                            Photo: {photo.picName}
                        </Popup>
                    </Marker>
                )
            }
            else {
                alert("please put coordinates in proper format.")
            }
        }

    }

    render() {
        const center = [37.0902, -95.7129]
        return (
            <Map center={center} zoom={4}>
                <TileLayer
                    attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {this.mapThroughPhotos(this.props.photos)}
            </Map>
        )
    }
}