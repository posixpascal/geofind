import {aliasMutation, aliasQuery} from '../utils/graphql-test-utils';

context('Login Tests', () => {
    beforeEach(() => {
        cy.intercept('POST', '/api', (req) => {
            aliasQuery(req, 'CurrentUser');
            aliasMutation(req, "RegisterAsGuest");
            aliasMutation(req, "RegisterUser");
            aliasMutation(req, "LoginUser");
        })
    })

    describe('Automatic User Login', () => {
        beforeEach(() => {
            cy.visit('/');

            // First request is unauthorized on a clean session
            cy.wait('@gqlCurrentUserQuery')
                .its('response.statusCode').should('eq', 401);

            // Then we want to automatically authorize on the backend
            cy.wait('@gqlRegisterAsGuestMutation')
                .its('response.body.data.registerAsGuest').should('have.property', 'authToken');
        });

        it('Automatically login as a guest user ', () => {
            cy.visit('/');

            // And then we want to lookup our auth code to verify its validity.
            cy.wait('@gqlCurrentUserQuery')
                .its('response.statusCode').should('eq', 200);
        });
    });

    describe("Register Tests", () => {
        beforeEach(() => {
            cy.visit('/');
            cy.getBySel('usercard').click();
        });

        it("It does not allow submission if required fields are missing", () => {
            cy.getBySel('register-form-trigger').click();

            cy.getBySel('userdialog').get('[type="submit"]').click();
            cy.get('.formkit-message[id$="incomplete"]').should('be.visible');
        });

        it("It does allow submission if required fields are filled out", () => {
            cy.getBySel('register-form-trigger').click();

            const user = {
                username: "Bonkers",
                password: 'test1234',
                password_confirm: 'test1234'
            };
            cy.getBySel('userdialog').as('dialog');

            cy.get('@dialog').getBySel('username').type(user.username);
            cy.get('@dialog').getBySel('password').type(user.password);
            cy.get('@dialog').getBySel('password_confirm').type(user.password_confirm);

            cy.getBySel('userdialog').get('[type="submit"]').click();

            cy.wait('@gqlRegisterUserMutation')
                .its('response.statusCode').should('eq', 200);

            cy.wait(200);
            cy.getBySel('usercard').should('contain.text', user.username);
        });


        it("It can login using the username", () => {
            cy.getBySel('login-form-trigger').click();

            const user = {
                username: "Bonkers",
                password: 'test1234',
            };

            cy.getBySel('userdialog').as('dialog');

            cy.get('@dialog').getBySel('username').type(user.username);
            cy.get('@dialog').getBySel('password').type(user.password);

            cy.getBySel('userdialog').get('[type="submit"]').click();

            cy.wait('@gqlLoginUserMutation')
                .its('response.statusCode').should('eq', 200);

            cy.wait(200);
            cy.getBySel('usercard').should('contain.text', user.username);
        });
    })

})

