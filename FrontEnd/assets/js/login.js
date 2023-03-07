const mail= document.querySelector('form input[type="email"]')
const mdp= document.querySelector('form input[type="password"]')
const buttonEnvoyer= document.querySelector('#contact form input[type="submit"]')
buttonEnvoyer.addEventListener('click', event=>{
    const dataValue= {
        email: mail.value,
        password: mdp.value,
    }
    console.log(dataValue);
    const admin= {
        email: "sophie.bluel@test.tl",
        password: "S0phie",
    }
    const chargeValue= JSON.stringify(dataValue)
    fetch("http://localhost:5678/api/users/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'},
            body: chargeValue,
        })
        .then(response=> response.json())
        
        .then(result=>{
            console.log(result)
    if (result===admin) {
        alert("Connecté")
      } else {
        alert("Erreur Email ou Mot de passe")
      }
    })
});