import React from 'react';
import './Card.css';
import BASE_URL from '../Constants';

interface IProps {
    name: string,
    path: string,
}
interface IState {
}

const Image: React.FunctionComponent<IProps> = (props) => {
    let {name, path} = props;
    return (
        <div className="card image">
            <img src={BASE_URL+"cache/"+path+"/"+name+".thumb.jpg"}></img>
        </div>
    )
}

export default Image;