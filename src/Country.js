import React, {useEffect,useState} from 'react';
import "./Country.css";
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function Country(props) {

    const useStyles = makeStyles({
        root: {
          Width: 300,
        //   marginBottom: 10,
        //   marginLeft: 10
        },
        media: {
            width:300,
          height: 140,
        },
      });

    const classes = useStyles();

    return (
        <div className="country">
         <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.flag}
                    title="Country Capital"
                />
                {/* <img className="country__flag" src={props.flag} alt="" /> */}
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    {props.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                   Capital - {props.capital}
                </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                Share
                </Button>
                <Button size="small" color="primary">
                Learn More
                </Button>
            </CardActions>
      </Card>
    </div>
    )
}

export default Country
