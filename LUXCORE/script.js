




// Dados iniciais do usuário
let currentUser = {
    nome: "Larissa Harumy Higa",
    cpf: "123.456.789-00",
    senha: "12345",
    saldo: 1500.00,
    contasAPagar: [
        {descricao: "Luz", valor: 100, vencimento: "2025-11-05", pago: false}
    ],
    movimentacoes: [
        {tipo: "crédito", valor: 1500, data: "2025-10-01", descricao: "Saldo inicial"},
        {tipo: "débito", valor: 50, data: "2025-10-02", descricao: "Supermercado"},
        {tipo: "débito", valor: 30, data: "2025-10-03", descricao: "Farmácia"},
        {tipo: "débito", valor: 25, data: "2025-10-04", descricao: "Transporte"},
        {tipo: "débito", valor: 80, data: "2025-10-05", descricao: "Restaurante"},
        {tipo: "crédito", valor: 200, data: "2025-10-06", descricao: "Transferência recebida"}
    ],
    emprestimos: [
        {valor: 5000, parcelas: 12, juros: 0.02}
    ],
    investimentos: [
        {valor: 1000, rendimentoMensal: 0.005}
    ],
    chavesPix: ["123.456.789-00", "larissa@luxcore.com"],
    cartao: {
        numero: "1234 5678 9012 3456",
        titular: "LARISSA HIGA",
        validade: "12/28",
        cvv: "123"
    }
};

// Array para armazenar usuários cadastrados
let usuariosCadastrados = [currentUser];

// Elementos da interface
const loginScreen = document.getElementById('loginScreen');
const registerScreen = document.getElementById('registerScreen');
const appScreen = document.getElementById('appScreen');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegister = document.getElementById('showRegister');
const showLogin = document.getElementById('showLogin');
const logoutBtn = document.getElementById('logoutBtn');

// Elementos do dashboard
const userName = document.getElementById('userName');
const userBalance = document.getElementById('userBalance');
const availableBalance = document.getElementById('availableBalance');
const billsToPay = document.getElementById('billsToPay');
const investments = document.getElementById('investments');
const loans = document.getElementById('loans');
const transactionList = document.getElementById('transactionList');
const notification = document.getElementById('notification');
const notificationMessage = document.getElementById('notificationMessage');

// Elementos do cartão
const cardNumberDisplay = document.getElementById('cardNumberDisplay');
const cardHolderDisplay = document.getElementById('cardHolderDisplay');
const cardExpiryDisplay = document.getElementById('cardExpiryDisplay');

// Modais
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn, .close-modal');
const operationButtons = document.querySelectorAll('.operation-btn');

