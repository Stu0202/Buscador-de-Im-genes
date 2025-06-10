const result = document.querySelector('#resultado')
const form = document.querySelector('#formulario')


window.onload = () => {
    form.addEventListener('submit',validateForm)

}


function validateForm(e) {
   e.preventDefault()

   const searchTerm = document.querySelector('#termino').value
   if(searchTerm === ''){
        showAlert('Add a search term')
        
   }
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