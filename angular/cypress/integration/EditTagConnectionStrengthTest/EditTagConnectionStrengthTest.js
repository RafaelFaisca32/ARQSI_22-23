// <reference types="cypress" />

describe('Edit relation with Tag and Connection Strength page', () => {

  it('It should have Edit Relationships label', () => {
    cy.visit('http://localhost:4200/#/EditTagConnectionStrength');
  });


  it('Lets change connection strength to one above 10 and see the error', () => {
    window.localStorage.setItem('id', " 8610550e-e386-4085-86b9-a37202e31d5e ");
    cy.get('[id="conStrength"]').type('20');
    cy.get('[id="name"]').type('userCINCO');
    cy.get('[id="submit"]').click();
    cy.get('[id="conStrength"]').clear();
    cy.get('[id="name"]').clear();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to edit connection strength and/or tags!');
    });
  });

  it('Lets change connection strength to one less than 10', () => {
    window.localStorage.setItem('id', " 8610550e-e386-4085-86b9-a37202e31d5e ");
    cy.get('[id="conStrength"]').type('7');
    cy.get('[id="name"]').type('userCINCO');
    cy.get('[id="submit"]').click();
    cy.get('[id="conStrength"]').clear();
    cy.get('[id="name"]').clear();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Connection strength and/or tags have been successfully set!');
    });
  });

  it('Lets change the tags too ', () => {
    cy.get('[id="name"]').type('userCINCO');
    cy.get('[id="tag"]').type('surf,bodyboard');
    cy.get('[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Connection strength and/or tags have been successfully set!');
    });


  });
});
