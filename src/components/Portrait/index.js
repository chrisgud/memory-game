import React from 'react';
import './style.css';

const Portrait = function (props) {
        return (
            <div className='card' onClick={() => props.scramble(props.id)}>
                <div className="img-container">
                    <img alt={props.name} src={props.image} />
                </div>
            </div>
        );
}

export default Portrait;