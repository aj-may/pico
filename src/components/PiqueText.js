import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const PiqueText = ({ pique }) => <Chip
  avatar={<Avatar src={pique.createdBy.avatarUrl} />}
  label={pique.value}
  variant="outlined" />;

export default PiqueText;
