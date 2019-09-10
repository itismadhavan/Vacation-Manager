import * as React from "react";
import Grid from '@material-ui/core/Grid';
import NavBar from '../pages/NavBar';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import SaveIcon from '@material-ui/icons/Save';
import MenuItem from '@material-ui/core/MenuItem';

export default class LeaveRequest extends React.Component {

  state = {
    selectedFromDate: new Date(),
    selectedToDate: new Date(),
    reason: '',
    leaveType: '',
    selectedDays: []
  }

  componentWillMount() {
    //this.setState({ selectedFromDate: new Date().toISOString(), selectedToDate: new Date() })
    this.setState({
      selectedDays: [{
        day: this.state.selectedFromDate.toDateString(),
        fh: false,
        sh: false,
        full: true
      }]
    });
  }

  handleLeaveType = () => (event) => {
    this.setState({ leaveType: event.target.value })
  }

  handleFHbtnChange = (event) => {
    let temp = [...this.state.selectedDays];
    temp.forEach((date) => {
      if (date.day === event.target.value) {
        date.fh = true;
        date.sh = false;
        date.full = false;
        return;
      }
    })
    this.setState({ selectedDays: [...temp] });
  }
  handleSHbtnChange = (event) => {
    let temp = [...this.state.selectedDays];
    temp.forEach((date) => {
      if (date.day === event.target.value) {
        date.fh = false;
        date.sh = true;
        date.full = false;
        return;
      }
    })
    this.setState({ selectedDays: [...temp] });
  }
  handleFullDaybtnChange = (event) => {
    let temp = [...this.state.selectedDays];
    temp.forEach((date) => {
      if (date.day === event.target.value) {
        date.fh = false;
        date.sh = false;
        date.full = true;
        return;
      }
    })
    this.setState({ selectedDays: [...temp] });
  }
  handleFromDateChange = (date) => {
    this.setState({ selectedFromDate: new Date(date) }, () => this.handleDateChange());
  }
  handleToDateChange = (date) => {
    this.setState({ selectedToDate: new Date(date) }, () => this.handleDateChange());
  }

  handleReasonChange = (event) => {
    event.preventDefault();
    this.setState({ reason: event.target.value });
  }

  handleDateChange() {
    let diff_in_days = this.date_diff_indays(this.state.selectedFromDate.toDateString(), this.state.selectedToDate.toDateString());
    if (diff_in_days <= 0) {
      this.setState({
        selectedDays: [{
          day: this.state.selectedFromDate.toDateString(),
          fh: false,
          sh: false,
          full: true
        }]
      })
    }
    else if (diff_in_days > 0) {
      let temp = [];
      for (let i = 0; i <= diff_in_days; i++) {
        let result = new Date(this.state.selectedFromDate);
        result.setDate(result.getDate() + i);
        temp = [...temp, {
          day: result.toDateString(),
          fh: false,
          sh: false,
          full: true
        }]
      }
      this.setState({
        selectedDays: [...temp]
      })
    }
  }

  handleFromSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
  }
  date_diff_indays = (date1, date2) => {
    let dt1 = new Date(date1);
    let dt2 = new Date(date2);
    return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate())) / (1000 * 60 * 60 * 24));
  }


  render() {

    const { selectedFromDate, selectedToDate, reason, selectedDays, leaveType } = this.state;
    const leaveTypes = [
      {
        label: 'Paid time off',
        value: 'Paid_Leave',
      },
      {
        label: 'Conference',
        value: 'Conference',
      },
      {
        value: 'Sick_day',
        label: 'Sick day',
      },
      {
        value: 'Working remotely',
        label: 'Working remotely',
      },
    ];
    return (
      <>
        <div className='row' >
          <div style={{ width: '100%' }}>
            <NavBar title='Vacation Manager' />
            {/* <PositionedSnackbar /> */}
          </div>
        </div>
        <div className='row' style={{ marginTop: "15px" }}>
          <div className='container-fluid'>
            <Grid container justify="space-around">
              <Grid item >
                <h4>Request Leave</h4>
                <form onSubmit={this.handleFromSubmit}>
                  <div style={{ margin: 20 }}>
                    <div style={{ margin: 5 }}>
                      <TextField
                        id="standard-select-leaveType"
                        select
                        label="Leave type"
                        value={leaveType}
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleLeaveType('leave')}
                        required
                        fullWidth>
                        {leaveTypes.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div style={{ margin: 5 }}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                          style={{ marginRight: 15 }}
                          required
                          autoOk
                          disableToolbar
                          disablePast
                          variant="inline"
                          format="dd/MM/yyyy"
                          inputVariant="outlined"
                          id="date-picker-fromDate"
                          label="Start date"
                          value={selectedFromDate}
                          minDateMessage="Pick a valid from date"
                          onChange={this.handleFromDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                        <KeyboardDatePicker
                          style={{ marginLeft: 15 }}
                          required
                          autoOk
                          disableToolbar
                          disablePast
                          variant="inline"
                          format="dd/MM/yyyy"
                          inputVariant="outlined"
                          id="date-picker-toDate"
                          label="End date"
                          minDateMessage="Pick a valid end date"
                          minDate={selectedFromDate}
                          value={selectedToDate}
                          onChange={this.handleToDateChange}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </div>
                    <div className="container">
                      {selectedDays.map(date => (
                        <div className="row" key={date.day} style={{ height: 65, margin: 3 }}>
                          <TextField
                            id="standard-read-only-input"
                            label="Date"
                            margin="normal"
                            variant="outlined"
                            value={date.day}
                            InputProps={{
                              readOnly: true,
                            }}
                          />
                          <div style={{ float: "right", margin: 13 }}>
                            <RadioGroup aria-label="leaveType" name="leaveType" style={{ flexDirection: "row" }} >
                              <FormControlLabel value={date.day} control={<Radio checked={date.fh} onChange={this.handleFHbtnChange} />} label="First half" labelPlacement="top" />
                              <FormControlLabel value={date.day} control={<Radio checked={date.sh} onChange={this.handleSHbtnChange} />} label="Second half" labelPlacement="top" />
                              <FormControlLabel value={date.day} control={<Radio checked={date.full} onChange={this.handleFullDaybtnChange} />} label="Full day" labelPlacement="top" />
                            </RadioGroup>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div style={{ margin: 5 }}>
                      <TextField
                        id="standard-multiline-flexible"
                        label="Reason for request"
                        multiline
                        rows="2"
                        margin="normal"
                        value={reason}
                        onChange={this.handleReasonChange}
                        fullWidth
                        variant="outlined"
                      />
                    </div>
                    <Button type="submit" variant="contained" size="medium" color="primary" style={{ backgroundColor: "#9C27B0", marginLeft: '79%' }} >
                      <SaveIcon style={{ marginRight: 5 }} />
                      Create
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </div>
        </div>
      </>
    )
  }
}