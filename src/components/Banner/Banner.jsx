import { makeStyles, Container, Typography } from '@material-ui/core';
import Carousel from './Carousel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: "url(../banner1.png)",
    backgroundSize: "cover",
    width: "100%",
    backgroundPosition: "center",
  }, 
  bannerContent:{
    height: 400,
    display: "flex",
    flexDirection: "column",
    paddingTop: 25,
    justifyContent: "space-around",
  },
  tagLine: {
    display: "flex",
    height: "40%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
  },
  logo: {
    width: "20%",
    margin: "auto",
  }
}));

export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.banner}>
      <Container className={classes.bannerContent}>
        <div className={classes.tagLine}>
            {/* <Typography 
            variant="h2"
            style={{ fontWeight: "bold", 
                     marginBottom: 15,
                     fontFamily: "Montserrat",}}>
                        CRYPTO ASSISTANT
            </Typography> */}
            <img src="../logo4.png" alt="logo" className={classes.logo} />
            <Typography 
            variant="h6"
            style={{ fontWeight: "subtitle2", 
                     marginBottom: 15,
                     fontFamily: "Montserrat",}}>
                        Get all the infomation regarding your favorite Crypto
            </Typography>
        </div>
        <Carousel />
      </Container>
    </div>
  );
};
