import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import choice_background from "../../assets/choice_background.jpg";
import logo_lot from "../../assets/logo_lot.png";
import { myAppHistory } from "../../store/configureStore";
import Routes from "../../routes/urls";

const useStyles = makeStyles({
  logo: {
    position: "absolute",
    top: 0,
    right: "10%",
    height: "150px",
    filter: "drop-shadow(5px 5px 5px #222)"
  },
  container: {
    height: "100vh",
    backgroundImage: `url(${choice_background})`,
    position: "relative",
    opacity: 0.8,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    "@media (min-width:600px)": {
      flexDirection: "row"
    }
  },
  button: {
    background: "linear-gradient(45deg, #8491c8 40%, #A7B1D7 60%)",
    border: 0,
    borderRadius: 8,
    boxShadow: "0 3px 5px 2px rgba(78, 98, 174, .3)",
    color: "white",
    height: "50px",
    padding: "0 30px",
    width: "70%",
    margin: "15px",
    fontSize: "14px",
    fontWeight: 600,
    "@media (min-width:600px)": {
      height: "160px",
      width: "160px",
      margin: "40px",
      fontSize: "16px",
      "&:hover": {
        background: "linear-gradient(45deg, #4e5eab 40%, #7380bf 60%)"
      }
    }
  }
});

export default function Choice() {
  const classes = useStyles();

  const redirectToChooseFlightOptions = () => {
    myAppHistory.push(Routes.ChooseFlightOptions);
  };

  const redirectToFilters = () => {
    myAppHistory.push(Routes.Filter);
  };

  return (
    <>
      <div className={classes.container}>
        <img className={classes.logo} src={logo_lot} alt={"logo"} />
        <Button
          className={classes.button}
          onClick={redirectToChooseFlightOptions}
        >
          I know where I'm going
        </Button>
        <Button className={classes.button} onClick={redirectToFilters}>
          I'm still not sure
        </Button>
      </div>
    </>
  );
}
