const body= document.querySelector("body") 

const header= document.querySelector("header")

const gallery= document.querySelector(".gallery")

const token= window.localStorage.getItem("token")

const tokenData = JSON.parse(window.localStorage.getItem("token"))

fetch("http://localhost:5678/api/categories")

.then(response=> response.json())

.then(category=> {
    const menu= document.createElement("menu")
    const buttonAll= document.createElement("button")
    menu.appendChild(buttonAll)
    buttonAll.textContent= "Tous"
    buttonAll.setAttribute("data-tag","Tous")
    for(let filter of category){
        const buttonFilter= document.createElement("button")
        menu.appendChild(buttonFilter)
        buttonFilter.textContent= filter.name
        buttonFilter.setAttribute("data-tag",filter.id)
    }
    gallery.insertAdjacentHTML("beforebegin", menu.outerHTML)
})

const createProject = (project) => {
    const figure= document.createElement("figure")
    const image= document.createElement("img")
    image.src= project.imageUrl
    image.alt= project.title
    figure.appendChild(image)
    const figcaption = document.createElement("figcaption")
    figcaption.textContent = project.title
    figure.appendChild(figcaption)
    gallery.appendChild(figure)
  }

  const createProjects= (works) => {
    gallery.innerHTML= "";
    for (let project of works) {
      createProject(project)
    }
  }

  const createModif=()=> {
    const menu= document.querySelector("menu")
    if(menu){
      menu.innerHTML=""
    }
    const banner= document.createElement("div")
    banner.setAttribute("id","banner")

    const iconeModif = document.createElement("i")
    iconeModif.setAttribute("class","fa-regular fa-pen-to-square")
    iconeModif.style.color="#000000"
    iconeModif.style.marginRight="10px"
    iconeModif.style.fontSize="15px"

    const iconeEdit = document.createElement("i")
    iconeEdit.setAttribute("class","fa-regular fa-pen-to-square")
    iconeEdit.style.color="#FFFFFF"
    iconeEdit.style.marginRight="10px"
    iconeEdit.style.fontSize="15px"

    const btnModif = document.createElement('button')
    btnModif.setAttribute("class","modif")
    btnModif.textContent="modifier"
    btnModif.appendChild(iconeModif)

    const btnEdit = document.createElement('button')
    btnEdit.setAttribute("id","edit")
    btnEdit.textContent= "Mode édition"
    btnEdit.appendChild(iconeEdit)

    const btnPubli= document.createElement('button')
    btnPubli.setAttribute("id","publi")
    btnPubli.textContent="publier les changements"
    
    banner.appendChild(btnEdit)
    banner.appendChild(btnPubli)
    header.insertAdjacentHTML("afterbegin", banner.outerHTML)
    document.querySelector("article h2").insertAdjacentHTML("beforebegin", btnModif.outerHTML)
    document.querySelector("#introduction figure").appendChild(btnModif)
    document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", btnModif.outerHTML)

    const linkLogin= document.querySelector('li a[href="login.html"]').parentNode
    linkLogin.textContent= "logout"
  }

  const logout= () => {
    const linkLogout= document.querySelector("#log")
    linkLogout.addEventListener("click",()=> {
      const confirmation= confirm("Êtes vous sûr de vouloir vous déconnecter?")
      if(confirmation){
      localStorage.removeItem("token")
      location.reload()
    }
    })
  }

