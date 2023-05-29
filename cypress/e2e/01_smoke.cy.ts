import {glob} from "glob";

export default context('Smoke Test', async () => {
    const routes = [
        { path: '/'},
        { path: '/profile' },
        { path: '/profile/settings' },
        { path: '/profile/achievements' },
        { path: '/feedback' },
        { path: '/multiplayer/join' }
    ];

    routes.forEach(route => {
        it("Visits " + route.path + " correctly", () => {
            cy.login();
            cy.visit(route.path, {
                onBeforeLoad(window) {
                    cy.stub(window.console, "error", (err) => console.log(err)).as(
                        "consoleError"
                    );
                },
            });
            cy.get('[data-cy="navigation"]')
        });
    })
})

