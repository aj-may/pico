import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PiqueText from './PiqueText';
import PiqueAudio from './PiqueAudio';

const Pique = ({ classes, pique }) => (
  <div className={classes.pique}>
    {pique.type === 'text' && <PiqueText pique={pique} />}
    {pique.type === 'audio' && <PiqueAudio pique={pique} />}
  </div>);

const styles = theme => ({
  pique: {
    display: 'inline-flex',
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

export default withStyles(styles)(Pique);
