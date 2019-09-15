import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { SnackbarProvider } from "notistack";
import { default as React, Suspense } from "react";
import { Dispatch } from "redux";
import * as actions from "./store/actions";
import { AppState, connect } from "./store/configureStore";
import "./App.css";
import routes from "./routes";

interface AppProps {
  history: History;
  closeSnackbar: () => void;
}

class App extends React.Component<AppProps, any> {
  render() {
    return (
      <SnackbarProvider maxSnack={1} autoHideDuration={1500} onClose={this.props.closeSnackbar}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectedRouter history={this.props.history}>
            {routes}
          </ConnectedRouter>
        </Suspense>
      </SnackbarProvider>
    );
  }
}

const onResize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onResize();
window.addEventListener("resize", onResize);

const mapStateToProps = ({  }: AppState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeSnackbar: () => actions.closeSnackbar({ dispatch })
});

export default connect({ mapStateToProps, mapDispatchToProps })(App);
