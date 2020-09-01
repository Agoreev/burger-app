import React, { Component } from "react";
import classes from "./layout.module.css";
import Toolbar from "../../components/navigation/toolbar";
import SideDrawer from "../../components/navigation/side-drawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerToggleHandler = () => {
    this.setState((state) => {
      return { showSideDrawer: !state.showSideDrawer };
    });
  };
  render() {
    const { isAuthenticated, children } = this.props;
    return (
      <React.Fragment>
        <Toolbar
          isAuthenticated={isAuthenticated}
          sideDrawerOpen={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          isAuthenticated={isAuthenticated}
          closed={this.sideDrawerToggleHandler}
          open={this.state.showSideDrawer}
        />
        <main className={classes.content}>{children}</main>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
