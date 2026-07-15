import { faker } from "@faker-js/faker";

export function gerarProduto() {
  return {
    nome: faker.commerce.productName() + " " + faker.string.uuid().slice(0, 6),
    preco: Number(faker.commerce.price({ min: 10, max: 999, dec: 0 })),
    descricao: faker.commerce.productDescription(),
    quantidade: faker.number.int({ min: 1, max: 500 }),
  };
}