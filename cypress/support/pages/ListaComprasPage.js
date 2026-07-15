class ListaComprasPage {
    elements = {
        nomeProdutoNoCarrinho: () => cy.get('[data-testid="shopping-cart-product-name"]'),
    };

    verificarProdutoNaLista(nomeProduto) {
        this.elements.nomeProdutoNoCarrinho().should('contain.text', nomeProduto);
    }
}

export default new ListaComprasPage();
