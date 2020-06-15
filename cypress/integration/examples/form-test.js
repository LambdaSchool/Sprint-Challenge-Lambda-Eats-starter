describe('testing name,checkbox, and button', function(){
    beforeEach(function(){
        cy.visit('http://localhost:3000/Pizza')
    })
    it('tests name input', function(){
        cy.get('[data-cy="name"]').type('dustyyy')
        cy.get('[data-cy="pepperoni"]').check().should('be.checked')
        cy.get('[data-cy="onion"]').check().should('be.checked')
        cy.get('[data-cy="peppers"]').check().should('be.checked')
        cy.get('[data-cy="submit"]').click()
    })
})