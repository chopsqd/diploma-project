import React from 'react';
import {Button} from "react-bootstrap";

const AddButton = ({onClick, size = 25, disabled = false}: {onClick?: React.MouseEventHandler<HTMLButtonElement>, size?: number, disabled?: boolean}) => {
    return (
        <Button variant={"success"} className={"py-1 px-2.5"} onClick={onClick} disabled={disabled}>
            <svg width={size} fill="currentColor" className="bi bi-plus"
                 viewBox="0 0 16 16">
                <path fill={"white"}
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
            </svg>
        </Button>
    );
};

export default AddButton;