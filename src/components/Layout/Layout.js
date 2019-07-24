import React, { Component } from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/Sidedrawer/Sidedrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }

  sideDrawerClosedHandler = () => {
    this.setState( { showSideDrawer: false } );
  }

  sideDrawerToggleHandler = () => {
    this.setState( ( prewState ) => {
      return { showSideDrawer: !prewState.showSideDrawer };
    } );
  }

  render() {
    return (
      <Auxiliary>
        <Toolbar drawerToggleClicked={ this.sideDrawerToggleHandler } />
        <SideDrawer
          closed={ this.sideDrawerClosedHandler }
          open={ this.state.showSideDrawer } />
        <main className={ classes.Content }>
          { this.props.children }
        </main>
      </Auxiliary>
    );
  }
}

export default Layout;