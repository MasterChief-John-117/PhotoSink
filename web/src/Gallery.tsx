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
    }
  }

  getPrevDir(): string {
    let dir = window.location.href;
    if (dir.endsWith('/')) {
        dir = dir.substring(0, dir.lastIndexOf('/'));
    }
    dir = dir.substring(0, dir.lastIndexOf('/'));
    if (dir.indexOf("#") === -1) {
        dir += "#/";
    }
    if(!dir.endsWith("/")) {
        dir += "/";
    }
    return dir;
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
                <h1><a href={this.getPrevDir()}>{this.props.directory.name}</a></h1>
                <AlbumFrame folders={directory.folders} path={path}/>
                <ImageFrame images={directory.images} path={path}/>
            </div>
        )
    }
  }
}

export default Gallery