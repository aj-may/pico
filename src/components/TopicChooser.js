import React, { Component, createRef } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class TopicChooser extends Component {
  state = {
    active: false,
    value: '#',
    suggestions: [],
    selected: 0,
  };
  inputRef = createRef();

  handleFocus = () => {
    const prefix = this.props.defaultValue.substring(0,1);

    this.setState({
      active: true,
      value: prefix,
      suggestions: [],
      selected: 0,
    });

    setTimeout(this.setCaretPosition, 0);
  };

  handleKeyDown = event => {
    const { suggestions, selected } = this.state;

    // ArrowUp & ArrowDown - change selected sugestion
    if (event.key === 'ArrowUp' && selected > 0)
      return this.setState({ selected: selected - 1 });
    if (event.key === 'ArrowDown' && selected < suggestions.length - 1)
      return this.setState({ selected: selected + 1 });

    // Tab & ArrowRight - set value to suggestion (kinda pointless)
    if (event.key === 'Tab' || event.key === 'ArrowRight') {
      if (suggestions.length < 1) return;

      event.preventDefault();
      this.setState({ value: suggestions[0].label });
    }

    // select suggestion
    if (event.key === 'Enter') {
      if (suggestions.length > 0) {
        this.handleSelect(suggestions[selected]);
        this.inputRef.current.blur();
      }
    }

    if (event.key === 'Escape') {
      this.inputRef.current.blur();
    }
  };

  handleKeyPress = event => {
    if (event.key !== '@' && event.key !== '#') return;

    event.preventDefault();
    this.setState({ value: event.key });
  };

  handleChange = event => {
    const value = event.target.value.toLowerCase() || '#';
    const { topics } = this.props;
    const suggestions = value.length > 1 ? topics
      .filter(({ label }) => label.substring(0, value.length) === value) : [];

    this.setState({
      value,
      suggestions,
      selected: 0,
    });
  };

  handleBlur = () => this.setState({ active: false, suggestions: [] });

  setCaretPosition = () => {
    this.inputRef.current.selectionStart = this.inputRef.current.value.length;
    this.inputRef.current.selectionEnd = this.inputRef.current.value.length;
  };

  handleSelect = topic => {
    this.props.handleSelect(topic.path);
    this.setState({ suggestions: [] });
  }

  render = () => {
    const { active, value, suggestions, selected } = this.state;
    const { defaultValue, classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.inputContainer}>
          {!active && <Typography variant='h2' align='right'>
            {defaultValue}
          </Typography>}

          {active && <Typography variant='h2' align='right'>
            {value}
            <span className={classes.completion}>
              {suggestions.length > 0 && suggestions[selected].label.substring(value.length)}
            </span>
          </Typography>}

          <InputBase
            value={value}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onKeyPress={this.handleKeyPress}
            inputRef={this.inputRef}
            classes={{ root: classes.input, input: classes.input }}
            inputProps={{ autoComplete: 'off', autoCorrect: 'off', autoCapitalize: 'off', spellCheck: 'false' }} />
        </div>

        <List component='nav' className={classes.suggestions}>
          {suggestions.map((suggestion, i) =>
            <ListItem key={i} button selected={i === selected} onClick={() => this.handleSelect(suggestion)}>
              <ListItemText primaryTypographyProps={{ align: 'right' }}>
                {suggestion.label}
              </ListItemText>
            </ListItem>
          )}
        </List>
      </div>
    );
  };
}

const styles = theme => ({
  root: {
    marginTop: '3rem',
  },
  inputContainer: {
    position: 'relative',
    height: '3.75rem',
  },
  input: Object.assign({}, theme.typography.h2, {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    padding: 0,
    marginTop: '-0.2rem',
    color: 'transparent',
    textAlign: 'right',
  }),
  completion: {
    borderLeft: '1px solid black',
    color: 'gray',
  },
  suggestions: {
    marginTop: '1rem',
  },
});

export default compose(
  firestoreConnect(['tags', 'users']),
  connect((state) => {
    const tags = (state.firestore.ordered.tags || [])
      .map(({ id }) => ({
        label: `#${id}`,
        path: `/tag/${id}`,
      }));

    const users = (state.firestore.ordered.users || [])
      .filter(({ handle }) => handle)
      .map(({ id, handle }) => ({
        label: `@${handle}`,
        path: `/user/${id}`,
      }));

    return { topics: tags.concat(users) };
  }),
  withStyles(styles),
)(TopicChooser);
