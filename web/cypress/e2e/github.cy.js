describe('Gerenciamento de Perfis no Github', () => {
    beforeEach(() => {
        cy.login()
        cy.goTo('Tabela', ('Perfis do GitHub'))
    })

    it('Deve poder cadastrar um novo perfil do Github', () => {
        cy.get('#name').type('Blando Alexandre')
        cy.get('#username').type('QABlando')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.get('#name').type('Blando Alexandre')
        cy.get('#username').type('AlexandreBlando')
        cy.get('#profile').type('QA')

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', 'AlexandreBlando')
            .should('be.visible')
            .as('trProfile')

        cy.get('@trProfile')
            .contains('td', 'Blando Alexandre')
            .should('be.visible')

        cy.get('@trProfile')
            .contains('td', 'QA')
            .should('be.visible')

        /*Caso precisasse ser mais especifico, pois o teste com username QAAlexandreBlando e AlexandreBlando 
        ele parava no primeiro, dessa forma ficaria correto...

        cy.get('table tbody')
            .contains('td', /^AlexandreBlando$/)  // regex sem aspas
            .should('be.visible')
            .closest('tr') // sobe para a linha que contém esse td
            .as('trProfile')
        */

    })

    it('Deve poder remover um perfil do Github', () => {

        const profile = {
            name: 'Blando Alexandre',
            username: 'AlexandreBlando',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')

        //pegando pela tag html
        cy.get('@trProfile').find('button[title = "Remover perfil"]').click()

        cy.contains('table tbody', profile.username)
            .should('not.exist')
    })

    it('Deve validar o link do Github', () => {

        const profile = {
            name: 'Blando Alexandre',
            username: 'AlexandreBlando',
            desc: 'QA'
        }

        cy.get('#name').type(profile.name)
        cy.get('#username').type(profile.username)
        cy.get('#profile').type(profile.desc)

        cy.contains('button', 'Adicionar Perfil').click()

        cy.contains('table tbody tr', profile.username)
            .should('be.visible')
            .as('trProfile')


        cy.get('@trProfile').find('a')
            //validando link com username..
            .should('have.attr', 'href', 'https://github.com/' + profile.username)
            //validando que vai pra uma nova pagina
            .and('have.attr', 'target', '_blank')

    })

})