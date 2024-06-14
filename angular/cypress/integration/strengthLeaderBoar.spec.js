describe('Change Mood page', () =>{

  it('It should have Network Strength Leader Board label', () => {
    cy.visit('http://localhost:4200/#/strength-leader-board');
    window.localStorage.setItem('id','fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Network Strength Leader Board");
  });

  it('It should have the table content', () => {
    cy.contains("Update").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Strength Leader Board Updated');
    });
    cy.get('table').contains('th', '#');
    cy.get('table').contains('th', 'Name');
    cy.get('table').contains('th', 'Network Strength');
    //cy.get('table').contains('td', '1');
    cy.get('table').contains('td', 'userQUATRO');
    cy.get('table').contains('td', '5');
    //cy.get('table').contains('td', '2');
    cy.get('table').contains('td', 'userTRES');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '3');
    cy.get('table').contains('td', 'userDOIS');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '4');
    cy.get('table').contains('td', 'userSEIS');
    cy.get('table').contains('td', '2');
    //cy.get('table').contains('td', '5');
    cy.get('table').contains('td', 'userUM');
    cy.get('table').contains('td', '2');
  });

  it('It should have a update button', () => {
    cy.contains("Update");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

});
