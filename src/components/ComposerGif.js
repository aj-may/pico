import React, { Component } from 'react';
import GiphyClient from 'giphy-js-sdk-core';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class ComposerGif extends Component {
  state = { value: '' };

  handleChange = event =>
    this.setState({ value: event.target.value });

  handleSubmit = async (event) => {
    event.preventDefault();

    const giphy = GiphyClient('5XbIEP9UTzsBglksDmHEx2hJ6eJzTbha');
    const type = 'gif';
    const { value } = this.state;

    if (!value) return;

    try {
      const response = await giphy.translate('gifs', { s: value });
      const gif = response.data.images['fixed_width_small'];

      this.props.handleSubmit({ type, value: gif });
    } catch (err) {
      console.error(err);
    }
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <Grid container alignItems="center" spacing={16} wrap="nowrap">
        <Grid item xs>
          <TextField
            label="Gif?"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            autoFocus />
        </Grid>

        <Grid item>
          <IconButton color="primary" type="submit">
            <KeyboardReturn />
          </IconButton>
        </Grid>
      </Grid>

      <img alt="Powered by Giphy" src="/img/powered-by-giphy.png" height={11} width={100} />
    </form>);
};

export default ComposerGif;
