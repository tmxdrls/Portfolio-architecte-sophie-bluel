const body= document.querySelector("body") 
const gallery= document.querySelector(".gallery")
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
    const menu= document.querySelector("menu")
    menu.style.display= "none";
    const banner= document.createElement("div")
    banner.setAttribute("id","banner")
    const btnModif= document.createElement('button')
    btnModif.setAttribute("id","modif")
    btnModif.textContent="modifier";
    const btnEdit= document.createElement('button')
    btnEdit.setAttribute("id","edit")
    btnEdit.textContent= "Mode édition"
    const btnPubli= document.createElement('button')
    btnPubli.setAttribute("id","publi")
    btnPubli.textContent="publier les changements"
    const icone= document.createElement("img")
    icone.setAttribute("src","./assets/icons/")
    icone.alt="Icône Modification"
    btnModif.appendChild(icone)
    btnEdit.appendChild(icone)
    banner.appendChild(btnEdit)
    banner.appendChild(btnPubli)
    body.insertAdjacentHTML("beforebegin", banner.outerHTML)
    document.querySelector("article h2").insertAdjacentHTML("beforebegin", btnModif.outerHTML)
    document.querySelector("#introduction figure").appendChild(btnModif)
    document.querySelector("#portfolio h2").appendChild(btnModif)
    const linkLogin= document.querySelector('li a[href="login.html"]').parentNode
    linkLogin.textContent= "logout"
    const button= document.querySelectorAll("button")
    button.forEach(btn => {
        btn.setAttribute("data-tag","modif")
    })
  }
  const modal = document.createElement("div")
  body.appendChild(modal)
  modal.classList.add("modal")
  const titreModal= document.createElement("h2")
  titreModal.textContent = "Galerie photo"
  modal.appendChild(titreModal)
  const projectsContainer= document.createElement("div");
  modal.appendChild(projectsContainer)
  for (let project of works) {
    const figure= document.createElement("figure")
    const image= document.createElement("img")
    image.src= project.imageUrl;
    image.alt= project.title;
    figure.appendChild(image)
    const figcaption= document.createElement("figcaption")
    figcaption.textContent= "éditer"
    figure.appendChild(figcaption)
    projectsContainer.appendChild(figure)
  }
/*


// Ajout d'un bouton pour fermer la modale
const closeModal = document.createElement("span")
closeModal.innerHTML = "&times;"
closeModal.classList.add("close")
modal.appendChild(closeModal)
closeModal.addEventListener("click", function() {
  modal.style.display = "none"
})

// Affichage des projets dans la modale
const titreModal = document.createElement("h2")
titreModal.textContent = "Modifier les projets"
modal.appendChild(titreModal)

const projectsContainer = document.createElement("div");
modal.appendChild(projectsContainer)

for (let project of works) {
  const figure = document.createElement("figure")
  const image = document.createElement("img")
  image.src = project.imageUrl;
  image.alt = project.title;
  figure.appendChild(image)

  const figcaption = document.createElement("figcaption")
  figcaption.textContent = "éditer"
  figcaption.addEventListener("click", function() {
    // Suppression d'un projet
    const confirmation = confirm(`Êtes-vous sûr de vouloir supprimer "${project.title}" ?`);
    if (confirmation) {
      // Code pour supprimer le projet ici
    }
  })

  figure.appendChild(figcaption)
  projectsContainer.appendChild(figure)
}
*/
  
  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
    const token = window.localStorage.getItem("token")
    if (token) {
      body.innerHTML = "";
      createProjects(works)
      createModif()
      const modifButtons = document.querySelectorAll('button[data-tag="modif"]')
        modifButtons.forEach(btn => {
        btn.addEventListener("click", function() {
            modal.style.display = "block";
  })
})
    } else {
      createProjects(works)
    }
      const button = document.querySelectorAll("[data-tag]");
      button.forEach(btn => {
        btn.addEventListener("click", function() {
          const tag = btn.getAttribute("data-tag")
          if (tag === "Tous") {
            createProjects(works)
          } else {
            const filter = works.filter(work => work.categoryId == tag);
            createProjects(filter)
          }
        })
      })
  });
  