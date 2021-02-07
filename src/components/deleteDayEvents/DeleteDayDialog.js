import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {  useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { deleteDayEvents } from '../../stores/callendarSlice'
import moment from 'moment'
import Utils from '../../utils'


const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    margin: 'auto',
    width: 'fit-content',
  },
  appBar: {
    position: 'relative',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function DeleteDayDialog({events, open, setOpen}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false)
  }

   const handleDelete = () => {
    dispatch(deleteDayEvents(events))
    handleClose()
  }



  return (
    <Dialog
      maxWidth={'lg'}
      open={open}
      onClose={handleClose}
      disableBackdropClick
      aria-labelledby="event-dialog-title"
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Delete Day Events
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent>
          {events.map((event,i)=>(
              <div style={{background:event.color, margin:"2px", fontSize: "medium", padding:"2px", borderRadius:"5px", color:Utils.invertColor(event.color, true)}} key={i}>{moment(event.date).format("HH:mm")} - {event.title}</div>
          ))}
          
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDelete} color="primary">
          Delete All
          </Button>
      </DialogActions>
    </Dialog>
  );
}