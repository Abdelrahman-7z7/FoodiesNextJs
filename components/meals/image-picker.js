//since we have function that will be handled by the user
'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import classes from './image-picker.module.css'

export default function ({label, name}){

    const [pickedImage, setPickedImage] = useState();
    
    //a react state that makes a reference for the element tot be triggered when it is mentioned in other function 
    const imageInput = useRef();

    function handlePickClick(){
        //triggering the input element
        imageInput.current.click()
    }

    function handleImageChange(event){
        const file = event.target.files[0];

        //in case there are file uploaded
        if(!file){
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader(); //allows us to read a file or blob objects for example => <input>

        fileReader.onload = () => {
            setPickedImage(fileReader.result); //stores the image for later display when the file completely uploaded
        }

        fileReader.readAsDataURL(file) //tells the reader to read the file as a data URL
    }

    return (
        <div className={classes.picker}>
            <label htmlFor="image">{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && (
                        <Image 
                            src={pickedImage} 
                            alt="The image selected by the user" 
                            fill>
                        </Image>
                    )}
                </div>
                <input
                    className={classes.input}
                    type='file'
                    id="image"
                    accept='image/png, image/jpeg' 
                    name='image'
                    // ref => adding a ref to access the element in another place
                    ref={imageInput}
                    onChange={handleImageChange}
                    //if you want multiple files you can add the multiple prop
                    //multiple 
                    required
                    ></input>

                <button className={classes.button} type='button' onClick={handlePickClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}