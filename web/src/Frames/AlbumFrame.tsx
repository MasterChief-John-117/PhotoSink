import React from 'react';
import Album from '../Cards/Album'
import './AlbumFrame.css'

interface IProps {
    folders: string[],
}
interface IState {
}

const AlbumFrame: React.FunctionComponent<IProps> = (props) => {
    return (
        <div className="albumFrame">
        {
            props.folders.map((folder) => {
                return <Album name={folder}/>
            })
        }
        </div>
    )
}

export default AlbumFrame;