import React from 'react';
import { Box, Card, CardContent, Container, Typography, makeStyles } from '@material-ui/core';
import useAuth from '../../../hooks/useAuth';
import JWTLogin from './JWTLogin';
import login from './../../../assets/img/log.png';
import './_index.scss';
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
  },
  card: {
    borderRadius: '20px',
    border: 'none',
  },
  banner: {
    backgroundColor: theme.palette.background.paper,
    paddingBottom: theme.spacing(2),
    paddingTop: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  bannerChip: {
    marginRight: theme.spacing(2),
  },
  methodIcon: {
    height: 30,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
  cardContainer: {
    paddingBottom: 80,
    paddingTop: 80,
    borderRadius: '30px',
    margin: '0!important',
  },
  cardContent: {
    padding: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '80px',
    minHeight: 400,
  },
  currentMethodIcon: {
    height: 40,
    '& > img': {
      width: 'auto',
      maxHeight: '100%',
    },
  },
}));

const LoginView = () => {
  const classes = useStyles();
  const { method } = useAuth();

  return (
    <div className={'wrapper'} title="Login">
      <Container className={classes.cardContainer} maxWidth="sm">
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Box alignItems="center" display="flex" justifyContent="space-between" mb={3}>
              <div>
                <Typography style={{ color: '#073A93' }} gutterBottom variant="h2">
                  تسجيل الدخول
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  style={{ fontSize: '18px', fontWeight: 'bold', color: '#FFAA45' }}
                >
                  تسجيل الدخول الي المنصة/حسابك
                </Typography>
              </div>
            </Box>
            <Box flexGrow={1} mt={3}>
              {method === 'JWT' && <JWTLogin />}
            </Box>
          </CardContent>
        </Card>
      </Container>
      <img src={login} style={{ height: '491px' }} />
    </div>
  );
};

export default LoginView;
