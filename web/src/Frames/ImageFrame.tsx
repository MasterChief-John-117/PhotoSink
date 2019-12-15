import React from 'react';
import Image from '../Cards/Image'
import './Frame.css'

interface IProps {
    images: string[],
    path: string
}
interface IState {
}

class ImageFrame extends React.Component<IProps, IState> {
    
    render () {
        let {images, path} = this.props;
        images = images.sort();
        return ( 
            <div className="frame imageFrame">
            {
                images.map((image) => {
                    return <Image name={image} path={path}/>
                })
            }
            </div>
        )
    }
}

export default ImageFrame;