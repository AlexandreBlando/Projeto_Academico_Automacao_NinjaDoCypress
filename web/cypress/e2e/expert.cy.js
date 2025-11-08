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

  it.only('Não deve logar com a Senha Incorreta', () => {
    cy.submitLogin('papito@webdojo.com', 'Teste123')

    /* capturando informação pro cy.get mais a baixo
        //aguarda a mensagem flutuante
        cy.wait(2500)
        //grava o html apresentado na tela
        cy.document().then((doc) =>{
          cy.writeFile('cypress/downloads/page.html', doc.documentElement.outerHTML)
        })
  */  // .title = div[class=title]  
    cy.get('[data-sonner-toaster=true]')
      //Facilitador para os proximos cy.get que utilizam o campo acima.
      .as('toast')
      .should('be.visible')

      //utilizando facilitador
    cy.get('@toast')
      .find('.title')
      .should('have.text', 'Acesso negado! Tente novamente.')

    cy.wait(5000)

    cy.get('@toast')
      .should('not.exist')

  })

})