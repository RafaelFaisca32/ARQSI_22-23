describe('Edit relation with Tag and Connection Strength page', () =>{

  it('Sugest friends for a recent user', () => {
    cy.visit('http://localhost:4200/#/SugestedFriendships');
  });


  it('Lets sugest new friends', () => {
    cy.get('[id="sugestFriends"]').click();
    cy.contains("User");
    cy.contains("Tags")
  });

});
