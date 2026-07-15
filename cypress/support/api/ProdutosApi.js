const baseUrl = () => Cypress.env("apiUrl");

class ProdutosApi {
  cadastrar(dados, token) {
    return cy.request({
      method: "POST",
      url: `${baseUrl()}/produtos`,
      headers: { authorization: token },
      body: dados,
      failOnStatusCode: false,
    });
  }

  buscarProduto(id){
    return cy.request({
      method: "GET",
      url: `${baseUrl()}/produtos/${id}`,
      failOnStatusCode: false,
    });
  }

}

export default new ProdutosApi();
