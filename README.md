# 🥋 WebDojo


## 🚀 Sobre o Projeto

O **WebDojo** é um aplicativo exclusivo para os alunos do **Curso Ninja do Cypress**, ministrado pelo mestre **Fernando Papito**! 🥷💻 Durante o curso, tive a oportunidade de aprimorar minhas habilidades em automação de testes por meio de desafios práticos e exercícios aplicados a situações reais. O projeto WebDojo foi o ambiente ideal para colocar em prática conceitos aprendidos durante todo o curso.

🛠️ Tecnologias Utilizadas

- [x] Git & GitHub 🌍 (Controle de versão e repositório remoto)
- [x] Bash (Linha de Comando) 💻 (Execução de scripts e comandos)
- [x] Visual Studio Code 🖥️ (Editor de código recomendado)
- [x] Node.js (22+) 🟢 (Runtime JavaScript)
- [x] Gerenciador de pacotes (npm ou yarn) 📦 (Dependências do projeto)
- [x] Cypress 🧪 (Framework de testes end-to-end)
- [x] Docker & Docker Compose 🐳 (Ambiente isolado para execução)
- [x] PostgreSQL 🗄 (Banco de dados relacional)
- [x] Use Bruno 🔌 (Cliente de API para testes de requisições)


## ⚙️ Configuração do Ambiente

### 📋 Pré-requisitos

Antes de executar os testes, é necessário ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/)
- [Cypress](https://www.cypress.io/)

### 📦 Instalação

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/webdojo.git
cd webdojo
npm install
```

---

## 🚀 Execução da Aplicação Webdojo

A aplicação **Webdojo** está contida no mesmo repositório.  
Para executá-la localmente, utilize o comando:

```bash
npm run dev
```

Isso iniciará o servidor local na porta **3000**, por padrão.  
Certifique-se de que a aplicação esteja rodando antes de iniciar os testes.

## ⚠️ Envolvidos

Mestre Fernando Papito
Aluno: Blando Alexandre Silva Santos

## 🔒 Licença

Este projeto é **exclusivo para alunos** do **Curso Ninja do Cypress**. 🚫 O compartilhamento ou distribuição sem autorização é proibido.



## 🧠 Exemplo de Teste: `consultancyMassadeTeste.cy.js`

Abaixo está um exemplo de teste automatizado da validação de campos obrigatorios no formluario de consultoria com boas práticas do Cypress:

```javascript
/// <reference types="cypress" />

describe('Formlulário de Consultoria', () => {

    beforeEach(() => {
        cy.login()
        cy.goTo('Formulários', 'Consultoria')
    })

   it('Validar Campos Obrigatorios', () => {

        // Envia o formulário sem preencher os campos obrigatórios
        cy.submitConsultancyForm()

        //constante requiredFields com Label e Message
        const requiredFields = [
            { label: 'Nome Completo', message: 'Campo obrigatório' },
            { label: 'Email *', message: 'Campo obrigatório' },
            { label: 'termos de uso', message: 'Você precisa aceitar os termos de uso' }
        ]
        //Loop em quanto possuir label e massage.
        requiredFields.forEach(({ label, message }) => {
            cy.contains('label', label)
                .parent()
                .find('p')
                .should('be.visible')
                .and('have.text', message)
                //validando css
                .and('have.class', 'text-red-400')
                .and('have.css', 'color', 'rgb(248, 113, 113)')
        })
    })
})    
```

## 🧾 Exemplos de Dados (Fixtures)

Os arquivos dentro da pasta `cypress/fixtures` contêm dados utilizados nos testes automatizados.  
Exemplos:

- `cep.json` → dados de CEP para validações de endereço.  
- `consultancy.json` → dados de consultorias fictícias.  
- `Carta_Apresentacao.pdf` → arquivo usado para upload em testes.

## 🧪 Execução dos Testes

### 🔹 Rodar todos os testes (modo headless)

```bash
npm run test
```

### 🔹 Rodar os testes de login (desktop)

```bash
npm run test:login
```

### 🔹 Rodar os testes de login (mobile)

```bash
npm run test:login:mobile
```

### 🔹 Rodar testes no modo interativo

```bash
npm run test:ui
```

---

## 🧱 Conclusão

Este projeto me forneceu uma base sólida para automação de testes E2E da aplicação **Webdojo**, garantindo padronização, escalabilidade e fácil manutenção.  
Os testes são modulares, reutilizáveis e seguem boas práticas recomendadas pela comunidade Cypress.
