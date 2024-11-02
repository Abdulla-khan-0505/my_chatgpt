let prompt =document.querySelector("#prompt");
let container =document.querySelector(".container");
let btn = document.querySelector("#btn");
let chatContainer = document.querySelector(".chat_container");
let userMessage =null;
let Api_Url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAcXeLXNIntJ8mwmtBwE0UnYOKZp5NmIxI';
function createChatBox(html,className){
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML=html;
    return div;
}
async  function getApiResponse(aiChatBox){
    let textelement = aiChatBox.querySelector(".text");
    try{
       let response = await fetch(Api_Url,{
        method : "post",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({ 
            contents:[
                {"role": "user",
                    "parts":[{text: userMessage}]}]
                
            
           
        })
    })
    let data =await response.json();
    
   let apiResponse= data?.candidates[0].content.parts[0].text;
   
   textelement.innerText=apiResponse;
   
}
    catch(error){
        console.log(error);

    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none";
    }
}
function showLoading(){
    let html=`<div class="img">
                <img src="ai.png" alt="" width="50">
    
                </div>
                <p class="text"> </p>
                <img height="50px" class="loading"  src="loading_GIF.gif" alt="">
                `
                let aiChatBox= createChatBox(html,"ai-chat-box"); 
                
                chatContainer.appendChild(aiChatBox);
                getApiResponse(aiChatBox) 
}

btn.addEventListener("click",()=>{
    userMessage=prompt.value;
    if(userMessage==""){
        container.style.display="flex";
    }
    else{
        container.style.display="none";
    }
   if(!userMessage)return;
   let html =` <div class="img">
            <img src="user.png" alt="" width="50">

            </div>
            <p class="text"> </p>`;


     let userChatBox= createChatBox(html,"user-chat-box");     
     userChatBox.querySelector(".text").innerText= userMessage;
 
     chatContainer.appendChild(userChatBox);
     prompt.value="";
      setTimeout(showLoading,500);


})
