describe ('Links abrindo nova guia/janela', ()=> {

    it('Validando o atributo do link do Instagram', ()=> {
         cy.login()
        

         cy.get('[data-cy="instagram-link"]')
         .should('have.attr', 'href', 'https://www.instagram.com/qapapito')
         .and('have.attr', 'target', '_blank')
    })
        //Utilizei para validar links/termos dentro da aplicação e não redirecionando a outra empresa/site
    it('Acessa link e termos de uso removendo o target blank', () =>{
         cy.login()

         cy.contains('Formulários').click()

         cy.contains('a', 'termos de uso')
            //Removento o Target_blank (abrir em nova guia)
            .invoke('removeAttr', 'target')
            .click ()

            //Validando texto do local redirecionado pra mesma pagina sem o target_blank
        cy.contains ('Ao acessar e usar nossos serviços, você concorda em cumprir estes termos de uso. Se você não concordar com algum aspecto destes termos, não utilize nossos serviços.')
            .should('be.visible')
    })

})