import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function MediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="140"
        image="client/src/static/images/CourseCards/linuxfundamentals.png"
        alt="Linux Fundamentals"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Linux Fundamentals
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Linux Fundamentals. This module covers the fundamentals required to work comfortably with the Linux operating system and shell.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Enrol</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}