console.log("Hello")

const gallery= document.querySelector(".gallery")
fetch("http://localhost:5678/api/categories")

.then(response=> response.json())

.then(category=> {
    console.log(category);
    const ul= document.createElement("ul")
    const tous= document.createElement("li")
    tous.innerHTML= "Tous"
    ul.appendChild(tous)
    gallery.appendChild(ul)
    for(let filter of category){
        const li= document.createElement("li")
        
        console.log(filter.name);
        
    }

})
fetch("http://localhost:5678/api/works")


.then(response=> response.json())

.then(works=> {
    console.log(works);
    for(let project of works){
        console.log(project);
        const figure= document.createElement("figure")
        const image= document.createElement("img")
        image.src= project.imageUrl
        image.alt= project.title
        figure.appendChild(image)
        const figcaption= document.createElement("figcaption")
        figcaption.textContent= project.title
        /*figure.appendChild(image,figcaption)*/
        figure.appendChild(figcaption)
        const figureHtml= document.querySelector(".gallery figure")
        gallery.appendChild(figure)
    };
})



    /*
let Filter= {
all: works.length,
object: works[0, 4],
appartment: works[1 ,5 ,8],
hotelEtRestaurant: works[2 ,9 ,10],
};
console.log(Filter);

const monSetAll= new Set();

monSetAll.add(works.length);

const monSetObject= new Set();

monSetObject.add(works[0 ,4]);

const monSetAppartment= new Set();

monSetAppartment.add(works[1 ,5 ,8]);

const monSetHotelEtRestaurant= new Set();

monSetHotelEtRestaurant.add(works[2 ,9 ,10]);
*/
