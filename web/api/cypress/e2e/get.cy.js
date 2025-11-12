describe('Get /api/users', () => {

    // testData.js
    const knights = [
        { name: "Seiya (Pégaso)", email: "seiya.pegasus@example.com", password: "12345" },
        { name: "Shiryu (Dragão)", email: "shiryu.dragon@example.com", password: "12345" },
        { name: "Hyoga (Cisne)", email: "hyoga.swan@example.com", password: "12345" },
        { name: "Shun (Andrômeda)", email: "shun.andromeda@example.com", password: "12345" },
        { name: "Ikki (Fênix)", email: "ikki.phoenix@example.com", password: "12345" }
    ];

    before(() => {
        knights.forEach((knights) => {
            cy.postUser(knights)

        })
    })

    it('Deve retornar uma lista de usuários', () => {

        cy.getUsers().then(response => {
            expect(response.status).to.eq(200)

            knights.forEach((knights) => {
                const found = response.body.find((user) => user.email === knights.email)
                expect(found.name).to.eq(knights.name)
                expect(found.email).to.eq(knights.email)
                expect(found).to.have.property('id')
            })
        })
    })
})


