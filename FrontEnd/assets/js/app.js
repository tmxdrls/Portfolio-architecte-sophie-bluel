console.log("Hello")

const gallery= document.querySelector(".gallery")
fetch("http://localhost:5678/api/categories")

.then(response=> response.json())

.then(category=> {
    console.log(category);
    const menu= document.createElement("menu")
    const liAll= document.createElement("li")
    menu.appendChild(liAll)
    const buttonAll= document.createElement("button")
    liAll.appendChild(buttonAll)
    buttonAll.textContent= "Tous"
    gallery.appendChild(menu)
    for(let filter of category){
        const liFilter= document.createElement("li")
        const buttonFilter= document.createElement("button")
        liFilter.appendChild(buttonFilter)
        menu.appendChild(liFilter)
        buttonFilter.textContent= filter.name
        buttonFilter.setAttribute("data-tag",filter.id)
    }

})
fetch("http://localhost:5678/api/works")


.then(response=> response.json())

.then(works=> { 
    for(let project of works){
        console.log(project);
        const figure= document.createElement("figure")
        const image= document.createElement("img")
        image.src= project.imageUrl
        image.alt= project.title
        figure.appendChild(image)
        const figcaption= document.createElement("figcaption")
        figcaption.textContent= project.title
        figure.appendChild(figcaption)
        gallery.appendChild(figure)
    }
    const button= document.querySelectorAll("[data-tag]")
    button.forEach(btn =>{
        btn.addEventListener('click',()=>{
            const tag= btn.getAttribute("data-tag")
            console.log(tag)
            const category= works.filter(work=> work.categoryId == tag)
            
           
            console.log(category)
            
        })
    })
})
