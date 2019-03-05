import React from 'react';
import Header from '../../Header';
import Editor from '../../Editor';
import {
  withStyles
} from '@material-ui/core';

function Main(props) {
  const {
    classes,
  } = props;

  return (
    <>
      <Header />
      <Editor className={classes.editor} />
    </>
  );
}

const styles = theme => ({
  editor: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(Main);
