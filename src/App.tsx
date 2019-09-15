import { ConnectedRouter } from "connected-react-router";
import { History } from "history";
import { SnackbarProvider } from "notistack";
import { default as React, Suspense } from "react";
import { Dispatch } from "redux";
import * as actions from "./store/actions";
import { AppState, connect } from "./store/configureStore";
import "./App.css";
import routes from "./routes";
import { makeStyles } from "@material-ui/styles";

interface AppProps {
  loading: boolean | undefined;
  history: History;
  closeSnackbar: () => void;
}

const useStyles = makeStyles({
  overlay: {
    height: "100vh",
    background: "rgba(0,0,0,.2)"
  }
});

const App = (props: AppProps) => {
  const classes = useStyles();
  const overlay = props.loading ? classes.overlay : "";
  return (
    <div className={overlay}>
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={1500}
        onClose={props.closeSnackbar}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectedRouter history={props.history}>{routes}</ConnectedRouter>
        </Suspense>
      </SnackbarProvider>
    </div>
  );
};

const onResize = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
};

onResize();
window.addEventListener("resize", onResize);

const mapStateToProps = ({ reducer: { loading } }: AppState) => ({
  loading
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  closeSnackbar: () => actions.closeSnackbar({ dispatch })
});

export default connect({ mapStateToProps, mapDispatchToProps })(App);
