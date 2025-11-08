describe('Cadastro', () => {
    beforeEach(() => {
        cy.goToSignup()

       cy.intercept('POST', 'http://localhost:3333/api/users/register',{
            statusCode: 201,
            body: {
            message: 'Usuário cadastrado com sucesso'
        }
    }).as('postSignup')
    
})

it('Deve cadastrar um novo usuario', () => {

    cy.get('#name').type('Blando Alexandre')
    cy.get('#email').type('Blandoalexandress@hotmail.com')
    cy.get('#password').type('123456')

    cy.contains('button', 'Criar conta').click()

    cy.wait('@postSignup')

    cy.contains('Conta criada com sucesso!')
    .should('be.visible')
})

})