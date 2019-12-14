import React, { Component } from 'react';
import Directory from './Directory'
import { findRenderedComponentWithType } from 'react-dom/test-utils';

interface IProps {
    location: string
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
    return(
        <h1>{this.props.location}</h1>
    )
  }
}

export default Gallery