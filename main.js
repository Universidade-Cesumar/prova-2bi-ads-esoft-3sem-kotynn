var API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';

// validação p/ ver se a retirada pode ser feita
function validarRetirada (estoqueAtual, quantidadeRetirada){
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

// Tabela de Materiais
function carregarMateriais() {
  fetch(API_URL)
    .then(function(res) { return res.json(); })
    .then(function(dados) {
      var html = '';
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + (item.produto || '—') + '</td>';
        html += '<td>' + (item.quantidadeEstoque || 0) + '</td>';
        html += '<td>' + (item.dataEntrada || '—') + '</td>';
        html += '</tr>';
        html += '<button class="btn-baixar" onclick="registrarBaixa(\'' + item.id + '\',' + (item.quantidadeEstoque || 0) + ')">Baixa</button> ';
        html += '<button class="btn-excluir" onclick="excluirItem(\'' + item.id + '\')">Excluir</button>';
        html += '</td>';
        html += '</tr>';
      }
      var lista = document.getElementById('lista-materiais');
      lista.innerHTML = html || '<tr><td colspan="4" class="vazio">Nenhum item cadastrado.</td></tr>';
    });
}

// Função p/ a subtração de retirada maneira
function registrarBaixa(id, estoqueAtual) {
  var retiradaEl = document.getElementById('input-retirada');
  var qtd = Number(retiradaEl.value);

  if (!validarRetirada(estoqueAtual, qtd)) {
    alert('Quantidade invalida ou maior que o estoque disponivel (' + estoqueAtual + ').');
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

function excluirItem(id) {
  if (!confirm('Você deseja excluir mesmo este item??')) return;

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
      msg.textContent = 'Preencha o nome e a quantidade.';
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
      msg.textContent = 'Material cadastrado com sucesso!';
      document.getElementById('input-nome').value = '';
      document.getElementById('input-quantidade').value = '';
      carregarMateriais();
    });
  });

  carregarMateriais();
});