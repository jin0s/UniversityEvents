import React, { Component } from 'react';
import { Button } from 'reactstrap';


const Comment = (props) => {
    // const token = localStorage.getItem('token');
    // const img = [GuildSword, Sword, BowArrow, Staff, Shield];

    // const random_img = img =>{
    //     return img[Math.floor(Math.random()*img.length)];
    // }

    const deleteHandler = async() => {
        // if (window.confirm('Are you sure you wish to delete this comment?')){
        //     console.log("Delete confirmed");
        //     let result =  await deleteComment(token, props.id).then(ble => ble) 
        //     console.log('Delete comment response: ', result);
        //     window.location.reload();
        // }
    }

    return (
        <div key={props.id} id={props.id} className="media mb-3">
            <div>
                <div className="media-body p-2 shadow-sm rounded bg-light border">
                    <Button close onClick={deleteHandler}/>
                    <small className="m-1 float-right text-muted">{props.time_created}</small>
                    <h6 className="mt-0 mb-1 text-muted">{props.username + " says:"}</h6>
                    {props.content}
                    <h6 className="mt-0 mb-1 text-muted">{"rating: "}</h6>
                    {props.rating} stars
                </div>
            </div>
        </div>
    );
};

export default (Comment);
