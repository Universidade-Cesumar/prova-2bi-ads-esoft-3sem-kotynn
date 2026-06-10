// Arquivo para código javascript

const API_URL = 'https://6a1f56a9b79eec0d6cf0a932.mockapi.io/api/v1/users';

function validarRetirada(estoque, quantidade) {
  if (quantidade <= 0) return false;
  if (quantidade > estoque) return false;
  return true;
}

function carregarMateriaisManeiros(){

}


