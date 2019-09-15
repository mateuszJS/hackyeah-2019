import { ConnectedRouter } from 'connected-react-router';
import React, { Suspense } from 'react';
import './App.css';
import { History } from "history";
import routes from './routes';

interface AppProps {
  history: History;
}

class App extends React.Component<AppProps, any> {
  render() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
        <ConnectedRouter history={this.props.history}>
          {routes}
        </ConnectedRouter>
      </Suspense>
    );
  }
}

const onResize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

onResize()
window.addEventListener('resize', onResize);

export default App;
