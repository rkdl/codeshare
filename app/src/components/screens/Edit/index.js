import React from 'react';
import Header from '../../Header';
import Editor from '../../Editor';
import Options from '../../Options';
import Footer from '../../Footer';
import { withStyles, Button, Modal, Typography, DialogContent } from '@material-ui/core';
import { CodeContext } from '../../../store/Code';
import { UserContext } from '../../../store/User';
import { withRouter } from 'react-router-dom';
import { copyToClipboard } from '../../../utils/helpers';


function EditScreen(props) {
  const { classes, match } = props;

  const codeContext = React.useContext(CodeContext);
  const userContext = React.useContext(UserContext);

  React.useEffect(() => {
    const identifierFromUrl = match.params.textIdentifier;
    // TODO: maybe move getting identifier from url to other place
    if (!codeContext.identifier && identifierFromUrl) {
      codeContext.setIdentifier(identifierFromUrl);
      codeContext.fetchText(identifierFromUrl);
    }
  }, [codeContext.identifier, match.params.textIdentifier]);

  React.useEffect(() => {
    // redirect to /read if userIdentifier not match
    if (
      codeContext.isFetched &&
      codeContext.userIdentifier !== userContext.identifier &&
      codeContext.identifier
    ) {
      props.history.push(`/read/${codeContext.identifier}`);
    }
  }, [
      codeContext.userIdentifier,
      userContext.identifier,
      codeContext.identifier,
      codeContext.isFetched,
    ]);

  return (
    <>{!codeContext.isExpired ?
      <>
        <Header />
        <div className={classes.optionsContainer}>
          <Options />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => codeContext.saveText()}
            >
              {codeContext.identifier ? 'save' : 'Save and get sharable link'}
            </Button>
            {codeContext.identifier && (
              <Button
                onClick={() => {
                  copyToClipboard(
                    `${window.location.origin}/read/${codeContext.identifier}`
                  );
                  alert('link copied to clipboard!');
                }}
              >
                Copy link
            </Button>
            )}
          </div>
        </div>
        <Editor className={classes.editor} edit={true} />
        <Footer />
      </>
      :
      <Modal open={codeContext.isExpired}>
        <DialogContent className={classes.paper}> 
        <Typography variant="h6" id="modal-title">
          Time is gone, this snippet expired
          </Typography>
        </DialogContent>
      </Modal>
    }
    </>
  );
}

const styles = theme => ({
  editor: {
    margin: theme.spacing.unit,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  optionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing.unit,
  },
});

export default withRouter(withStyles(styles)(EditScreen));
