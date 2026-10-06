//ArbitroView.js

const prompt = require('prompt-sync')();

const ArbitroView = {
    perguntarDados() {
        const nome = prompt("Nome do Árbitro: ");
        const numeroCredencial = parseInt(prompt("Número de Credencial: "));
        const anosExperiencia = parseInt(prompt("Anos de Experiência: "));
        return { nome, numeroCredencial, anosExperiencia };
    },
    listarArbitros(lista) {
        console.log("\n=== LISTA DE ÁRBITROS ===");
        if (lista.length === 0) return console.log("Nenhum árbitro no sistema.");
        lista.forEach(a => a.exibir());
    },
    mostrarMensagem(msg) {
        console.log(msg);
    }
};

module.exports = ArbitroView;