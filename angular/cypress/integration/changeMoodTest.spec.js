describe('Change Mood page', () =>{

  it('It should have Change Mood label', () => {
    cy.visit('http://localhost:4200/#/change-mood');
    window.localStorage.setItem('id','fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Change Mood");
  });

  it('It should have the accepted moods label', () => {
    cy.contains("Mood must be one of these: Joyful,Distressed,Hopeful,Fearful,Relieve,Disappointed,Proud,Remorseful,Grateful,Angry");
  });

  it('It should have the New Mood label', () => {
    cy.contains("New Mood");
  });

  it('It should have a submit button', () => {
    cy.contains("Submit");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });

  it('Lets change mood to a valid mood and see the success ', () => {
    cy.get('input[id="mood"]').type('Proud');
    cy.get('[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Mood changed!');
    });
    //cy.contains("Mood changed!");
  });

  it('Lets change mood to an invalid mood and see the error', () => {
    cy.get('input[id="mood"]').type('MAMAMAMMA');
    cy.get('[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change mood!');
    });
    //cy.contains("Was not possible to change mood!")
  });

});
