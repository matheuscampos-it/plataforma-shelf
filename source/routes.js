const express = require('express');
const router = express.Router();
const connection = require('./Database');

router.post('/registrar', (req, res) => {
  const {fullName, username, password } = req.body;

  if (!fullName || !username || !password) {
    res.status(400).json({ error: 'Preencha todos os campos obrigatórios.' });
    return;
  }
    
  const query = 'INSERT INTO usuario (nome_completo, nome, senha) VALUES (?, ?, ?)';
  connection.query(query, [fullName, username, password], (err, results) => {
    if (err) {
      console.error('Erro ao registrar usuário: ', err);
      res.status(500).json({ error: 'Erro ao registrar usuário', message: err.message });
      return;
    }
    res.json({ success: true });
  });      
});
  
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const query = 'SELECT * FROM usuario WHERE nome = ? AND senha = ?';
  connection.query(query, [username, password], (err, results) => {
     if (err) {
      console.error('Erro ao realizar o login: ', err);
      res.status(500).json({ error: 'Erro ao realizar o login' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Nome de usuário ou senha inválidos' });
    } else {
      const userId = results[0].id;
      res.json({ success: true, userId });
    }
  });
});

router.post('/despesas', (req, res)=> {
  const {userId, aluguel, alimentacao, transporte, despesasOutros} = req.body

  const query = 'INSERT INTO despesas (usuario_id, aluguel, alimentacao, transporte, outros) VALUES (?, ?, ?, ?, ?)';
  connection.query(query, [userId, aluguel, alimentacao, transporte, despesasOutros], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar despesa: ', err);
      res.status(500).json({ error: 'Erro ao cadastrar despesa' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Dados não encontrados' });
    }
  });
})

router.post('/receitas', (req, res)=> {
  const {userId, investimentos, salario, receitasOutros} = req.body

  const query = 'INSERT INTO receitas (usuario_id, salario, investimento, outros) VALUES (?, ?, ?, ?)';
  connection.query(query, [userId, investimentos, salario, receitasOutros], (err, results) => {
    if (err) {
      console.error('Erro ao cadastrar receitas: ', err);
      res.status(500).json({ error: 'Erro ao cadastrar receitas' });
      return;
    }
    if (results.length === 0) {
      res.status(401).json({ error: 'Dados não encontrados' });
    }
  });
})

router.get('/despesas/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT aluguel, alimentacao, transporte, outros as despesasOutros FROM despesas WHERE usuario_Id = ? ORDER BY id DESC LIMIT 1';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar despesas do usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar despesas do usuário.' });
    } else {
      if (results.length > 0) {
        const despesas = results[0];
        res.json({ success: true, despesa: despesas });
      } else {
        res.json({ success: true, despesa: null });
      }
    }
  });
});

router.get('/receitas/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT salario, investimento, outros as receitasOutros FROM receitas WHERE usuario_Id = ? ORDER BY id DESC LIMIT 1';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar despesas do usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar despesas do usuário.' });
    } else {
      if (results.length > 0) {
        const receitas = results[0];
        res.json({ success: true, receita: receitas});
      } else {
        res.json({ success: true, receita: null });
      }
    }
  });
});

router.get('/historico/despesas/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT aluguel, alimentacao, transporte, outros as despesasOutros FROM despesas WHERE usuario_Id = ? ORDER BY id DESC LIMIT 5';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar despesas do usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar despesas do usuário.' });
    } else {
      if (results.length > 0) {
        const despesas = results;
        res.json({ success: true, despesa: despesas });
      } else {
        res.json({ success: true, despesa: [] });
      }
    }
  });
});

router.get('/historico/receitas/:userId', (req, res) => {
  const { userId } = req.params;

  const query = 'SELECT salario, investimento, outros as receitasOutros FROM receitas WHERE usuario_Id = ? ORDER BY id DESC LIMIT 5';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Erro ao buscar receitas do usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar receitas do usuário.' });
    } else {
      if (results.length > 0) {
        const receitas = results;
        res.json({ success: true, receita: receitas });
      } else {
        res.json({ success: true, receita: [] });
      }
    }
  });
});

module.exports = router;