// ===== URL =====

const url = 'http://localhost:3000/studanty';

// ===== GET =====
// Exemplo usando setInterval para manter os logs visíveis

function consultar() {
    let value = document.getElementById('textoNomeRA').value;

    // Correção da regex (uso de notação literal sem aspas)
    let regex = /^\d{8}(-)?(\d{1})$/;

    // Verificação da regex
    let isValid = regex.test(value);

    if (value === "getallvalues") {
        consultarTodos();
    } else if (regex.test(value)) {
        consultarRA(value);
    } else {
        consultaErro();
    }
}
// ===== GET ALL =====

function consultarTodos() {

    let condicao = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch(url, condicao)
        .then(response => response.json())
        .then(value => {
            let tbody = document.getElementById('bodyTable');
            tbody.innerHTML = '';

            value.forEach(a => {
                let id = a.id;
                a.events.forEach((i,index) => {
                    let evento = document.createElement('tr');
                    let status;
                    if (i.status) {
                        status = "Aberto"
                    } else {
                        status = "Finalizado"
                    }
                    evento.innerHTML = `
                <th scope="row">${id}</th>
                        <td>${i.event}</td>
                        <td>${i.date}</td>
                        <td>${status}</td>
                `
                    tbody.appendChild(evento);
                })

            })
        })
}

// ===== GET BY RA =====

function consultarRA(value) {

    let aluno = value;

    let condicao = {
        method: "GET",
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch(`${url}/${aluno}`, condicao)
        .then(response => response.json())
        .then(value => {
            let tbody = document.getElementById('bodyTable');
            tbody.innerHTML = '';

            value.events.forEach((i, index) => {

                let evento = document.createElement('tr');
                let status;

                if (i.status) {
                    status = "Aberto"
                } else {
                    status = "Finalizado"
                }
                evento.innerHTML = `
                <th scope="row">${index + 1}</th>
                        <td>${i.event}</td>
                        <td>${i.date}</td>
                        <td>${status}</td>
                `
                tbody.appendChild(evento);

            });
        })
}

// ==== ERRO GET =====

function consultaErro() {
    alert("Insira seu RA");
}