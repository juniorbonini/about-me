/*
  Solução: Desenvolver um sistema de caixa eletrônico onde o usuário
  poderá realizar depósitos e saques. O sistema deve atualizar o saldo
  em tempo real na interface e impedir operações inválidas como:
  saque maior que o saldo disponível, valores negativos ou campos vazios.

  O sistema basicamente funciona como um controle financeiro simples,
  permitindo ao usuário visualizar e manipular seu saldo atual.

  ---------------------------------------------------------

  Estrutura principal do sistema:

  Classe: ContaBancaria
  Responsável por:
  - armazenar saldo
  - realizar depósitos
  - realizar saques
  - validar saldo disponível

  Classe: CaixaEletronico
  Responsável por:
  - capturar dados do HTML
  - chamar métodos da conta bancária
  - atualizar interface
  - limpar campos

  ---------------------------------------------------------

  Fluxo do depósito:

  1 Passo: Capturar valor digitado pelo usuário
  2 Passo: Converter valor para número
  3 Passo: Validar se o valor:
    - não está vazio
    - não é menor ou igual a 0
    - é realmente um número
  4 Passo: Chamar método depositar da ContaBancaria
  5 Passo: Somar valor ao saldo atual
  6 Passo: Atualizar saldo na interface
  7 Passo: Limpar campo de depósito

  ---------------------------------------------------------

  Fluxo do saque:

  1 Passo: Capturar valor digitado pelo usuário
  2 Passo: Converter valor para número
  3 Passo: Validar se o valor:
    - não está vazio
    - não é menor ou igual a 0
    - é realmente um número
  4 Passo: Verificar se existe saldo suficiente
  5 Passo: Caso tenha saldo:
    - realizar saque
    - atualizar saldo
  6 Passo: Caso NÃO tenha saldo:
    - impedir operação
    - informar saldo insuficiente
  7 Passo: Atualizar interface
  8 Passo: Limpar campo de saque

  ---------------------------------------------------------

  Atributos necessários:

  ContaBancaria:
  - _saldo

  CaixaEletronico:
  - conta

  ---------------------------------------------------------

  Métodos necessários:

  ContaBancaria:
  - depositar(valor)
  - sacar(valor)
  - temSaldoParaRealizarSaque(valor)
  - get saldo()

  CaixaEletronico:
  - depositar()
  - sacar()
  - mostrarSaldo()
  - limparCampos()

  ---------------------------------------------------------

  Validações importantes:

  - impedir NaN
  - impedir valores negativos
  - impedir saque sem saldo
  - impedir campos vazios
  - impedir saque de valor 0

  ---------------------------------------------------------

  Objetivo final:

  Criar um sistema simples utilizando:
  - orientação a objetos
  - encapsulamento
  - separação de responsabilidades
  - manipulação do DOM
  - validações de regra de negócio
*/
class ContaBancaria {
  #saldo;

  constructor() {
    this.#saldo = 0;
  }

  depositar(valor) {
    this.#saldo += valor;
  }

  sacar(valor) {
    this.#saldo -= valor;
  }

  temValorParaRealizarSaque(valor) {
    return valor <= this.#saldo;
  }

  get saldo() {
    return this.#saldo;
  }
}

class CaixaEletronico {
  constructor(conta) {
    this.conta = conta;
  }

  sacar() {
    const valor = parseFloat(document.getElementById("saque").value);

    if (isNaN(valor) || valor <= 0) {
      this.mostrarSaldo("Valor inválido");
      return;
    }

    if (this.conta.temValorParaRealizarSaque(valor)) {
      this.conta.sacar(valor);

      this.mostrarSaldo(this.conta.saldo);

      this.limparCampos();
    } else {
      this.mostrarSaldo("Saldo insuficiente");
    }
  }

  depositar() {
    const valor = parseFloat(document.getElementById("deposito").value);

    if (isNaN(valor) || valor <= 0) {
      this.mostrarSaldo("Valor inválido");
      return;
    }

    this.conta.depositar(valor);

    this.mostrarSaldo(this.conta.saldo);

    this.limparCampos();
  }

  mostrarSaldo(saldo) {
    document.getElementById("valorDisponivel").textContent = `R$ ${saldo}`;
  }

  limparCampos() {
    document.getElementById("deposito").value = "";
    document.getElementById("saque").value = "";
  }
}

const contaBancaria = new ContaBancaria();
const caixaEletronico = new CaixaEletronico(contaBancaria);
