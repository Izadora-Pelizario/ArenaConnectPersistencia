// controllers/PersistenciaController.js
const fs = require('fs');
const path = require('path');
const ArenaConnect = require('../models/ArenaConnect');

const ARQUIVO_DADOS = path.join(__dirname, '..', 'dados-arena-connect.json'); 

class PersistenciaController {
    salvarEstado() {
        const arena = ArenaConnect.getInstancia();
        const estado = arena.paraJSON();
        fs.writeFileSync(ARQUIVO_DADOS, JSON.stringify(estado, null, 2), 'utf-8'); //
    }

    carregarEstado() {
        if (!fs.existsSync(ARQUIVO_DADOS)) return; //

        try {
            const conteudo = fs.readFileSync(ARQUIVO_DADOS, 'utf-8'); //
            const dados = JSON.parse(conteudo); //
            const arena = ArenaConnect.getInstancia();
            
            arena.carregarDeJSON(dados);
        } catch (erro) {
            console.error("Erro ao carregar ficheiro JSON:", erro.message);
        }
    }
}
module.exports = PersistenciaController;