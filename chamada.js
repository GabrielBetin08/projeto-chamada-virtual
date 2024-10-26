// chamada.js

let alunos = [];
const horarios = [
    "7h15 - 8h05",
    "8h05 - 8h55",
    "8h55 - 9h45",
    "10h35 - 11h05",
    "11h05 - 11h55",
    "11h55 - 12h45"
];
let professores = Array(horarios.length).fill("");
let materias = Array(horarios.length).fill("");

// Função para trocar turma com animação de fade-in
function trocarTurma() {
    const turmaSelecionada = document.getElementById("turma").value;
    alunos = JSON.parse(localStorage.getItem(turmaSelecionada)) || [];
    
    const listaContainer = document.getElementById("listaContainer");
    listaContainer.classList.remove("show");

    setTimeout(() => {
        atualizarLista();
        listaContainer.classList.add("show");
    }, 500);
}

// Salva lista no localStorage
function salvarAlunos() {
    const turmaSelecionada = document.getElementById("turma").value;
    localStorage.setItem(turmaSelecionada, JSON.stringify(alunos));
}

// Adiciona novo aluno sem status definido
function adicionarAluno() {
    const nomeAluno = document.getElementById("novoAluno").value.trim();
    if (nomeAluno) {
        alunos.push({ nome: nomeAluno, status: "", horario: "" });
        document.getElementById("novoAluno").value = "";
        atualizarLista();
        salvarAlunos();
    }
}

// Remove aluno
function removerAluno(index) {
    alunos.splice(index, 1);
    atualizarLista();
    salvarAlunos();
}

// Atualiza o status do aluno
function atualizarStatus(index, status) {
    alunos[index].status = status;
    if (status !== "Foi Embora Mais Cedo") {
        alunos[index].horario = "";
    }
    atualizarLista();
    salvarAlunos();
}

// Define o horário de saída para alunos que saíram mais cedo
function definirHorario(index, horario) {
    alunos[index].horario = horario;
    salvarAlunos();
}

// Atualiza e exibe a lista de alunos
function atualizarLista() {
    alunos.sort((a, b) => a.nome.localeCompare(b.nome));

    const listaElement = document.getElementById("alunosList");
    listaElement.innerHTML = "";

    alunos.forEach((aluno, index) => {
        const li = document.createElement("li");

        li.innerHTML = `
            <span><strong>${index + 1}.</strong> ${aluno.nome}</span>
            <div class="status">
                <label>
                    <input type="radio" name="status-${index}" ${aluno.status === "Presente" ? "checked" : ""} onclick="atualizarStatus(${index}, 'Presente')"> Presente
                </label>
                <label>
                    <input type="radio" name="status-${index}" ${aluno.status === "Faltou" ? "checked" : ""} onclick="atualizarStatus(${index}, 'Faltou')"> Faltou
                </label>
                <label>
                    <input type="radio" name="status-${index}" ${aluno.status === "Foi Embora Mais Cedo" ? "checked" : ""} onclick="atualizarStatus(${index}, 'Foi Embora Mais Cedo')"> Foi Embora Mais Cedo
                    ${aluno.status === "Foi Embora Mais Cedo" ? `<input type="time" value="${aluno.horario}" onchange="definirHorario(${index}, this.value)">` : ""}
                </label>
                <button onclick="removerAluno(${index})">Remover</button>
            </div>
        `;

        listaElement.appendChild(li);
    });
}

// Função para adicionar professor ao próximo horário disponível
function adicionarProfessor() {
    const nomeProfessor = document.getElementById("nomeProfessor").value.trim();
    if (nomeProfessor) {
        const proximoHorarioIndex = professores.indexOf("");
        
        if (proximoHorarioIndex === -1) {
            alert("Todos os horários já possuem professores!");
            return;
        }

        professores[proximoHorarioIndex] = nomeProfessor;
        document.getElementById("nomeProfessor").value = "";
        atualizarHorarios();
    }
}

// Função para adicionar matéria ao próximo horário disponível
function adicionarMateria() {
    const nomeMateria = document.getElementById("nomeMateria").value.trim();
    if (nomeMateria) {
        const proximoHorarioIndex = materias.indexOf("");
        
        if (proximoHorarioIndex === -1) {
            alert("Todos os horários já possuem matérias!");
            return;
        }

        materias[proximoHorarioIndex] = nomeMateria;
        document.getElementById("nomeMateria").value = "";
        atualizarHorarios();
    }
}

// Função para remover professor ou matéria de um horário
function removerProfessor(index) {
    professores[index] = "";
    materias[index] = "";
    atualizarHorarios();
}

// Atualiza a lista de horários com os professores e matérias
function atualizarHorarios() {
    const horariosList = document.getElementById("horariosList");
    horariosList.innerHTML = "";

    horarios.forEach((horario, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<span>${horario}</span><span>${materias[index] || "Sem Matéria"} - ${professores[index] || "Sem Professor"}</span>`;
        
        if (professores[index] || materias[index]) {
            const removeButton = document.createElement("button");
            removeButton.textContent = "Remover";
            removeButton.onclick = () => removerProfessor(index);
            li.appendChild(removeButton);
        }

        horariosList.appendChild(li);
    });
}

// Inicialização
window.onload = () => {
    trocarTurma();
    atualizarHorarios();
};