const baseUrl = () => Cypress.env("apiUrl");

class CarrinhosApi {
  cadastrar(dados, token) {
    return cy.request({
      method: "POST",
      url: `${baseUrl()}/carrinhos`,
      headers: { authorization: token },
      body: dados,
      failOnStatusCode: false,
    });
  }

  buscarPorId(id, token) {
    return cy.request({
      method: "GET",
      url: `${baseUrl()}/carrinhos/${id}`,
      headers: { authorization: token },
      failOnStatusCode: false,
    });
  }

}

export default new CarrinhosApi();
