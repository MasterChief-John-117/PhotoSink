import React from 'react';
import BASE_URL from './Constants';
import './ImageViewer.css';
import Directory from './Directory';

interface IProps {
  location: string,
  imageName: string,
  directory: Directory,
}
interface IState {
}


class ImageViewer extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
            this.state = {
        }
    }    

    render () {
        let {location, imageName, directory} = this.props;
        imageName = decodeURI(imageName).substring(0, decodeURI(imageName).lastIndexOf("."))
        return (
            <div className="imageViewer">
                <h1>{imageName}</h1>
                <a href={BASE_URL+"albums/"+location}><img src={BASE_URL+"cache/"+location+".med.jpg"} alt={imageName} /></a>
                {directory.images != null ? (<p>{directory.images.length} images in folder</p>) : null}
            </div>
        )
    }
}

export default ImageViewer;