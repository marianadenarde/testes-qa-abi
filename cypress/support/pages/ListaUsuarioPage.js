class ListaUsuarioPage {
    elements = {
        linhaUsuario: (email) => cy.contains('td', email).parent('tr'),
    };

    visit() {
        cy.visit("/listarusuarios");
    }

    verificarUsuarioCadastrado(usuario) {
        this.elements.linhaUsuario(usuario.email).find('td').eq(0).should('have.text', usuario.nome);
    }
}

export default new ListaUsuarioPage();
