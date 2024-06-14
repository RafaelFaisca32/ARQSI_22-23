describe('Edit relation with Tag and Connection Strength page', () =>{

  it('Sugest friends for a recent user', () => {

    cy.visit('http://localhost:4200/#/SugestedFriendships');
    cy.contains('Social Network');
  });

  it('Lets get some user sugestions', () => {
   window.localStorage.setItem('id'," 499a4a89-52df-4bfb-87ed-47ebba2670c3 ");
    cy.get('[id="sugestFriends"]').click();
    cy.contains("User: userQUATRO Tags: rock,boxe,games");
    cy.contains("User: userTRES Tags: boxe,games,bodyboard");
    cy.contains("User: userCINCO Tags: crypto,finance,boxe");
  });

  it('Lets try to get sugestions from a user wich alredy has friends', ()=> {
    window.localStorage.setItem('id'," 919561ad-2bcb-4c5d-8024-855864c24a46 ");
    cy.get('[id="sugestFriends"]').click();
    cy.on('window:alert', (text) => {
      expect(text).to.contains('Was not possible to suggest friends!');
    });
  });

});
