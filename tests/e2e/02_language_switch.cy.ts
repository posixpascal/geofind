import {aliasMutation, aliasQuery} from '../../utils/graphql-test-utils';

context('Language Switch', () => {
    beforeEach(() => {

    })

    it('Its possible to change the locale of the app', () => {
        cy.visit('/');
        cy.getBySel('languageswitch').click();
        cy.getBySel('languageswitch-locale-de').click();
        cy.getBySel('languageswitch').click();
        cy.getBySel('languageswitch-locale-de').should('contain.text', 'Deutsch');
        cy.getBySel('languageswitch-locale-en').click();
        cy.getBySel('languageswitch').click();
        cy.getBySel('languageswitch-locale-de').should('contain.text', 'German');
    });
});

