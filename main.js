var API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';

// Função obrigatória do contrato: valida se a retirada pode ser feita
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

function carregarMateriais() {
  fetch(API_URL)
    .then(function(res) { return res.json(); })
    .then(function(dados) {
      var totalEl = document.getElementById('total-itens');
      if (totalEl) totalEl.textContent = dados.length;

      var html = '';
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + (item.produto || '—') + '</td>';
        html += '<td>' + (item.quantidadeEstoque || 0) + '</td>';
        html += '<td>' + (item.dataEntrada || '—') + '</td>';
        html += '<td>';
        html += '<button class="btn-baixar" onclick="registrarBaixa(\'' + item.id + '\',' + (item.quantidadeEstoque || 0) + ')">Baixa</button> ';
        html += '<button class="btn-excluir" onclick="excluirItem(\'' + item.id + '\')">Excluir</button>';
        html += '</td>';
        html += '</tr>';
      }
      var lista = document.getElementById('lista-materiais');
      lista.innerHTML = html || '<tr><td colspan="5" class="vazio">Nenhum item cadastrado.</td></tr>';
    });
}

// Criando a função que faz a subtração dada a quantidade de retirada
function registrarBaixa(id,estoqueAtual){
  var retiradaEl = document.getElementById('input-retirada');
  var qtd = Number(retiradaEl.value);

  if (!validarRetirada(estoqueAtual, qtd)) {
    alert('Quantidade inválida ou maior que o estoque disponível (' + estoqueAtual + ').');
    return;
  }

  fetch(API_URL + '/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quantidadeEstoque: estoqueAtual - qtd })
  }).then(function() {
    retiradaEl.value = '';
    carregarMateriais();
  });
}

// Função p/ fazer a exclusão dos itens
function excluirItem(id) {
  if (!confirm('Deseja excluir este item?')) return;

  fetch(API_URL + '/' + id, { method: 'DELETE' })
    .then(function() {
      carregarMateriais();
    });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn-cadastrar').addEventListener('click', function() {
    var nome = document.getElementById('input-nome').value;
    var qtd  = document.getElementById('input-quantidade').value;
    var msg  = document.getElementById('mensagem');
    if (!nome || !qtd) {
      msg.textContent = 'Preencha o nome e a quantidade, favor!.';
      return;
    }
    var item = {
      produto: nome,
      quantidadeEstoque: Number(qtd),
      dataEntrada: new Date().toISOString().split('T')[0]
    };
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(item)
    }).then(function() {
      msg.textContent = 'Material cadastrado com sucesso!!!';
      document.getElementById('input-nome').value = '';
      document.getElementById('input-quantidade').value = '';
      carregarMateriais();
    });
  });
  carregarMateriais();
});