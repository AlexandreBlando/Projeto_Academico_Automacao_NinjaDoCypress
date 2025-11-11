import { faker } from '@faker-js/faker'
import _ from 'lodash'

describe('Expert', () => {

  beforeEach(() => {
    cy.start()
  })

  it('Deve manipular o valor de um campo', () => {
    cy.get('#email').invoke('val', 'blando@teste.com.br ')
    cy.get('#password').invoke('attr', 'name', 'senha')

    cy.contains('button', 'Entrar')
      .invoke('hide')
      .should('not.be.visible')

    cy.contains('button', 'Entrar')
      .invoke('show')
      .should('be.visible')

  })

  it('Não deve logar com a Senha Incorreta', () => {
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

  it('Simulando a tecla TAB com cy.press()', () => {
    cy.log('todo')

    //pressiona tab e valida se o foco está no e-mail
    cy.get('body').press('Tab')
    cy.focused().should('have.attr', 'id', 'email')

    //Preenche o e-mail / pressiona tab / valida se o foco está no senha
    cy.get('#email').type('papito@webdojo.com').press('Tab')
    cy.focused().should('have.attr', 'id', 'password')
    //Preenche Password e pressiona o Enter teclado
    cy.get('#password').type('katana123{Enter}')


  })

  it.only('Deve realizar uma carga de dados fake', () => {
    cy.log('todo')

    _.times(5, () => {

      const name = faker.person.fullName()
      const email = faker.internet.email()
      const password = 'pwd123'
      
      cy.log(name)
      cy.log(email)
    })



  })

})