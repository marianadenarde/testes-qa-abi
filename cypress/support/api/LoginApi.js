const baseUrl = () => Cypress.env("apiUrl");

class LoginApi {
  logar(email, password) {
    return cy.request({
      method: "POST",
      url: `${baseUrl()}/login`,
      body: { email, password },
      failOnStatusCode: false,
    });
  }
}

export default new LoginApi();
