/// <reference types="cypress" />

describe('Register User', () => {

  it('registerUser a user', () => {
    cy.visit('http://localhost:4200/#/registerUser');
  });

  it('Should have a Name label', () => {
    cy.contains("Name");
  });

  it('Should have a Password label', () => {
    cy.contains("Password");
  });

  it('Should have a Birthdate label', () => {
    cy.contains("Name");
  });

  it('Should have a Email label', () => {
    cy.contains("Email");
  });

  it('Should have a Phone number label', () => {
    cy.contains("Phone number");
  });

  it('Lets register a valid user', () => {
    cy.get('[id="name"]').type('Isepepe');
    cy.get('[id="password"]').type('userIseppass');
    cy.get('[id="birthdate"]').type('05/05/2000');
    cy.get('[id="email"]').type('isep@isep.ipp.pt');
    cy.get('[id="phoneNumber"]').type('999999999');
    cy.get('[id="check"]').check();
    cy.contains("Create account").click();
  });

  it('Lets register  invalid a valid user', () => {
    cy.get('[id="name"]').type('12');
    cy.get('[id="password"]').type('userIseppass');
    cy.get('[id="birthdate"]').type('05/05/2000');
    cy.get('[id="email"]').type('isep@isep.ipp.pt');
    cy.get('[id="phoneNumber"]').type('999999999');
    cy.get('[id="check"]').check();
    cy.contains("Create account").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Invalid data, please try again');
    });
  });


});

