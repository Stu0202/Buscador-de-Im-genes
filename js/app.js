const result = document.querySelector('#resultado')
const form = document.querySelector('#formulario')
const paginationDiv = document.querySelector('#paginacion')

const recordsPerPage =40;
let totalPages;
let iterador
let currentPage =1;

window.onload = () => {
    form.addEventListener('submit',validateForm)

}


function validateForm(e) {
   e.preventDefault()

   const searchTerm = document.querySelector('#termino').value
   if(searchTerm === ''){
        showAlert('Add a search term')
        return;
   }

   searchImages();
}

function showAlert(messsage) {

const alertExists = document.querySelector('.bg-red-100')
    if(!alertExists){
    const alert = document.createElement('p')
        alert.classList.add('bg-red-100','border-red-400','text-red-700','px-4','py-3','rounded','max-w-lg','mx-auto','mt-6','text-center')

        alert.innerHTML = `
        <strong class"font-bold">Error!</strong>
        <span class="block sm:inline">${messsage}</span>
        `
        form.appendChild(alert)

        setTimeout(() => {
            alert.remove()
        }, 3000);
    }

    
}

function searchImages() {

    const term = document.querySelector('#termino').value
    const key = '19556592-05e4fd1ac1f8f526d81e394e2'
    const url = `https://pixabay.com/api/?key=${key}&q=${term}&per_page=${recordsPerPage}&page=${currentPage}`

    fetch(url)
        .then(response => response.json())
        .then(result => {
            totalPages = calculatePage(result.totalHits)
            console.log(totalPages);
            showImages(result.hits);
        })
}

//Generador que va a registrar la cantidad de elementos de acuerdo al numero de paginas

function *createPager(total){
    for (let i = 1; i <=total ; i++){
        yield i
       
    }
}

function calculatePage(total) {
    return parseInt(Math.ceil(total/recordsPerPage))
}


function showImages(images){
    while(result.firstChild){
        result.removeChild(result.firstChild)
    }

    //Iterar sobre el arreglo de imagenes y construir el HTML

    images.forEach(image => {
        const {previewURL, likes, views, largeImageURL} = image
        result.innerHTML += `
                <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                    <div class="bg-white">
                        <img src="${previewURL}" class="w-full">
                        <div class="p-4">
                            <p class="font-bold">${likes} <span class="font-light"> Likes </span> </p>
                            <p class="font-bold">${views} <span class="font-light"> Views </span> </p>
                            <a class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1" href="${largeImageURL}" target="_blank" rel="noopener noreferrer">
                                See Image
                            </a>
                        </div>
                    </div>
                </div>
        `
    });
    while(paginationDiv.firstChild){
        paginationDiv.removeChild(paginationDiv.firstChild)
    }

    printPager();
  
}

function printPager(){
    iterador = createPager(totalPages)

    while(true){
        const {value,done} = iterador.next();
        if(done) return;

        const button = document.createElement('A')
        button.href = '#'
        button.dataset.page = value;
        button.textContent = value;
        button.classList.add('siguiente','bg-yellow-400','px-4','py-1','mr-2','font-bold','mb-4','rounded')

        button.onclick = () =>{
            currentPage = value
            searchImages()
        }

        paginationDiv.appendChild(button)
    }
}