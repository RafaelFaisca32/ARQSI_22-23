describe('Graph', () => {

  it('It should have Consult Common Friends Graph label', () => {
    cy.visit('http://localhost:4200/#/consult-common-friends-graph');
    window.localStorage.setItem('id', 'fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Consult Common Friends Graph");
  });

  it('It should have a friend name label', () => {
    cy.contains("Friend name:");
  });

  it('It should have a consult button', () => {
    cy.contains("Consult");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

  it('Lets get a graph', () => {
    cy.get('[id="friend"]').type('userQUATRO');
    cy.contains("Consult").click();
  });


  it('Lets try getting a graph with nou common friends', () => {
    cy.get('[id="friend"]').type('userTRES');
    cy.contains("Consult").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to show the common graph friends!');
    });
  });
});

