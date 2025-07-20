import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import store from './store/index.js'
import { Provider } from 'react-redux';
import './main.css';
import './colors.scss';

createRoot(document.getElementById('root')).render(
<Provider store={store}>
  <App />
</Provider>
 
)
