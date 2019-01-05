import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import { map } from 'lodash';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Composer from '../components/Composer';
import Feed from '../components/Feed';
import TopicChooser from '../components/TopicChooser';

const Topic = ({ classes, history, match, topics }) => {
  const navigate = topic => {
    const type = topic[0] === '#' ? 'tag' : 'user';
    const value = topic.substring(1);
    const path = `/${type}/${value}`;

    history.push(path);
  }

  const { path, params } = match;
  const topic =
    path === '/' ? '#general' : `${params.type === 'tag' ? '#' : '@'}${params.value}`;

  return (
    <Grid container justify="center" spacing={40}>
      <Grid item>
        <TopicChooser defaultValue={topic} options={topics} handleSelect={navigate} />
      </Grid>
      <Grid item>
        <Paper className={classes.container}>
          <Composer />
          <Divider />
          <Feed />
        </Paper>
      </Grid>
    </Grid>);
};

const mapStateToProps = (state) => {
  const tags = map(state.firestore.data.tags, (_, key) => `#${key}`);
  const users = map(state.firestore.data.users, (user, key) => `@${user.displayName.toLowerCase().replace(/\W/g, '')}`);

  return { topics: tags.concat(users) };
}

const styles = theme => ({
  container: {
    width: '30rem',
    maxWidth: '100vw',
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

export default compose(
  firestoreConnect(['tags', 'users']),
  connect(mapStateToProps),
  withStyles(styles),
)(Topic);
