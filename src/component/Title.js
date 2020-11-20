import React from 'react';

function Title({name, title})    {
    return(
        <div>
            <div>
                <h1>
                    {name }
                    <strong>{title }</strong>
                </h1>
            </div>
        </div>
    )
}

export default Title;