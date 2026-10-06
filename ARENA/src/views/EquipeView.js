//EquipeView.js

const prompt = require('prompt-sync')();
const Modalidade = require('../models/Modalidade');

const EquipeView = {
    perguntarIdTurma() {
        return parseInt(prompt("ID da Turma: "));
    },
    perguntarModalidade() {
        console.log("\nModalidades disponíveis:");
        Object.values(Modalidade).forEach(m => console.log(`- ${m}`));
        return prompt("Modalidade (copie exatamente como está na lista acima): ");
    },
    perguntarIdEquipe(rotulo = "ID da Equipe: ") {
        return parseInt(prompt(rotulo));
    },
    listarEquipes(lista) {
        console.log("\n=== LISTA DE EQUIPES ===");
        if (lista.length === 0) return console.log("Nenhuma equipe no sistema.");
        lista.forEach(({ equipe, nomeTurma, nomesAtletas }) => {
            equipe.exibir(nomeTurma, nomesAtletas);
        });
    },
    mostrarMensagem(msg) {
        console.log(msg);
    }
};

module.exports = EquipeView;