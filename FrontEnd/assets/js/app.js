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
    const projectId= figure.getAttribute("data-tag")
    const image= document.createElement("img")
    image.src= project.imageUrl;
    image.alt= project.title;
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
    const banner= document.createElement("div")
    banner.setAttribute("id","banner")

    const iconeModif = document.createElement("img")
    iconeModif.src = "./assets/icons/modif.png"

    const iconeEdit = document.createElement("img")
    iconeEdit.src = "./assets/icons/modif.png"

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
      localStorage.removeItem("token")
      location.reload()
    })
  }

  const modal= document.querySelector("#modal")

  const modalContainer= document.querySelector("#cont-modal")

  const buttonClose= document.querySelector("#close")

  const projectsContainer= modal.querySelector("#cont-projet")

  const createModalProjects = (works) => {
    for (let project of works) {
      const figure = document.createElement("figure")
      const image = document.createElement("img")
      image.src = project.imageUrl
      image.alt = project.title
      image.setAttribute("id", project.id)
      image.setAttribute("class", "imgModal")
      image.style.maxHeight= "104px"
      image.style.maxWidth= "78px"
      figure.appendChild(image)
      const removeImage = document.createElement("img")
      removeImage.src = "./assets/icons/remove.png"
      removeImage.alt = "Supprimer un projet"
      removeImage.setAttribute("class", "removeImage")
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
    deleteAllProject()
    const addButton = document.querySelector("#ajouter")
    addButton.addEventListener("click", addProjectModal)
  }

  const deleteProject= () => {
    const removeButtons= document.querySelectorAll(".removeButton")
    removeButtons.forEach(btn => {
      btn.addEventListener("click", event => {
        event.preventDefault()
        const confirmation= confirm("Êtes vous sûr de vouloir supprimer ce projet?") 
        const id= btn.previousElementSibling.id
        const trueToken = tokenData.token
        console.log(id) 
        if (confirmation && token) {
          fetch(`http://localhost:5678/api/works/${id}`, {
            method: 'DELETE',
            headers: { 
              'authorization': 'Bearer ' + trueToken,
              'content-type': 'application/Json',
            },
          })
          .then(response => response.json())
          .then(alert("Votre projet a bien été supprimé"))
          location.reload()
        } else {
          alert("Le projet n'a pas été supprimé")
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

  const addProjectModal = (category) => {
    const formHTML=`
    <button id="close"><img src="./assets/icons/close.png" alt="Fermer la page"></img></button>
      <h2>Galerie photo</h2>
        <form id="addProjectForm" method="post" enctype="multipart/form-data">
          <div id="newImage">
            <label for="inputImage">Ajouter une photo:</label>
            <input type="file" name="inputImage" id="inputImage" accept=".jpg,.png" required>
          </div>
          <div>
            <label for="projectName">Titre:</label>
            <input type="text" name="projectName" id="projectName" required>
          </div>
          <div>
            <label for="projectCategory">Catégorie:</label>
            <select name="projectCategory" id="projectCategory" required>
              <option value="">--Choisir une catégorie--</option>
              <option value="category1">Catégorie 1</option>
              <option value="category2">Catégorie 2</option>
              <option value="category3">Catégorie 3</option>
            </select>
          </div>
          <div>
            <button type="submit" id="submit-project-button">Valider</button>
          </div>
        </form>
      `   
  modalContainer.innerHTML= formHTML
    }
    

    
fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
    if (token) {
      createProjects(works)
      createModif()
      logout()
      const menu= document.querySelector("menu")
      menu.innerHTML=""
      const modifButtons = Array.from(document.querySelectorAll(".modif, #edit, #publi")) 
      modifButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          modal.classList.add("modal-visible")
          projectsContainer.innerHTML=""
          createModalProjects(works)
        })
      })
      buttonClose.addEventListener("click", function() {
        modal.classList.remove('modal-visible')
})
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