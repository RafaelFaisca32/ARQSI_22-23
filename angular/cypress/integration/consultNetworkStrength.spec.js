describe('Change Mood page', () => {

  it('It should have Consult Network Strength label', () => {
    cy.visit('http://localhost:4200/#/network-strength');
    window.localStorage.setItem('id', 'fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Consult Network Strength");
  });

  it('It should have the network strength label', () => {
    cy.contains("Consult").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Your network strength is: 2');
    });
    //cy.contains("Your network strength is: 2");
  });

  it('It should have a consult button', () => {
    cy.contains("Consult");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

});
