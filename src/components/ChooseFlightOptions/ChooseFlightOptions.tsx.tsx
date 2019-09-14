import DateFnsUtils from "@date-io/date-fns";
import FormControl from "@material-ui/core/FormControl/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Select from "@material-ui/core/Select/Select";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import Button from "@material-ui/core/Button/Button";
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

export default function ChooseFlightOptions() {
  const [formValues, setFormValues] = useState({
    fromDate: new Date(),
    toDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    fromCity: "",
    toCity: "",
    adultsCount: 1,
    cabinClass: 1
  });

  const updateValue = (name: string, value: any) => {
    setFormValues({
      ...formValues,
      [name]: value
    });
  };

  const classes = useStyles();
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <div className={classes.container}>
          <img className={classes.logo} src={logo_lot} alt={"logo"} />
          <form className={classes.form} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">From</InputLabel>
              <Select
                value={formValues.fromCity}
                onChange={value => updateValue("fromCity", value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-simple">To</InputLabel>
              <Select
                value={formValues.toCity}
                onChange={value => updateValue("toCity", value)}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                label="Departure date"
                format="MM/dd/yyyy"
                value={formValues.fromDate}
                onChange={value => updateValue("fromDate", value)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <KeyboardDatePicker
                margin="normal"
                label="Return date"
                format="MM/dd/yyyy"
                value={formValues.toDate}
                onChange={value => updateValue("toDate", value)}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <InputLabel shrink>Adults</InputLabel>
              <Select
                value={formValues.adultsCount}
                onChange={event =>
                  updateValue("adultsCount", event.target.value)
                }
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
                onChange={event =>
                  updateValue("cabinClass", event.target.value)
                }
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
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
