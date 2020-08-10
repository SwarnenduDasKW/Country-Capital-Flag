import React, { useEffect, useState } from "react";
import "./Country.css";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

function Country(props) {
  return (
    <div className="country">
      <img className="country__flag" src={props.flag} alt={props.name} />
      <h2 className="country__name">{props.name}</h2>
      <h3 className="country__capital">{props.capital}</h3>
    </div>
  );
}

export default Country;
