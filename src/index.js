import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import setupMockServer from './api/mock.server'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

setupMockServer();

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#FA9141",
    },
    secondary: {
      main: "#333c3a",
    },
  },
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
