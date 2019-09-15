import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import classnames from 'classnames';
import { RouteComponentProps } from 'react-router';
import colors from '../../colors';
import LogoLot from '../../assets/logo_lot.png';
import tagsI18n from '../../tagsI18n';
import BeachPhoto from '../../assets/beach.jpg';
import CashPhoto from '../../assets/cash.jpg';
import MapPhoto from '../../assets/map.jpg';
import RestPhoto from '../../assets/rest.jpg';
import SeePhoto from '../../assets/see.jpg';
import SkyPhoto from '../../assets/sky.jpg';
import PartyPhoto from '../../assets/party.jpg';
import RiverPhoto from '../../assets/river.jpg';

const useStyles = makeStyles({
  filter: {
    background: 'white',
  },
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: colors.baseColor
  },
  logo: {
    height: "80px",
    filter: "drop-shadow(3px 3px 3px #222)"
  },
  wrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "10px"
  },
  item: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40vw',
    height: '40vw',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    color: 'white',
    margin: '8px',
    padding: 15,
    position: 'relative',
    "@media (min-width:600px)": {
      width: "25vw",
      height: "25vw"
    }
  },
  title: {
    textAlign: "left",
    color: "white",
    fontWeight: 600,
    filter: "drop-shadow(3px 3px 3px #222)"
  },
  selected: {
    '& img': {
      filter: 'brightness(1)',
    },
    '& h6': {
      textShadow: '1px 1px 2px #000',
    }
  },
  button: {
    fontWeight: 600,
    width: "50vw",
    margin: "30px auto",
    display: "block",
    padding: "10px 20px",
    background: `linear-gradient(45deg, ${colors.baseColor} 30%, #21CBF3 90%)`,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    "@media (min-width:600px)": {
      padding: '20px 20px',
      width: '25vw',
    }
  },

  subtitle_item: {
    color: 'white',
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    lineHeight: 1.2,
    position: 'relative',
    userSelect: 'none',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    filter: 'brightness(0.4)',
  }
});

const getTranslation = (key: string) => {
  // @ts-ignore
  return tagsI18n[key];
}

const items = Object.keys(tagsI18n)

const photos = {
  hot: SkyPhoto,
  cheap: CashPhoto,
  away: MapPhoto,
  near: RiverPhoto,
  beach: BeachPhoto,
  seesighting: SeePhoto,
  rest: RestPhoto,
  party: PartyPhoto
}

const getImageSrc = (item: string) => {
  // @ts-ignore
  return photos[item]
}

interface State {
  [key: string]: boolean;
}

const initialValue: State = items.reduce(
  (result, text) => ({
    ...result,
    [text]: false
  }),
  {}
);

const Filter = ({ history }: RouteComponentProps) => {
  const classes = useStyles();
  const [selected, setSelected] = useState(initialValue);

  const handleClick = (id: string) => {
    setSelected({
      ...selected,
      [id]: !selected[id]
    });
  };

  const goToDestinations = () => {
    const tags = Object.entries(selected)
      .map(([key, value]) => (value ? key : undefined))
      .filter(item => item)
      .join(",");
    history.push(`/destinations?tags=${tags}`);
  };

  return (
    <div className={classes.filter}>
      <header className={classes.header}>
        <Typography variant="h5" className={classes.title}>
          Select what you like
        </Typography>
        <img className={classes.logo} src={LogoLot} alt={"logo"} />
      </header>
      <div className={classes.wrapper}>
        {items.map(item => (
          <Paper
            className={classnames(classes.item, {
              [classes.selected]: selected[item]
            })}
            onClick={() => handleClick(item)}
            key={item}
          >
            <img className={classes.background} src={getImageSrc(item)} />
            <Typography className={classes.subtitle_item} variant="subtitle1">
              {getTranslation(item)}
            </Typography>
          </Paper>
        ))}
      </div>
      <Button className={classes.button} onClick={goToDestinations}>
        Find best places
      </Button>
    </div>
  );
};

export default Filter;
