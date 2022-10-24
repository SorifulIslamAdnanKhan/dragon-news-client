import React from 'react';
import { Link } from 'react-router-dom';

const TermsAndConditions = () => {
    return (
        <div>
            <h2>Here is our Terms and Conditions</h2>
            <p>Go back to : <Link to='/register'>Register</Link></p>
        </div>
    );
};

export default TermsAndConditions;