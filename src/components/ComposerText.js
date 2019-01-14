import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import KeyboardReturn from '@material-ui/icons/KeyboardReturn';

class ComposerText extends Component {
  state = { value: '' };

  handleChange = event =>
    this.setState({ value: event.target.value });

  handleSubmit = event => {
    event.preventDefault();
    const type = 'text';
    const { value } = this.state;

    if (!value) return;

    this.props.handleSubmit({ type, value });
  };

  render = () => (
    <form onSubmit={this.handleSubmit}>
      <Grid container alignItems="center" spacing={16} wrap="nowrap">
        <Grid item xs>
          <TextField
            label="Wut?"
            variant="outlined"
            value={this.state.value}
            onChange={this.handleChange}
            fullWidth
            autoFocus
            inputProps={{ maxLength: 5 }} />
        </Grid>

        <Grid item>
          <IconButton color="primary" type="submit">
            <KeyboardReturn />
          </IconButton>
        </Grid>
      </Grid>
    </form>);
};

export default ComposerText;
