import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Not adding in currently because it breaks most of our existing components
// import 'bootstrap/dist/css/bootstrap.min.css';
import './index.scss';
import registerServiceWorker from './registerServiceWorker';
import store from './redux/store';
import SiteContainer from './containers/SiteContainer';

render(
  <Provider store={store}>
    <div>
      <iframe src="http://localhost:3000" id="walletId" style={{ width: '400px', height: '400px' }} />
      <SiteContainer />
    </div>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
