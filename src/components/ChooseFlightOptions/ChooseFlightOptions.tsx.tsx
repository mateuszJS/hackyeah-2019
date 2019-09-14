import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button/Button";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import logo_lot from "../../assets/logo_lot.png";
import { AppState, connect } from "../../store/configureStore";
import { Destination } from "../../typedef";
import { Dispatch } from "redux";
import * as actions from "../../store/actions";

const useStyles = makeStyles({
  logo: {
    position: "absolute",
    top: 0,
    right: "10%",
    height: "150px",
    filter: "drop-shadow(5px 5px 5px #222)"
  },
  container: {
    position: "relative",
    height: "100vh",
    width: "100%",
    backgroundColor: "rgba(232, 239, 255, .2)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%"
  },
  formControl: {
    "&>div": {
      margin: "15px 0",
      "&>div": {
        padding: "10px"
      }
    }
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
    margin: "20px auto"
  },
  country: {
    margin: "10px 20px",
    fontSize: "20",
    fontWeight: "bold"
  },
  cityIata: {
    fontStyle: "normal",
    fontWeight: "bold"
  },
  menuItem: {
    margin: "10px 20px",
    display: "flex",
    fontStyle: "italic",
    justifyContent: "space-between",
    "&:hover": {
      // background: "linear-gradient(45deg, #FFBA5E 30%, #FF8071 90%)"
    }
  }
});

const cabinClasses = [
  {
    label: "Economy",
    value: "1"
  },
  {
    label: "Premium",
    value: "2"
  },
  {
    label: "Business",
    value: "3"
  }
];

interface Props extends RouteComponentProps {
  destinations: Destination[];
  fetchDestinations: VoidFunction;
}

const ChooseFlightOptions = ({
  location,
  fetchDestinations,
  destinations
}: Props) => {
  const [formValues, setFormValues] = useState({
    fromDate: new Date(),
    toDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    fromCity: "",
    toCity: "",
    adultsCount: 1,
    cabinClass: 1
  });
  const classes = useStyles();

  const updateValue = (name: string, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const flatten = function(
    country: string | null,
    arr: any[],
    result: any[] = []
  ) {
    for (let i = 0, length = arr.length; i < length; i++) {
      const value = arr[i];
      if (Array.isArray(value)) {
        value.sort((a, b) => {
          return a.city - b.city;
        });
        flatten(null, value, result);
      } else {
        result.push(value);
      }
    }

    if (country && !Array.isArray(country)) {
      result.push(country);
    }

    return result
      .sort((a, b) => {
        return a - b;
      })
      .reverse();
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  let destinationsMap =
    destinations &&
    destinations
      .map(x => {
        return flatten(x.country, x.cities);
      })
      .flat(1)
      .sort((a: any, b: any) => {
        return a.city - b.city;
      });

  const makeList = (item: any, key: string) => {
    let itemek;
    if (
      (typeof item === "object" || typeof item === "function") &&
      item !== null
    ) {
      itemek = (
        <MenuItem
          key={`${item.iata}_${key}`}
          className={classes.menuItem}
          value={item.iata}
        >
          {item.city} <label className={classes.cityIata}>{item.iata}</label>
        </MenuItem>
      );
    } else {
      itemek = (
        <label className={classes.country} key={key}>
          {item}
        </label>
      );
    }

    return itemek;
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <div className={classes.container}>
        <img className={classes.logo} src={logo_lot} alt={"logo"} />
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="fromCity">
              From
            </InputLabel>
            <Select
              inputProps={{
                name: "fromCity",
                id: "fromCity"
              }}
              value={formValues.fromCity}
              onChange={event => {
                updateValue("fromCity", event.target.value);
              }}
            >
              {destinationsMap &&
                destinationsMap.map((x, i) => {
                  return makeList(x, `${i}_fromCity`);
                })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink htmlFor="toCity">
              To
            </InputLabel>
            <Select
              inputProps={{
                name: "toCity",
                id: "toCity"
              }}
              value={formValues.toCity}
              onChange={event => updateValue("toCity", event.target.value)}
            >
              {destinationsMap &&
                destinationsMap.map((x, i) => {
                  return makeList(x, `${i}_toCity`);
                })}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              margin="normal"
              label="Departure date"
              format="MM/dd/yyyy"
              value={formValues.fromDate}
              onChange={value => updateValue("fromDate", value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <KeyboardDatePicker
              margin="normal"
              label="Return date"
              format="MM/dd/yyyy"
              value={formValues.toDate}
              onChange={value => updateValue("toDate", value)}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Adults</InputLabel>
            <Select
              value={formValues.adultsCount}
              onChange={event => updateValue("adultsCount", event.target.value)}
              displayEmpty
            >
              {Array.from(Array(9), (x, index) => index + 1).map(x => {
                return (
                  <MenuItem key={x} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel shrink>Cabin class</InputLabel>
            <Select
              value={formValues.adultsCount}
              onChange={event => updateValue("cabinClass", event.target.value)}
              displayEmpty
            >
              {cabinClasses.map(x => {
                return (
                  <MenuItem key={x.value} value={x.value}>
                    {x.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <Button className={classes.button} onClick={() => {}}>
            Let`s go!
          </Button>
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = ({ reducer: { destinations } }: AppState) => ({
  destinations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDestinations: () => actions.fetchDestinations(dispatch)
});

export default connect({ mapStateToProps, mapDispatchToProps })(
  ChooseFlightOptions
);
