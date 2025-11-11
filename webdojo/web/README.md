# 🧪 Testes Automatizados - Webdojo (Cypress)

## 📘 Visão Geral

Este projeto contém a suíte de **testes automatizados da aplicação Webdojo**, desenvolvida utilizando o framework **[Cypress](https://www.cypress.io/)**.  
Os testes garantem a qualidade e estabilidade da aplicação, validando seus principais fluxos e comportamentos em diferentes resoluções.

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
---

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

---

## 🧰 Estrutura do Projeto Cypress

```
cypress/
│
├── downloads/                 # Pasta de downloads gerados durante os testes
│
├── e2e/                       # Especificações dos testes (arquivos .cy.js)
│
├── fixtures/                  # Arquivos de dados e mocks utilizados nos testes
│   ├── Carta_Apresentacao.pdf
│   ├── cep.json
│   └── consultancy.json
│
└── support/                   # Suporte global e funções utilitárias
    ├── actions/               # Ações customizadas (page objects ou helpers)
    ├── commands.js            # Comandos customizados do Cypress
    ├── e2e.js                 # Configurações globais de testes E2E
    └── utils.js               # Funções utilitárias para os testes
```

---

## 🧩 Scripts Disponíveis

Os seguintes scripts estão configurados no arquivo `package.json`:

| Script | Descrição |
|--------|------------|
| `npm run dev` | Inicia a aplicação Webdojo localmente (porta 3000) |
| `npm run test` | Executa todos os testes em modo headless com viewport desktop (1140x900) |
| `npm run test:ui` | Abre o **Cypress Test Runner** (modo interativo) |
| `npm run test:login` | Executa apenas os testes de login (resolução desktop) |
| `npm run test:login:mobile` | Executa apenas os testes de login (resolução mobile: 414x896) |

---

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

## 🧾 Exemplos de Dados (Fixtures)

Os arquivos dentro da pasta `cypress/fixtures` contêm dados utilizados nos testes automatizados.  
Exemplos:

- `cep.json` → dados de CEP para validações de endereço.  
- `consultancy.json` → dados de consultorias fictícias.  
- `Carta_Apresentacao.pdf` → arquivo usado para upload em testes.

---

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

---

## 🧭 Boas Práticas Adotadas

✅ **Organização**  
- Separação de responsabilidades por pastas (`fixtures`, `support`, `actions`, `e2e`).

✅ **Reutilização de Código**  
- Uso de `commands.js` para comandos customizados.
- Ações encapsuladas em `support/actions`.

✅ **Dados Externos**  
- Uso de fixtures para armazenar dados estáticos e previsíveis.

✅ **Ambientes Diferentes**  
- Configuração de viewports específicas (desktop e mobile).

✅ **Validação de Resultados**  
- Uso de `should()` e `contains()` para asserts claros e legíveis.

---

## 🧩 Estrutura Recomendada de Nomeação de Testes

| Tipo de Arquivo | Convenção | Exemplo |
|------------------|-----------|----------|
| Testes E2E | `nomeFuncionalidade.cy.js` | `login.cy.js` |
| Fixtures | `nomeDoRecurso.json` | `user.json` |
| Actions | `nomeDaPagina.actions.js` | `login.actions.js` |
| Utils | `nomeUtil.js` | `formatDate.js` |

---

## 🧾 Relatórios de Teste (opcional)

Para gerar relatórios legíveis dos testes, recomenda-se integrar o **[Mochawesome](https://github.com/adamgruber/mochawesome)**:

```bash
npm install --save-dev mochawesome
```

E configurar no `cypress.config.js`:

```javascript
reporter: 'mochawesome',
reporterOptions: {
  reportDir: 'cypress/reports',
  overwrite: false,
  html: true,
  json: true
}
```

---

## 🧱 Conclusão

Este projeto me forneceu uma base sólida para automação de testes E2E da aplicação **Webdojo**, garantindo padronização, escalabilidade e fácil manutenção.  
Os testes são modulares, reutilizáveis e seguem boas práticas recomendadas pela comunidade Cypress.

---

**Autor:** [Blando Alexandre]
**Professor:**  [Fernando Papito] 
**Ferramenta:** [Cypress.io](https://www.cypress.io/)  
**Aplicação:** Webdojo  
**Licença:** Uso interno
