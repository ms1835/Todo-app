import React from "react";
import PropTypes from 'prop-types';


export const Header=(props) =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <h3 className="text-info font-weight-bold" href="/">{props.title}</h3>
        
            
        </div>
        
      </nav>
    )
}
Header.defaultProps = {
    title: "Your title here"
}
Header.propTypes= {
    title: PropTypes.string
}