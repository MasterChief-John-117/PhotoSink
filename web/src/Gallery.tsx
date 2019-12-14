import React, { Component } from 'react';
import Directory from './Directory'

interface IProps {
    location: string
}
interface IState {
    directory?: Directory
}

class Gallery extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        directory: undefined,
    }
  }

  componentDidMount() {
    fetch("http://localhost/cache/"+this.props.location+"/index.json")
    .then(result => {
        return result.text();    
    })
    .then(result => {
        let newDir: Directory = JSON.parse(result);
        this.setState({directory: newDir}); 
    });
  }

  render () { 
    return(
        <h1>{this.state.directory?.name != null && this.state.directory?.name != "albums" 
        ? this.state.directory.name 
        : "Gallery"}</h1>
    )
  }
}

export default Gallery