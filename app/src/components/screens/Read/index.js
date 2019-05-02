import React from 'react';
import Header from '../../Header';
import Editor from '../../Editor';
import {Typography, withStyles} from '@material-ui/core';

function ReadScreen(props) {
  const {classes} = props;

  return (
    <>
      <Header />
      <Typography variant="title">Code by #username#</Typography>
      <Editor className={classes.editor} edit={false} />
    </>
  );
}

const styles = theme => ({
  editor: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(ReadScreen);
