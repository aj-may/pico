import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PostText from './PostText';
import PostAudio from './PostAudio';

const Post = ({ classes, post }) => (
  <div className={classes.post}>
    {post.type === 'text' && <PostText post={post} />}
    {post.type === 'audio' && <PostAudio post={post} />}
  </div>);

const styles = theme => ({
  post: {
    display: 'inline-flex',
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

export default withStyles(styles)(Post);
