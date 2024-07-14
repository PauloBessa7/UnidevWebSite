const urlEventos = "http://localhost:3000/evento";

document.addEventListener('DOMContentLoaded', function () {
    let condicao = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }
    fetch(urlEventos, condicao)
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
                        <small class="text-body-secondary">Status : ${e.status}</small>
                    </div>
                </div>
            `
                container.appendChild(evento);
            })
        })

});

function excluir(index) {
    if (window.confirm("Você realmente deseja excluir ?")) {
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

function editar(index) {

    let overlay = document.getElementById('overlay')

    let condicao = {
        method: "GET",
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
            console.log(data)
            overlay.innerHTML = `

                <form class="container bg-dark text-white p-5 border border-primary rounded" style="max-width: 500px;">
                <div class="mb-1">
                    <label for="Titulo" class="form-label">Titulo</label>
                    <input value='${data.titulo}' type="text" class="form-control" id="titulo" aria-describedby="emailHelp">
                </div>
                <div class="mb-1">
                    <label for="descricao" class="form-label">Descrição</label>
                    <textarea class="form-control" id="descricao" rows="3" maxlength="200">${data.descricao}</textarea>
                </div>
                <div class="mb-1">
                    <label for="data" class="form-label">Data</label>
                    <input value='${data.data}' type="text" class="form-control" id="data">
                </div>
                <div class="mb-1">
                    <label for="imagem" class="form-label">Caminho da imagem</label>
                    <input value='${data.imagem}' type="text" class="form-control" id="imagem">
                </div>
                <div class="mb-3">
                    <label for="form-select" class="form-label">Status</label>
                   <select class="form-select" aria-label="Default select example" id='status'>
                        <option selected>${data.status}</option>
                        <option value="true">true</option>
                        <option value="false">false</option>
                    </select>
                </div>
                
                <button type="button" class="btn btn-primary" onClick='confirmarEdicao(${index})'>Confirmar</button>
                <button onclick="fecharPopup() type="" class="btn btn-primary">Cancelar</button>
                </form>
                `
        })
        
        .catch(error => {
            console.error('Erro ao excluir o evento:', error);
            // Trate o erro adequadamente, por exemplo, exibindo uma mensagem de erro ao usuário
        });
    abrirPopup()
}

function confirmarEdicao(index){
    if(confirm("Deseja confirmar atualização ? ")){
        let titulo = document.getElementById('titulo').value;
        let descricao = document.getElementById('descricao').value;
        let data = document.getElementById('data').value;
        let imagem = document.getElementById('imagem').value;
        let status = document.getElementById('status').value;
        
        if(!validarData(data)){
            alert("Data inválida");
            return 0;
        }

        let objeto = {
            titulo : titulo,
            descricao : descricao,
            data : data,
            imagem : imagem,
            status : status
        }

        let condicao = {
            method  : "PUT",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(objeto)
        }

        fetch(`${urlEventos}/${index}`,condicao)
        .then(response => response.json())
        .then(r => console.log(r))
        .catch(err => console.log(err))


    }
}

function validarData(data) {
    // Padrão de regex para data no formato xx-xx-xxxx
    let regex = /^\d{2}-\d{2}-\d{4}$/;

    // Testa se a data corresponde ao padrão
    if (regex.test(data)) {
        return 1
    } else {
        return 0
    }
}

function abrirPopup() {
    document.getElementById('overlay').style.display = 'flex'; // Exibe o overlay
}

// Função para fechar o popup
function fecharPopup() {
    document.getElementById('overlay').style.display = 'none'; // Oculta o overlay
}

