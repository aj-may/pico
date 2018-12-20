import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import PiqueText from './PiqueText';
import PiqueAudio from './PiqueAudio';
import santaHat from './santaHat.svg';

const Pique = ({ classes, pique }) => pique.type ? (
  <div className={classes.pique}>
    {pique.type === 'text' && <PiqueText pique={pique} />}
    {pique.type === 'audio' && <PiqueAudio pique={pique} />}
    <img src={santaHat} className={classes.hat} alt="" />
  </div>) : null;

const styles = theme => ({
  pique: {
    display: 'inline-flex',
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    position: 'relative',
  },
  hat: {
    height: '1.2rem',
    position: 'absolute',
    top: '-.5rem',
    left: '-.5rem',
  }
});

export default withStyles(styles)(Pique);
