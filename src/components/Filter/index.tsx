import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/styles";
import classnames from "classnames";
import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import HotExemple from "../../assets/hot.jpg";
import LogoLot from "../../assets/logo_lot.png";
import colors from "../../colors";

const useStyles = makeStyles({
  filter: {
    background: 'white',
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: colors.baseColor
  },
  logo: {
    height: "80px",
    filter: "drop-shadow(3px 3px 3px #222)"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "10px"
  },
  item: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "40vw",
    height: "40vw",
    backgroundImage: `url("${HotExemple}")`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    color: "white",
    border: `1px solid white`,
    margin: "8px",
    filter: "opacity(50%)",
    "@media (min-width:600px)": {
      width: "25vw",
      height: "25vw"
    }
  },
  title: {
    textAlign: "left",
    color: "white",
    fontWeight: 600,
    filter: "drop-shadow(3px 3px 3px #222)"
  },
  selected: {
    filter: "opacity(100%)"
  },
  button: {
    fontWeight: 600,
    width: "50vw",
    margin: "30px auto",
    display: "block",
    padding: "10px 20px",
    background: `linear-gradient(45deg, ${colors.baseColor} 30%, #21CBF3 90%)`,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    "@media (min-width:600px)": {
      padding: '20px 20px',
      width: '25vw',
    }
  },

  subtitle_item: {
    color: "white",
    fontSize: "18px",
    fontWeight: 600,
    textAlign: "center"
  }
});

const items = [
  "away",
  "cheap",
  "near",
  "beach",
  "seesighting",
  "rest",
  "party"
];

interface State {
  [key: string]: boolean;
}

const initialValue: State = items.reduce(
  (result, text) => ({
    ...result,
    [text]: false
  }),
  {}
);

const Filter = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(initialValue);

  const handleClick = (id: string) => {
    setSelected({
      ...selected,
      [id]: !selected[id]
    });
  };

  const goToDestinations = () => {
    const tags = Object.entries(selected)
      .map(([key, value]) => (value ? key : undefined))
      .filter(item => item)
      .join(",");
    history.push(`/destinations?tags=${tags}`);
  };

  return (
    <div className={classes.filter}>
      <header className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Select what you like
        </Typography>
        <img className={classes.logo} src={LogoLot} alt={"logo"} />
      </header>

      <div className={classes.wrapper}>
        {items.map(item => (
          <div
            className={classnames(classes.item, {
              [classes.selected]: selected[item]
            })}
            onClick={() => handleClick(item)}
            key={item}
          >
            <Typography className={classes.subtitle_item} variant="subtitle1">
              {item}
            </Typography>
          </div>
        ))}
      </div>
      <Button className={classes.button} onClick={goToDestinations}>
        Find best places
      </Button>
    </div>
  );
};

export default Filter;
