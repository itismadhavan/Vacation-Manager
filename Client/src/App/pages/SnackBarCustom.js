import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close'
class PositionedSnackbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      vertical: 'top',
      horizontal: 'right'
    }
  }

  componentDidMount() {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }
  render() {
    const { vertical, horizontal, open } = this.state;
    const { name, photo } = this.props.user;
    return (
      <Snackbar
        style={{ minWidth: 250 }}
        anchorOrigin={{ vertical, horizontal }}
        key={`${vertical},${horizontal}`}
        open={open}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}>
        <SnackbarContent
          action={[
            <IconButton key="close" aria-label="Close" color="inherit" onClick={this.handleClose}>
              <CloseIcon />
            </IconButton>,
          ]}
          message={<div id="message-id">
            <img style={{ width: 30, height: 30, marginRight: 10 }} src={photo} alt="" />
            Logged in as {name}
          </div>}>
        </SnackbarContent>
      </Snackbar>
    )
  }
}

export default PositionedSnackbar;