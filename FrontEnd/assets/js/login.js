const mail= document.querySelector('form input[type="email"]')
const mdp= document.querySelector('form input[type="password"]')
const buttonEnvoyer= document.querySelector('form input[type="submit"]')
buttonEnvoyer.addEventListener('click', event=>{
    const dataValue= {
        email: mail.value,
        password: mdp.value,
    }
    console.log(dataValue);
    const chargeValue= JSON.stringify(dataValue)
    fetch("http://localhost:5678/api/users/login",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
            body: chargeValue,
        })
        .then(response=> response.json())
        .then(result=>{
            console.log(result)
            window.localStorage.setItem(result.userId ,JSON.stringify(result))
    if(result.userId == 1) {
        window.open(
            "index.html"
          )
        alert("Connecté")
      } else {
        alert("Erreur Email ou Mot de passe")
      }
    })
    .catch((err) => {
      console.log(err);
    });
});