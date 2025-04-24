//since we have function that will be handled by the user
'use client';

import { useRef } from 'react';

import classes from './image-picker.module.css'

export default function ({label, name}){
    
    //a react state that makes a reference for the element tot be triggered when it is mentioned in other function 
    const imageInput = useRef();

    function handlePickClick(){
        //triggering the input element
        imageInput.current.click()
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <input
                    className={classes.input}
                    type='file'
                    id="image"
                    accept='image/png, image/jpeg' 
                    name='image'
                    // ref => adding a ref to access the element in another place
                    ref={imageInput}
                    ></input>

                <button className={classes.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}