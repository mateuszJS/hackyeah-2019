import React from 'react';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
import { makeStyles } from '@material-ui/styles';
//import classnames from 'classnames';
import colors from '../../colors';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  destination: {

  },

  title: {
    textAlign: 'center',
    margin: '40px 20px 20px',
    color: colors.baseColor,
    fontWeight: 600,
  },

});


const Destinations = ({ location }: RouteComponentProps) => {
  const classes = useStyles();
  const { tags: stringifiedString } = queryString.parse(location.search)
  const tags = typeof stringifiedString === 'string'
    ? stringifiedString.split(',')
    : [];
  return (
    <div className={classes.destination}>
      <Typography variant="h4" className={classes.title}>Destinations</Typography>

      {tags.map(tag => (
        <p key={tag}>{tag}</p>
      ))}
    </div>
  );
};

export default Destinations;