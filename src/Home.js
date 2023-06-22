import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './imagens/shelf-logo.png';

function Home() {
  const [saldoAtual, setSaldoAtual] = useState(0);
  const [despesasAberto, setDespesasAberto] = useState(false);
  const [receitasAberto, setReceitasAberto] = useState(false);
  const [aluguel, setAluguel] = useState(0);
  const [alimentacao, setAlimentacao] = useState(0);
  const [transporte, setTransporte] = useState(0);
  const [despesasOutros, setDespesasOutros] = useState(0);
  const [salario, setSalario] = useState(0);
  const [investimentos, setInvestimentos] = useState(0);
  const [receitasOutros, setReceitasOutros] = useState(0);

  const despesasTotal = aluguel + alimentacao + transporte + despesasOutros;
  const receitaTotal = salario + investimentos + receitasOutros;

  const saldoFinal = saldoAtual - despesasTotal + receitaTotal;

  const alternarDropdown = (dropdown) => {
    if (dropdown === 'despesas') {
      setDespesasAberto(!despesasAberto);
      setReceitasAberto(false);
      if (!despesasAberto) {
        setAluguel(0);
        setAlimentacao(0);
        setTransporte(0);
        setDespesasOutros(0);
      }
    } else if (dropdown === 'receitas') {
      setReceitasAberto(!receitasAberto);
      setDespesasAberto(false);
      if (!receitasAberto) {
        setSalario(0);
        setInvestimentos(0);
        setReceitasOutros(0);
      }
    }
  };

  let saldoBorderColor;
  if (saldoFinal < 0) {
    saldoBorderColor = '#FC3503'; // Vermelho
  } else if (saldoFinal <= 200) {
    saldoBorderColor = '#F7C04A'; // Laranja
  } else {
    saldoBorderColor = '#539165'; // Verde
  }

  const handleRegistrarMovimentacao = () => {
    // Lógica para registrar a movimentação
    // Implemente de acordo com sua necessidade
    console.log('Movimentação registrada!');
  };

  return (
    <main>
      <div className="shelf">
        <section className="section-content">
          <div className="coluna-esq">
            <h2>Saldo Atual</h2>
            <p>R$ {saldoAtual.toFixed(2)}</p>
          </div>
          <div className="coluna-dir"></div>
        </section>

        <section className="despesas section-content">
          <div className="coluna-esq">
            <h2 onClick={() => alternarDropdown('despesas')}>Despesas do Mês</h2>
            {despesasAberto ? (
              <div className="detalhes">
                <div className="input-group">
                  <label>Aluguel:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={aluguel}
                    onChange={(event) => setAluguel(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Alimentação:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={alimentacao}
                    onChange={(event) => setAlimentacao(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Transporte:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={transporte}
                    onChange={(event) => setTransporte(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Outros:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={despesasOutros}
                    onChange={(event) => setDespesasOutros(Number(event.target.value))}
                  />
                </div>
                <button className="registrar-btn" onClick={handleRegistrarMovimentacao}>
                  Registrar Movimentação
                </button>
              </div>
            ) : (
              <p>R$ {despesasTotal.toFixed(2)}</p>
            )}
          </div>
          <div className="coluna-dir"></div>
        </section>

        <section className="receita section-content">
          <div className="coluna-esq">
            <h2 onClick={() => alternarDropdown('receitas')}>Receita Esperada</h2>
            {receitasAberto ? (
              <div className="detalhes">
                <div className="input-group">
                  <label>Salário:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={salario}
                    onChange={(event) => setSalario(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Investimentos:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={investimentos}
                    onChange={(event) => setInvestimentos(Number(event.target.value))}
                  />
                </div>
                <div className="input-group">
                  <label>Outros:</label>
                  <input
                    className="input-box"
                    type="number"
                    value={receitasOutros}
                    onChange={(event) => setReceitasOutros(Number(event.target.value))}
                  />
                </div>
                <button className="registrar-btn" onClick={handleRegistrarMovimentacao}>
                  Registrar Movimentação
                </button>
              </div>
            ) : (
              <p>R$ {receitaTotal.toFixed(2)}</p>
            )}
          </div>
          <div className="coluna-dir"></div>
        </section>

        <section
          className="saldo-final"
          style={{ border: `1px solid ${saldoBorderColor}`, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}
        >
          <div className="coluna-esq">
            <h2>Saldo ao final do mês</h2>
            <p style={{ color: saldoFinal < 0 ? '#FC3503' : saldoFinal <= 200 ? '#F7C04A' : '#539165' }}>
              R$ {saldoFinal.toFixed(2)}
            </p>
          </div>
          <div className="coluna-dir"></div>
        </section>

        <section className={`mensagem ${saldoFinal < 0 ? 'negativo' : saldoFinal <= 200 ? 'atencao' : 'positivo'}`}>
          {saldoFinal < 0 && (
            <p>Cuidado! Seu saldo está negativo. Considere revisar suas despesas e buscar novas receitas.</p>
          )}
          {saldoFinal <= 200 && saldoFinal >= 0 && (
            <p>Atenção! Seu saldo está baixo. Faça um planejamento financeiro para evitar problemas.</p>
          )}
          {saldoFinal > 200 && <p>Parabéns! Seu saldo está positivo. Continue mantendo o controle financeiro.</p>}
        </section>

      </div>
    </main>
  );
}

export default Home;
