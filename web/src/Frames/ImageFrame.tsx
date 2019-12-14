import React from 'react';
import Image from '../Cards/Image'
import './Frame.css'

interface IProps {
    images: string[],
    path: string
}
interface IState {
}

const ImageFrame: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="frame imageFrame">
        {
            props.images.map((image) => {
                return <Image name={image} path={props.path}/>
            })
        }
        </div>
    )
}

export default ImageFrame;