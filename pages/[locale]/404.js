import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { makeStyles } from '@mui/styles';
import { useTranslation } from 'next-i18next';
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic';
import Error from '../../../components/Error';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import brand from '../../public/text/brand';

const useStyles = makeStyles(theme => ({
  dedicatedPage: {
    background: theme.palette.type === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
  }
}));

function ErrorPage(props) {
  const classes = useStyles();
  const { onToggleDark, onToggleDir } = props;
  const { errorCode, stars } = props;
  const { t } = useTranslation('common');

  if (errorCode) {
    return (
      <Fragment>
        <Head>
          <title>
            { brand.starter.name }
            &nbsp; -&nbsp;
            {errorCode}
          </title>
        </Head>
        <div className={classes.dedicatedPage}>
          <Header onToggleDark={onToggleDark} onToggleDir={onToggleDir} invert />
          <Error errorCode={errorCode} text={t('common:404')} />
          {/* <Footer /> */}
        </div>
      </Fragment>
    );
  }

  return (
    <div className={classes.dedicatedPage}>
      {t('description')}
      Next stars:&nbsp;
      {stars}
    </div>
  );
}

ErrorPage.propTypes = {
  errorCode: PropTypes.string,
  stars: PropTypes.number,
  onToggleDark: PropTypes.func.isRequired,
  onToggleDir: PropTypes.func.isRequired,
};

ErrorPage.defaultProps = {
  errorCode: '400',
  stars: 0,
};

export default ErrorPage;

const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
