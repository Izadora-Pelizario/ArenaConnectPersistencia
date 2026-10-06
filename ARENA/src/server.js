// server.js
const TurmaController = require('./controllers/TurmaController');
const AtletaController = require('./controllers/AtletaController');
const ArbitroController = require('./controllers/ArbitroController');
const EquipeController = require('./controllers/EquipeController');
const PersistenciaController = require('./controllers/PersistenciaController');
const MenuView = require('./views/MenuView');

const turmaCtrl = new TurmaController();
const atletaCtrl = new AtletaController();
const arbitroCtrl = new ArbitroController();
const equipeCtrl = new EquipeController();
const persistencia = new PersistenciaController();

// 1. Carregar dados ao iniciar o programa
persistencia.carregarEstado();

function encerrarSistema() {
    persistencia.salvarEstado();
    console.log("Dados salvos com sucesso!");
    process.exit(0);
}

// 2. Loop Principal
function iniciar() {
    let rodando = true;
    while (rodando) {
        const opcao = MenuView.mostrarMenu();
        
        switch (opcao) {
            case '1': turmaCtrl.registrarTurma(); break;
            case '2': turmaCtrl.listarTurmas(); break;
            case '3': atletaCtrl.registrarAtleta(); break;
            case '4': atletaCtrl.listarAtletas(); break;
            case '5': arbitroCtrl.registrarArbitro(); break;
            case '6': arbitroCtrl.listarArbitros(); break;
            case '7': equipeCtrl.registrarEquipe(); break;
            case '8': equipeCtrl.listarEquipes(); break;
            case '9': equipeCtrl.vincularAtleta(); break;
            case '10': equipeCtrl.desvincularAtleta(); break;
            case '11': equipeCtrl.removerEquipe(); break;
            case '0':
                rodando = false;
                encerrarSistema();
                break;
            default:
                MenuView.mostrarOpcaoInvalida();
        }
    }
}

// 3. Inicializar
iniciar();