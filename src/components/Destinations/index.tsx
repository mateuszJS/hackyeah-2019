import React from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';

const Destinations = ({ location }: RouteComponentProps) => {
  const { tags: stringifiedString } = queryString.parse(location.search)
  const tags = typeof stringifiedString === 'string'
    ? stringifiedString.split(',')
    : [];
  return (
    <div>
      Destinations
      {tags.map(tag => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
};

export default Destinations;