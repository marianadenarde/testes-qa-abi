class HomePage {
  elements = {
    logoutButton: () => cy.get('[data-testid="logout"]'),
  };

  logout() {
    this.elements.logoutButton().click();
  }
}

export default new HomePage();
