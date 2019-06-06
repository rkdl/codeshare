import React from 'react';
import {
  withStyles,
  MenuItem,
  Select,
  FormControlLabel,
  Switch,
  TextField,
} from '@material-ui/core';
import {CodeContext} from '../../store/Code';
import {useDebounce} from '../../utils/hooks';
import {
    LANGUAGE_ALIASES_MAP,
    SUPPORTED_LANGUAGES_RAW,
    determineLanguage,
} from '../../utils/highlighting';

function Options(props) {
  const {classes} = props;

  const codeContext = React.useContext(CodeContext);

  const [
    isLanguageDetectionEnabled,
    setIsLanguageDetectionEnabled,
  ] = React.useState(true);

  const debouncedText = useDebounce(
    codeContext.text,
    codeContext.textLinesCount < 25 ? 500 : 1000
  );

  React.useEffect(() => {
    if (!isLanguageDetectionEnabled) {
      return;
    }
    const supposedLanguage = determineLanguage(debouncedText);
    if (supposedLanguage) {
      codeContext.setLanguage(supposedLanguage);
    }
  }, [debouncedText]);

  return (
    <div className={classes.optionsContainer}>
      <Select
        value={codeContext.language}
        onChange={({target}) => {
          codeContext.setLanguage(target.value);
          setIsLanguageDetectionEnabled(false);
        }}
      >
        {SUPPORTED_LANGUAGES_RAW.map(language => (
          <MenuItem key={language} value={language}>
            {LANGUAGE_ALIASES_MAP[language] || language}
          </MenuItem>
        ))}
      </Select>
      <FormControlLabel
        control={
          <Switch
            checked={isLanguageDetectionEnabled}
            onChange={() =>
              setIsLanguageDetectionEnabled(!isLanguageDetectionEnabled)
            }
            color="primary"
            value="checkedAutodetect"
          />
        }
        label="As-you-type detection"
      />
      <TextField
        label="expire date"
        type="date"
        onChange={
          event => codeContext.setExpireTime(new Date(event.target.value))
        }
        value={
          `${
            codeContext.expireTime.getFullYear()
          }-${
            codeContext.expireTime.getMonth() + 1 < 10 
              ? `0${codeContext.expireTime.getMonth() +1}` 
              : codeContext.expireTime.getMonth() + 1
          }-${
            codeContext.expireTime.getDate() < 10 
              ? `0${codeContext.expireTime.getDate()}` 
              : codeContext.expireTime.getDate()
          }`}
      />
    </div>
  );
}

const styles = theme => ({
  optionsContainer: {
    padding: theme.spacing.unit,
  },
});

export default withStyles(styles)(Options);
