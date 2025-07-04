import React from "react";
import Navbar from '../template/Navbar';
import Footer from '../template/Footer';
const ErrorBoundaryPage = ({ error, reset }) => {
    return (
        <>
            <Navbar/>
            <h1>Oops! Something went wrong.</h1>
            {/*<p>Error Message: {error.message}</p>*/}
            {/*<button onClick={reset}>Try again</button>*/}
          <Footer/>
        </>
    );
};

export default ErrorBoundaryPage;
