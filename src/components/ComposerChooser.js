import React from 'react';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import TextFields from '@material-ui/icons/TextFields';
import Mic from '@material-ui/icons/Mic';
import Gif from '@material-ui/icons/Gif';
// import PhotoCamera from '@material-ui/icons/PhotoCamera';

const ComposerChooser = ({ handleChange }) => (
  <Grid container spacing={16} wrap="nowrap">
    <Grid item>
      <IconButton color="primary" aria-label="Post Text" onClick={() => handleChange('text')}>
        <TextFields fontSize="large" />
      </IconButton>
    </Grid>

    {/*<Grid item>
      <IconButton color="primary" aria-label="Post Photo" onClick={() => handleChange('photo')}>
        <PhotoCamera fontSize="large" />
      </IconButton>
    </Grid>*/}

    <Grid item>
      <IconButton color="primary" aria-label="Post Audio"onClick={() => handleChange('audio')}>
        <Mic fontSize="large" />
      </IconButton>
    </Grid>

    {<Grid item>
      <IconButton color="primary" aria-label="Post Color"onClick={() => handleChange('gif')}>
        <Gif fontSize="large" />
      </IconButton>
    </Grid>}
  </Grid>);

export default ComposerChooser;
