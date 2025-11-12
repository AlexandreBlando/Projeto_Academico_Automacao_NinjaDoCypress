describe('DELETE /api/users/:id', () => {

    context('Remoção', () => {

        let userId

        const user = {
            name: 'Afrodite (Peixes)',
            email: 'afrodite.pisces@teste.com',
            password: 'delete123456'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
        })

        it('Deve remover um usuário existente', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(204)
            })
        })


        after(() => {
            cy.getUsers().then(response => {
                //encontrando o ID na API e validando
                const afrodite = response.body.find(user => user.id === userId)
                expect(afrodite).to.be.undefined

            })
        })

    })

    context('Quando o ID Não existe', () => {

        let userId

        const user = {
            name: 'Aioros (Sagitário)',
            email: 'Aioros.sagittarius@teste.com',
            password: 'delete123456'
        }

        before(() => {
            cy.task('deleteUser', user.email)

            cy.postUser(user).then(response => {
                cy.log(response.body.user.id)
                userId = response.body.user.id
            })
            cy.task('deleteUser', user.email)
        })
        //Tenta deletar um usuario não existente
        it('Deve retornar 404 e user not found', () => {
            cy.deleteUser(userId).then(response => {
                expect(response.status).to.eq(404)
                expect(response.body.error).to.eq('User not found.')
            })
        })

    })


})