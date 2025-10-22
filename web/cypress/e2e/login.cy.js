describe ('Login', () => {
  it ('Deve logar com sucesso', ()=>{
    cy.start()
    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]') 
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
       .should('be.visible')
       .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')
  })

it('Não deve logar com E-mail não cadastrado', ()=> {
    cy.start()
    cy.submitLogin('Blandoalexandress@hotmail.com', 'katana123') 

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it ('Não deve logar com a Senha Incorreta', ()=>{
    cy.start()
    cy.submitLogin('papito@webdojo.com', 'Teste123')

    cy.contains('Acesso negado! Tente novamente.')
     .should('be.visible')

  })

})