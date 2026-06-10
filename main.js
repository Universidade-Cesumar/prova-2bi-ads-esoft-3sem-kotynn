// Arquivo para código javascript

const API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';


// Função maneira p/ validar se a quantidade do estoque é 0
function validarRetirada(estoque, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoque) return false;
  return true;
}

// função maneira    para verifacar/adcionar conteuto do usario
function carregarMateriaisManeiros(){
fetch(API_URL)
    .then(function(res) { return res.json(); })
    .then(function(dados){
      var html = '';
      for (var i = 0; i < dados.length; i++) {
        var item = dados[i];
        html += '<tr>';
        html += '<td>' + (i + 1) + '</td>';
        html += '<td>' + (item.produto || '—') + '</td>';
        html += '<td>' + (item.quantidadeEstoque || 0) + '</td>';
        html += '<td>' + (item.dataEntrada || '—') + '</td>';
        html += '</tr>';
      }
      const lista = document.getElementById('lista-materiais');
      lista.innerHTML = html || '<tr><td colspan="4" class="vazio">Não tem nenhum item cadastrado.</td></tr>';
    });
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn-cadastrar').addEventListener('click', function() {
    var nome = document.getElementById('input-nome').value;
    var qtd  = document.getElementById('input-quantidade').value;
    var msg  = document.getElementById('mensagem');

})});
