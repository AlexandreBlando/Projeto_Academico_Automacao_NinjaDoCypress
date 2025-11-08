describe('Expert', () => {

    beforeEach(() => {
        cy.start()
    })

    it('Deve manipular o valor de um campo', () => {
        cy.log('todo')

        cy.get('#email').invoke('val', 'blando@teste.com.br ')

        cy.get('#password').invoke('attr', 'name', 'senha')

        cy.contains('button', 'Entrar')
            .invoke('hide')
            .should('not.be.visible')

        cy.contains('button', 'Entrar')
            .invoke('show')
            .should('be.visible')

    })

})