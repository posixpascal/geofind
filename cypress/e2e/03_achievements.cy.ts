import {glob} from "glob";

export default context('Achievements', async () => {
    it("Can navigate on the page", () => {
        // Achievements page
        cy.login();
        cy.visit('/profile/achievements');
        cy.get('[data-cy="navigation"]');
        cy.get('[data-cy="spotted-countries"]');

        cy.get('[data-cy="progress"]').contains('0%');
    })
})

