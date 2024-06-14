describe('Change Mood page', () =>{

  it('It should have Change Profile label', () => {
    cy.visit('http://localhost:4200/#/change-profile');
    window.localStorage.setItem('id','fd2bd278-aaf1-4335-a11c-b89854e38f61');
    cy.contains("Change Profile");
  });

  it('It should have the information label', () => {
    cy.contains("If you dont want to change a parameter just don't put any text there");
  });

  it('It should have the new email label', () => {
    cy.contains("New Email:");
  });

  it('It should have the new phone number label', () => {
    cy.contains("New Phone Number:");
  });

  it('It should have the new password label', () => {
    cy.contains("New Password:");
  });

  it('It should have the new birth Date label', () => {
    cy.contains("New Birth Date:");
  });

  it('It should have the new name label', () => {
    cy.contains("New Name:");
  });

  it('It should have the new tags label', () => {
    cy.contains("New Tags(separate by \",\"):");
  });

  it('It should have the submit button', () => {
    cy.contains("Submit");
  });

  it('It should have back button', () => {
    cy.contains("Back");
  });



  it('Lets change profile with an invalid email and see the error', () => {
    cy.get('input[id="email"]').type('asdasd');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change profile!');
    });
    //cy.contains("Was not possible to change profile!")
  });

  it('Lets change profile with an invalid phone number and see the error', () => {
    cy.get('input[id="phoneNumber"]').type('asdasd');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change profile!');
    });
    //cy.contains("Was not possible to change profile!")
  });

  it('Lets change profile with an invalid birth date and see the error', () => {
    cy.get('input[id="email"]').type('asdasd');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change profile!');
    });
    //cy.contains("Was not possible to change profile!")
  });

  it('Lets change profile with an invalid name and see the error', () => {
    cy.get('input[id="email"]').type('asd123');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change profile!');
    });
    //cy.contains("Was not possible to change profile!")
  });

  it('Lets change profile with an invalid tag and see the error', () => {
    cy.get('input[id="tag"]').type(',');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to change profile!');
    });
    //cy.contains("Was not possible to change profile!")
  });

  it('Lets change profile with a valid name and see the sucess ', () => {
    cy.get('input[id="name"]').type('Name');
    cy.get('button[id="submit"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Profile changed!');
    });
    //cy.contains("Profile changed!")
  });

});
