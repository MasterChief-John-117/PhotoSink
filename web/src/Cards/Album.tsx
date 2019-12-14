import React, { Component } from 'react';
import './Card.css'
import Directory from '../Directory';
import BASE_URL from '../Constants';

interface IProps {
    name: string,
    path: string
}
interface IState {
    albumImg: string
}

class Album extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);
        this.state = {
          albumImg: ""
        }
      }
    
    componentDidMount(){
        this.drillForImage(this.props.name, this.props.path);
    }

    drillForImage(name: string, path: string): any {
        fetch(BASE_URL+("cache/"+path+"/"+name+"/index.json").replace("//", "/"))
        .then(result => {
            return result.text();    
        })
        .then(result => {
            let newDir: Directory = JSON.parse(result);
            if(newDir.images.length > 0)
            {
                console.log(path+name)
                this.setState({albumImg: BASE_URL+("cache/"+path+"/"+name+"/"+newDir.images[Math.floor(Math.random()*newDir.images.length)]+".thumb.jpg").replace("//", "/")});
            }
            else if (newDir.folders.length > 0)
            {
                this.drillForImage(newDir.folders[Math.floor(Math.random()*newDir.folders.length)], path+name)
            }
        });
    }

    render() {
        let {name, path} = this.props;
        return (
            <div className="card album">
                <a href={window.location+name+"/"}>
                    <img src={this.state.albumImg} />
                    <p>{name}</p>
                </a>
            </div>
        )
    }
}

export default Album;