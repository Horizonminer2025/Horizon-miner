// index.js

document.addEventListener('DOMContentLoaded', () => {
  const balanceElem = document.getElementById('balance');
  const speedElem = document.getElementById('speed');
  const timerElem = document.getElementById('timer');
  const startBtn = document.getElementById('startButton');
  const withdrawBtn = document.getElementById('withdrawButton');
  const walletInput = document.getElementById('wallet');
  const withdrawAmountInput = document.getElementById('withdrawAmount');
  const withdrawMessage = document.getElementById('withdrawMessage');

  let mining = false;
  let balance = 0.0000000000;
  let speed = 10.0; // GH/s
  let timer = 12 * 60 * 60; // 12 hours in seconds
  let miningInterval = null;
  let timerInterval = null;
  const minWithdraw = 0.00001; // mínimo fictício para saque

  function formatBTC(value) {
    return value.toFixed(10);
  }

  function formatTime(seconds) {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
  }

  function updateUI() {
    balanceElem.textContent = formatBTC(balance);
    speedElem.textContent = `${speed.toFixed(1)} GH/s`;
    timerElem.textContent = formatTime(timer);
  }

  function startMining() {
    if (mining) return;

    mining = true;
    startBtn.disabled = true;
    withdrawMessage.textContent = '';

    miningInterval = setInterval(() => {
      // Simulação: quanto maior speed, mais "BTC" ganha por segundo
      const btcPerSecond = speed * 0.0000000001; // Parâmetro de recompensa fictícia
      balance += btcPerSecond;
      updateUI();
    }, 1000);

    timerInterval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateUI();
      } else {
        stopMining();
        startBtn.disabled = false;
      }
    }, 1000);
  }

  function stopMining() {
    mining = false;
    clearInterval(miningInterval);
    clearInterval(timerInterval);
  }

  function handleWithdraw() {
    const wallet = walletInput.value.trim();
    const amount = parseFloat(withdrawAmountInput.value);

    withdrawMessage.style.color = "red";

    if (!wallet) {
      withdrawMessage.textContent = 'Por favor, insira o endereço BTC.';
      return;
    }
    if (!amount || amount <= 0) {
      withdrawMessage.textContent = 'Valor de saque inválido.';
      return;
    }
    if (amount < minWithdraw) {
      withdrawMessage.textContent = `O saque mínimo é ${minWithdraw} BTC.`;
      return;
    }
    if (amount > balance) {
      withdrawMessage.textContent = 'Saldo insuficiente.';
      return;
    }

    // Simulação: "processa" o saque
    balance -= amount;
    updateUI();
    withdrawMessage.style.color = "green";
    withdrawMessage.textContent = `Saque de ${amount} BTC para ${wallet} processado! (Simulação)`;
    withdrawAmountInput.value = '';
  }

  startBtn.addEventListener('click', startMining);
  withdrawBtn.addEventListener('click', handleWithdraw);

  // Simular aceleração de mineração (botão "Acelere sua mineração")
  const accelerateBtn = document.getElementById('accelerateButton');
  if (accelerateBtn) {
    accelerateBtn.add
