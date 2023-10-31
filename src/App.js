import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.scss';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import routes, { renderRoutes } from './routes';
import ModalsProvider from './components/modalProviderUser';
import { AuthProvider } from './contexts/JWTAuthContext';
const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(50),
  },
}));
function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <BrowserRouter>{renderRoutes(routes)}</BrowserRouter>
      <ModalsProvider />
    </div>
  );
}
export default App;
