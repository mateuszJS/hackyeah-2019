import { makeStyles } from "@material-ui/styles";
import React from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import logo_lot from "../../assets/logo_lot.png";
import { AppState, connect } from "../../store/configureStore";

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
  flightsWrapper: {
    width: "90%",
    marginTop: "250px",
    height: "100%"
  },
  flightWrapper: {
    padding: "25px",
    margin: "10px 0",
    width: "100%"
  },
  flightDetails: {
    padding: "15px",
    borderRadius: "30px",
    margin: "20px 0 0 0",
    boxShadow: "1px 1px 15px 0px rgba(0,0,0,0.3)",
    "&>*": {
      margin: "10px 0"
    },
    "&>label": {
      fontWeight: "bold",
      "&>span": {
        fontWeight: "normal",
        fontStyle: "italic"
      }
    },
    "&>div": {
      "&>label": {
        fontWeight: "bold"
      }
    }
  }
});

interface Props extends RouteComponentProps {
  flights: any;
}

const formatDateWithTime = (dateString: string, format?: string): string => {
  if (
    dateString === undefined ||
    dateString === null ||
    dateString === "" ||
    dateString.length === 0
  ) {
    return "";
  }
  const pad = (a: number, b: number) => (1e15 + a + "").slice(-b);
  const date = new Date(dateString);
  const Y = date.getFullYear();
  const M = pad(date.getMonth() + 1, 2);
  const D = pad(date.getDate(), 2);
  const s = pad(date.getSeconds(), 2);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  hours = hours % 12;
  let h = pad(hours ? hours : 12, 2); // the hour '0' should be '12'
  let m = pad(minutes < 10 ? 0 + minutes : minutes, 2);

  var ampm = date.getHours() >= 12 ? "PM" : "AM";

  if (format != null) {
    return format
      .replace(/YY/, `${Y}`)
      .replace(/MM/, `${M}`)
      .replace(/DD/, `${D}`)
      .replace(/hh/, `${h}`)
      .replace(/mm/, `${m}`)
      .replace(/ss/, `${s}`);
  }
  return `${M}/${D}/${Y} ${h}:${m} ${ampm}`;
};

const timeConvert = (n: any) => {
  var num = n;
  var hours = num / 60;
  var rhours = Math.floor(hours);
  var minutes = (hours - rhours) * 60;
  var rminutes = Math.round(minutes);
  if (rhours > 0) {
    return rhours + " h " + rminutes + " m";
  } else {
    return rminutes + " m";
  }
};

const FlightsList = ({ flights }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <img className={classes.logo} src={logo_lot} alt={"logo"} />
      <div className={classes.flightsWrapper}>
        {flights.map((x: any, i: number) => {
          return (
            <div
              key={`${x.flightNumber}_${i}`}
              className={classes.flightWrapper}
            >
              {x[0].outbound.segments.map((z: any, i: number) => {
                return (
                  <div key={i} className={classes.flightDetails}>
                    <label>
                      Flight number: <span>{z.flightNumber}</span>
                    </label>
                    <div>
                      <label>{z.departureAirport}</label>{" "}
                      {formatDateWithTime(z.departureDate)}
                    </div>
                    <div>
                      <label>{z.arrivalAirport}</label>{" "}
                      {formatDateWithTime(z.arrivalDate)}
                    </div>
                    <label>
                      Flight duration: <span>{timeConvert(z.duration)}</span>
                    </label>
                  </div>
                );
              })}
              {x[0].inbound.segments.map((z: any, i: number) => {
                return (
                  <div key={i} className={classes.flightDetails}>
                    <label>
                      Flight number: <span>{z.flightNumber}</span>
                    </label>
                    <div>
                      <label>{z.departureAirport}</label>{" "}
                      {formatDateWithTime(z.departureDate)}
                    </div>
                    <div>
                      <label>{z.arrivalAirport}</label>{" "}
                      {formatDateWithTime(z.arrivalDate)}
                    </div>
                    <label>
                      Flight duration: <span>{timeConvert(z.duration)}</span>
                    </label>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ reducer: { flights } }: AppState) => ({
  flights
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect({ mapStateToProps, mapDispatchToProps })(FlightsList);
