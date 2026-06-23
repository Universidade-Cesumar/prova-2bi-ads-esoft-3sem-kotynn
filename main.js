var API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';
var materiaisCache = [];

// Função p a valdação
function validarRetirada(estoqueAtual, quantidadeRetirada) {
  if (quantidadeRetirada <= 0) return false;
  if (quantidadeRetirada > estoqueAtual) return false;
  return true;
}

// criação da tabela
function renderLista(dados) {
  var html = '';
  for (var i = 0; i < dados.length; i++) {
    var item = dados[i];
    var qtd = item.quantidadeEstoque || 0;
    var linhaClasse = qtd < 10 ? ' class="estoque-critico"' : '';

    html += '<tr' + linhaClasse + '>';
    html += '<td>' + (i + 1) + '</td>';
    html += '<td>' + (item.produto || '—') + '</td>';
    html += '<td>' + qtd + '</td>';
    html += '<td>' + (item.dataEntrada || '—') + '</td>';
    html += '<td>';
    // CORREÇÃO: Ajustada a concatenação de aspas para não quebrar a string no HTML
    html += '<button class="btn-baixar" onclick="registrarBaixa(\'' + item.id + '\',' + qtd + ')">Baixa</button> ';
    html += '<button class="btn-excluir" onclick="confirmarExclusao(this,\'' + item.id + '\')">Excluir</button>';
    html += '</td>';
    html += '</tr>';
  }
  var lista = document.getElementById('lista-materiais');
  lista.innerHTML = html || '<tr><td colspan="5" class="vazio">Nenhum item cadastrado.</td></tr>';
}

// Filtra o cache local pelo nome do material digitado na barra de pesquisa
function filtrarMateriais(termo) {
  termo = termo.toLowerCase();
  return materiaisCache.filter(function(item) {
    return (item.produto || '').toLowerCase().indexOf(termo) !== -1;
  });
}

// Busca os materiais na API e atualiza o dashboard + a tabela.
// Usa try/catch para tratar falhas de internet sem quebrar a página
async function carregarMateriais() {
  var totalEl = document.getElementById('total-itens');
  try {
    var res = await fetch(API_URL);
    var dados = await res.json();

    materiaisCache = dados;
    if (totalEl) totalEl.textContent = dados.length;
    renderLista(dados);
  } catch (erro) {
    if (totalEl) totalEl.textContent = '--';
    var lista = document.getElementById('lista-materiais');
    lista.innerHTML = '<tr><td colspan="5" class="vazio">Erro ao carregar os materiais. Verifique sua internet.</td></tr>';
    console.error('Erro ao carregar materiais:', erro);
  }
}

// Função que faz a subtração dada a quantidade de retirada
async function registrarBaixa(id, estoqueAtual) {
  var valorPrompt = prompt('Digite a quantidade para a baixa:');
  if (valorPrompt === null) return; // Se o usuário cancelar
  
  var qtd = Number(valorPrompt);

  if (!validarRetirada(estoqueAtual, qtd)) {
    alert('Quantidade inválida ou maior que o estoque disponível (' + estoqueAtual + ').');
    return;
  }

  try {
    await fetch(API_URL + '/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantidadeEstoque: estoqueAtual - qtd })
    });
    carregarMateriais();
  } catch (erro) {
    alert('Não foi possível dar baixa no item agora. Verifique sua internet e tente novamente.');
    console.error('Erro ao registrar baixa:', erro);
  }
}

// Controla quais itens estão com exclusão "armada" esperando confirmação
var exclusaoPendente = {};


function confirmarExclusao(botao, id) {
  if (exclusaoPendente[id]) {
    clearTimeout(exclusaoPendente[id]);
    delete exclusaoPendente[id];
    excluirItem(id);
    return;
  }

  var textoOriginal = botao.textContent;
  botao.textContent = 'Confirmar?';
  botao.classList.add('confirmando');

  exclusaoPendente[id] = setTimeout(function() {
    botao.textContent = textoOriginal;
    botao.classList.remove('confirmando');
    delete exclusaoPendente[id];
  }, 3000);
}

// Função p a exclusão dos itens
async function excluirItem(id) {
  try {
    await fetch(API_URL + '/' + id, { method: 'DELETE' });
    carregarMateriais();
  } catch (erro) {
    alert('Não foi possível excluir o item agora. Verifique sua internet e tente novamente.');
    console.error('Erro ao excluir item:', erro);
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('btn-cadastrar').addEventListener('click', async function() {
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

    try {
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
      });
      msg.textContent = 'Material cadastrado com sucesso!!!';
      document.getElementById('input-nome').value = '';
      document.getElementById('input-quantidade').value = '';
      carregarMateriais();
    } catch (erro) {
      msg.textContent = 'Erro ao cadastrar material. Verifique sua internet.';
      console.error('Erro ao cadastrar:', erro);
    }
  });

  // Barra de pesquisa massa
  var buscaEl = document.getElementById('input-busca');
  if (buscaEl) {
    buscaEl.addEventListener('input', function() {
      renderLista(filtrarMateriais(buscaEl.value));
    });
  }

  carregarMateriais();
});