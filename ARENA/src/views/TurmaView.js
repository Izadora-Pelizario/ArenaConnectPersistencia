//TurmaView.js

const prompt = require('prompt-sync')();

const TurmaView = {
    perguntarNome() {
        return prompt("Nome da nova turma: ");
    },
    listarTurmas(lista) {
        console.log("\n=== LISTA DE TURMAS ===");
        if (lista.length === 0) return console.log("Nenhuma turma no sistema.");
        lista.forEach(t => t.exibir());
    },
    mostrarMensagem(msg) {
        console.log(msg);
    }
};

module.exports = TurmaView;