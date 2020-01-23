import React, { Component } from 'react';
import Gallery from './Gallery'
import './App.css';
import Directory from './Directory';
import BASE_URL from './Constants';
import ImageViewer from './ImageViewer';

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
      this.handleHashChange();
    });
  }

  handleHashChange() {
    if(!window.location.hash.endsWith("/"))
    {
      if(!window.location.hash.match(/jpe?g$/gi)) {
        window.location.hash = window.location.hash+"/";
      }
    }

    let rootDir = this.state.location;
    if(window.location.hash.match(/jpe?g$/gi)) {
      rootDir = rootDir.substring(0, rootDir.lastIndexOf("/"))
    }
    this.setState({directory: JSON.parse("{\"Name\": \""+rootDir+"\"}")})
    fetch(BASE_URL+("cache/"+rootDir+"/index.json").replace("//", "/"))
    .then(result => {
        return result.text();    
    })
    .then(result => {
        let newDir: Directory = JSON.parse(result);
        this.setState({directory: newDir}); 
    });
  }

  render () {
    if(!window.location.hash.match(/jpe?g/gi)) {
      return (
        <div className="App">
          <Gallery directory={this.state.directory} path={this.state.location}/>
        </div>
      );
    }
    else {
      return (
        <div className="App">
          <ImageViewer 
            location={this.state.location} 
            imageName={window.location.hash.substring(window.location.hash.lastIndexOf("/")+1)}
            directory={this.state.directory}
          />
        </div>
      )
    }
  }
}

export default App;
