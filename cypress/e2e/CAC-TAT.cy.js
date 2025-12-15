describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('input[id="firstName"]') //Preenche o primeiro nome
      .as('firstName')
      .should('be.visible')
      .type('Leonardo')
    cy.get('@firstName') //Valida o valor
      .should('have.value', 'Leonardo')

    cy.get('input[id="lastName"]') //Preenche o sobrenome
      .as('lastName')
      .should('be.visible')
      .type('Marrocco')
    cy.get('@lastName') //Valida o valor
      .should('have.value', 'Marrocco')

    cy.get('input[id="email"]') //Preenche o email
      .as('email')
      .should('be.visible')
      .type('leonardo@email.com')
    cy.get('@email') //Valida o valor
      .should('have.value', 'leonardo@email.com')

    cy.get('textarea[id="open-text-area"]') //Preenche o textArea
      .as('openTextArea')
      .should('be.visible')
      .type('Lorem ipsum dolor sit amet.', { delay: 0}) 
    cy.get('@openTextArea') //Valida o valor
      .should('have.value', 'Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click() //Clica no botão enviar
    cy.get('span[class="success"').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('input[id="firstName"]') //Preenche o primeiro nome
      .as('firstName')
      .should('be.visible')
      .type('Leonardo')
    cy.get('@firstName') //Valida o valor
      .should('have.value', 'Leonardo')

    cy.get('input[id="lastName"]') //Preenche o sobrenome
      .as('lastName')
      .should('be.visible')
      .type('Marrocco')
    cy.get('@lastName') //Valida o valor
      .should('have.value', 'Marrocco')

    cy.get('input[id="email"]') //Preenche o email errado
      .as('email')
      .should('be.visible')
      .type('leonardo')
    cy.get('@email') //Valida o valor
      .should('have.value', 'leonardo')

    cy.get('textarea[id="open-text-area"]') //Preenche o textArea
      .as('openTextArea')
      .should('be.visible')
      .type('Lorem ipsum dolor sit amet.', { delay: 0}) 
    cy.get('@openTextArea') //Valida o valor
      .should('have.value', 'Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click() //Clica no botão enviar
    cy.get('span[class="error"').should('be.visible')
  })

  it('validar inserção de valores não-numéricos no campo telefone', () => {
    cy.get('input[id="phone"]').type('Lorem ipsum dolor sit amet.')
    cy.get('input[id="phone"]').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[id="firstName"]') //Preenche o primeiro nome
      .as('firstName')
      .should('be.visible')
      .type('Leonardo')
    cy.get('@firstName') //Valida o valor
      .should('have.value', 'Leonardo')

    cy.get('input[id="lastName"]') //Preenche o sobrenome
      .as('lastName')
      .should('be.visible')
      .type('Marrocco')
    cy.get('@lastName') //Valida o valor
      .should('have.value', 'Marrocco')

    cy.get('input[id="email"]') //Preenche o email errado
      .as('email')
      .should('be.visible')
      .type('leonardo')
    cy.get('@email') //Valida o valor
      .should('have.value', 'leonardo')

    cy.get('input[id="phone-checkbox"]') //Clica no check de telefone
      .as('checkTelefone')
      .check()
    cy.get('@checkTelefone')
      .should('be.checked')

    cy.get('textarea[id="open-text-area"]') //Preenche o textArea
      .as('openTextArea')
      .should('be.visible')
      .type('Lorem ipsum dolor sit amet.', { delay: 0}) 
    cy.get('@openTextArea') //Valida o valor
      .should('have.value', 'Lorem ipsum dolor sit amet.')

    cy.contains('button', 'Enviar').click() //Clica no botão enviar
    cy.get('span[class="error"').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('input[id="firstName"]') //Preenche o primeiro nome
      .as('firstName')
      .should('be.visible')
      .type('Leonardo')
    cy.get('@firstName') //Valida o valor
      .should('have.value', 'Leonardo')
    cy.get('@firstName') //Limpa o valor
      .clear()
    cy.get('@firstName')
      .should('have.value', '') //Valida se o valor é vazio 

    cy.get('input[id="lastName"]') //Preenche o sobrenome
      .as('lastName')
      .should('be.visible')
      .type('Marrocco')
    cy.get('@lastName') //Valida o valor
      .should('have.value', 'Marrocco')
    cy.get('@lastName') //Limpa o valor
      .clear()
    cy.get('@firstName')
      .should('have.value', '') //Valida se o valor é vazio 

    cy.get('input[id="email"]') //Preenche o email errado
      .as('email')
      .should('be.visible')
      .type('leonardo')
    cy.get('@email') //Valida o valor
      .should('have.value', 'leonardo')    
    cy.get('@email') //Limpa o valor
      .clear()
    cy.get('@email')
      .should('have.value', '') //Valida se o valor é vazio 
    

    cy.get('input[id="phone"]') //Preenche o email errado
      .as('phone')
      .should('be.visible')
      .type('11999999999')
    cy.get('@phone') //Valida o valor
      .should('have.value', '11999999999')
    cy.get('@phone') //Limpa o valor
      .clear()
    cy.get('@phone')
      .should('have.value', '') //Valida se o valor é vazio
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar').click() //Clica no botão enviar
    cy.get('span[class="error"').should('be.visible')
  })
  
  it('envia o formuário com sucesso usando um comando customizado', () => {
    const project = {
      nome: 'Leonardo',
      sobrenome: 'Marrocco',
      email: 'leonardo@email.com',
      textarea: 'Lorem ipsum dolor sit amet.'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
    cy.get('span[class="success"').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check('feedback')
    cy.get('input[type="radio"][value="feedback"]').should('be.checked').and('have.value', 'feedback')
  })
  
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each((typeOfService) => { //vai pegar cada radio, nesse caso três
        cy.wrap(typeOfService) //empacota o radio e da um check > valida
          .check()
          .should('be.checked')
      })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get(':checkbox')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })
  
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .should(input =>
        expect(input[0].files[0].name).to.equal('example.json')
      )
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .should(input => //diferença do .should para .then, é que o should tem um retry automático e then deve ser usado quando tiver de fazer alteração de valores
        expect(input[0].files[0].name).to.equal('example.json')
      )
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', { encoding: null}).as('exampleFile')
    cy.get('input[type="file"]')
      .selectFile('@exampleFile', { action: 'drag-drop' })
      .should(input =>
        expect(input[0].files[0].name).to.equal('example.json')
      )
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'target', '_blank')
      .and('have.attr', 'href', 'privacy.html')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })

  // it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
  //       cy.visit('./src/privacy.html')
  //       cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  // }) essa foi a solução que bolei inicialmente antes de ver a resolução do exercício 2 da aula 7
})
