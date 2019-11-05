import React, { createContext, useState } from "react";
import PropTypes from "prop-types";

export const Context = createContext({});

export const Provider = props => {
    // Initial values are obtained from the props
    const {
        showSidebar: initialShowSidebar,
        userLevel: initialUserLevel,
        buttonClicked: initialButtonClicked,
        children
    } = props;
  
    // Use State to keep the values
    const [showSidebar, setShowSidebar] = useState(initialShowSidebar);
    const [userLevel, setUserLevel] = useState(initialUserLevel);
    const [buttonClicked, setButtonClicked] = useState(initialButtonClicked);
  
    // Make the context object:
    const usersContext = {
        showSidebar,
        setShowSidebar,
        userLevel,
        setUserLevel,
        buttonClicked,
        setButtonClicked
    };
  
    // pass the value in provider and return
    return <Context.Provider value={usersContext}>{children}</Context.Provider>;
  };
  
  export const { Consumer } = Context;
  
  Provider.propTypes = {
    showSidebar: PropTypes.bool,
    userLevel: PropTypes.object,
    buttonClicked: PropTypes.string
  };
  
  Provider.defaultProps = {
    showSidebar: false,
    userLevel: {},
    buttonClicked: ''
  };
  