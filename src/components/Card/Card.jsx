import React from 'react'
import './Card.css';
import {BiDotsHorizontalRounded} from "react-icons/bi"

const Card = ({ id, title, tag, img, status, remove }) => {
    return (
        <div className="cardContainer">
            <div className="Cardcontainer2" style={{ fontWeight: 200, display: "flex", justifyContent: "space-between" }} >
                <p>{title}</p>
                {!remove ? (
                    <p></p>
                ) : (
                    <>
                        <div className="image">
                            <img src={img} alt="Error" />
                        </div>
                        <div className="status" style={{ background: status }}></div>
                    </>
                )}

            </div>

<div className="tags">
                <div className="tag">
                    <BiDotsHorizontalRounded />
                </div>
                {tag?.map((element, index) => {
                    return (
                        <div key={index} className="tag">
                            <span>•</span> {element}
                        </div>
                    );
                })}
            </div>
        </div>

    )
}

export default Card;