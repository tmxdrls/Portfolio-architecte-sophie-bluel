const body= document.querySelector("body") 

const header= document.querySelector("header")

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

  const modal = document.querySelector("#modal")

  const buttonClose= document.querySelector("#close")

  const projectsContainer = modal.querySelector("#cont-projet")

  const createModalProjects = (works) => {
    for (let project of works) {
      const figure = document.createElement("figure")
      const image = document.createElement("img")
      image.src = project.imageUrl
      image.alt = project.title
      image.style.maxHeight = "104px"
      image.style.maxWidth= "78px"
      figure.appendChild(image)
      const figcaption = document.createElement("figcaption")
      figcaption.textContent = "éditer"
      figure.appendChild(figcaption)
      projectsContainer.appendChild(figure)
    }
  }

  fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(works => {
    const token= window.localStorage.getItem("token")
    if (token) {
      const menu= document.querySelector("menu")
      menu.innerHTML=""
      createProjects(works)
      createModif()
      const modifButtons = Array.from(document.querySelectorAll(".modif, #edit, #publi")) 
      modifButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
          modal.classList.add("modal-visible")
          projectsContainer.innerHTML="";
          createModalProjects(works)
        })
      })
      buttonClose.addEventListener("click", function() {
        modal.classList.remove('modal-visible')
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