import React from 'react';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';

const PostText = ({ post }) => <Chip
  avatar={<Avatar src={post.createdBy.avatarUrl} />}
  label={post.value}
  variant="outlined" />;

export default PostText;
