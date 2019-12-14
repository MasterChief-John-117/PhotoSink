import React, { Component } from 'react';
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
      location: window.location.hash,
    }
  }

  componentDidMount() {
    window.addEventListener("hashchange", () => { 
      this.setState({location: window.location.hash});
    });
  }

  render () {
      return (
      <div className="App">
        <h1>{this.state.location}</h1>
      </div>
    );
  }
}

export default App;
