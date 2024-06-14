describe('Friend Request', () =>{

  it('Friend Request', () => {
    cy.visit('http://localhost:4200/#/friendRequest');
  });

  it('Should have a title label', () => {
    cy.contains("Friend Request");
  });

  it('Should have a User Name label', () => {
    cy.contains("User name:");
  });

  it('Lets send a friend request to a non existing user', () => {
    cy.get('[id="newFriendship"]').type('TesteX');
    cy.get('[id="button1"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to create friend request!');
    });
  });

  it('Lets send a friend request to TesteB', () => {
    cy.get('[id="newFriendship"]').clear();
    cy.get('[id="newFriendship"]').type('TesteB');
    cy.get('[id="button1"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Friendship request created!');
    })
  });

});
