describe('Introduction Requests', () =>{

  it('Introduction Requests', () => {
    cy.visit('http://localhost:4200/#/IntroductionRequest');
  });

  it('Should have a title label', () => {
    cy.contains("Introduction Request");
  });

  it('Lets send an introduction request to a non existing user', () => {
    cy.get('[id="commonFriend"]').type('TesteX');
    cy.get('[id="friend"]').type('TesteY');
    cy.get('[id="button1"]').click();
    cy.get('[id="commonFriend"]').clear();
    cy.get('[id="friend"]').clear();
  });

  it('Lets send an introduction request to TesteC with TestB as common friend', () => {
    cy.get('[id="commonFriend"]').type('TesteB');
    cy.get('[id="friend"]').type('TesteC');
    cy.get('[id="button1"]').click();
  });

});
