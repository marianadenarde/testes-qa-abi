const baseUrl = () => Cypress.env("apiUrl");

class UsuariosApi {
  cadastrar(usuario) {
    return cy.request({
      method: "POST",
      url: `${baseUrl()}/usuarios`,
      body: usuario,
      failOnStatusCode: false,
    });
  }
}

export default new UsuariosApi();
