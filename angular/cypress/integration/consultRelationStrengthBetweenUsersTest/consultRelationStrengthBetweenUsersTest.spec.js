
describe('Consult Relation Strength between users page', () => {

  it('It should have Consult Relation Strength between users label', () => {
    cy.visit('http://localhost:4200/#/consultRelationStrengthBetweenUsers');
  });


  it('Lets get a relation strength between two users', () => {
    window.localStorage.setItem('id', " 4ecd4e69-a9f7-434e-9c9b-7e7a7d0707ba ");
    cy.get('[id="name"]').type('userSEIS');
    cy.get('[id="relationStrengthButton"]').click();
    cy.get('[id="name"]').clear();
    cy.contains("0")
  });

});
