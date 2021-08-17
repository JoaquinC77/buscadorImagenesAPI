import React from 'react';

const Error = ({mensaje}) => (
    <div className="alert alert-danger text-center w-100">
        {mensaje}
    </div>
);
 
export default Error;