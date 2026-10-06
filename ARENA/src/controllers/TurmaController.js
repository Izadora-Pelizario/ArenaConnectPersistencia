// controllers/TurmaController.js
const ArenaConnect = require('../models/ArenaConnect');
const TurmaView = require('../views/TurmaView');

class TurmaController {
    registrarTurma() {
        const nome = TurmaView.perguntarNome();
        try {
            const arena = ArenaConnect.getInstancia();
            const turma = arena.adicionarTurma(nome);
            TurmaView.mostrarMensagem(`✔ Turma "${turma.nome}" cadastrada com sucesso!`);
        } catch (e) {
            TurmaView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }

    listarTurmas() {
        const arena = ArenaConnect.getInstancia();
        TurmaView.listarTurmas(arena.listarTurmas());
    }
}
module.exports = TurmaController;