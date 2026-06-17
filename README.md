[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/B74p-HKt)

# Sistema de Estoque — Enfermagem
SENAC Zona Norte | Responsável: Enfermeira Camila

## Sobre
Sistema web simples para controle de insumos do almoxarifado, desenvolvido como projeto acadêmico.

## Funcionalidades
- Cadastrar materiais no inventário
- Listar todos os materiais cadastrados
- Registrar baixa (saída) de estoque, com validação de quantidade
- Excluir materiais do inventário

## Tecnologias
- HTML, CSS e JavaScript puro
- MockAPI (banco de dados na nuvem)

## Como usar
1. Baixe os três arquivos: `index.html`, `style.css` e `main.js`
2. Coloque todos na mesma pasta
3. Abra o `index.html` no navegador

## Estrutura
```
├── index.html   (estrutura da página)
├── style.css    (estilização)
└── main.js      (lógica e conexão com a API)
```

## Progresso

### Sprint 1 — Fundação, API e Inventário 
Primeira sprint do projeto/prova. O HTML foi mantido simples, porém contém tudo o que foi pedido no documento do Classroom, com a funcionalidade de cadastrar produtos usando a MockAPI junto com o JSON de produtos da enfermagem.

- Estrutura HTML com os IDs obrigatórios (`input-nome`, `input-quantidade`, `btn-cadastrar`, `lista-materiais`)
- Conexão POST: cadastro de novos materiais na MockAPI
- Conexão GET: listagem dinâmica do inventário ao carregar a página

### Sprint 2 — Regras de Negócio e Saídas 
Segunda sprint, focada no módulo de retirada (baixa de estoque) e exclusão de materiais, com validação para impedir números negativos ou maiores que o estoque disponível.

- Campo `input-retirada` para informar a quantidade a retirar
- Botões `.btn-baixar` e `.btn-excluir` gerados dinamicamente para cada item da lista
- Função `validarRetirada(estoqueAtual, quantidadeRetirada)` que bloqueia operações inválidas
- Conexão PUT: a baixa subtrai o valor correto e atualiza o dado no MockAPI
- Conexão DELETE: a exclusão remove o item do MockAPI e da tela