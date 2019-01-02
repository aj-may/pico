import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PiqueText from './PiqueText';
import PiqueAudio from './PiqueAudio';
import PiqueGif from './PiqueGif';

const Pique = ({ classes, pique }) => pique.type ? (
  <div className={classes.pique}>
    {pique.type === 'text' && <PiqueText pique={pique} />}
    {pique.type === 'audio' && <PiqueAudio pique={pique} />}
    {pique.type === 'gif' && <PiqueGif pique={pique} />}
  </div>) : null;

const styles = theme => ({
  pique: {
    display: 'inline-flex',
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

export default withStyles(styles)(Pique);
