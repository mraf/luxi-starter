import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemSecondaryAction from '@mui/material/ListItemSecondaryAction';
import ListItemText from '@mui/material/ListItemText';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useStyles from './header-style';
import languageDetector from '../../lib/languageDetector';
import i18nextConfig from '../../next-i18next.config';

let themeType = 'light';
if (typeof Storage !== 'undefined') {
  themeType = localStorage.getItem('luxiTheme') || 'light';
}

const LanguageSwitchLink = ({
  locale,
  checked,
  toggleDir,
  ...rest
}) => {
  const router = useRouter();
  const { t } = useTranslation('common');

  let href = rest.href || router.asPath;
  let pName = router.pathname;
  Object.keys(router.query).forEach((k) => {
    if (k === 'locale') {
      pName = pName.replace(`[${k}]`, locale);
      return;
    }
    pName = pName.replace(`[${k}]`, router.query[k]);
  });
  if (locale) {
    href = rest.href ? `/${locale}${rest.href}` : pName;
  }

  const handleChangeLang = lang => {
    languageDetector.cache(lang);
    if (lang === 'ar') {
      toggleDir('rtl');
    } else {
      toggleDir('ltr');
    }
  };

  return (
    <Link href={href}>
      <ListItem
        role={undefined}
        dense
        button
        onClick={() => handleChangeLang(locale)}
      >
        <ListItemIcon>
          <i className={locale} />
        </ListItemIcon>
        <ListItemText primary={t(locale)} />
        {checked && (
          <ListItemSecondaryAction>
            <CheckIcon color="primary" />
          </ListItemSecondaryAction>
        )}
      </ListItem>
    </Link>
  );
};

LanguageSwitchLink.propTypes = {
  locale: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  toggleDir: PropTypes.func.isRequired,
};

function Settings(props) {
  const [ctn, setCtn] = useState(null);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDark, setDark] = useState(themeType === 'dark');

  const router = useRouter();
  const currentLocale = router.query.locale || i18nextConfig.i18n.defaultLocale;

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleChangeMode = () => {
    setDark(!isDark);
    props.toggleDark();
  };

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  });

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div className={classes.setting}>
      <IconButton
        aria-describedby={id}
        aria-label="Settings"
        onClick={handleClick}
        className={clsx(classes.icon, open ? classes.active : '')}
      >
        <SettingsIcon fontSize="inherit" />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        container={ctn}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <List
          component="nav"
          className={classes.modeMenu}
          aria-label="Mode-menu"
          subheader={(
            <ListSubheader component="div">
              Theme Mode
            </ListSubheader>
          )}
        >
          <ListItem>
            <Typography component="div">
              <Grid component="label" container alignItems="center" spacing={1}>
                <Grid item>Light</Grid>
                <Grid item>
                  <Switch
                    checked={isDark}
                    onChange={handleChangeMode}
                    value={isDark}
                    inputProps={{ 'aria-label': 'checkbox' }}
                  />
                </Grid>
                <Grid item>Dark</Grid>
              </Grid>
            </Typography>
          </ListItem>
        </List>
        <Divider />
        <List
          component="nav"
          className={classes.langMenu}
          aria-label="Language-menu"
          subheader={(
            <ListSubheader component="div">
              Languages
            </ListSubheader>
          )}
        >
          {i18nextConfig.i18n.locales.map((locale) => (
            <LanguageSwitchLink
              locale={locale}
              key={locale}
              checked={locale === currentLocale}
              toggleDir={props.toggleDir}
            />
          ))}
        </List>
      </Popover>
    </div>
  );
}

Settings.propTypes = {
  toggleDark: PropTypes.func.isRequired,
  toggleDir: PropTypes.func.isRequired,
};

export default Settings;
