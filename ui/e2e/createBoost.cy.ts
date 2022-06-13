describe('Boost UI', () => {
  it('exists', () => {
    cy.visit('/');
    cy.get('[data-testid="accountDisplay"]').should(
      'contain.text',
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
    );
  })
})