describe('Change Introduction State', () =>{

  it('Change Introduction State', () => {
    cy.visit('http://localhost:4200/#/changeIntroductionState');
  });

  it('Should have a title label', () => {
    cy.contains("Change Introduction State");
  });

  it('Lets accept a non existing introduction request', () => {
    cy.get('[id="introductionId"]').type('0000000000000000000');
    cy.get('[id="button1"]').click();
    cy.get('[id="introductionId"]').clear();
  });

  it('Lets accept an existing introduction request', () => {
    cy.get('[id="introductionId"]').type('4ea13d80-6dd2-4945-9abf-25b2a72c4a74');
    cy.get('[id="button1"]').click();
    cy.get('[id="introductionId"]').clear();
  });

  it('Lets reject a non existing introduction request', () => {
    cy.get('[id="introductionId"]').type('0000000000000000000');
    cy.get('[id="button2"]').click();
    cy.get('[id="introductionId"]').clear();
    cy.get('[id="introductionId"]').clear();
  });

  it('Lets reject an existing introduction request', () => {
    cy.get('[id="introductionId"]').type('4ea13d80-6dd2-4945-9abf-25b2a72c4a74');
    cy.get('[id="button1"]').click();
  });

});
