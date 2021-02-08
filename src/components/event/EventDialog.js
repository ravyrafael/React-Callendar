//Ability to add a new "reminder" (max 30 chars) for a user entered day and time. Also, include a city, and color


import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux'
import useForm from '../../@hooks/useForm.js'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import Avatar from '@material-ui/core/Avatar';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import weatherApi from '../../services/weatherApi'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { clearEvent } from '../../stores/eventSlice'
import { handleCallendarEvent, deleteCallendarEvent } from '../../stores/callendarSlice'
import moment from 'moment'


const useStyles = makeStyles((theme) => ({
  form: {
    '& > div':{
      margin:'10px 0'
    }
  },
  appBar: {
    position: 'relative',
  },
  textField: {
    width: '40px',
  },
  formControl: {
    marginTop: theme.spacing(2),
    minWidth: 120,
  },
  formControlLabel: {
    marginTop: theme.spacing(1),
  },
}));

export default function EventDialog() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const event = useSelector(({ event }) => event)
  const { form, handleChange, setForm, setInForm } = useForm(event.event)

  const handleClose = () => {
    dispatch(clearEvent())
  }

  const handleEvent = () => {
    dispatch(handleCallendarEvent(form))
    handleClose()
  }

  const handleDelete = () => {
    dispatch(deleteCallendarEvent(form.id))
    handleClose()
  }

  React.useEffect(() => {
    
    const getWeather = async () => {
      if (form.city && form.date) {
        let formDate = moment(moment(form.date).format('YYYY-MM-DD'))
        let dayInFuture = formDate.diff(moment(moment().format('YYYY-MM-DD')), "days") + 1
        console.log(dayInFuture)
  
        if (dayInFuture > 0 && dayInFuture <= 10) {
          let { data } = await weatherApi.get(form.city, dayInFuture)
          console.log(formDate.format('YYYY-MM-DD'))
          let dateForecast = data.forecast.forecastday.find(forecast => forecast.date === formDate.format('YYYY-MM-DD'))
          console.log(dateForecast)
          if (dateForecast) {
            setInForm("condition", dateForecast.day.condition.text)
            setInForm("conditionIcon", dateForecast.day.condition.icon)
          }
          else{
            setInForm("condition", "")
            setInForm("conditionIcon", "")
          }
        }
      }
    }
    getWeather()
  }, [form.date, form.city, setInForm])

  React.useEffect(() => {
    
    setForm(event.event)
  }, [event.event, setForm])
  const isValidForm = ()=>{
    return form.city && form.title && form.description && form.date && form.color
  }

  return (
    <Dialog
      data-testid="event-dialog"
      id="event-dialog"
      open={event.dialogOpen}
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
            {event.dialogTitle}
          </Typography>
        </Toolbar>
      </AppBar>

      <DialogContent>

        <Grid container >
          <Grid item xs={12} md={6} className={classes.form}>
            <TextField id="title" name="title" label="Title" onInput={(e) => {
              e.target.value = (e.target.value).slice(0, 30)
            }} value={form.title} onChange={handleChange} />
            <TextField id="description" name="description" label="Description" rows={4} multiline rowsMax={4} value={form.description} onChange={handleChange} />
            <TextField id="date" type='datetime-local' name="date" label="Date" value={moment(new Date(form.date)).format('YYYY-MM-DDTHH:mm')} onChange={handleChange} />
          </Grid>
          <Grid item container xs={12} sm={6}>
            <Grid item xs={12} className={classes.form}>
              <TextField id="city" name="city" label="City" value={form.city} onChange={handleChange} />
              <TextField id="color" className={classes.textField} type="color" name="color" label="Color" value={form.color} onChange={handleChange} />
              <Grid item xs={12}>
                {form.conditionIcon && <Avatar alt="forecast icon" src={form.conditionIcon} />}
                <div>{form.condition}</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button id="save" onClick={handleEvent} disabled={!isValidForm()} color="primary">
          Save
          </Button>
        {form.id && <Button id="delete" onClick={handleDelete} color="primary">
          delete
          </Button>}
      </DialogActions>
    </Dialog>
  );
}