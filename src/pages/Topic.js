import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Composer from '../components/Composer';
import Feed from '../components/Feed';
import TopicChooser from '../components/TopicChooser';

const Topic = ({ classes, history, match, user }) => {
  const { type, value } = match.params;

  const getTopic = () => {
    if (type === 'tag') return `#${value}`;
    if (type === 'user' && user) return `@${user.handle}`;
    return null;
  };

  return (
    <Grid container justify="center" spacing={40}>
      <Grid item>
        <TopicChooser defaultValue={getTopic()} handleSelect={history.push} />
      </Grid>
      <Grid item>
        <Paper className={classes.container}>
          <Composer tag={type === 'tag' ? value : 'general'} />
          <Divider />
          <Feed type={type} value={value} />
        </Paper>
      </Grid>
    </Grid>);
};

const styles = theme => ({
  container: {
    width: '30rem',
    maxWidth: '100vw',
    padding: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
  },
});

export default compose(
  firestoreConnect(props => {
    const { type, value } = props.match.params;

    if (type === 'tag') return [{ collection: 'tags', doc: value, storeAs: 'tag' }];
    if (type === 'user') return [{ collection: 'users', doc: value, storeAs: 'user' }];
  }),
  connect((state) => ({
    tag: state.firestore.data.tag,
    user: state.firestore.data.user,
  })),
  withStyles(styles),
)(Topic);
