import React from 'react';
import Image from '../Cards/Image'
import './ImageFrame.css'

interface IProps {
    images: string[],
}
interface IState {
}

const ImageFrame: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="imageFrame">
        {
            props.images.map((image) => {
                return <Image name={image}/>
            })
        }
        </div>
    )
}

export default ImageFrame;