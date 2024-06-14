describe('Consult User TagCloud', () =>{

  it('Consult User TagCloud', () => {
    cy.visit('http://localhost:4200/#/consultUserTagCloud');
    window.localStorage.setItem('id'," 6a1d910a-f416-4e9a-97e4-520b315d74c9 ");
  });

  it('Should have a title label', () => {
    cy.contains("Consult User Tag Cloud");
  });

  it('List TagCloud from authenticated user', () => {
    cy.contains('Tag: boxe');
    cy.contains('Percentage: 33.33333333333333%');

    cy.contains('Tag: crypto');
    cy.contains('Percentage: 8.333333333333332%');

    cy.contains('Tag: finance');
    cy.contains('Percentage: 8.333333333333332%');
  });

});
