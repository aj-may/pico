import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Close from '@material-ui/icons/Close';
import ComposerChooser from './ComposerChooser';
import ComposerText from './ComposerText';
import ComposerAudio from './ComposerAudio';
import ComposerGif from './ComposerGif';

class Composer extends Component {
  state = { type: null };

  handleChange = type => this.setState({ type });

  handleSubmit = async pique => {
    const { firestore, createdBy, tag } = this.props;
    const createdAt = firestore.FieldValue.serverTimestamp();

    try {
      await firestore.add(
        { collection: 'posts' },
        { createdBy, createdAt, tag, ...pique });

      this.setState({ type: null });
    } catch (err) {
      console.error(err);
    }
  }

  render = () =>  {
    const { avatarUrl, classes } = this.props;
    const { type } = this.state;

    return (
      <Grid container alignItems="center" spacing={16} wrap="nowrap" className={classes.root}>
        <Grid item>
          <Avatar src={avatarUrl} className={classes.avatar} />
        </Grid>
        <Grid item xs className={classes.relative}>
          {!type && <ComposerChooser handleChange={this.handleChange} />}
          {type === 'text' && <ComposerText handleSubmit={this.handleSubmit} />}
          {type === 'audio' && <ComposerAudio handleSubmit={this.handleSubmit} />}
          {type === 'gif' && <ComposerGif handleSubmit={this.handleSubmit} />}
          {type && <IconButton aria-label="Close" className={classes.close} onClick={() => this.handleChange(null)}>
            <Close fontSize="small" />
          </IconButton>}
        </Grid>
      </Grid>);
  };
};

const styles = theme => ({
  root: {
    marginBottom: theme.spacing.unit,
  },
  avatar: {
    width: '4rem',
    height: '4rem',
  },
  relative: {
    position: 'relative',
  },
  close: {
    position: 'absolute',
    top: '-1.2rem',
    right: '-.9rem',
  },
});

export default compose(
  withStyles(styles),
  firestoreConnect(),
  connect((state) => ({
    avatarUrl: state.firebase.profile.avatarUrl,
    createdBy: state.firebase.auth.uid,
  }))
)(Composer);
