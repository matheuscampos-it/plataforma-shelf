import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';

const Historico = () => {
  const [receitas, setReceitas] = useState([]);
  const [despesas, setDespesas] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchData(userId);
    }
  }, [navigate, userId]);

  const fetchData = async (userId) => {
    try {
      const responseReceitas = await axios.get(`/historico/receitas/${userId}`);
      const responseDespesas = await axios.get(`/historico/despesas/${userId}`);

      if (responseReceitas.data.success && responseReceitas.data.receita) {
        setReceitas(responseReceitas.data.receita);
      } else {
        setReceitas([]);
      }

      if (responseDespesas.data.success && responseDespesas.data.despesa) {
        setDespesas(responseDespesas.data.despesa);
      } else {
        setDespesas([]);
      }
    } catch (error) {
      console.error('Erro ao obter histórico: ', error);
    }
  };

  return (
    <main>
      <div>
        <h1>Página de Histórico</h1>
        {(receitas.length > 0 || despesas.length > 0) ? (
          <div>
            {receitas.length > 0 && (
              <div>
                <h2>Últimas 5 movimentações de receitas</h2>
                <ul>
                  {receitas.map((receita) => (
                    <li key={receita.id}>
                      Salário: {receita.salario}, Investimento: {receita.investimento}, Outros: {receita.receitasOutros}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {despesas.length > 0 && (
              <div>
                <h2>Últimas 5 movimentações de despesas</h2>
                <ul>
                  {despesas.map((despesa) => (
                    <li key={despesa.id}>
                      Aluguel: {despesa.aluguel}, Alimentação: {despesa.alimentacao}, Transporte: {despesa.transporte}, Outros: {despesa.despesasOutros}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Sem histórico a ser exibido.</p>
        )}
      </div>
    </main>
  );
};

export default Historico;
