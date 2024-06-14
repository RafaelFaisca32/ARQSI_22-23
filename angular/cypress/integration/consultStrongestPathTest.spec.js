describe('Consult Strongest Path page', () => {

  it('It should have Consult Strongest Path label', () => {
    cy.visit('http://localhost:4200/#/consult-strongest-path');
    window.localStorage.setItem('id', 'fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Consult Strongest Path");
  });

  it('It should have the criterion label', () => {
    cy.contains("Choose a criterion:");
  });

  it('It should have the criterion options', () => {
    cy.contains("Choose a criterion:").click();
    cy.contains("With connection strength");
    cy.contains("With relation and connection strength");
  });

  it('It should have the destiny label', () => {
    cy.contains("Destiny:");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

  it('It should have consult button', () => {
    cy.contains("Consult");
  });

  it('Lets insert an invalid destiny and see the error', () => {
    cy.get('input[id="destiny"]').type('MAMAMAMMA');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to consult the path!');
    });
  });

  it('Lets insert a valid destiny and see the sucess ', () => {
    cy.get('input[id="destiny"]').type('userSEIS');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('userUM,userDOIS,userCINCO,userTRES,userQUATRO,userSEIS');
    });
    //cy.contains("userUM,userDOIS,userCINCO,userTRES,userQUATRO,userSEIS")
  });

});
