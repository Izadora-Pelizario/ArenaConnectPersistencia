// controllers/ArbitroController.js
const ArenaConnect = require('../models/ArenaConnect');
const ArbitroView = require('../views/ArbitroView');

class ArbitroController {
    registrarArbitro() {
        const { nome, numeroCredencial, anosExperiencia } = ArbitroView.perguntarDados();
        try {
            const arena = ArenaConnect.getInstancia();
            const arbitro = arena.adicionarArbitro(nome, numeroCredencial, anosExperiencia);
            ArbitroView.mostrarMensagem(`✔ Árbitro "${arbitro.nome}" cadastrado com sucesso!`);
        } catch (e) {
            ArbitroView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }

    listarArbitros() {
        const arena = ArenaConnect.getInstancia();
        ArbitroView.listarArbitros(arena.listarArbitros());
    }
}
module.exports = ArbitroController;