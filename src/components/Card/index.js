import React from 'react'
import './style.css'


const Card = props => (
    <div className="card-wrapper" onClick={() => props.clickCount(props.id)}>
        <img src={props.image} alt={props.id}></img>

    </div>
)


// class Card extends React.Component{

// render(){
//     return (
//         <div className="card-wrapper" onClick={() => this.props.clickCount(this.props.id)}>
//         <img src={this.props.image} alt={this.props.id}></img>

//     </div>
//     )
// }

// }
export default Card