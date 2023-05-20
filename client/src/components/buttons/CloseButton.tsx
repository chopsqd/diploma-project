import React from 'react';
import {Button} from "react-bootstrap";

const CloseButton = ({onClick}: {onClick?: React.MouseEventHandler<HTMLButtonElement>}) => {
    return (
        <Button variant={"danger"} className={"py-1 px-2"} onClick={onClick}>
            <svg style={{transform: 'rotate(45deg)'}} width="25" fill="currentColor" className="bi bi-plus"
                 viewBox="0 0 16 16">
                <path fill={"white"}
                      d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </Button>
    );
};

export default CloseButton;