import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import Typography from '@material-ui/core/Typography';
import { Dispatch } from 'redux'
import { connect, AppState } from '../../store/configureStore';
import * as actions from '../../store/actions';
import { Destination } from '../../typedef';
import Item from './Item';
import makeStyles from '@material-ui/styles/makeStyles';
import classnames from 'classnames';

interface Props extends RouteComponentProps {
  destinations: Destination[]
  fetchDestinations: VoidFunction
}

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    padding: 20,
    overflow: 'auto',
    maxHeight: 'calc(var(--vh, 1vh) * 100)',
  },
  title: {
    marginBottom: 30
  },
  disableScroll: {
    overflow: 'hidden',
  }
});

const Destinations = ({ history, location, fetchDestinations, destinations }: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const { tags: stringifiedString, country } = queryString.parse(location.search)
    // @ts-ignore
    setSelected(country)
    if (!destinations) {
      const tags = typeof stringifiedString === 'string'
        ? stringifiedString.split(',')
        : [];
      fetchDestinations();
    }
  }, [location.search])

  const redirectTo = (country: string | null) => {
    const params = queryString.parse(location.search)
    if (country) {
      params.country = country
    } else {
      params.country = undefined
    }
    history.push(`/destinations?${queryString.stringify(params)}`);
  }

  return (
    <div className={classnames(classes.wrapper, {
      [classes.disableScroll]: selected,
    })}>
      <Typography variant="h3" className={classes.title}>Destinations</Typography>
      {destinations === undefined && <p>LOADER!</p>}
      {destinations && destinations.map(destination =>
        <Item
          key={destination.country}
          data={destination}
          selected={selected === destination.country}
          redirect={redirectTo}
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ reducer: { destinations } }: AppState) => ({
  destinations,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDestinations: () => actions.fetchDestinations(dispatch)
})

export default connect({ mapStateToProps, mapDispatchToProps })(Destinations);