// Criar estrelas mágicas
function createMagicStars() {
    const starsContainer = document.getElementById('magicStars');
    const starCount = 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 5 + 2;
        
        star.style.left = `${x}%`;
        star.style.top = `${y}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.animationDuration = `${duration}s`;
        
        starsContainer.appendChild(star);
    }
}

// Efeito de brilho mágico nos botões
function addMagicSparkle(e, element) {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const sparkle = document.createElement('div');
    sparkle.classList.add('magic-sparkle');
    sparkle.style.left = `${x}px`;
    sparkle.style.top = `${y}px`;
    
    element.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 2000);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    createMagicStars();
    
    document.querySelectorAll('.operation-btn, .login-btn, .btn-primary, .pix-option-btn, .card-action-btn').forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            addMagicSparkle(e, this);
        });
    });

    // Evento de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const cpf = document.getElementById('loginCPF').value;
        const password = document.getElementById('loginPassword').value;
        
        const usuario = usuariosCadastrados.find(user => user.cpf === cpf && user.senha === password);
        
        if (usuario) {
            currentUser = usuario;
            loginScreen.style.display = 'none';
            appScreen.style.display = 'flex';
            updateDashboard();
            showNotification('Login realizado com sucesso! ✨', 'success');
        } else {
            showNotification('CPF ou senha incorretos!', 'error');
        }
    });

    // Evento de cadastro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const nome = document.getElementById('registerName').value;
        const cpf = document.getElementById('registerCPF').value;
        const email = document.getElementById('registerEmail').value;
        const senha = document.getElementById('registerPassword').value;
        const saldoInicial = parseFloat(document.getElementById('initialBalance').value);

        if (usuariosCadastrados.find(user => user.cpf === cpf)) {
            showNotification('CPF já cadastrado!', 'error');
            return;
        }

        const novoUsuario = {
            nome: nome,
            cpf: cpf,
            email: email,
            senha: senha,
            saldo: saldoInicial,
            contasAPagar: [],
            movimentacoes: [
                {tipo: "crédito", valor: saldoInicial, data: new Date().toISOString().split('T')[0], descricao: "Saldo inicial"}
            ],
            emprestimos: [],
            investimentos: [],
            chavesPix: [cpf, email],
            cartao: {
                numero: gerarNumeroCartao(),
                titular: nome.toUpperCase(),
                validade: gerarValidadeCartao(),
                cvv: Math.floor(100 + Math.random() * 900).toString()
            }
        };

        usuariosCadastrados.push(novoUsuario);
        currentUser = novoUsuario;

        registerScreen.style.display = 'none';
        appScreen.style.display = 'flex';
        updateDashboard();
        showNotification('Cadastro realizado com sucesso! ✨', 'success');
        registerForm.reset();
    });

    // Navegação entre login e cadastro
    showRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginScreen.style.display = 'none';
        registerScreen.style.display = 'block';
    });

    showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerScreen.style.display = 'none';
        loginScreen.style.display = 'block';
    });

    // Evento do botão de sair - AGORA VAI PARA A TELA DE LOGIN
    logoutBtn.addEventListener('click', function() {
        fazerLogout();
    });

    // Eventos para os botões de operação
    operationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            
            if (action === 'card') {
                updateCardDisplay();
                openModal(action);
            } else {
                openModal(action);
            }
        });
    });

    // Eventos para fechar modais
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });

    // Fechar modal ao clicar fora
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeAllModals();
            }
        });
    });

    // Eventos para formulários
    document.getElementById('transferForm').addEventListener('submit', processTransfer);
    document.getElementById('paymentForm').addEventListener('submit', processPayment);
    document.getElementById('loanForm').addEventListener('submit', processLoan);
    document.getElementById('investmentForm').addEventListener('submit', processInvestment);
    
    // Eventos para PIX
    document.querySelectorAll('.pix-option-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-pix-action');
            handlePixAction(action);
        });
    });

    // Eventos para Cartão
    document.querySelectorAll('.card-action-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-card-action');
            handleCardAction(action);
        });
    });
    
    // Cálculo de empréstimo em tempo real
    document.getElementById('loanAmount').addEventListener('input', calculateLoan);
    document.getElementById('loanInstallments').addEventListener('change', calculateLoan);
    
    // Cálculo de investimento em tempo real
    document.getElementById('investmentAmount').addEventListener('input', calculateInvestment);
    document.getElementById('investmentType').addEventListener('change', calculateInvestment);
});

// Função para fazer logout - AGORA VAI DIRETO PARA A TELA DE LOGIN
function fazerLogout() {
    appScreen.style.display = 'none';
    loginScreen.style.display = 'flex';
    registerScreen.style.display = 'none';
    
    // Limpar os campos de login
    document.getElementById('loginCPF').value = '';
    document.getElementById('loginPassword').value = '';
    
    showNotification('Logout realizado com sucesso! ✨', 'success');
}

// Função para atualizar o dashboard
function updateDashboard() {
    userName.textContent = currentUser.nome;
    userBalance.textContent = formatCurrency(currentUser.saldo);
    availableBalance.textContent = formatCurrency(currentUser.saldo);
    
    const iniciais = currentUser.nome.split(' ').map(nome => nome[0]).join('').toUpperCase();
    document.getElementById('userAvatar').textContent = iniciais.substring(0, 2);

    const totalBills = currentUser.contasAPagar
        .filter(bill => !bill.pago)
        .reduce((total, bill) => total + bill.valor, 0);
    billsToPay.textContent = formatCurrency(totalBills);
    
    const totalInvestments = currentUser.investimentos
        .reduce((total, investment) => total + investment.valor, 0);
    investments.textContent = formatCurrency(totalInvestments);
    
    const totalLoans = currentUser.emprestimos
        .reduce((total, loan) => total + loan.valor, 0);
    loans.textContent = formatCurrency(totalLoans);
    
    updateTransactionList();
}

// Função para atualizar a exibição do cartão
function updateCardDisplay() {
    cardNumberDisplay.textContent = '•••• •••• •••• ' + currentUser.cartao.numero.slice(-4);
    cardHolderDisplay.textContent = currentUser.cartao.titular;
    cardExpiryDisplay.textContent = currentUser.cartao.validade;
}

// Função para atualizar a lista de transações
function updateTransactionList() {
    transactionList.innerHTML = '';
    
    const sortedMovements = [...currentUser.movimentacoes].sort((a, b) => 
        new Date(b.data) - new Date(a.data)
    );
    
    sortedMovements.slice(0, 6).forEach(mov => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        
        const transactionInfo = document.createElement('div');
        transactionInfo.className = 'transaction-info';
        
        const transactionName = document.createElement('div');
        transactionName.className = 'transaction-name';
        transactionName.textContent = mov.descricao;
        
        const transactionDate = document.createElement('div');
        transactionDate.className = 'transaction-date';
        transactionDate.textContent = formatDate(mov.data);
        
        transactionInfo.appendChild(transactionName);
        transactionInfo.appendChild(transactionDate);
        
        const transactionAmount = document.createElement('div');
        transactionAmount.className = `transaction-amount ${mov.tipo === 'crédito' ? 'positive' : 'negative'}`;
        transactionAmount.textContent = `${mov.tipo === 'crédito' ? '+' : '-'} ${formatCurrency(mov.valor)}`;
        
        transactionItem.appendChild(transactionInfo);
        transactionItem.appendChild(transactionAmount);
        
        transactionList.appendChild(transactionItem);
    });
}

// Função para abrir modal
function openModal(type) {
    closeAllModals();
    
    switch(type) {
        case 'pix':
            document.getElementById('pixModal').style.display = 'flex';
            break;
        case 'card':
            document.getElementById('cardModal').style.display = 'flex';
            break;
        case 'transfer':
            document.getElementById('transferModal').style.display = 'flex';
            break;
        case 'payment':
            document.getElementById('paymentModal').style.display = 'flex';
            break;
        case 'loan':
            document.getElementById('loanModal').style.display = 'flex';
            calculateLoan();
            break;
        case 'investment':
            document.getElementById('investmentModal').style.display = 'flex';
            calculateInvestment();
            break;
        case 'extract':
            document.getElementById('extractModal').style.display = 'flex';
            showExtract();
            break;
    }
}

// Função para fechar todos os modais
function closeAllModals() {
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
}

// Função para processar transferência
function processTransfer(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('transferAmount').value);
    const recipientCPF = document.getElementById('recipientCPF').value;
    
    if (amount > currentUser.saldo) {
        showNotification('Saldo insuficiente para realizar a transferência!', 'error');
        return;
    }
    
    currentUser.saldo -= amount;
    currentUser.movimentacoes.push({
        tipo: 'débito',
        valor: amount,
        data: new Date().toISOString().split('T')[0],
        descricao: `Transferência para ${recipientCPF}`
    });
    
    updateDashboard();
    closeAllModals();
    showNotification('Transferência realizada com sucesso! ✨', 'success');
    document.getElementById('transferForm').reset();
}

// Função para processar pagamento
function processPayment(e) {
    e.preventDefault();
    const description = document.getElementById('paymentDescription').value;
    const amount = parseFloat(document.getElementById('paymentAmount').value);
    const dueDate = document.getElementById('paymentDueDate').value;
    
    if (amount > currentUser.saldo) {
        showNotification('Saldo insuficiente para realizar o pagamento!', 'error');
        return;
    }
    
    currentUser.saldo -= amount;
    currentUser.movimentacoes.push({
        tipo: 'débito',
        valor: amount,
        data: new Date().toISOString().split('T')[0],
        descricao: `Pagamento: ${description}`
    });
    
    const billIndex = currentUser.contasAPagar.findIndex(bill => 
        bill.descricao.toLowerCase() === description.toLowerCase() && !bill.pago
    );
    
    if (billIndex !== -1) {
        currentUser.contasAPagar[billIndex].pago = true;
    }
    
    updateDashboard();
    closeAllModals();
    showNotification('Pagamento realizado com sucesso! ✨', 'success');
    document.getElementById('paymentForm').reset();
}

// Função para processar empréstimo
function processLoan(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('loanAmount').value);
    const installments = parseInt(document.getElementById('loanInstallments').value);
    
    currentUser.emprestimos.push({
        valor: amount,
        parcelas: installments,
        juros: 0.02
    });
    
    currentUser.saldo += amount;
    currentUser.movimentacoes.push({
        tipo: 'crédito',
        valor: amount,
        data: new Date().toISOString().split('T')[0],
        descricao: 'Empréstimo contratado'
    });
    
    updateDashboard();
    closeAllModals();
    showNotification('Empréstimo contratado com sucesso! ✨', 'success');
    document.getElementById('loanForm').reset();
}

// Função para processar investimento
function processInvestment(e) {
    e.preventDefault();
    const amount = parseFloat(document.getElementById('investmentAmount').value);
    const type = document.getElementById('investmentType').value;
    
    if (amount > currentUser.saldo) {
        showNotification('Saldo insuficiente para realizar o investimento!', 'error');
        return;
    }
    
    currentUser.saldo -= amount;
    currentUser.investimentos.push({
        valor: amount,
        rendimentoMensal: type === 'conservador' ? 0.005 : 0.008
    });
    
    currentUser.movimentacoes.push({
        tipo: 'débito',
        valor: amount,
        data: new Date().toISOString().split('T')[0],
        descricao: `Aplicação em investimento ${type}`
    });
    
    updateDashboard();
    closeAllModals();
    showNotification('Investimento realizado com sucesso! ✨', 'success');
    document.getElementById('investmentForm').reset();
}

// Função para calcular empréstimo
function calculateLoan() {
    const amount = parseFloat(document.getElementById('loanAmount').value) || 0;
    const installments = parseInt(document.getElementById('loanInstallments').value);
    const interestRate = 0.02;
    
    if (amount > 0) {
        const monthlyPayment = (amount * interestRate) / (1 - Math.pow(1 + interestRate, -installments));
        document.getElementById('loanCalculation').textContent = 
            `Valor da parcela: ${formatCurrency(monthlyPayment)}`;
    } else {
        document.getElementById('loanCalculation').textContent = 'Valor da parcela: R$ 0,00';
    }
}

// Função para calcular investimento
function calculateInvestment() {
    const amount = parseFloat(document.getElementById('investmentAmount').value) || 0;
    const type = document.getElementById('investmentType').value;
    const monthlyRate = type === 'conservador' ? 0.005 : 0.008;
    
    if (amount > 0) {
        const futureValue = amount * Math.pow(1 + monthlyRate, 12);
        const earnings = futureValue - amount;
        document.getElementById('investmentEarnings').textContent = 
            `Rendimento estimado após 12 meses: ${formatCurrency(earnings)}`;
    } else {
        document.getElementById('investmentEarnings').textContent = 
            'Rendimento estimado após 12 meses: R$ 0,00';
    }
}

// Função para mostrar extrato
function showExtract() {
    const extractContent = document.getElementById('extractContent');
    extractContent.innerHTML = '';
    
    const sortedMovements = [...currentUser.movimentacoes].sort((a, b) => 
        new Date(b.data) - new Date(a.data)
    );
    
    sortedMovements.forEach(mov => {
        const transactionItem = document.createElement('div');
        transactionItem.className = 'transaction-item';
        transactionItem.style.marginBottom = '10px';
        
        const transactionInfo = document.createElement('div');
        transactionInfo.className = 'transaction-info';
        
        const transactionName = document.createElement('div');
        transactionName.className = 'transaction-name';
        transactionName.textContent = mov.descricao;
        
        const transactionDate = document.createElement('div');
        transactionDate.className = 'transaction-date';
        transactionDate.textContent = formatDate(mov.data);
        
        transactionInfo.appendChild(transactionName);
        transactionInfo.appendChild(transactionDate);
        
        const transactionAmount = document.createElement('div');
        transactionAmount.className = `transaction-amount ${mov.tipo === 'crédito' ? 'positive' : 'negative'}`;
        transactionAmount.textContent = `${mov.tipo === 'crédito' ? '+' : '-'} ${formatCurrency(mov.valor)}`;
        
        transactionItem.appendChild(transactionInfo);
        transactionItem.appendChild(transactionAmount);
        
        extractContent.appendChild(transactionItem);
    });
}

// Funções para PIX
function handlePixAction(action) {
    switch(action) {
        case 'transfer':
            closeAllModals();
            openModal('transfer');
            break;
        case 'receive':
            showNotification('Chave PIX: ' + currentUser.chavesPix[0] + ' ✨', 'success');
            break;
        case 'keys':
            showNotification('Suas chaves PIX: ' + currentUser.chavesPix.join(', ') + ' ✨', 'success');
            break;
        case 'history':
            showNotification('Histórico PIX carregado! ✨', 'success');
            break;
    }
}

// Funções para Cartão
function handleCardAction(action) {
    switch(action) {
        case 'show':
            showNotification(`Cartão: ${currentUser.cartao.numero}\nValidade: ${currentUser.cartao.validade}\nCVV: ${currentUser.cartao.cvv} ✨`, 'success');
            break;
        case 'copy':
            navigator.clipboard.writeText(currentUser.cartao.numero.replace(/\s/g, ''));
            showNotification('Número do cartão copiado! ✨', 'success');
            break;
        case 'block':
            showNotification('Cartão bloqueado com sucesso! ✨', 'success');
            break;
    }
}

// Função para gerar número de cartão
function gerarNumeroCartao() {
    let numero = '';
    for (let i = 0; i < 16; i++) {
        numero += Math.floor(Math.random() * 10);
        if ((i + 1) % 4 === 0 && i !== 15) {
            numero += ' ';
        }
    }
    return numero;
}

// Função para gerar validade do cartão
function gerarValidadeCartao() {
    const mes = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const ano = String(new Date().getFullYear() + Math.floor(Math.random() * 5) + 1).slice(-2);
    return `${mes}/${ano}`;
}

// Função para mostrar notificação
function showNotification(message, type) {
    notificationMessage.textContent = message;
    notification.className = 'notification';
    notification.classList.add(type);
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Função para formatar data
function formatDate(dateString) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
}

// Função para formatar moeda
function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
}
