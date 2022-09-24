import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onImageSubmit, isSignedIn }) => {
    return (
        <div>
            <p className='f3'>
                {'This Magic Brain will Detected Faces in your Pictures'}
            </p>
            <div className='center  '>
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center ma2' type='text' onChange={onInputChange} />
                    <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple ma2'
                        onClick={onImageSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;