
import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Cadastro de Usuários', () => {
    beforeEach(() => {
        cy.goToSignup()

        cy.intercept('POST', 'http://localhost:3333/api/users/register', {
            statusCode: 201,
            body: {
                message: 'Usuário cadastrado com sucesso'
            }
        }).as('postSignup')

    })

    const total = 5

    _.times(total, (i) => {
        it(`Deve cadastrar um novo usuario. Teste ${i + 1}`, () => {

            //geração de dados aleatorios pelo Faker
            const name = faker.person.fullName()
            const email = faker.internet.email()

            cy.log(`Usuário ${i + 1}: ${name} - ${email}`)

            cy.get('#name').type(name)
            cy.get('#email').type(email)
            cy.get('#password').type('Teste12345')

            cy.contains('button', 'Criar conta').click()

            //Força aguardar o retorno da API
            cy.wait('@postSignup')

            cy.contains('Conta criada com sucesso!')
                .should('be.visible')
        })
    })

})