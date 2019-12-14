import React, { Component } from 'react';
import Gallery from './Gallery'
import './App.css';
import Directory from './Directory';

interface IProps {
}
interface IState {
  location: string,
  directory: Directory,
}

class App extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      location: window.location.hash.substring(window.location.hash.indexOf("/")+1),
      directory: JSON.parse("{}")
    }
  }

  componentDidMount() {
    this.handleHashChange();
    this.setState({location: window.location.hash.substring(window.location.hash.indexOf("/")+1)});

    window.addEventListener("hashchange", () => { 
      this.setState({location: window.location.hash.substring(window.location.hash.indexOf("/")+1)});
      console.log(this.state.location);
      this.handleHashChange();
    });
  }

  handleHashChange() {
    if(!window.location.hash.endsWith("/"))
    {
      window.location.hash = window.location.hash+"/";
    }
    fetch("http://localhost/cache/"+this.state.location+"/index.json".replace("//", "/"))
    .then(result => {
        return result.text();    
    })
    .then(result => {
        let newDir: Directory = JSON.parse(result);
        this.setState({directory: newDir}); 
    });
  }

  render () {
      return (
      <div className="App">
        <Gallery directory={this.state.directory} path={this.state.location}/>
      </div>
    );
  }
}

export default App;
