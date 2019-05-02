import React from 'react';
import {Card, withStyles, Typography} from '@material-ui/core';
import Highlight from 'react-highlight';
import {CodeContext} from '../../store/Code';

const MIN_LINES_OF_CODE = 10;

function Editor(props) {
  const {classes, className, theme} = props;

  const codeContext = React.useContext(CodeContext);

  if (theme.palette.type === 'dark') {
    require('highlight.js/styles/vs2015.css');
  } else {
    require('highlight.js/styles/vs.css');
  }

  const handleValueChange = event => {
    if (props.edit) {
      codeContext.setText(event.target.value);
    }
  };

  const count = Math.max(codeContext.textLinesCount, MIN_LINES_OF_CODE);

  return (
    <Card className={`${classes.root} ${className}`}>
      <div className={classes.editorContainer}>
        <div>
          {[...Array(count).keys()].map(value => (
            <Typography key={value} className={classes.countNumber}>
              {value + 1}
            </Typography>
          ))}
        </div>
        <div className={classes.codeContainer}>
          <textarea
            className={`${classes.input} ${
              props.edit ? '' : classes.inputDisabled
            }`}
            rows={count}
            onChange={handleValueChange}
            value={codeContext.text}
          />
          <div className={classes.output}>
            <Highlight className={codeContext.language}>
              {codeContext.text}
            </Highlight>
          </div>
        </div>
      </div>
    </Card>
  );
}

const FONT_SIZE = 15;
const LINE_HEIGHT = '19px';
const FONT_FAMILY = 'Roboto mono, monospace';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.primary,
    background:
      theme.palette.type === 'dark' ? '#1E1E1E' : theme.palette.common.white,
  },
  countNumber: {
    display: 'block',
    height: 19,
    width: 60,
    textAlign: 'right',
    paddingRight: theme.spacing.unit * 2,
    fontFamily: FONT_FAMILY,
    userSelect: 'none',
    color: theme.palette.text.primary,
  },
  editorContainer: {
    display: 'flex',
    padding: theme.spacing.unit * 2,
    borderRadius: theme.shape.borderRadius,
  },
  codeContainer: {
    position: 'relative',
    width: '100%',
    userSelect: 'none',
  },
  input: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: 0,
    border: 0,
    display: 'block',
    width: '100%',
    zIndex: 1,
    background: 'transparent',
    outline: 'none',
    caretColor: theme.palette.text.primary,
    color: 'transparent',
    resize: 'none',
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    lineHeight: LINE_HEIGHT,
    whiteSpace: 'pre',
    overflowX: 'hidden',
  },
  inputDisabled: {
    display: 'none',
  },
  output: {
    whiteSpace: 'pre',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    overflowX: 'hidden',
  },
  '@global': {
    pre: {
      margin: 0,
      padding: 0,
    },
    code: {
      margin: '0 !important',
      padding: '0 !important',
      fontFamily: FONT_FAMILY,
      fontSize: FONT_SIZE,
      lineHeight: LINE_HEIGHT,
    },
  },
});

export default withStyles(styles, {withTheme: true})(Editor);
