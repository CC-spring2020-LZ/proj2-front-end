import React from 'react'
import './Card.css'

function Card(props){
    return (
        <div className={props.classList + "card myCard"} style={{width: "18rem"}}>
            <img src={props.img} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
            </div>
        </div>
    )
}

export default Card