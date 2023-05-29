import {glob} from "glob";

export default context('Home Page', async () => {
    it("Can navigate on the page", () => {
        // Achievements page
        cy.login();
        cy.get('[data-cy="achievements"]').click();
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="spotted-countries"]');
        cy.get('[data-cy="backbutton"]').click();
        cy.get('[data-cy="navigation"]');


        // Settings page
        cy.get('[data-cy="settings"]').click();
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="backbutton"]').click();
        cy.get('[data-cy="navigation"]');


        // Multiplayer join page
        cy.get('[data-cy="multiplayer-join"]').click();
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="backbutton"]').click();
        cy.get('[data-cy="navigation"]');

        // Settings page
        cy.get('[data-cy="profile"]').click();
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="backbutton"]').click();
        cy.get('[data-cy="navigation"]');
    })
})

