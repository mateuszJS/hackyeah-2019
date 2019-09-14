import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router';
import queryString from 'query-string';
// import ImageExample from '../../assets/filter-example.jpeg';

const useStyles = makeStyles({
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50vw',
    height: '50vw',
    // backgroundImage: `url("${ImageExample}")`,
    background: 'black',
    color: 'white',
    border: '1px solid white',
  },
  title: {
    textAlign: 'center',
    margin: '40px 20px 20px',
  },
  selected: {
    background: 'gray',
  },
  button: {
    width: '100%',
    marginTop: 30,
    padding: '10px 30px',
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
  }
});

const items = [
  'above-20-degrees',
  'cheap',
  'mountains',
  'beach-and-sea',
]

interface State {
  [key: string]: boolean
}

const initialValue: State = items.reduce((result, text) => ({
  ...result,
  [text]: false,
}), {});

const Filter = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(initialValue);

  const handleClick = (id: string) => {
    setSelected({
      ...selected,
      [id]: !selected[id],
    })
  }

  const goToDestinations = () => {
    const tags = Object.entries(selected)
      .map(([key, value]) => value ? key : undefined)
      .filter(item => item)
      .join(',')
    history.push(`/destinations?tags=${tags}`)
  };

  return (
    <div>
      <Typography variant="h4" className={classes.title}>Select what you like</Typography>
      <div className={classes.wrapper}>
        {items.map(item => (
          <div
            className={classnames(classes.item, {
              [classes.selected]: selected[item],
            })}
            onClick={() => handleClick(item)}
            key={item}
          >
            <Typography variant="subtitle1">
              {item}
            </Typography>
          </div>
        ))}
      </div>
      <Button className={classes.button} onClick={goToDestinations}>
        Find best places
      </Button>
    </div>
  );
};

export default Filter;