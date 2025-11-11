import { getTodayFormattedDate } from "../support/utils";
describe('Login', () => {

  //funcão Gerada pelo chatgpt 
  function getTodayFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // months start at 0
    const year = today.getFullYear();
    return `${day}/${month}/${year}`;
  }


  it.only('Deve logar com sucesso', () => {
    cy.start()
    cy.submitLogin('papito@webdojo.com', 'katana123')

    cy.get('[data-cy="user-name"]')
      .should('be.visible')
      .and('have.text', 'Fernando Papito')

    cy.get('[data-cy="welcome-message"]')
      .should('be.visible')
      .and('have.text', 'Olá QA, esse é o seu Dojo para aprender Automação de Testes.')

    cy.getCookie('login_date').should('exist')

    cy.getCookie('login_date').should((cookie) => {
      expect(cookie.value).to.eq(getTodayFormattedDate())
    })

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