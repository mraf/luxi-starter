import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/styles';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import LangIcon from '@mui/icons-material/Language';
import InputAdornment from '@mui/material/InputAdornment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import logo from '~/public/images/logo.svg';
import brand from '~/public/text/brand';
import languageDetector from '../../lib/languageDetector';
import i18nextConfig from '../../next-i18next.config';
import { useTextAlign } from '~/theme/common';
import useStyles from './footer-style';

function Copyright() {
  return (
    <Typography variant="body2" display="block" color="textSecondary">
      &copy;&nbsp;
      {brand.starter.footerText}
    </Typography>
  );
}

const footers = [
  {
    title: 'Company',
    description: ['Team', 'History', 'Contact us', 'Locations'],
    link: ['#team', '#history', '#contact-us', '#locations'],
  },
  {
    title: 'Resources',
    description: ['Resource', 'Resource name', 'Another resource', 'Final resource'],
    link: ['#resource', '#resource-name', '#another-resource', '#final-resource'],
  },
  {
    title: 'Legal',
    description: ['Privacy policy', 'Terms of use'],
    link: ['#privacy-policy', '#terms-of-use'],
  },
];

function Footer(props) {
  const [ctn, setCtn] = useState(null);
  // Theme breakpoints
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Translation Function
  const router = useRouter();
  const { t, i18n } = useTranslation('common');

  const classes = useStyles();
  const align = useTextAlign();
  const [values, setValues] = useState({
    lang: i18n.language
  });

  useEffect(() => {
    setCtn(document.getElementById('main-wrap'));
  }, []);

  function handleChange(event) {
    const lang = event.target.value;
    let href = router.asPath;
    let pName = router.pathname;
    Object.keys(router.query).forEach((k) => {
      if (k === 'locale') {
        pName = pName.replace(`[${k}]`, lang);
        return;
      }
      pName = pName.replace(`[${k}]`, router.query[k]);
    });
    if (lang) {
      href = pName;
    }

    setValues(oldValues => ({
      ...oldValues,
      [event.target.name]: lang,
    }));

    router.push(href);
    languageDetector.cache(lang);
    if (lang === 'ar') {
      props.toggleDir('rtl');
    } else {
      props.toggleDir('ltr');
    }
  }

  return (
    <Container maxWidth="lg" component="footer" className={classes.footer}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={3}>
          <div className={classes.logo}>
            <img src={logo} alt="logo" />
            <Typography variant="h6" color="textPrimary">
              {brand.starter.projectName}
            </Typography>
          </div>
          <Typography color="textPrimary" className={classes.footerDesc} gutterBottom>
            {t('starter-landing.description_text')}
          </Typography>
          {isDesktop && <Copyright />}
        </Grid>
        <Grid item xs={12} md={6}>
          <Grid container spacing={4} justifyContent="space-evenly">
            {footers.map(footer => (
              <Grid item xs={12} md={3} key={footer.title} className={classes.siteMapItem}>
                {isDesktop && (
                  <div>
                    <Typography variant="h6" className={classes.title} color="textPrimary" gutterBottom>
                      {footer.title}
                    </Typography>
                    <ul>
                      {footer.description.map((item, index) => (
                        <li key={item}>
                          <a href={footer.link[index]} variant="subtitle1" color="textSecondary">
                            {item}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {isMobile && (
                  <Accordion
                    square
                    classes={{
                      root: classes.accordionRoot,
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon className={classes.accordionIcon} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      classes={{
                        content: classes.accordionContent,
                      }}
                    >
                      <strong>
                        {footer.title}
                      </strong>
                    </AccordionSummary>
                    <AccordionDetails>
                      <ul>
                        {footer.description.map((item, index) => (
                          <li key={item}>
                            <a href={footer.link[index]} variant="subtitle1" color="textSecondary">
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </AccordionDetails>
                  </Accordion>
                )}
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className={classes.socmed}>
            <IconButton aria-label="Delete" className={classes.margin} size="small">
              <i className="ion-logo-facebook" />
            </IconButton>
            <IconButton aria-label="Delete" className={classes.margin} size="small">
              <i className="ion-logo-twitter" />
            </IconButton>
            <IconButton aria-label="Delete" className={classes.margin} size="small">
              <i className="ion-logo-instagram" />
            </IconButton>
            <IconButton aria-label="Delete" className={classes.margin} size="small">
              <i className="ion-logo-linkedin" />
            </IconButton>
          </div>
          <Select
            value={values.lang}
            onChange={handleChange}
            MenuProps={{
              container: ctn
            }}
            startAdornment={(
              <InputAdornment className={classes.icon} position="start">
                <LangIcon />
              </InputAdornment>
            )}
            className={classes.selectLang}
            input={<OutlinedInput labelwidth={200} name="lang" id="outlined-lang-simple" />}
          >
            {i18nextConfig.i18n.locales.map((locale) => (
              <MenuItem key={locale} value={locale}>{t(locale)}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {isMobile && (
        <div className={align.textCenter}>
          <Box p={4}>
            <Copyright />
          </Box>
        </div>
      )}
    </Container>
  );
}

Footer.propTypes = {
  toggleDir: PropTypes.func,
};

Footer.defaultProps = {
  toggleDir: () => {},
};

export default Footer;
