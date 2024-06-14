/// <reference types="cypress" />

describe('Dashboard', () => {

  it('dashboard', () => {
    cy.visit('http://localhost:4200/#/dashboard');
  });

  it('Should have a Create Post function', () => {
    cy.contains("Create a Post");
  });

  it('Should have a Post feed', () => {
    cy.contains("Post feed");
  });

  it('Should have a post label', () => {
    cy.contains("Post:");
  });

  it('Should have a postTag label', () => {
    cy.contains("PostTag:");
  });

  it('Should have a email label', () => {
    cy.contains("Please introduce the email of the person you want to see the feed of posts:");
  });

  it('Lets create a post', () => {
    cy.get('[id="description"]').type('teste de Cypress');
    cy.get('[id="postTag"]').type('testes');
    cy.contains("Create post").click();
  });

  it('Lets see a feed', () => {
    cy.get('[id="email"]').type('userseis@gmail.com');
    cy.contains("See feed").click();
  });

});

