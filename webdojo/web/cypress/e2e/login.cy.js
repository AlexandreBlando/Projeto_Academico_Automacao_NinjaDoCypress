import { getTodayFormattedDate } from "../support/utils";
describe('Login', () => {



  it.only('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

      // Confere a existência do cookie de data de login 
    cy.getCookie('login_date').should('exist')

    // Validação que o cookie contém a data atual
    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getTodayFormattedDate())
    })
      //Validação do token no padrão hexadecimal de 32 caracteres
    cy.window().then((win)=>{
     const token = win.localStorage.getItem('token')
     expect (token).to.match(/^[a-fA-F0-9]{32}$/)
    })
  })

  it('Não deve logar com E-mail não cadastrado', () => {
    cy.start()
    cy.submitLogin('Blandoalexandress@hotmail.com', 'katana123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

  it('Não deve logar com a Senha Incorreta', () => {
    cy.start()
    cy.submitLogin('papito@webdojo.com', 'Teste123')

    cy.contains('Acesso negado! Tente novamente.')
      .should('be.visible')

  })

})