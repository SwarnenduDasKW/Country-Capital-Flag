import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import clsx from "clsx";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MapChart from "./MapChart";
import { Tooltip } from "react-tooltip";
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
  const [coverImage, setCoverImage] = useState(ComingSoonImage);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    console.log("CountryDetails --> alpha3code: ", props.alpha3code);
    const objCountry = AllCountries.find(
      (element) => element.alpha3Code === props.alpha3code || element.cca3 === props.alpha3code
    );
    console.log("CountryDetails --> objCountry: ", objCountry);
    setObjCountry(objCountry);

    // Try to find in CountryCover first
    const coverImg = CountryCover.find(
      (c) => c.alpha3Code === props.alpha3code || c.cca3 === props.alpha3code
    );

    if (coverImg) {
      setCoverImage(coverImg.imgsrc);
    } else if (objCountry) {
      // Use Lorem Picsum with a seed based on country name for consistent images
      const countryName = objCountry.name;
      const seed = countryName.toLowerCase().replace(/\s+/g, '-');
      const picsumUrl = `https://picsum.photos/seed/${seed}/800/600`;
      console.log("CountryDetails --> picsumUrl: ", picsumUrl);
      setCoverImage(picsumUrl);
    } else {
      setCoverImage(ComingSoonImage);
    }
  }, [props.alpha3code]);

  if (!objCountry) {
    return <div>Loading country details...</div>;
  }

  return (
    <div className="countrydetails">
      <Card className={classes.root}>
        <CardHeader
          avatar={<Avatar className={classes.avatar} src={objCountry?.flag || objCountry?.flags?.png} />}
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={`${objCountry?.name || 'N/A'} (${objCountry?.alpha3Code || props.alpha3code})`}
          subheader={`Capital: ${objCountry?.capital || 'N/A'} | Currency: ${objCountry?.currencies?.[0]?.name ||
            (objCountry?.currencies && Object.values(objCountry.currencies)[0]?.name) ||
            'N/A'
            } | Region: ${objCountry?.region || 'N/A'}`}
        />
        <CardMedia className={classes.media} image={coverImage} title="" />
        <CardContent>
          <MapChart alpha3code={props.alpha3code} />
          <Tooltip id="my-tooltip" />
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
