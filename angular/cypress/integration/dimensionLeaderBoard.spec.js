describe('Change Mood page', () =>{

  it('It should have Network Dimension Leader Board label', () => {
    cy.visit('http://localhost:4200/#/dimension-leader-board');
    window.localStorage.setItem('id','fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Network Dimension Leader Board");
  });

  it('It should have the table content', () => {
    cy.contains("Update").click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Dimension Leader Board Updated');
    });
    cy.get('table').contains('th', '#');
    cy.get('table').contains('th', 'Name');
    cy.get('table').contains('th', 'Network Dimension');
    //cy.get('table').contains('td', '1');
    cy.get('table').contains('td', 'userTRES');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '2');
    cy.get('table').contains('td', 'userQUATRO');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '3');
    cy.get('table').contains('td', 'userDOIS');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '4');
    cy.get('table').contains('td', 'userCINCO');
    cy.get('table').contains('td', '3');
    //cy.get('table').contains('td', '5');
    cy.get('table').contains('td', 'userSEIS');
    cy.get('table').contains('td', '2');
    //cy.get('table').contains('td', '6');
    cy.get('table').contains('td', 'userUM');
    cy.get('table').contains('td', '2');
    //cy.get('table').contains('td', '7');
    cy.get('table').contains('td', 'userNovo');
    cy.get('table').contains('td', '0');
    //cy.get('table').contains('td', '8');
    cy.get('table').contains('td', 'TesteC');
    cy.get('table').contains('td', '0');
    //cy.get('table').contains('td', '9');
    cy.get('table').contains('td', 'Isepepe');
    cy.get('table').contains('td', '0');
    //cy.get('table').contains('td', '10');
    cy.get('table').contains('td', 'TesteA');
    cy.get('table').contains('td', '0');

  });

  it('It should have a update button', () => {
    cy.contains("Update");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

});
