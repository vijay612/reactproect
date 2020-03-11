import React, { Component } from 'react'
import './App.css';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import AsyncSelect from 'react-select/async';
import {sendMessage} from './components/util/sendsms';
import Notifier, {openSnackbar} from './components/Notifier';
    
export default class App extends Component {
  constructor(props){
  super(props);
  this.state = {
    
    fromselectedOption:'',
    toselectedOption:'',
    textareaValue: ''
  }
  }
  handleButtonClick=async()=>{
    
    const outputMessage = await sendMessage(
      this.state.fromselectedOption.value,
      this.state.toselectedOption.value,
      this.state.textareaValue,
      );

       if (outputMessage.messageStatus === 'queued') {
        openSnackbar({
          message: 'Message Sent'
        });
      } else {
        openSnackbar({
          message: outputMessage.messages
        });
      }

  };
  fromhandleChange = (fromselectedOption) => {
    this.setState({ fromselectedOption });
  };
   
  
  tohandleChange = (toselectedOption) => {
    this.setState({ toselectedOption });   
  };
   handleOnChange =(e) => {
      this.setState({
      textareaValue: e.target.value
    });
  }
   render() {
    const data =this.props.data;
    const from= data.from;
    const to = data.to; 
    //console.log(data,);
     //console.log(from);

         const fromfilterdata = (inputValue) => {
           return from.filter(i =>
             i.label.toLowerCase().includes(inputValue.toLowerCase())
           );
         };
         const fromloadOptions = (inputValue, callback) => {
       
           callback(fromfilterdata(inputValue));
         
       };
     
       const tofilterdata = (inputValue) => {
         return to.filter(i =>
           i.label.toLowerCase().includes(inputValue.toLowerCase())
         );
       };
       const toloadOptions = (inputValue, callback) => {
     
         callback(tofilterdata(inputValue));
       
     };
     
    return (
     <div className="App">
       <div>
       <Notifier/>
 
      <form>
        <table>
          <tbody>
            <tr className="from">
              <td><label htmlFor="from">From</label></td>
              <td>
            <AsyncSelect
              cacheOptions
                loadOptions={fromloadOptions}
              defaultOptions
              onChange={this.fromhandleChange}
            />
              </td>
            </tr>   
            <tr className="to">
            <td><label htmlFor="to">To</label></td>
            <td>
            <AsyncSelect
              cacheOptions
              loadOptions={toloadOptions}
              defaultOptions
              onChange={this.tohandleChange}
            />
              </td> 
            </tr>
            <tr className="message">
            <td><label htmlFor="message">Message</label></td> 
            <td>  
            <TextareaAutosize 
            aria-label="minimum height" 
            value={this.state.textareaValue}
            onChange={this.handleOnChange}
            rowsMin={3} />
            </td>
            </tr>
            </tbody>
            </table>
            <Button 
            variant="contained" 
            color="primary"
            onClick={this.handleButtonClick}
            >
                Send
            </Button>
           
      </form>
      </div>
    </div>
    );
  }
}

