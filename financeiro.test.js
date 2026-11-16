const ControleFinanceiro = require("./financeiro");

describe("MVP Controle Financeiro - Testes Unitários e de Integração", () => {
  let sistema;

  beforeEach(() => {
    sistema = new ControleFinanceiro();
  });

  // Testes Unitários - Validações de Segurança
  test("Deve rejeitar descrição inválida ou curta", () => {
    expect(() => sistema.adicionarTransacao("Oi", 100, "RECEITA")).toThrow(
      "Descrição inválida: informe ao menos 3 caracteres."
    );
  });

  test("Deve rejeitar valor negativo, zero ou não numérico", () => {
    expect(() => sistema.adicionarTransacao("Salário", -50, "RECEITA")).toThrow(
      "Valor inválido: deve ser um número maior que zero."
    );
    expect(() => sistema.adicionarTransacao("Salário", 0, "RECEITA")).toThrow();
  });

  test("Deve rejeitar tipo de movimentação não permitido", () => {
    expect(() => sistema.adicionarTransacao("Aluguel", 1200, "EMPRESTIMO")).toThrow(
      "Tipo inválido: utilize RECEITA ou DESPESA."
    );
  });

  // Teste de Integração - Fluxo completo de Receitas, Despesas e Saldo
  test("Deve registrar receitas e despesas e calcular o resumo corretamente", () => {
    const r1 = sistema.adicionarTransacao("Salário Mensal", 5000, "receita");
    const d1 = sistema.adicionarTransacao("Aluguel Imóvel", 1800.5, "DESPESA");
    const d2 = sistema.adicionarTransacao("Supermercado", 699.5, "despesa");

    expect(r1.id).toBe(1);
    expect(d1.tipo).toBe("DESPESA");
    expect(d2.valor).toBe(699.5);

    const resumo = sistema.obterResumo();
    expect(resumo).toEqual({
      totalReceitas: 5000,
      totalDespesas: 2500,
      saldoAtual: 2500,
    });
  });
});
