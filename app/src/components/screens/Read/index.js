import React from 'react';
import Header from '../../Header';
import Editor from '../../Editor';
import {Typography, withStyles} from '@material-ui/core';
import {CodeContext} from '../../../store/Code';
import {UserContext} from '../../../store/User';

function ReadScreen(props) {
  const {classes, match} = props;

  const codeContext = React.useContext(CodeContext);
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const identifierFromUrl = match.params.textIdentifier;
    if (!codeContext.identifier && identifierFromUrl) {
      codeContext.setIdentifier(identifierFromUrl);
      codeContext.fetchText(identifierFromUrl);
    }
  }, [codeContext.identifier, match.params.textIdentifier]);

  React.useEffect(() => {
    // redirect to /edit if userIdentifier matches
    if (
      codeContext.isFetched &&
      codeContext.userIdentifier === userContext.identifier &&
      codeContext.identifier
    ) {
      props.history.push(`/edit/${codeContext.identifier}`);
    }
  }, [
    codeContext.userIdentifier,
    userContext.identifier,
    codeContext.identifier,
    codeContext.isFetched,
  ]);

  return (
    <>
      <Header />
      <Typography variant="h4" className={classes.title}>
        Code by {codeContext.userIdentifier /* TODO: show username here */}
      </Typography>
      <Editor className={classes.editor} edit={false} />
    </>
  );
}

const styles = theme => ({
  editor: {
    margin: theme.spacing.unit,
  },
  title: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles)(ReadScreen);
