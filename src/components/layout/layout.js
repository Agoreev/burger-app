import React, { Component } from "react";
import classes from "./layout.module.css";
import Toolbar from "../navigation/toolbar";
import SideDrawer from "../navigation/side-drawer";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerToggleHandler = () => {
    this.setState(state => {
      return { showSideDrawer: !state.showSideDrawer };
    });
  };
  render() {
    return (
      <React.Fragment>
        <Toolbar sideDrawerOpen={this.sideDrawerToggleHandler} />
        <SideDrawer
          closed={this.sideDrawerToggleHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.content}>{this.props.children}</main>
      </React.Fragment>
    );
  }
}

export default Layout;
