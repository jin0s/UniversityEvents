import React, { Component } from 'react';
import { Button } from 'reactstrap';


const Comment = (props) => {
    // const token = localStorage.getItem('token');
    // const img = [GuildSword, Sword, BowArrow, Staff, Shield];

    // const random_img = img =>{
    //     return img[Math.floor(Math.random()*img.length)];
    // }

    return (
        <div key={props.id} id={props.id} className="media mb-3">
            <div className="media-body p-2 shadow-sm rounded bg-light border">
                <small className="m-1 float-right text-muted">{props.time_created}</small>
                <h6 className="mt-0 mb-1 text-muted">{props.username + " says:"}</h6>
                {props.content}
                <h6 className="mt-0 mb-1 text-muted">Rating: {props.rating} stars </h6>
                
            </div>
        </div>
    );
};

export default (Comment);
