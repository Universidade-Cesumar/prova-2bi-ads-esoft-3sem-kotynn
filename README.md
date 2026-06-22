# Sistema de Estoque - Enfermagem

🔗 **Projeto rodando na nuvem:** [COLOQUE AQUI O LINK DO SEU DEPLOY (GitHub Pages ou Vercel)]

> ⚠️ Substitua o link acima pela URL real depois de publicar o projeto. Sem esse link, o item "Deploy e Documentação" da rubrica não é cumprido.

## Sobre o projeto

Sistema simples de controle de estoque de materiais de enfermagem, desenvolvido em HTML, CSS e JavaScript puro (vanilla JS), consumindo uma API REST (MockAPI) para cadastro, listagem, baixa e exclusão de itens.

Responsável pelo estoque: Enfermeira Camila.

## Funcionalidades

- **Cadastro de materiais**: nome e quantidade em estoque.
- **Dashboard**: exibe o total de itens cadastrados (`#total-itens`), atualizado dinamicamente a partir da API.
- **Barra de pesquisa** (`#input-busca`): filtra a tabela de inventário pelo nome do material em tempo real.
- **Alerta visual de estoque crítico**: itens com menos de 10 unidades recebem a classe `.estoque-critico`, destacando a linha em vermelho na tabela.
- **Baixa de estoque**: retira uma quantidade do item, validando se a retirada é possível (`validarRetirada`).
- **Exclusão de itens**, com confirmação antes de excluir.
- **Tratamento de erros**: todas as requisições à API (`fetch`) estão dentro de blocos `try/catch`, exibindo mensagens de erro na tela em vez de falhar silenciosamente caso não haja conexão com a internet.

## Tecnologias

- HTML5
- CSS3
- JavaScript (ES2017+, usando `async/await`)
- API REST: [MockAPI](https://mockapi.io/)

## Como executar localmente

1. Baixe ou clone os arquivos (`index.html`, `main.js`, `style.css`).
2. Abra o arquivo `index.html` diretamente no navegador, ou use uma extensão como o "Live Server" no VS Code.
3. Não é necessário nenhum servidor backend: o projeto consome a API pública diretamente do front-end.

## Estrutura dos arquivos

```
├── index.html   → estrutura da página (dashboard, formulário, tabela)
├── main.js      → lógica de busca na API, cadastro, baixa, exclusão e busca
├── style.css    → estilos, incluindo o alerta visual de estoque crítico
└── README.md    → este arquivo
```