import React, { useState } from 'react';

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

  return (
    <main>
      <div className='shelf'>
        <section id='shelf'>
          <div className='coluna-esq'>
            <h2>Saldo Atual</h2>
            <input
              className='input-box'
              type='number'
              value={saldoAtual}
              onChange={(event) => setSaldoAtual(Number(event.target.value))}
            />
          </div>
          <div className='coluna-dir'></div>
        </section>

        <section className='despesas' id='shelf'>
          <div className='coluna-esq'>
            <h2 onClick={() => alternarDropdown('despesas')}>Despesas do Mês</h2>
            {despesasAberto ? (
              <>
                <div className='input-group'>
                  <label>Aluguel:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={aluguel}
                    onChange={(event) => setAluguel(Number(event.target.value))}
                  />
                </div>
                <div className='input-group'>
                  <label>Alimentação:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={alimentacao}
                    onChange={(event) => setAlimentacao(Number(event.target.value))}
                  />
                </div>
                <div className='input-group'>
                  <label>Transporte:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={transporte}
                    onChange={(event) => setTransporte(Number(event.target.value))}
                  />
                </div>
                <div className='input-group'>
                  <label>Outros:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={despesasOutros}
                    onChange={(event) => setDespesasOutros(Number(event.target.value))}
                  />
                </div>
              </>
            ) : (
              <p>R${despesasTotal}</p>
            )}
          </div>
          <div className='coluna-dir'></div>
        </section>

        <section className='receita' id='shelf'>
          <div className='coluna-esq'>
            <h2 onClick={() => alternarDropdown('receitas')}>Receita Esperada</h2>
            {receitasAberto ? (
              <>
                <div className='input-group'>
                  <label>Salário:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={salario}
                    onChange={(event) => setSalario(Number(event.target.value))}
                  />
                </div>
                <div className='input-group'>
                  <label>Investimentos:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={investimentos}
                    onChange={(event) => setInvestimentos(Number(event.target.value))}
                  />
                </div>
                <div className='input-group'>
                  <label>Outros:</label>
                  <input
                    className='input-box'
                    type='number'
                    value={receitasOutros}
                    onChange={(event) => setReceitasOutros(Number(event.target.value))}
                  />
                </div>
              </>
            ) : (
              <p>R${receitaTotal}</p>
            )}
          </div>
          <div className='coluna-dir'></div>
        </section>

        <section className='saldo-final' id='shelf' style={{ border: `1px solid ${saldoBorderColor}`, boxShadow: `0 2px 4px rgba(0, 0, 0, 0.1)` }}>
          <div className='coluna-esq'>
            <h2>Saldo ao final do mês</h2>
            <p style={{ color: saldoFinal < 0 ? '#FC3503' : saldoFinal <= 200 ? '#F7C04A' : '#539165' }}>
              R${saldoFinal}
            </p>
          </div>
          <div className='coluna-dir'></div>
        </section>

        <section className={`mensagem ${saldoFinal < 0 ? 'negativo' : saldoFinal <= 200 ? 'atencao' : 'positivo'}`}>
          {saldoFinal < 0 && <p>Cuidado! Sua conta está no vermelho, procure economizar! Nada de fast food pelas próximas semanas.</p>}
          {saldoFinal >= 0 && saldoFinal <= 200 && <p>Atenção, você ainda não está no vermelho, mas está quase!</p>}
          {saldoFinal > 200 && <p>Legal, tudo tranquilo, compre um açaí para comemorar!</p>}
        </section>
      </div>
    </main>
  );
}

export default Home;
