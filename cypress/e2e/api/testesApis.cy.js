import LoginApi from "../../support/api/LoginApi";
import ProdutosApi from "../../support/api/ProdutosApi";
import UsuariosApi from "../../support/api/UsuariosApi";
import CarrinhoApi from "../../support/api/CarrinhoApi";
import { gerarUsuario } from "../../support/helpers/gerarUsuario";
import { gerarProduto } from "../../support/helpers/gerarProduto";

describe("Testes APIs", () => {
    let usuario;
    let produto;

    beforeEach(() => {
        usuario = gerarUsuario("true");
        produto = gerarProduto();
    });

    it("CT04 - Cadastro de usuário e autenticação", () => {
        UsuariosApi.cadastrar(usuario).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.message).to.eq("Cadastro realizado com sucesso");
            expect(response.body).to.have.property("_id");

            LoginApi.logar(usuario.email, usuario.password).then((response) => {
                expect(response.status).to.eq(200);
                expect(response.body.message).to.eq("Login realizado com sucesso");
                expect(response.body).to.have.property("authorization");
                expect(response.body.authorization).to.match(/^Bearer /);
            });
        });
    });

    it("CT05 - Cadastro de produto", () => {
        UsuariosApi.cadastrar(usuario).then(() => {
            LoginApi.logar(usuario.email, usuario.password).then((loginResponse) => {
                expect(loginResponse.status).to.eq(200);
                const token = loginResponse.body.authorization;

                ProdutosApi.cadastrar(produto, token).then((produtoResponse) => {
                    expect(produtoResponse.status).to.eq(201);
                    const produtoId = produtoResponse.body._id;

                    ProdutosApi.buscarProduto(produtoId).then((getResponse) => {
                        expect(getResponse.status).to.eq(200);
                        expect(getResponse.body._id).to.eq(produtoId);
                    });
                });
            });
        });
    });

    it("CT06 - Carrinho de compras", () => {
        const usuarioAdmin = gerarUsuario("true");
        const usuarioConsumidor = gerarUsuario("false");
        const quantidade = 2;

        UsuariosApi.cadastrar(usuarioAdmin).then(() => {
            LoginApi.logar(usuarioAdmin.email, usuarioAdmin.password).then((loginAdmin) => {
                const tokenAdmin = loginAdmin.body.authorization;

                ProdutosApi.cadastrar(produto, tokenAdmin).then((produtoResponse) => {
                    expect(produtoResponse.status).to.eq(201);
                    const produtoId = produtoResponse.body._id;

                    UsuariosApi.cadastrar(usuarioConsumidor).then(() => {
                        LoginApi.logar(usuarioConsumidor.email, usuarioConsumidor.password).then((loginConsumidor) => {
                            expect(loginConsumidor.status).to.eq(200);
                            const tokenConsumidor = loginConsumidor.body.authorization;

                            CarrinhoApi.cadastrar({ produtos: [{ idProduto: produtoId, quantidade }] }, tokenConsumidor).then((carrinhoResponse) => {
                                expect(carrinhoResponse.status).to.eq(201);
                                expect(carrinhoResponse.body.message).to.eq("Cadastro realizado com sucesso");
                                const carrinhoId = carrinhoResponse.body._id;

                                CarrinhoApi.buscarPorId(carrinhoId, tokenConsumidor).then((getResponse) => {
                                    expect(getResponse.status).to.eq(200);
                                    expect(getResponse.body._id).to.eq(carrinhoId);
                                    expect(getResponse.body.produtos[0].idProduto).to.eq(produtoId);
                                    expect(getResponse.body.produtos[0].quantidade).to.eq(quantidade);
                                });
                            });
                        });
                    });
                });
            });
        });
    });
})