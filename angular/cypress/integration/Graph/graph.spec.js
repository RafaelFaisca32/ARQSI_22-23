/// <reference types="cypress" />

describe('Graph', () => {

  it('show network', () => {
    cy.visit('http://localhost:4200/#/loginUser');
    cy.get('[id="email"]').type('userseis@gmail.com');
    cy.get('[id="password"]').type('userSeispass');
    cy.get('[id="button1"]').click();
    cy.contains("Friend Network").click();
  });

  it('Should have a lvl label', () => {
    cy.contains("Level of the network");
  });

  it('Lets get a graph', () => {
    cy.get('[id="lvl"]').type('2');
    cy.contains("Show").click();
  });

  it('Lets go to dashboard', () => {
    cy.contains("Back").click();
  });
});

