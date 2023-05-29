import {glob} from "glob";

export default context('Multiplayer Page', async () => {
    it("can create multiplayer games", () => {
        // Achievements page
        cy.login();
        cy.get('[data-cy="multiplayer"]').click();
        cy.get('[data-cy="start-multiplayer"]').should("exist");
    })
})

