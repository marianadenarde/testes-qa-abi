import { faker } from "@faker-js/faker";

/**
 * @param {"true"|"false"} administrador
 * @returns {{nome: string, email: string, password: string, administrador: string}}
 */

export function gerarUsuario(administrador = "false") {
  return {
    nome: faker.person.fullName(),
    email: `${faker.string.uuid().slice(0, 6)}@teste.com`,
    password: faker.internet.password({ length: 10 }),
    administrador,
  };
}
