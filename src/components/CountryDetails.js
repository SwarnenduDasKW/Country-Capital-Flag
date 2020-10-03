import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import MapChart from "./MapChart";
import ReactTooltip from "react-tooltip";
import AllCountries from "../data/AllCountriesLight.json";
import CountryCover from "../data/CountryCover.json";
import ComingSoonImage from "../images/imgcomingsoon.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function CountryDetails(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = useState("");
  const [objCountry, setObjCountry] = useState();
  const [coverImage, setCoverImage] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("CountryDetails --> alpha3code: ", props.alpha3code);
    const objCountry = AllCountries.find(
      (element) => element.alpha3Code === props.alpha3code
    );
    console.log("CountryDetails --> objCountry: ", objCountry);
    setObjCountry(objCountry);
    const coverImg = CountryCover.find(
      (c) => c.alpha3Code === props.alpha3code
    );
    console.log("CountryDetails --> coverImg: ", coverImg);
    if (!coverImg) {
      setCoverImage(ComingSoonImage);
    } else setCoverImage(coverImg.imgsrc);
  }, []);

  return (
    <div className="countrydetails">
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={objCountry?.flag} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={`Capital: ${objCountry?.capital} | Currency: ${objCountry?.currencies[0].name}`}
          subheader={`Region: ${objCountry?.region} | Sub Region: ${objCountry?.subregion}`}
        />
        <CardMedia className={classes.media} image={coverImage} title="" />
        <CardContent>
          <MapChart alpha3code={props.alpha3code} />
          <ReactTooltip>{content}</ReactTooltip>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>{/* Add some details here */}</CardContent>
        </Collapse>
      </Card>
    </div>
  );
}

export default CountryDetails;
