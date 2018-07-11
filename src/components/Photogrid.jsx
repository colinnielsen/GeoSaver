import React from 'react'
import Map from './Map'

class Photogrid extends React.Component {

    componentDidMount() {
        this.props.getData()
    }

    render() {
        return (
            <div className="photogrid">
                {this.props.renderCards()}
                <Map photos={this.props.photos} />
            </div>
        )
    }


}


export default Photogrid