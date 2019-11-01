import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
    // Initial values are obtained from the props
    const {
        showSidebar: initialShowSidebar,
        userLevel: initialUserLevel,
        children
    } = props;
  
    // Use State to keep the values
    const [showSidebar, setShowSidebar] = useState(initialShowSidebar);
    const [userLevel, setUserLevel] = useState(initialUserLevel);
  
    // Make the context object:
    const usersContext = {
        showSidebar,
        setShowSidebar,
        userLevel,
        setUserLevel
    };
  
    // pass the value in provider and return
    return <Context.Provider value={usersContext}>{children}</Context.Provider>;
  };
  
  export const { Consumer } = Context;
  
  Provider.propTypes = {
    showSidebar: PropTypes.bool,
    userLevel: PropTypes.object,
  };
  
  Provider.defaultProps = {
    showSidebar: false,
    userLevel: {}
  };
  