import CadastroPage from "../../support/pages/CadastroPage";
import ListaUsuarioPage from "../../support/pages/ListaUsuarioPage";
import ProdutosPage from "../../support/pages/ProdutosPage";
import ListaComprasPage from "../../support/pages/ListaComprasPage";
import HomePage from "../../support/pages/HomePage";
import { gerarUsuario } from "../../support/helpers/gerarUsuario";
import { gerarProduto } from "../../support/helpers/gerarProduto";

describe("Testes E2E - FrontEnd", () => {
    it("CT01 - Usuário administrador cadastra produto e usuário consumidor valida a criação do produto cadastrado", () => {
        let usuarioAdmin;
        usuarioAdmin = gerarUsuario("true");
        let produto = gerarProduto();
        CadastroPage.visit();
        CadastroPage.cadastrarUsuario(usuarioAdmin);

        ProdutosPage.cadastrarProduto(produto);

        HomePage.logout();

        let usuarioConsumidor;
        usuarioConsumidor = gerarUsuario("false");
        CadastroPage.visit();
        CadastroPage.cadastrarUsuario(usuarioConsumidor);

        ProdutosPage.pesquisarProduto(produto);
        ProdutosPage.verificarProdutoEncontrado(produto);
        ProdutosPage.adicionarNaLista();

        ListaComprasPage.verificarProdutoNaLista(produto.nome);
    })
    it("CT02 - Usuário administrador deve cadastrar novo usuário e verificar na lista", () => {
        let usuarioAdmin;
        usuarioAdmin = gerarUsuario("true");
        CadastroPage.visit();
        CadastroPage.cadastrarUsuario(usuarioAdmin);

        let gerarUser = gerarUsuario("false");
        CadastroPage.cadastrarUsuarioAdmin(gerarUser);

        ListaUsuarioPage.verificarUsuarioCadastrado(gerarUser);
    });

    it("CT03 - Usuário não administrador pesquisa produto e adiciona na lista", () => {
        const nomeProduto = "Logitech MX Vertical";
        let usuarioAdmin;
        usuarioAdmin = gerarUsuario("false");
        CadastroPage.visit();
        CadastroPage.cadastrarUsuario(usuarioAdmin);

        ProdutosPage.pesquisarProduto({ nome: nomeProduto });
        ProdutosPage.verificarProdutoEncontrado({ nome: nomeProduto });
        ProdutosPage.adicionarNaLista();

        ListaComprasPage.verificarProdutoNaLista(nomeProduto);
    })
})