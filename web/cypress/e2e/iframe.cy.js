describe('iFrame', () => {

    it('Dar play no video de exemplo', () => {

        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.contains('button', 'Video').click()

        cy.get('iframe[title="Video Player"]')
            .should('exist')
            //obtendo conteudo dentro do iframe, its trabalha com array por isso a posição 0
            .its('0.contentDocument.body')
            //transformando em um objeto pro cypress
            .then(cy.wrap)
            //dando nome igual o sql .as
            .as('iFramePlayer')

        cy.get('@iFramePlayer')
            .find('.play-button')
            .click()

        cy.get('@iFramePlayer')
            .find('.pause-button')
            .should('be.visible')
    })
})