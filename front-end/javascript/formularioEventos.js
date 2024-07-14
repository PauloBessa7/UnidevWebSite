const urlEventos= "http://localhost:3000/evento";

document.addEventListener('DOMContentLoaded', function() {
    let condicao = {
        method : "GET",
        headers : {
            "Content-type" : "application/json"
        }
    }
    fetch(urlEventos,condicao)
    .then(response => response.json())
    .then(value => {
        let container = document.getElementById('container-eventos');
        
       value.forEach(e => {
            let evento = document.createElement('div')
            evento.classList.add("col")
            evento.classList.add("upScale1")
            evento.innerHTML = `
                <div class="card h-100">
                    <img src="${e.imagem}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${e.titulo}</h5>
                        <p class="card-text">${e.descricao}</p>
                        <button type="button" class="btn btn-primary" onclick="editar(${e.id})">Editar</button>
                        <button type="button" class="btn btn-primary" onclick="excluir(${e.id})">Excluir</button>
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary">${e.data} | </small>
                        <small class="text-body-secondary">Status : ${e.id}</small>
                    </div>
                </div>
            `
            container.appendChild(evento);
       })
    })

});

function excluir(index) {
    if(window.confirm("Você realmente deseja excluir ?")){
        let condicao = {
            method: "DELETE",
            headers: {
                "Content-type": "application/json"
            }
        };
    
        fetch(`${urlEventos}/${index}`, condicao)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao excluir o evento');
                }
                return response.json();
            })
            .then(data => {
                console.log(`Evento excluído com sucesso:`, data);
                // Aqui você pode adicionar lógica adicional após a exclusão, se necessário
            })
            .catch(error => {
                console.error('Erro ao excluir o evento:', error);
                // Trate o erro adequadamente, por exemplo, exibindo uma mensagem de erro ao usuário
            });
    }
}

function editar(index){
    
}

