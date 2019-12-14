import React from 'react';
import Album from '../Cards/Album'
import './Frame.css'

interface IProps {
    folders: string[],
    path: string,
}
interface IState {
}

const AlbumFrame: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="frame albumFrame">
        {
            props.folders.map((folder) => {
                return <Album name={folder} path={props.path}/>
            })
        }
        </div>
    )
}

export default AlbumFrame;