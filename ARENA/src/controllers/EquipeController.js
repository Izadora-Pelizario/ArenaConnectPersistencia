// controllers/EquipeController.js
const ArenaConnect = require('../models/ArenaConnect');
const EquipeView = require('../views/EquipeView');
const AtletaView = require('../views/AtletaView');

class EquipeController {
    registrarEquipe() {
        const idTurma = EquipeView.perguntarIdTurma();
        const modalidade = EquipeView.perguntarModalidade();
        try {
            const arena = ArenaConnect.getInstancia();
            const { equipe, turma } = arena.adicionarEquipe(idTurma, modalidade);
            EquipeView.mostrarMensagem(`✔ Equipe de ${equipe.modalidade} criada para a turma ${turma.nome}!`);
        } catch (e) {
            EquipeView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }

    listarEquipes() {
        const arena = ArenaConnect.getInstancia();
        EquipeView.listarEquipes(arena.listarEquipes());
    }

    vincularAtleta() {
        const idEquipe = EquipeView.perguntarIdEquipe();
        const idAtleta = AtletaView.perguntarId("ID do Atleta para vincular: ");
        try {
            const arena = ArenaConnect.getInstancia();
            const { atleta } = arena.vincularAtletaEquipe(idEquipe, idAtleta);
            EquipeView.mostrarMensagem(`✔ Atleta ${atleta.nome} vinculado à equipe com sucesso!`);
        } catch (e) {
            EquipeView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }

    desvincularAtleta() {
        const idEquipe = EquipeView.perguntarIdEquipe();
        const idAtleta = AtletaView.perguntarId("ID do Atleta para desvincular: ");
        try {
            const arena = ArenaConnect.getInstancia();
            const { atleta } = arena.desvincularAtletaEquipe(idEquipe, idAtleta);
            EquipeView.mostrarMensagem(`✔ Atleta ${atleta.nome} desvinculado da equipe!`);
        } catch (e) {
            EquipeView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }

    removerEquipe() {
        const idEquipe = EquipeView.perguntarIdEquipe("ID da Equipe para remover: ");
        try {
            const arena = ArenaConnect.getInstancia();
            arena.removerEquipe(idEquipe);
            EquipeView.mostrarMensagem(`✔ Equipe removida com sucesso!`);
        } catch (e) {
            EquipeView.mostrarMensagem(`[ERRO] ${e.message}`);
        }
    }
}
module.exports = EquipeController;