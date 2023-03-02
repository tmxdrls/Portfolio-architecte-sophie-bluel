const buttonEnvoyer= document.querySelector('#contact form input[type="submit"]')
buttonEnvoyer.addEventListener('click',async function(){
const valid= true 
for(let input of document.querySelectorAll("form input")){
    valid= valid &+ input.reportValidity()
    if(!valid){
        break;
    }
    if(valid){
        let response= await fetch("http://localhost:5678/api/users/login",{
        method: "POST",
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonBody)
    });
    }
}
});