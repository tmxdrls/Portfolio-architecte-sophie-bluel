const mail= document.querySelector('form input[type="email"]')
const mdp= document.querySelector('form input[type="password"]')
const buttonEnvoyer= document.querySelector('form input[type="submit"]')
buttonEnvoyer.addEventListener('click', event=>{
  event.preventDefault();
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
        .then(response => {
          if (response.ok) {
            return response.json();
          } else {
            alert("Problème de connexion");
          }
        })
        .then(result=>{
            console.log(result)
            if(result.userId == 1) {
              localStorage.setItem("token" ,JSON.stringify(result))
              alert("Connecté")
              location.href = "index.html"
            } else {
              alert("Erreur dans l’identifiant ou le mot de passe")
            }
        })
    .catch((err) => {
      console.log(err)
    })
});
