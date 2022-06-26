import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


export default function MediaCard() {

  function launchalab(thelab) {

    const baseurl = "localhost:5000/labs"

    if(thelab==='ubuntu') {
      console.log(thelab);

    }
    if(thelab==='android-studio') {
      console.log(thelab);
    }
    if(thelab==='vscode') {
      console.log(thelab);
    }
  }

  return (
    <>
    <Grid container spacing={2}>

    <Grid item xs={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="src/static/images/CourseCards/linuxfundamentals.png"
        alt="Ubuntu Machine"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Ubuntu Machine
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Access your personal cloud ubuntu machine with preinstalled applications! 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => launchalab('ubuntu')}>Launch</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="src/static/images/CourseCards/linuxfundamentals.png"
        alt="VScode"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Visual Studio Code
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Access a preconfigured Visual Studio Code ready to use on demand! 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => launchalab('vscode')}>Launch</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="src/static/images/CourseCards/linuxfundamentals.png"
        alt="Android Studio"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Android Studio
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Access a preconfigured Android Studio ready to use on demand! 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => launchalab('android-studio')}>Launch</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
    </Grid>

    </Grid>
    </>
  );
}