import React from "react";

import classes from "./Toolbar.module.scss";
import NavigationItems from "../NavigationItems/NavigationItems";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <nav>
      <NavigationItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
