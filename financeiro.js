/**
 * MVP - Módulo de Controle Financeiro Pessoal
 * Arquitetura: Separação entre validação, regra de negócio e persistência em memória.
 */

class ControleFinanceiro {
  constructor() {
    this.transacoes = [];
  }

  // Validação de segurança e integridade dos dados de entrada
  validarTransacao(descricao, valor, tipo) {
    if (!descricao || typeof descricao !== "string" || descricao.trim().length < 3) {
      throw new Error("Descrição inválida: informe ao menos 3 caracteres.");
    }
    if (typeof valor !== "number" || isNaN(valor) || valor <= 0) {
      throw new Error("Valor inválido: deve ser um número maior que zero.");
    }
    const tiposPermitidos = ["RECEITA", "DESPESA"];
    if (!tiposPermitidos.includes(tipo)) {
      throw new Error("Tipo inválido: utilize RECEITA ou DESPESA.");
    }
  }

  // Regra de negócio para registro de movimentação
  adicionarTransacao(descricao, valor, tipo) {
    const tipoNormalizado = String(tipo).toUpperCase().trim();
    this.validarTransacao(descricao, valor, tipoNormalizado);

    const novaTransacao = {
      id: this.transacoes.length + 1,
      descricao: descricao.trim(),
      valor: Number(valor.toFixed(2)),
      tipo: tipoNormalizado,
      data: new Date().toISOString().split("T")[0],
    };

    this.transacoes.push(novaTransacao);
    return novaTransacao;
  }

  // Cálculo consolidado de receitas, despesas e saldo líquido
  obterResumo() {
    const totalReceitas = this.transacoes
      .filter((t) => t.tipo === "RECEITA")
      .reduce((acc, t) => acc + t.valor, 0);

    const totalDespesas = this.transacoes
      .filter((t) => t.tipo === "DESPESA")
      .reduce((acc, t) => acc + t.valor, 0);

    return {
      totalReceitas: Number(totalReceitas.toFixed(2)),
      totalDespesas: Number(totalDespesas.toFixed(2)),
      saldoAtual: Number((totalReceitas - totalDespesas).toFixed(2)),
    };
  }
}

module.exports = ControleFinanceiro;
