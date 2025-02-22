import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import useStyles from './subscribe-style';

export default function Pricing() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: '',
  });
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  return (
    <div className={classes.subscribeWrap}>
      <Paper className={classes.paper}>
        <Typography align="center" variant="h5">Subscribe Our Newsletter</Typography>
        <form className={classes.container} noValidate autoComplete="off">
          <Grid container spacing={3} alignItems="flex-end">
            <Grid item md={9} xs={12}>
              <TextField
                id="standard-email"
                label="Your Email"
                className={classes.textField}
                fullWidth
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
              />
            </Grid>
            <Grid item md={3} xs={12}>
              <Button variant="contained" color="primary" className={classes.button}>
                Send
                {/* This Button uses a Font Icon, see the installation instructions in the docs. */}
                <Icon className={classes.rightIcon}>send</Icon>
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
