import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/styles/makeStyles";
import classnames from "classnames";
import queryString from "query-string";
import { default as React, useEffect, useState } from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import * as actions from "../../store/actions";
import { AppState, connect } from "../../store/configureStore";
import { Destination } from "../../typedef";
import Item from "./Item";

interface Props extends RouteComponentProps {
  destinations: Destination[];
  fetchDestinations: VoidFunction;
}

const useStyles = makeStyles({
  wrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    overflow: "auto",
    maxHeight: "calc(var(--vh, 1vh) * 100)"
  },
  title: {
    marginBottom: 30
  },
  disableScroll: {
    overflow: "hidden"
  }
});

const Destinations = ({
  history,
  location,
  fetchDestinations,
  destinations
}: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const { tags: stringifiedString, country } = queryString.parse(
      location.search
    );
    // @ts-ignore
    setSelected(country);
    if (!destinations) {
      const tags =
        typeof stringifiedString === "string"
          ? stringifiedString.split(",")
          : [];
      fetchDestinations();
    }
  }, [location.search]);

  const contains = (a: any, b: any) => {
    // array matches
    if (Array.isArray(b)) {
      return b.some(x => a.indexOf(x) > -1);
    }
    // string match
    return a.indexOf(b) > -1;
  };

  let newArray: any[] = [];
  let newArray2: any[] = [];
  const { tags: stringifiedString } = queryString.parse(location.search);
  const tags =
    typeof stringifiedString === "string" ? stringifiedString.split(",") : [];
  destinations &&
    destinations.map(x => {
      x.cities.map(y => {
        if (contains(y.tags, tags) && !newArray.includes(x)) {
          newArray.push(x);
        } else if (!newArray.includes(x) && !newArray2.includes(x)) {
          newArray2.push(x);
        }
      });
    });

  let destinationsList = [...newArray, ...newArray2];

  const redirectTo = (country: string | null) => {
    const params = queryString.parse(location.search);
    if (country) {
      params.country = country;
    } else {
      params.country = undefined;
    }
    history.push(`/destinations?${queryString.stringify(params)}`);
  };

  return (
    <div
      className={classnames(classes.wrapper, {
        [classes.disableScroll]: selected
      })}
    >
      <Typography variant="h3" className={classes.title}>
        Destinations
      </Typography>
      {destinationsList === undefined && <p>LOADER!</p>}
      {destinationsList &&
        destinationsList.map((destination, index) => (
          <Item
            key={`${destination.country}_${index}`}
            data={destination}
            selected={selected === destination.country}
            redirect={redirectTo}
            location={location}
            history={history}
          />
        ))}
    </div>
  );
};

const mapStateToProps = ({ reducer: { destinations } }: AppState) => ({
  destinations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDestinations: () => actions.fetchDestinations(dispatch)
});

export default connect({ mapStateToProps, mapDispatchToProps })(Destinations);
