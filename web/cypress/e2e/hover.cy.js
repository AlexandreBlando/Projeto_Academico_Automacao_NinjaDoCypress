describe ('Simulando Mouseover', ()=> {
    it ('Deve Mostrar um texto ao passar o mouse em cima do Link do Instagram',()=>{
        cy.start()
        cy.submitLogin('papito@webdojo.com', 'katana123')

        cy.contains('Isso é Mouseover!').should('not.exist')
        cy.get('[data-cy="instagram-link"]').realHover()
        cy.contains('Isso é Mouseover!').should('exist')


    })
    
})