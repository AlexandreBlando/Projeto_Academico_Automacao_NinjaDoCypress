
describe('PUT /api/users/:id', () => {


    context('Atualização', () => {
        //declaração variavel
        let userId

        const originalUser = {
            name: 'Peter Parker',
            email: 'parker@stark.com',
            password: '123456'
        }

        const updatedUser = {
            name: 'Spiderman',
            email: 'spider@marvel.com',
            password: 'pwd123'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve atualizar um usuario existente', () => {
            cy.putUser(userId, updatedUser).then(response => {
                expect(response.status).to.eq(204)
            })
        })

        after(() => {
            cy.getUsers().then(response => {
                //encontrando o ID na API e validando
                const spider = response.body.find(user => user.id === userId)
                expect(spider).to.exist
                expect(spider.name).to.eq(updatedUser.name)
                expect(spider.email).to.eq(updatedUser.email)
            })
        })
    })

    context('Quando o ID Não existe', ()=>{
        
        let userId

        const originalUser = {
            name: 'Aioros (Sagitário)',
            email: 'Aioros.sagittarius@teste.com',
            password: 'put123456'
        }

        const updatedUser = {
            name: '(Sagitário) Aioros ',
            email: 'Aioros.sagittarius@Validateste.com',
            password: 'put123456'
        }

        before(() => {
            cy.task('deleteUser', originalUser.email)
            cy.task('deleteUser', updatedUser.email)

            cy.postUser(originalUser).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
             cy.task('deleteUser', originalUser.email)
        })
        //Tenta deletar um usuario não existente
        it('Deve retornar 404 e user not found', () => {
            cy.api({
                method: 'PUT',
                url: 'http://localhost:3333/api/users/' + userId,
                headers: {
                    'Content-type': 'application/json'
                },
                body: updatedUser,
                failOnStatusCode: false
            }).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })

    })


    context('Campos Obrigatorios', () => {

        it('O campo name deve ser obrigatório', () => {

            const user = {
                email: 'blandoalexandress@hotmail.com',
                password: '12345'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Name field is required.')

            })

        })

        it('O campo email deve ser obrigatório', () => {

            const user = {
                name: 'Blando Alexandre',
                password: '12345'
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Email field is required.')

            })

        })

        it('O campo senha deve ser obrigatório', () => {

            const user = {
                name: 'Blando Alexandre',
                email: 'blandoalexandress@hotmail.com',
            }

            cy.putUser(1, user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Password field is required.')

            })

        })


        it('Não deve passar quando o JSON está mal formatado', () => {

            const user = `{
      name: 'Blando Alexandre',
      email: 'blandoalexandress@hotmail.com',
      password: '12345'
    }`
            //cy.putUser(1, user).
            cy.postUser(user).then((response) => {
                expect(response.status).to.eq(400)
                expect(response.body.error).to.eq('Invalid JSON format.')
            })

        })

    })

})  