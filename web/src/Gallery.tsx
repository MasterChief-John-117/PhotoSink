import React, { Component } from 'react';
import Directory from './Directory'
import AlbumFrame from './Frames/AlbumFrame';
import ImageFrame from './Frames/ImageFrame';
import './Gallery.css'

interface IProps {
    directory: Directory,
    path: string
}
interface IState {
}

class Gallery extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        directory: undefined,
    }
  }

  render () { 
    let {directory, path} = this.props;
    if (directory.folders == null || directory.images == null || directory.name == null) {
        return (
            <p></p>
        )
    }  
    else {
        return(
            <div className="gallery">
                <h1>{this.props.directory.name}</h1>
                <AlbumFrame folders={directory.folders}/>
                <ImageFrame images={directory.images}/>
            </div>
        )
    }
  }
}

export default Gallery