
describe('PUT /api/users/:id', () => {
    //declaração variavel
    let userId

    const originalUser = {
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