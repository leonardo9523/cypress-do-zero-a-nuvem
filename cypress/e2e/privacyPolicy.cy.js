  it.only('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.visit('./src/privacy.html')
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })