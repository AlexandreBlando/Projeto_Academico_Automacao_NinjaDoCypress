describe('Formlulário de Consultoria', () => {

    beforeEach(()=>{
        cy.login()
        cy.goTo('Formulários', 'Consultoria')

    })

    it('Deve solicitar consultoria individual', () => {

        cy.get('Input[placeholder="Digite seu nome completo"]').type('Blando Alexandre')
        cy.get('input[placeholder="Digite seu email"]').type('Blandoalexandress@hotmail.com')
        cy.get('input[placeholder="(00) 00000-0000"]')
            .type('71 98148-9637')
            .should('have.value', '(71) 98148-9637')

        // Com ID =  cy.get('#consultancyType').select('Individual')

        cy.contains('label', 'Tipo de Consultoria')
            .parent()
            .find('select')
            .select('Individual')

        // Por Xpath = //span[text()="Pessoa Física"]/..//input

        cy.contains('label', 'Pessoa Física')
            .find('input')
            .click()
            .should('be.checked')

        // Por Xpath = //span[text()="Pessoa Jurídica"]/..//input

        cy.contains('label', 'Pessoa Jurídica')
            .find('input')
            .should('be.not.checked')


        cy.contains('label', 'CPF')
            .parent()
            .find('input')
            .type('04668522589')
            .should('have.value', '046.685.225-89')

        const discoveryChannels = [
            'Instagram',
            'YouTube',
            'LinkedIn',
            'Udemy'
            //'Indicação de Amigo'
        ]

        discoveryChannels.forEach((channel) => {

            cy.contains('label', (channel))
                .find('input')
                .check()
                .should('be.checked')
        })


        //Anexando o Arquivo com caminho dentro da web
        cy.get('input[type="file"]')
            .selectFile('./cypress/fixtures/Carta_Apresentacao.pdf', { force: true })

        cy.get('textarea[placeholder="Descreva mais detalhes sobre sua necessidade"]')
            .type('Realizando Automatização - Realizando Automação -Realizando Automatização - Realizando Automação - Realizando')


        const techs = [
            'Phyton',
            'XML',
            'Cypress',
            'SQL Server'
        ]
        techs.forEach((tech) => {
            cy.get('input[placeholder="Digite uma tecnologia e pressione Enter"]')
                .type(tech)
                .type('{enter}')

            cy.contains('label', 'Tecnologias')
                .parent()
                .contains('span', tech)
                .should('be.visible')

        })

        cy.contains('label', 'termos de uso')
            .find('input')
            .check()
            .should('be.checked')

        cy.contains('button', 'Enviar formulário')
            .click()
            
            //Mensagem demorando, timeout adiciondo.
        cy.get('.modal', {timeout: 7000})
            .should('be.visible')
            .find('.modal-content')
            .should('be.visible')
            .and('have.text', 'Sua solicitação de consultoria foi enviada com sucesso! Em breve, nossa equipe entrará em contato através do email fornecido.')

        //cy.contains('Sucesso!')
           // .should('be.visible')


    })
    it('Validar Campos Obrigatorios', () => {
        cy.contains('button', 'Enviar formulário')
            .click()


        cy.contains('label', 'Nome Completo *')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Campo obrigatório')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'Email *')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', "Campo obrigatório")
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')

        cy.contains('label', 'termos de uso')
            .parent()
            .find('p')
            .should('be.visible')
            .and('have.text', 'Você precisa aceitar os termos de uso')
            .and('have.class', 'text-red-400')
            .and('have.css', 'color', 'rgb(248, 113, 113)')
    })
})
