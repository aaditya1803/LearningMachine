import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { getAuth } from "firebase/auth";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import androidstudiologo from '/home/aadi/project/LearningMachine/client/src/static/images/CourseCards/android-studio.png'
import ubuntulogo from '/home/aadi/project/LearningMachine/client/src/static/images/CourseCards/ubuntu.png'
import vscodelogo from '/home/aadi/project/LearningMachine/client/src/static/images/CourseCards/vscode.jpeg'
import { useCookies } from 'react-cookie'

export default function MediaCard() {

  let navigate = useNavigate();
  const [cookies, setCookies] = useCookies('labuid')    

  function getuid() {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      console.log(user.uid);
      return user.uid
    }
    else {
      auth = getAuth();
      user = auth.currentUser;
      if (user) {
        console.log(user.uid);
        return user.uid
    }
  }
}

  function launchalab(thelab) {

    const baseurl = "10.0.3.12:5000/labs/launchacontainer"



    if(thelab==='vscode' || thelab==='ubuntu') {
      console.log(thelab);
      
      //get current uid
      const uid = getuid();
      //console.log(uid)

      //insert axios request here
      axios.post(`http://10.0.3.12:5000/labs/launchacontainer/`, {
        uid: uid,
        thelab: thelab
      }).then((response) => {
        console.log('lab create axios post: '+response)

        //getting back container's port number
        const assignedport = response.data.containername
        setCookies('assignedport', assignedport, {path: '/'})
      })
      //set cookie with labuid
      const labuid = uid + '_' + thelab
      setCookies('labuid', labuid, {path: '/'} )

      toast.error('Please wait, your lab instance will be ready in 10 seconds', {autoClose: 10000,});
      setTimeout(function(){
        navigate('/lab')
    },10000)

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
        image={ubuntulogo}
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
      </CardActions>
    </Card>
    </Grid>

    <Grid item xs={4}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image={vscodelogo}
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
      </CardActions>
    </Card>
    </Grid>

    

    </Grid>
    </>
  );
}