describe('Consult Network Size', () => {

  it('Should contain network size in footer', () => {
    cy.visit('http://localhost:4200/#/dashboard');
    window.localStorage.setItem('id', " 6a1d910a-f416-4e9a-97e4-520b315d74c9 ");
    cy.contains('Network Size: 7');
  });
});
