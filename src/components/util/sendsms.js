import { ZOHO } from '../vendor/ZohoSDK';

export async function sendMessage(fromNumber,toNumber,message){
    var func_name = "sampleproject__sendmessage";
    var req_data ={
      "arguments": JSON.stringify({
          "fromNumber" : fromNumber,
          "toNumber" : toNumber,
          "message" : message
      })
    };
    // ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
    // .then(function(data){
    //     console.log(data)
    // });

    const smsResult = await ZOHO.CRM.FUNCTIONS.execute(func_name, req_data)
    const outputMessage = smsResult.details.output;
    const responseDetails = JSON.parse(outputMessage)
    const messageStatus = responseDetails.status;
    const messages = responseDetails.message;
    return{messageStatus,messages};
};
