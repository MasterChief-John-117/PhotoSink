import React from 'react';
import './Card.css'

interface IProps {
    name: string,
}
interface IState {
}

const Album: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="card album">{props.name}</div>
    )
}

export default Album;