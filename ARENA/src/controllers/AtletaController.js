// controllers/AtletaController.js
const ArenaConnect = require('../models/ArenaConnect');
const AtletaView = require('../views/AtletaView');

class AtletaController {
    registrarAtleta() {
        const idTurma = AtletaView.perguntarIdTurma();
        const nome = AtletaView.perguntarNome();
        try {
            const arena = ArenaConnect.getInstancia();
            const { atleta, turma } = arena.adicionarAtleta(idTurma, nome);
            AtletaView.mostrarAtletaVinculado(atleta.nome, turma.nome);
        } catch (e) {
            AtletaView.mostrarErroCadastro(e.message);
        }
    }

    listarAtletas() {
        const arena = ArenaConnect.getInstancia();
        AtletaView.listarAtletas(arena.listarAtletas());
    }
}
module.exports = AtletaController;