describe('List Pending Friendship Requests', () =>{

  it('List Pending Friendship Requests', () => {
    cy.visit('http://localhost:4200/#/listPendingFriendshipRequests');
  });

  it('Should have a title label', () => {
    cy.contains("List Pending Requests");
  });

  it('List pending requests from logged user', () => {
    window.localStorage.setItem('id'," 7114354b-98ff-4164-8492-c15e0e932571 ");
    cy.get('[id="button1"]').click();
    cy.contains("FriendshipId: 74367d7f-1efc-41e2-9000-483c13029c3a");
    cy.contains("User: TesteB");
  });

});
