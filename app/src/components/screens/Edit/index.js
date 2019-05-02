import React from 'react';
import Header from '../../Header';
import Editor from '../../Editor';
import Options from '../../Options';
import {withStyles} from '@material-ui/core';

function EditScreen(props) {
  const {classes} = props;

  return (
    <>
      <Header />
      <Options />
      <Editor className={classes.editor} edit={true} />
    </>
  );
}

const styles = theme => ({
  editor: {
    margin: theme.spacing.unit,
  },
});

export default withStyles(styles)(EditScreen);
