// models/ArenaConnect.js
const Modalidade = require('./Modalidade');
const CadastroFactory = require('./CadastroFactory');

class ArenaConnect {
    static #instancia = null;
    
    static getInstancia() {
        if (!ArenaConnect.#instancia) {
            ArenaConnect.#instancia = new ArenaConnect();
        }
        return ArenaConnect.#instancia;
    }

    constructor() {
        if (ArenaConnect.#instancia) {
            throw new Error('ArenaConnect já existe. Use ArenaConnect.getInstancia().');
        }
        this.turmas = [];
        this.atletas = [];
        this.arbitros = [];
        this.equipes = [];
        this.idTurmaContador = 1;
        this.idAtletaContador = 1;
        this.idArbitroContador = 1;
        this.idEquipeContador = 1;
    }

    //MÉTODOS DE PERSISTÊNCIA
    paraJSON() {
        return {
            idTurmaContador: this.idTurmaContador,
            idAtletaContador: this.idAtletaContador,
            idArbitroContador: this.idArbitroContador,
            idEquipeContador: this.idEquipeContador,
            turmas: this.turmas.map(t => ({ id: t.id, nome: t.nome })),
            atletas: this.atletas.map(a => ({ id: a.id, nome: a.nome, idTurma: a.idTurma })),
            arbitros: this.arbitros.map(a => ({ id: a.id, nome: a.nome, numeroCredencial: a.numeroCredencial, anosExperiencia: a.anosExperiencia })),
            equipes: this.equipes.map(e => ({ id: e.id, idTurma: e.idTurma, modalidade: e.modalidade, atletas: e.atletas }))
        };
    }

    carregarDeJSON(dados) {
        if (!dados) return;
        this.idTurmaContador = dados.idTurmaContador || 1;
        this.idAtletaContador = dados.idAtletaContador || 1;
        this.idArbitroContador = dados.idArbitroContador || 1;
        this.idEquipeContador = dados.idEquipeContador || 1;

        this.turmas = (dados.turmas || []).map(t => CadastroFactory.criarTurma(t.id, t.nome));
        this.atletas = (dados.atletas || []).map(a => CadastroFactory.criarAtleta(a.id, a.nome, a.idTurma));
        this.arbitros = (dados.arbitros || []).map(a => CadastroFactory.criarArbitro(a.id, a.nome, a.numeroCredencial, a.anosExperiencia));
        this.equipes = (dados.equipes || []).map(e => {
            const equipe = CadastroFactory.criarEquipe(e.id, e.idTurma, e.modalidade);
            if (Array.isArray(e.atletas)) {
                e.atletas.forEach(idAtleta => equipe.adicionarAtleta(idAtleta));
            }
            return equipe;
        });
    }

    // BUSCAS
    buscarTurmaOuFalhar(idTurma) {
        const turma = this.turmas.find(t => t.id === idTurma);
        if (!turma) throw new Error(`Turma com ID ${idTurma} não existe.`);
        return turma;
    }

    buscarAtletaOuFalhar(idAtleta) {
        const atleta = this.atletas.find(a => a.id === idAtleta);
        if (!atleta) throw new Error(`Atleta com ID ${idAtleta} não existe.`);
        return atleta;
    }

    buscarEquipeOuFalhar(idEquipe) {
        const equipe = this.equipes.find(e => e.id === idEquipe);
        if (!equipe) throw new Error(`Equipe com ID ${idEquipe} não existe.`);
        return equipe;
    }

    equipeJaExiste(idTurma, modalidade) {
        return this.equipes.some(e => e.idTurma === idTurma && e.modalidade === modalidade);
    }

    // TURMAS
    adicionarTurma(nome) {
        const novaTurma = CadastroFactory.criarTurma(this.idTurmaContador, nome);
        this.turmas.push(novaTurma);
        this.idTurmaContador++;
        return novaTurma;
    }

    listarTurmas() {
        return this.turmas;
    }

    // ATLETAS
    adicionarAtleta(idT, nome) {
        const turma = this.buscarTurmaOuFalhar(idT);
        const novoAtleta = CadastroFactory.criarAtleta(this.idAtletaContador, nome, idT);
        this.idAtletaContador++;
        this.atletas.push(novoAtleta);
        return { atleta: novoAtleta, turma };
    }

    listarAtletas() {
        return this.atletas.map(atleta => ({
            atleta,
            nomeTurma: this.turmas.find(t => t.id === atleta.idTurma)?.nome ?? 'Turma não encontrada',
        }));
    }

    // ÁRBITROS
    adicionarArbitro(nome, numeroCredencial, anosExperiencia) {
        const novoArbitro = CadastroFactory.criarArbitro(this.idArbitroContador, nome, numeroCredencial, anosExperiencia);
        this.idArbitroContador++;
        this.arbitros.push(novoArbitro);
        return novoArbitro;
    }

    listarArbitros() {
        return this.arbitros;
    }

    // EQUIPES
    adicionarEquipe(idT, modalidade) {
        const turma = this.buscarTurmaOuFalhar(idT);
        if (this.equipeJaExiste(idT, modalidade)) {
            throw new Error(`A turma ${turma.nome} já tem uma equipe em "${modalidade}".`);
        }
        const novaEquipe = CadastroFactory.criarEquipe(this.idEquipeContador, idT, modalidade);
        this.idEquipeContador++;
        this.equipes.push(novaEquipe);
        return { equipe: novaEquipe, turma };
    }

    listarEquipes() {
        return this.equipes.map(e => {
            const turma = this.turmas.find(t => t.id === e.idTurma);
            const nomesAtletas = e.atletas
                .map(idA => this.atletas.find(a => a.id === idA))
                .filter(a => a)
                .map(a => a.nome);
            
            return {
                equipe: e,
                nomeTurma: turma ? turma.nome : "TURMA NÃO ENCONTRADA",
                nomesAtletas
            };
        });
    }

    removerEquipe(idE) {
        const equipe = this.buscarEquipeOuFalhar(idE);
        this.equipes = this.equipes.filter(e => e.id !== equipe.id);
        return this.atletas.length;
    }

    vincularAtletaEquipe(idE, idA) {
        const equipe = this.buscarEquipeOuFalhar(idE);
        const atleta = this.buscarAtletaOuFalhar(idA);
        if (atleta.idTurma !== equipe.idTurma) throw new Error(`${atleta.nome} não pertence à turma dessa equipe.`);
        if (!equipe.adicionarAtleta(idA)) throw new Error(`${atleta.nome} já está nessa equipe.`);
        return { atleta, equipe };
    }

    desvincularAtletaEquipe(idE, idA) {
        const equipe = this.buscarEquipeOuFalhar(idE);
        const atleta = this.buscarAtletaOuFalhar(idA);
        if (!equipe.removerAtleta(idA)) throw new Error(`${atleta.nome} não está nessa equipe.`);
        return { atleta, totalAtletas: this.atletas.length };
    }
}

module.exports = ArenaConnect;