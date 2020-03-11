import { ZOHO } from '../vendor/ZohoSDK';

export async function GetZohoData() {
      return new Promise((resolve,reject) =>{
        ZOHO.embeddedApp.on("PageLoad",async function(data){
         //  console.log(data); 
          
           const EntityId = data.EntityId[0];
           const Entity = data.Entity;
          //console.log(Entity) 
         const userDetails = await ZOHO.CRM.CONFIG.getCurrentUser();
          const Id = userDetails.id; 
          //console.log(Id);
          const Name = userDetails.full_name;
          //console.log(Name);
          //console.log(userDetails)
          const getUser = await ZOHO.CRM.API.getUser({ID:Id}) 
          //console.log(getUser);
          const getuserMobile = getUser.users[0].mobile;
          //console.log(getuserMobile);
          const getrecord = await ZOHO.CRM.API.getRecord({Entity:Entity, RecordID:EntityId})
          //console.log(getrecord); 
           const leadname = getrecord.data[0].Full_Name;
           //console.log(leadname);
           const leadmobile = getrecord.data[0].Mobile;
           //console.log(leadmobile);
           const fromName= Name+'('+getuserMobile+')';
           //console.log(fromName);
           const toName = leadname+'('+leadmobile+')';
           //console.log(toName);
          
           const from=[{value:getuserMobile,label:fromName}];
           const to=[{value:leadmobile,label:toName}];

           resolve({from,to});
        });
        ZOHO.embeddedApp.init();
      });
}

