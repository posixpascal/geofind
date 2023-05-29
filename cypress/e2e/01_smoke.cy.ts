import {glob} from "glob";

export default context('Smoke Test', async () => {
    const routes = [
        { path: '/'},
        { path: '/profile/settings' },
    ];

    routes.forEach(route => {
        it("Visits " + route.path + " correctly", () => {
            cy.visit(route.path, {
                onBeforeLoad(window) {
                    cy.stub(window.console, "error", (err) => console.log(err)).as(
                        "consoleError"
                    );
                },
            });
        });
    })
})

