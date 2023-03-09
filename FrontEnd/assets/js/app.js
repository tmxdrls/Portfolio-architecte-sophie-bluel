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
const dataWorks= fetch("http://localhost:5678/api/works")

.then(response=> response.json())

.then(works=> { 
    for(let project of works){
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
    button.forEach(btn=> {
        btn.addEventListener('click',function () {
                const tag = btn.getAttribute("data-tag")
                if (tag=="Tous"){
                    gallery.innerHTML= ""
                    for(let project of works){
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
                }else {
                const filter= works.filter(work => work.categoryId == tag)
                gallery.innerHTML= ""
                for(let project of filter){
                    console.log(project)
                    const figure= document.createElement("figure")
                    const image= document.createElement("img")
                    image.src= project.imageUrl
                    image.alt= project.title
                    figure.appendChild(image)
                    const figcaption= document.createElement("figcaption")
                    figcaption.textContent= project.title
                    figure.appendChild(figcaption)
                    gallery.appendChild(figure)
                }}
            })  
        })
})

