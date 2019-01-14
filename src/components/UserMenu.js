import React, { Component, Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';

class UserMenu extends Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { profile, firebase, classes } = this.props;
    const { anchorEl } = this.state;

    return (
      <Fragment>
        <Button color="inherit" onClick={this.handleClick}>
          <Avatar src={profile.avatarUrl} />
          <Hidden xsDown>
            <div className={classes.displayName}>{profile.displayName}</div>
          </Hidden>
        </Button>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          <MenuItem component={Link} to='/settings' onClick={this.handleClose}>
            Settings
          </MenuItem>

          <MenuItem onClick={firebase.logout}>
            Logout
          </MenuItem>
        </Menu>
      </Fragment>);
  }
}

const styles = theme => ({
  displayName: {
    marginLeft: theme.spacing.unit * 2,
  },
});

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect((state) => ({
    profile: state.firebase.profile,
  }))
)(UserMenu);
