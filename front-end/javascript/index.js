const urlEventos= "http://localhost:3000/evento";

document.addEventListener('DOMContentLoaded', function() {
    let condicao = {
        method : "GET",
        headers : {
            "Content-type" : "application/json"
        }
    }
    console.log("aaa");
    fetch(urlEventos,condicao)
    .then(response => response.json())
    .then(value => {
        let container = document.getElementById('container-eventos');
        
       value.forEach(e => {
            let evento = document.createElement('div')
            evento.classList.add("col")
            evento.classList.add("upScale1")
            console.log(evento)
        

            evento.innerHTML =`
                <div class="card h-100">
                    <img src="${e.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.titulo}</h5>
                        <p class="card-text">${e.descricao}</p>
                        <button type="button" class="btn btn-primary">Base class</button>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${e.data}</small>
                    </div>
                </div>
            `
            container.appendChild(evento);
       })
    })

});
