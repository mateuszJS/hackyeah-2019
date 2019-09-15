import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import store, { myAppHistory } from "./store/configureStore";

const render = () => {
    ReactDOM.render(
        <Provider store={store}>
            <App history={myAppHistory} />
        </Provider>,
        document.getElementById("root")
    );
};

render();


serviceWorker.register();
