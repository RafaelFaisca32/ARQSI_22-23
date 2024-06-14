describe('Consult All Users Tag Cloud page', () =>{

  it('Consult All Users Tag Cloud page', () => {

    cy.visit('http://localhost:4200/#/consultUsersTagCloud');
    cy.contains('Social Network');
    cy.contains('Consult Users Tag Cloud')
  });

  it('Lets get the Tag clouds', () => {
    cy.contains("Tag: surf");
    cy.contains("Percentage: 33.33333333333333%");

    cy.contains("Tag: boxe");
    cy.contains("Percentage: 33.33333333333333%");

    cy.contains("Tag: games");
    cy.contains("Percentage: 25%");

    cy.contains("Tag: rock");
    cy.contains("Percentage: 8.333333333333332%");

    cy.contains("Tag: crypto");
    cy.contains("Percentage: 8.333333333333332%");

    cy.contains("Tag: finance");
    cy.contains("Percentage: 8.333333333333332%");

    cy.contains("Tag: bodyboard");
    cy.contains("Percentage: 8.333333333333332%");

  });



});
