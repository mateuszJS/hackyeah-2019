import queryString from 'query-string';
import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';
import * as actions from '../../store/actions';
import { AppState, connect } from '../../store/configureStore';
import { Destination } from '../../typedef';

interface Props extends RouteComponentProps {
  destinations: Destination[]
  fetchDestinations: VoidFunction,
}
const Destinations = ({ location, fetchDestinations, destinations }: Props) => {
  const { tags: stringifiedString } = queryString.parse(location.search)
  const tags = typeof stringifiedString === 'string'
    ? stringifiedString.split(',')
    : [];

  useEffect(() => {
    fetchDestinations();
  }, [])
  return (
    <div>
      Destinations
      {destinations === undefined && <p>LOADER!</p>}
      {destinations && destinations.map(destination =>
        <p key={destination.country}>{destination.country}</p>
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