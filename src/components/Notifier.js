import React, { Component } from 'react'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';

let openSnackbarFn;
 class Notifier extends Component {
    constructor(props){
    super(props);
    this.state={
        open:false,
        message:'',
    }
    }
      componentDidMount() {
        openSnackbarFn = this.openSnackbar;
      }
      openSnackbar = ({ message }) => {
        this.setState({
          open: true,
          message
        });
      };
    

    handleSnackbarClose = () => {
        this.setState({
          open: false,
          message: ''
        });
      };

     render() {
         
        const message = (
            <span
              id="snackbar-message-id"
              dangerouslySetInnerHTML={{ __html: this.state.message }}
            />
          );

         return (
            <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            message={message}
            onClose={this.handleSnackbarClose}
            open={this.state.open}
            action={[
              <IconButton
                key="close"
                aria-label="close"
                color="inherit"
                onClick={this.handleSnackbarClose}
                
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
            
            
         );
     }
 }
 export function openSnackbar({ message }){
    openSnackbarFn({ message });
  }
 
 export default Notifier;
 