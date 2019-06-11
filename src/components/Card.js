import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';

const useStyles = makeStyles({
  card: {
    width: 270,  
    marginBottom: 50,
  }, 
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function WeatherCard({temp, date,unit}) {
  const classes = useStyles();
  Moment.globalFormat = 'D MMM YYYY';

  return (
    <Card className={classes.card} raised>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Temp:
        </Typography>
        <Typography variant="h5" component="h2">
        {temp}{unit}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         Date:
        </Typography>
        <Typography variant="body2" component="p">
        <Moment unix>{date}</Moment>
        </Typography>
      </CardContent>
      
    </Card>
  );
}