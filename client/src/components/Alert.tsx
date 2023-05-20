import React from 'react';

const Alert = ({fill = 'white', message}: {fill?: string, message: string}) => {
    return (
        <div className={`alert alert-danger d-flex align-items-center`} role="alert">
            <svg viewBox="0 0 1024 1024" width={25} className={"me-3"}>
                <path fill={fill} d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 192a58.432 58.432 0 0 0-58.24 63.744l23.36 256.384a35.072 35.072 0 0 0 69.76 0l23.296-256.384A58.432 58.432 0 0 0 512 256zm0 512a51.2 51.2 0 1 0 0-102.4 51.2 51.2 0 0 0 0 102.4z"/>
            </svg>
            <div>
                {message}
            </div>
        </div>
    );
};

export default Alert;