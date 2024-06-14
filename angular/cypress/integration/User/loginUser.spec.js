/// <reference types="cypress" />

describe('Login User', () => {

  it('Login-in a user', () => {
    cy.visit('http://localhost:4200/#/loginUser');
  });

  it('Should have a Email label', () => {
    cy.contains("Email");
  });

  it('Should have a Password label', () => {
    cy.contains("Password");
  });

  it('Lets login a non existing user', () => {
    cy.get('[id="email"]').type('ola@xau.com');
    cy.get('[id="password"]').type('userDoispass');
    cy.get('[id="button1"]').click();
    cy.get('[id="email"]').clear();
    cy.get('[id="password"]').clear();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Account not found');
    });
  });

  it('Lets login a existing user', () => {
    cy.get('[id="email"]').type('userseis@gmail.com');
    cy.get('[id="password"]').type('userSeispass');
    cy.get('[id="button1"]').click();
  });

  it('Logout a user', () => {
    cy.contains("Logout").click();
  });

  it('Register a user', () => {
    cy.get('[id="button2"]').click();
  });

});

