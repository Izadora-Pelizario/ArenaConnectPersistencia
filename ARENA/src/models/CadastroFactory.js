//Cadastrofactory.js
const Modalidade = require('./Modalidade');
const { Atleta, Arbitro } = require('./Pessoa');
const Turma = require('./Turma');
const Equipe = require('./Equipe');


class CadastroFactory {
    static criarTurma(id, nome) {
        const turma = new Turma(id, nome);
        if (!turma.nome) throw new Error('Nome de turma inválido.');
        return turma;
    }

    static criarAtleta(id, nome, idTurma) {
        const atleta = new Atleta(id, nome, idTurma);
        if (!atleta.nome) throw new Error('Nome de atleta inválido.');
        if (atleta.idTurma === undefined) throw new Error('Turma do atleta inválida.');
        return atleta;
    }
    static criarEquipe(id, idTurma, modalidade) {
        const equipe = new Equipe(id, idTurma, modalidade);
        if (equipe.idTurma === undefined) throw new Error('Turma da equipe inválida.');
        if (!equipe.modalidade) {
            throw new Error(`Modalidade inválida. Use uma de: ${Object.values(Modalidade).join(', ')}.`);
        }
        return equipe;
    }

    static criarArbitro(id, nome, numeroCredencial, anosExperiencia) {
        const arbitro = new Arbitro(id, nome, numeroCredencial, anosExperiencia);
        if (!arbitro.nome) throw new Error('Nome de árbitro inválido.');
        if (arbitro.numeroCredencial === undefined) throw new Error('Número de credencial inválido.');
        if (arbitro.anosExperiencia === undefined) throw new Error('Anos de experiência inválidos.');
        return arbitro;
    }
}

module.exports = CadastroFactory;
