import React, { useRef, useLayoutEffect, useState, useEffect, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/styles';
import { Destination } from '../../typedef';
import classnames from 'classnames';
import DelhiPhoto from '../../assets/Delhi.jpg';
import TokyoPhoto from '../../assets/Tokyo.jpg';
import NewYorkPhoto from '../../assets/NewYork.jpg';
import WarsawPhoto from '../../assets/Warsaw.jpg';
import TelAvivPhoto from '../../assets/TelAviv.jpg';
import DefaultPhoto from '../../assets/Default.jpg';
import ThermoIcon from './ThermoIcon';
import CurrencyIcon from './CurrencyIcon';

const mapIataToPhoto = {
  DEL: DelhiPhoto,
  TLV: TelAvivPhoto,
  NRT: TokyoPhoto,
  WAW: WarsawPhoto,
  JFK: NewYorkPhoto,
};

const mapIataToColor = {
  DEL: '#ffc100',
  TLV: 'rgb(189, 168, 236)',
  NRT: 'rgb(173, 37, 37);',
  WAW: 'rgb(114, 200, 206)',
  JFK: '#ffb25e',
}

const mapIataToColorSecondary = {
  DEL: 'white',
  NRT: 'rgb(29, 10, 3)',
}

const getPhotoSrc = (iata: string): string => {
  console.log(iata)
  // @ts-ignore
  return mapIataToPhoto[iata] || DefaultPhoto
}

const getColor = (iata: string): string => {
  // @ts-ignore
  return mapIataToColor[iata] || 'rgb(154, 107, 128)'
}

const getColorSecondary = (iata: string): string => {
  // @ts-ignore
  return mapIataToColorSecondary[iata] || '#48374c'
}

const useStyles = makeStyles({
  wrapper: {
    position: 'relative',
    height: 120,
    padding: 12,
    overflow: 'hidden',
    transition: 'all 0.4s ease',
  },
  background: {
    position: 'absolute',
    top: '-20vw',
    left: 0,
    width: '100%',
    transition: 'top 0.4s ease',
  },
  title: {
    position: 'absolute',
    fontFamily: "'Squada One', cursive",
    textShadow: '-1px 2px 1px rgba(0,0,0,0.8)',
    color: (props: Props) => getColor(props.data.cities[0].iata),
  },
  subtitle: {
    position: 'absolute',
    top: 62,
    left: 15,
    fontSize: 18,
    fontWeight: 500,
    color: (props: Props) => (props.selected && props.data.cities[0].iata === 'DEL') ? '#6f0000' : getColorSecondary(props.data.cities[0].iata),
    transition: 'color 1s ease',
  },
  active: {
    position: 'absolute',
    width: '100vw',
    height: 'calc(var(--vh, 1vh) * 100)',
    top: 0,
    left: 0,
  },
  placeholder: {
    height: 120,
    marginBottom: 25,
    flexShrink: 0,
  },
  infoPanel: {
    display: 'flex',
    flexDirection: 'column',
    // justifyContent: 'space-between',
    position: 'absolute',
    top: '67vw', // height of image + 1
    left: 0,
    height: 'calc(var(--vh, 1vh) * 100 - 67vw)', // height of image + 1
    width: '100vw',
    background: 'white',
    padding: 20,
    // borderBottomLeftRadius: 0,
    // borderBottomRightRadius: 0,
    // borderRadius: '10 10 0 0',
  },
  backgroundExpanded: {
    top: 0,
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '5px 0',
    color: '#444',
  },
  chip: {
    marginRight: 10,
    marginTop: 10,
    backgroundColor: (props: Props) => getColor(props.data.cities[0].iata),
    color: 'white',
  },
  button: {
    marginTop: 'auto',
    color: 'white',
    backgroundColor: (props: Props) => getColor(props.data.cities[0].iata),
  },
  list: {
    paddingLeft: 25,
    '& li': {
      color: '#444',
      lineHeight: 1.5,
      fontSize: 14,
      paddingBottom: 10,
    },
  },
});

interface Props {
  data: Destination
  selected: boolean
  redirect: (data: string | null) => void
}

interface DynamicStyles {
  position?: string
  left?: number
  top?: number
  width?: number
  zIndex?: 2
  height?: number
  borderRadius?: 0
}

interface ElementBoundaries {
  x: number
  y: number
  width: number
}

const Item = (props: Props) => {
  const { data, selected, redirect } = props;
  const classes = useStyles(props);
  const [styles, setStyles] = useState<DynamicStyles | null>(null);
  const normalStyles = useRef<ElementBoundaries>(null)

  const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    if (selected) {
      // @ts-ignore
      const { x, y, width } = wrapperRef.current.getBoundingClientRect()
      // @ts-ignore
      normalStyles.current = { x, y, width };
      setStyles({
        position: 'fixed',
        top: y,
        left: x,
        width,
        zIndex: 2,
        borderRadius: 0,
      });
    }

    if (!selected && styles && styles.left === 0 && normalStyles.current) {
      setStyles({
        position: 'fixed',
        top: normalStyles.current.y,
        left: normalStyles.current.x,
        width: normalStyles.current.width,
        zIndex: 2,
        borderRadius: 0,
      });

      // @ts-ignore
      normalStyles.current = null
    }
  }, [selected])

  useEffect(() => {
    if (styles && styles.left !== 0 && normalStyles.current) {
      setStyles({
        position: 'fixed',
        width: window.innerWidth,
        height: window.innerHeight,
        top: 0,
        left: 0,
        zIndex: 2,
      });
    }
  }, [styles])

  const handleTransitionEnd = () => {
    if (normalStyles.current === null && styles !== null) {
      setStyles(null);
    }
  }

  const DetailsPanel = useMemo(() => (
    <div className={classes.infoPanel}>
      <div className={classes.row}>
        <ThermoIcon />
        <Typography color="inherit" variant="subtitle1">{data.annualTemp}°C</Typography>
      </div>
      <div className={classes.row}>
        <CurrencyIcon />
        <Typography color="inherit" variant="subtitle1">{data.currency}</Typography>
      </div>
      <div className={classes.row}>
        {data.cities[0].tags.map(tag => (
          <Chip
            label={tag}
            className={classes.chip}
            color="inherit"
          />
        ))}
      </div>
      <ul className={classes.list}>
        <li>This city never sleeps. It is a center of concerts, events and festivals.</li>
        <li>Variety of places and culture. This place connects and inspire people.</li>
        <li>City full of monumental buildings and historic relics.</li>
      </ul>
      <Button className={classes.button} disableRipple>Let's check flights</Button>
    </div>
  ), []);

  const handleOnClick = () => {
    if (!selected) {
      redirect(data.country)
    }
  }

  return (
    <div className={classes.placeholder}>
      <Paper
        className={classes.wrapper}
        // @ts-ignore
        style={styles || undefined}
        onTransitionEnd={handleTransitionEnd}
        onClick={handleOnClick}
        ref={wrapperRef}
      >
        <img
          className={classnames(classes.background, {
            [classes.backgroundExpanded]: !!normalStyles.current,
          })}
          src={getPhotoSrc(data.cities[0].iata)}
        />
        <Typography
          className={classes.title}
          variant="h3"
        >
          {data.cities[0].city}
        </Typography>
        <Typography
          className={classes.subtitle}
          variant="subtitle1"
        >
          {data.country}
        </Typography>
        {styles && DetailsPanel}
      </Paper>
    </div>
  );
};

export default Item;