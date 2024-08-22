import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from './Routes';
import { Toaster } from 'react-hot-toast';


import './App.css';

const browserHistory = createBrowserHistory();

function App() {
  return (
    <Router history={browserHistory}>
        <Toaster />
        <Routes />
    </Router>
  );
}

export default App;
