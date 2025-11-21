// script.js

// 1. Variáveis de Estado
let board = ['', '', '', '', '', '', '', '', '']; // Representa as 9 células
let currentPlayer = 'X';
let isGameActive = true; // Controla se o jogo pode aceitar jogadas

// 2. Elementos DOM
const statusDisplay = document.getElementById('status');
const gameBoard = document.getElementById('gameBoard');

// As condições de vitória (índices das células)
const winningConditions = [
    [0, 1, 2], // Linhas
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Colunas
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8], // Diagonais
    [2, 4, 6]
];

// 3. Função para Iniciar/Criar o Tabuleiro
function initializeGame() {
    // Cria 9 células e anexa o evento de clique
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i); // Armazena o índice da célula
        cell.addEventListener('click', handleCellClick);
        gameBoard.appendChild(cell);
    }
}

// 4. Função que lida com o Clique em uma Célula (principal lógica de jogada)
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    // 🛑 1. Verifica se a célula já está preenchida ou se o jogo acabou
    if (board[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    // ✅ 2. Processa a jogada
    board[clickedCellIndex] = currentPlayer; // Atualiza o array de estado
    clickedCell.innerHTML = currentPlayer;   // Atualiza a visualização no HTML

    // ➡️ 3. Verifica se houve vitória ou empate
    handleResultValidation();
    
    // 🔄 4. Troca o jogador
    if (isGameActive) {
        changePlayer();
    }
}

// 5. Função para Trocar o Jogador
function changePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerHTML = `Vez do Jogador: ${currentPlayer}`;
}

// 6. Função de Validação (Onde a lógica de vitória é implementada)
function handleResultValidation() {
    let roundWon = false;
    let winningCells = []; // <-- NOVO: Armazenará os índices da vitória
    
    // Itera sobre as condições de vitória
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        
        // Pega os valores das 3 células da condição atual
        let a = board[winCondition[0]];
        let b = board[winCondition[1]];
        let c = board[winCondition[2]];

        // Se alguma célula estiver vazia, pule a checagem
        if (a === '' || b === '' || c === '') {
            continue;
        }

        // Se as 3 células forem iguais (X ou O), temos um vencedor
        if (a === b && b === c) {
            roundWon = true;
            winningCells = winCondition; // <-- NOVO: Salva os índices vencedores
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `🥳 O Jogador ${currentPlayer} VENCEU!`;
        isGameActive = false; // Desativa o jogo
        
        // <-- NOVO: Aplica a classe CSS 'winning-cell' nas células vencedoras
        winningCells.forEach(index => {
            document.querySelector(`.cell[data-index="${index}"]`).classList.add('winning-cell');
        });

        return;
    }

    // Checa por Empate (se não houve vitória e o tabuleiro está cheio)
    let roundDraw = !board.includes('');
    if (roundDraw) {
        statusDisplay.innerHTML = `🤝 Empate!`;
        isGameActive = false;
        return;
    }
}

// 7. Função para Reiniciar o Jogo
function resetGame() {
    isGameActive = true;
    currentPlayer = 'X';
    board = ['', '', '', '', '', '', '', '', ''];
    statusDisplay.innerHTML = `Vez do Jogador: ${currentPlayer}`;
    gameBoard.innerHTML = ''; // Limpa o tabuleiro HTML

    // <-- NOVO: Remova as classes 'winning-cell' ao reiniciar (se houver)
    // Embora gameBoard.innerHTML = '' já remova as células,
    // é uma boa prática pensar em como você faria se não limpasse tudo.
    // Neste caso, a recriação das células já garante que não terão a classe.

    initializeGame(); // Recria o tabuleiro
}

// INÍCIO: Chama a função de inicialização quando o script carrega
initializeGame();