import React from "react";

import classes from "./NavigationItems.module.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => {
  let links = null;
  if (props.isAuthenticated) {
    links = (
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/reporterror" exact>
          Report Error
        </NavigationItem>
        <NavigationItem link="/errorrecords">All Errors</NavigationItem>
        <NavigationItem link="/user">User</NavigationItem>
        <NavigationItem link="/logout">Logout</NavigationItem>
      </ul>
    );
  }
  return links;
};

export default navigationItems;
