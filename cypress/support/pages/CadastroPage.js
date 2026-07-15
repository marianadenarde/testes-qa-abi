class CadastroPage {
    elements = {
        nomeInput: () => cy.get('input[data-testid="nome"]'),
        emailInput: () => cy.get('input[data-testid="email"]'),
        senhaInput: () => cy.get('input[data-testid="password"]'),
        administradorCheckbox: () => cy.get('input[data-testid="checkbox"]'),
        cadastrarButton: () => cy.get('button[data-testid="cadastrar"]'),           
        cadastrarUsuarioButton: () => cy.get('button[data-testid="cadastrarUsuario"]'),
        acessarCadastrarUsuario: () => cy.get('a[data-testid="cadastrar-usuarios"]'),
    };

    visit() {
        cy.visit("/cadastrarusuarios");
    }

    preencherFormulario({ nome, email, password, administrador }) {
        this.elements.nomeInput().type(nome);
        this.elements.emailInput().clear().type(email);
        this.elements.senhaInput().type(password, { log: false });

        if (administrador === "true") {
            this.elements.administradorCheckbox().check();
        }
    }

    cadastrarUsuario(usuario) {
        this.preencherFormulario(usuario);
        this.elements.cadastrarButton().click();
    }

    cadastrarUsuarioAdmin(usuario) {
        this.elements.acessarCadastrarUsuario().click();
        this.preencherFormulario(usuario);
        this.elements.cadastrarUsuarioButton().click();
    }
}

export default new CadastroPage();