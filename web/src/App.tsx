import React, { Component } from 'react';
import Gallery from './Gallery'
import './App.css';

interface IProps {
}
interface IState {
  location: string,
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      location: window.location.hash.substring(window.location.hash.indexOf("/")+1),
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => { 
      this.setState({location: window.location.hash.substring(window.location.hash.indexOf("/")+1)});
      console.log(this.state.location);
    });
  }

  render () {
      return (
      <div className="App">
        <Gallery location={this.state.location}/>
      </div>
    );
  }
}

export default App;
