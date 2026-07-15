class ProdutosPage {
    elements = {
        pesquisarInput: () => cy.get('input[data-testid="pesquisar"]'),
        pesquisarButton: () => cy.get('button[data-testid="botaoPesquisar"]'),
        nomePrimeiroProduto: () => cy.get('.card-title').first(),
        adicionarNaListaButton: () => cy.get('button[data-testid="adicionarNaLista"]'),
        nomeProduto: () => cy.get('input[data-testid="nome"]'),
        precoProduto: () => cy.get('input[data-testid="preco"]'),
        descricaoProduto: () => cy.get('textarea[data-testid="descricao"]'),
        qtdProduto: () => cy.get('input[data-testid="quantity"]'),
        cadastrarProduto: () => cy.get('button[data-testid="cadastarProdutos"]'),
        cadastrarProdutosButton: () => cy.get('a[data-testid="cadastrar-produtos"]'),
    };

    pesquisarProduto(dados) {
        this.elements.pesquisarInput().type(dados.nome);
        this.elements.pesquisarButton().click();
    }

    verificarProdutoEncontrado(dados) {
        this.elements.nomePrimeiroProduto().should('have.text', dados.nome);
    }

    adicionarNaLista() {
        this.elements.adicionarNaListaButton().click();
    }

    cadastrarProduto(dados){
        this.elements.cadastrarProdutosButton().click();
        this.elements.nomeProduto().type(dados.nome);
        this.elements.precoProduto().type(dados.preco);
        this.elements.descricaoProduto().type(dados.descricao);
        this.elements.qtdProduto().type(dados.quantidade);
        this.elements.cadastrarProduto().click();
    }
}

export default new ProdutosPage();
