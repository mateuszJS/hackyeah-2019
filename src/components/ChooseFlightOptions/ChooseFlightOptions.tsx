import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button/Button";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import FormControl from "@material-ui/core/FormControl/FormControl";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import { useSnackbar, SnackbarProvider } from "notistack";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import logo_lot from "../../assets/logo_lot.png";
import * as actions from "../../store/actions";
import { AppState, connect } from "../../store/configureStore";
import { Destination, FetchFlightsParams, Flight } from "../../typedef";

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
    background: "linear-gradient(45deg, #8491c8 40%, #A7B1D7 60%)",
    border: 0,
    borderRadius: 8,
    boxShadow: "0 3px 5px 2px rgba(78, 98, 174, .3)",
    color: "white",
    height: "50px",
    padding: "0 30px",
    width: "70%",
    fontSize: "14px",
    margin: "20px auto",
    fontWeight: 600
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
    justifyContent: "space-between"
  },
  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  error: {
    color: "red"
  }
});

const cabinClasses = [
  {
    label: "Economy",
    value: "E"
  },
  {
    label: "Premium",
    value: "B"
  },
  {
    label: "Business",
    value: "F"
  }
];

interface Props extends RouteComponentProps {
  destinations: Destination[];
  flights: Flight[];
  loading: boolean | undefined;
  error: boolean | undefined;
  fetchDestinations: VoidFunction;
  fetchFlights: (params: FetchFlightsParams) => void;
}

const ChooseFlightOptions = ({
  location,
  loading,
  error,
  fetchDestinations,
  fetchFlights,
  destinations
}: Props) => {
  const { iata: stringifiedString } = queryString.parse(location.search);
  const [formValues, setFormValues] = useState({
    fromDate: new Date(),
    toDate: new Date(),
    fromCity: "WAW",
    toCity: stringifiedString || "",
    adultsCount: 1,
    cabinClass: "E"
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

  const letsGo = (formValues: any) => {
    let from =
      formValues.fromDate.getDate().toString() +
      ("0" + (formValues.fromDate.getMonth() + 1)).slice(-2).toString() +
      formValues.fromDate.getFullYear().toString();
    let to =
      formValues.toDate.getDate().toString() +
      ("0" + (formValues.fromDate.getMonth() + 1)).slice(-2).toString() +
      formValues.toDate.getFullYear().toString();
    let data: FetchFlightsParams = {
      params: {
        adt: formValues.adultsCount,
        cabinClass: formValues.cabinClass,
        market: "PL",
        departureDate: [from.toString()],
        returnDate: to.toString(),
        origin: [formValues.fromCity],
        destination: [formValues.toCity],
        tripType: "R"
      }
    };
    fetchFlights(data);
  };

  const { enqueueSnackbar } = useSnackbar();
  const variant = "error";
  if (error) {
    enqueueSnackbar("API is dead 💀", { variant });
  }

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
              value={formValues.cabinClass}
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
          <Button
            className={classes.button}
            disabled={loading}
            onClick={() => letsGo(formValues)}
          >
            Let`s go!
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </form>
      </div>
    </MuiPickersUtilsProvider>
  );
};

const mapStateToProps = ({
  reducer: { destinations, loading, error }
}: AppState) => ({
  destinations,
  loading,
  error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDestinations: () => actions.fetchDestinations(dispatch),
  fetchFlights: (params: FetchFlightsParams) =>
    actions.fetchFlights({ dispatch, params })
});

export default connect({ mapStateToProps, mapDispatchToProps })(
  ChooseFlightOptions
);
