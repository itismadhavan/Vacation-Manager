import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import SaveIcon from '@material-ui/icons/Save';
import AddIcon from '@material-ui/icons/AddCircle';

export default class LeaveTypeEditor extends React.Component {
  state = {
    dataRows: [],
    modalOpen: false,
    modalTitle: '',
    item: {}
  }
  componentWillMount() {
    const rows = [
      this.createData('Paid time off', true, true, 20, true, "Red"),
      this.createData('Conference', false, true, 20, true, "Red"),
      this.createData('Sick off', true, true, 20, true, "Red"),
      this.createData('Working remotely', true, false, 20, true, "Red"),
    ];
    this.setState({ dataRows: [...rows] });
  }

  loginModalRef = ({ handleShow }) => {
    this.showModal = handleShow;
  }
  handleClickOpen = () => {
    this.setState({
      modalOpen: true,
      modalTitle: "Create leave type",
      item: this.createData('Test', true, true, 20, true, "Red")
    }, () => this.showModal());
  }

  createData = (name, isActive, isApprovalReq, daysPerYear, allowHalfDays, color) => {
    return { name, isActive, isApprovalReq, daysPerYear, allowHalfDays, color };
  }
  render() {
    const { dataRows, modalOpen, modalTitle, item } = this.state;
    return (
      <>
        <Paper>
          <Button variant="contained" color="primary" style={{ float: "right", marginBottom:5, backgroundColor:"#52d869" }} onClick={this.handleClickOpen}>
          <AddIcon style={{ marginRight: 5 }} />
            Create type
          </Button>
          <Table size='medium'>
            <TableHead>
              <TableRow>
                <TableCell align="right">Active</TableCell>
                <TableCell>Type</TableCell>
                <TableCell align="center">Days&nbsp;Per&nbsp;Year</TableCell>
                <TableCell align="center">Approval&nbsp;Required</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dataRows.map(row => (
                <TableRow key={row.name}>
                  <TableCell padding="checkbox">
                    <IOSSwitch
                      checked={row.isActive}
                      value={row.name}
                      inputProps={{ 'aria-label': 'primary checkbox' }}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="center">{row.daysPerYear}</TableCell>
                  <TableCell align="center">{row.isApprovalReq ? 'Yes' : 'No'}</TableCell>
                  <TableCell align="center">
                    <Fab size="small" color="secondary" aria-label="edit">
                      <EditIcon />
                    </Fab>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {modalOpen ?
            <LeaveTypeEditorModal ref={this.loginModalRef} item={item} modalOpen={modalOpen} modalTitle={modalTitle}></LeaveTypeEditorModal>
            : <></>}
        </Paper>
      </>
    )
  }
}


class LeaveTypeEditorModal extends React.Component {

  state = {
    modalOpen: false,
    item: undefined
  }
  componentDidUpdate() {
    // 
  }
  handleShow = () => {
    this.setState({ modalOpen: true });
  }
  handleClose = () => {
    this.setState({ modalOpen: false })
  }
  handleNameChange = () => {
    this.setState({ item: this.props.item }, () => console.log(this.state.item));

  }



  render() {
    const { modalOpen, item, modalTitle } = this.props
    return (
      <>
        <Dialog open={this.state.modalOpen} onClose={this.handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">{modalTitle}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              variant="outlined"
              onChange={this.handleNameChange}
              id="nameTxtFld"
              label="Name"
              type="text" fullWidth />

            <FormGroup style={{ alignItems: 'start' }}>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={item.isApprovalReq}
                    value="approvalNeeded"
                    inputProps={{ 'aria-label': 'primary checkbox' }} />}
                label="Approval required" labelPlacement="start" />
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={item.allowHalfDays}
                    value="mass"
                    inputProps={{ 'aria-label': 'primary checkbox' }} />}
                label="Allow half days&nbsp;&nbsp;&nbsp;&nbsp;" labelPlacement="start" />
            </FormGroup>
            <FormGroup row>
              <FormControlLabel
                control={
                  <IOSSwitch
                    checked={false}
                    value="mass"
                    inputProps={{ 'aria-label': 'primary checkbox' }} />}
                label="Unlimited days&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" labelPlacement="start" />
              <TextField
                style={{ width: 110, marginLeft: 30, marginTop: -8 }}
                margin="dense"
                variant="outlined"
                id="noOfDaysTxtFld"
                value={item.daysPerYear}
                label="No. of days"
                type="number" />
            </FormGroup>

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} variant="contained" size="small" color="secondary" style={{ backgroundColor: "#9C27B0" }}>
              <SaveIcon style={{ marginRight: 5 }} />
              Save
              </Button>
            <Button onClick={this.handleClose} color="primary">
              Cancel
              </Button>
          </DialogActions>
        </Dialog>
      </>
    )
  }
}
LeaveTypeEditorModal.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  modalOpen: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired
}


const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});