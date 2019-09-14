import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { Dispatch } from 'redux'
import { connect, AppState } from '../../store/configureStore';
import * as actions from '../../store/actions';

interface Props extends RouteComponentProps {
  fetchDestinations: VoidFunction,
}
const Destinations = ({ location, fetchDestinations }: Props) => {
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
      {tags.map(tag => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  console.log({ state });
  return {}
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchDestinations: () => actions.fetchDestinations(dispatch)
})

export default connect({ mapStateToProps, mapDispatchToProps })(Destinations);