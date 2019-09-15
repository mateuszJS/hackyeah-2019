import React from 'react';
import LogoLot from '../../assets/logo_lot.png';
import { makeStyles } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import colors from '../../colors';

const useStyles = makeStyles({
  header: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    background: colors.baseColor,
    width: '100%',
    marginBottom: 40,
  },
  logo: {
    height: "80px",
    filter: "drop-shadow(3px 3px 3px #222)"
  },
  title: {
    textAlign: "left",
    color: "white",
    fontWeight: 600,
    filter: "drop-shadow(3px 3px 3px #222)"
  },
});

interface Props {
  children: React.ReactNode
}
const Nav = ({ children }: Props) => {
  const classes = useStyles();
  return (
    <header className={classes.header}>
      <Typography variant="h5" className={classes.title}>
        {children}
      </Typography>
      <img className={classes.logo} src={LogoLot} alt={"logo"} />
    </header>
  );
};

export default Nav;