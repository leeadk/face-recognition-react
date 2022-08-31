import React from 'react';
import Clarifai from 'clarifai';

import './FaceRecognition.css'
//metadata.set("authorization", "Key 9bb5beb73f224b00bbde7a8a703cf722");


const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img id='inputimage' alt='' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{
                    top: box.topRow,
                    right: box.rightColumn,
                    bottom: box.bottomRow,
                    left: box.leftColumn,
                }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;