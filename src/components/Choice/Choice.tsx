import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import choice_background from "../../assets/choice_background.jpg";
import logo_lot from "../../assets/logo_lot.png";

const useStyles = makeStyles({
  logo: {
    position: "absolute",
    top: 0,
    right: "10%",
    height: "200px",
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
    alignItems: "center"
  },
  button: {
    background: "linear-gradient(45deg, #FFBA5E 30%, #FF8071 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    width: "70%",
    margin: "10px"
  }
});

export default function Choice() {
  const classes = useStyles();
  return (
    <>
      <div className={classes.container}>
        <img className={classes.logo} src={logo_lot} alt={"logo"} />
        <Button className={classes.button}>I know the place!</Button>
        <Button className={classes.button}>I know nothing</Button>
      </div>
    </>
  );
}