/*Modale créee en HTML*/
  const modal= document.getElementById("modal")

  const modalContainer= document.getElementById("cont-modal")

  const buttonBack= document.getElementById("back")

  const buttonClose= document.getElementById("close")

  const projectsContainer= document.getElementById("cont-projet")

  const displayModal=(works)=>{
  const modifButtons = Array.from(document.querySelectorAll(".modif, #edit, #publi")) 
  modifButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.classList.add("modal-visible")
      projectsContainer.innerHTML=""
      createModalProjects(works)
    })
  })
}
  const createModalProjects = (works) => {
    for (let project of works) {
      const figure = document.createElement("figure")

      const image = document.createElement("img")
      image.src = project.imageUrl
      image.alt = project.title
      image.setAttribute("id", project.id)
      image.style.height= "102px"
      image.style.width= "76px"
      figure.appendChild(image)

      const removeImage = document.createElement("i")
      removeImage.setAttribute("class","fa-solid fa-trash-can")
      removeImage.style.color="#FFFFFF"
      removeImage.style.fontSize="9px"

      const removeButton = document.createElement("button")
      removeButton.setAttribute("class", "removeButton")
      removeButton.appendChild(removeImage)

      figure.appendChild(removeButton)

      const figcaption = document.createElement("figcaption")
      figcaption.textContent = "éditer"
      figure.appendChild(figcaption)

      projectsContainer.appendChild(figure)
    }
    deleteProject()
  }

  const deleteProject= () => {
    const removeButtons= document.querySelectorAll(".removeButton")
    removeButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault()
        const confirmation= confirm("Êtes vous sûr de vouloir supprimer ce projet?") 
        const id= btn.previousElementSibling.id
        console.log(id) 
        if (confirmation && token) {
          fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: { 
              'authorization': 'Bearer ' + tokenData,
              'content-type': 'application/Json',
            },
          })
          .then(response => response.json())
          .then(alert("Votre projet a bien été supprimé"))
          location.reload()
        }
      })
    })
  }

  const deleteAllProject= () => {
    const removeAllButton= document.querySelector("#supprimer")
    removeAllButton.addEventListener("click", () => {
        const confirmation= confirm("Êtes vous sûr de vouloir supprimer tous les projets?") 
        if (confirmation && token) {
        gallery.innerHTML=""
        projectsContainer.innerHTML=""
        } else {
          createModalProjects()
        }
      })
    }

  const changeModal=()=>{
    const addButton = document.querySelector("#ajouter")
    addButton.addEventListener("click", formProjectModal)
  }

  const formProjectModal = () => {
    const formHTML=`
        <form id="addProjectForm" method="post" enctype="multipart/form-data">
          <div id="newImage">
            <div id="containerIcone">
            <i class="fa-solid fa-camera-retro"></i>
            </div>
              <button>
                <label for="inputImage">+ Ajouter une photo</label>
                <input type="file" id="inputImage" accept=".jpg,.png" required>
              </button>
              <p>jpg, png : 4mo max.</p>
            </div>
          <div>
            <label for="projectName">Titre</label></br>
            <input type="text" id="projectName" required>
          </div>
          <div id="category">
            <label for="projectCategory">Catégorie</label></br>
            <select id="projectCategory" required>
              <option value="1">Objet</option>
              <option value="2">Appartement</option>
              <option value="3">Hotêls & Restaurant</option>
            </select>
          </div>
          <button id="addProjectButton"> Valider </button>
        </form>
      `   
  buttonBack.style.color="black"
  document.querySelector("#cont-modal h2").textContent= "Ajout photo"
  projectsContainer.innerHTML= formHTML
  projectsContainer.classList.add("active")
  document.querySelector("#button-modal").style.display="none"

  const projectName= document.getElementById("projectName")
  const projectCategory= document.getElementById("projectCategory")
  const buttonValid= document.getElementById("addProjectButton")
  const inputImage = document.getElementById("inputImage")
  
  inputImage.addEventListener("input", () => {
    const file = inputImage.files[0]
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      const newImage = document.getElementById("newImage")
      const img = document.createElement("img")
      img.setAttribute("src", fileReader.result)
      img.style.width="50%"
      img.style.height="100%"
      newImage.innerHTML = ""
      newImage.appendChild(img)
    }  
  })
  
  const formValues = Array.from(document.querySelectorAll("#projectName, #projectCategory, #inputImage"))
formValues.forEach(input => {
  input.addEventListener('input', () => {
    if (formValues.every(input => input.checkValidity())) {
      buttonValid.style.backgroundColor = "#1D6154"
    } else {
      buttonValid.style.backgroundColor = ""
    }
  })
})

  buttonValid.addEventListener("click",(event)=> {
    event.preventDefault()
    const formData= new FormData()
    formData.append("image",inputImage.files[0])
    formData.append("title",projectName.value)
    formData.append("category",projectCategory.value)
    for (let data of formData.entries()){
console.log(data[0]+" "+ data[1])
    }
    if (inputImage.files.length === 0 || projectName.value === "" || projectCategory.value === "" ) {
      alert("Veuillez remplir tous les champs")
    } else {
    const confirmation= confirm("Êtes vous sûr de vouloir ajouter ce projet?")
    if (confirmation && token) {
      fetch("http://localhost:5678/api/works", {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'Bearer ' + tokenData
        }
      })
      .then(response => {
        if (response.ok) {
          alert("Votre projet a bien été ajouté")
          location.reload()
        } else {
          alert("Une erreur s'est produite")
        }
      })
      .catch(error => console.error(error))
  }}
  })
}

resetModal= (works) => {
buttonBack.style.color="white"
document.querySelector("#cont-modal h2").textContent= "Galerie photo"
document.querySelector("#button-modal").style.display="flex"
projectsContainer.innerHTML=""
projectsContainer.classList.remove("active") 
createModalProjects(works) 
}

  backModal=(works)=>{
    buttonBack.addEventListener("click",()=>{
      const img= document.querySelector("#newImage img");
      if (img) {
        img.removeAttribute("src");
      }
     resetModal(works)
    })
  }

  closeModal=(works) =>{
  buttonClose.addEventListener("click", () => {
    resetModal(works)
    modal.classList.remove('modal-visible')
})
}
    
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
      createProjects(works)
    if (token) {
      createModif()
      logout()
      displayModal(works)
      deleteAllProject()
      changeModal()
      backModal(works)
      closeModal(works)
} else {
      createProjects(works)
    }
      const button = document.querySelectorAll("[data-tag]")
      button.forEach(btn => {
        btn.addEventListener("click", function() {
          const tag = btn.getAttribute("data-tag")
          if (tag === "Tous") {
            createProjects(works)
          } else {
            const filter = works.filter(work => work.categoryId == tag)
            createProjects(filter)
          }
        })
      })
  });