
describe.only('POST /api/users/register', () => {
  it('Deve cadastrar um novo usuário', () => {

    const user = {
      name: 'Teste',
      email: 'Teste@hotmail.com',
      password: '12345'
    }

    cy.task('deleteUser', user.email)

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
      expect(response.body.message).to.eq('User successfully registered.')
      expect(response.body.user.id).to.match(/^\d+$/)
      expect(response.body.user.name).to.eq(user.name)
      expect(response.body.user.email).to.eq(user.email)

    })

  })

  it('Não Deve cadastrar com e-mail duplicado', () => {

    const user = {
      name: 'Teste1',
      email: 'Teste@hotmail.com',
      password: '12345'
    }

    cy.task('deleteUser', user.email)


    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(201)
    })
    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(409)
      expect(response.body.error).to.eq('A user with this email already exist.')

    })

  })

  it('O campo name deve ser obrigatório', () => {

    const user = {
      email: 'blandoalexandress@hotmail.com',
      password: '12345'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Name field is required.')

    })

  })

  it('O campo email deve ser obrigatório', () => {

    const user = {
      name: 'Blando Alexandre',
      password: '12345'
    }

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Email field is required.')

    })

  })

  it('O campo senha deve ser obrigatório', () => {

    const user = {
      name: 'Blando Alexandre',
      email: 'blandoalexandress@hotmail.com',
    }

    cy.postUser(user).then((response) => {
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

    cy.postUser(user).then((response) => {
      expect(response.status).to.eq(400)
      expect(response.body.error).to.eq('Invalid JSON format.')
    })

  })
})