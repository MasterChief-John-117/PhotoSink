import React from 'react';
import './Card.css'

interface IProps {
    name: string,
}
interface IState {
}

const Image: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="card image">{props.name}</div>
    )
}

export default Image;