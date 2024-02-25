// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const DEFAULT_WAIT = 1000
const LONG_WAIT = 2000

Cypress.Commands.add('search', (model) => {
    const watchModel = model

    cy.get('.search-input').clear()
    cy.get('.search-input').type(watchModel)
    cy.get('.button-search').click()

    cy.wait(LONG_WAIT)
    cy.get('.search-input').clear()
    cy.get('.background').click()

    cy.get('.name').should('have.length', 1)
    cy.get('.name').should('contain', watchModel)
    cy.get('.name').click()

    cy.wait(DEFAULT_WAIT)

    cy.get('h1').should('contain', watchModel)

    cy.wait(DEFAULT_WAIT)
})

Cypress.Commands.add('addAndGoToBasket', (qty) => {
    const quantity = qty

    cy.get('#btn-cart > .add-to-cart').should('be.visible')
    cy.get('#btn-cart > .add-to-cart').click()
    cy.wait(DEFAULT_WAIT)

    cy.get('.right-buttons > .btn-2').click()
    cy.wait(DEFAULT_WAIT)

    cy.url().should('contain', 'shopping-cart')

    cy.get('.qty-inp-s').should('not.be.disabled')
    cy.get('.qty-inp-s').clear().type(quantity)

    cy.wait(DEFAULT_WAIT)

    cy.url().should('contain', 'shopping-cart')
    cy.get('.with-card').click()

    cy.wait(DEFAULT_WAIT)

    cy.get('#box-31799 > .checkout-cart-listing > .cart-listing > .multi-cart > .item > .qty').should('contain', quantity)
})

Cypress.Commands.add('checkout', (name, surname, address, postcode, city, country, mail) => {
    cy.get('#shipping_address-firstname').type(name)
    cy.get('#shipping_address-lastname').type(surname)
    cy.get('#shipping_address-street_address').type(address)
    cy.get('#shipping_address-postcode').type(postcode)
    cy.get('#shipping_address-city').type(city)
    cy.get('#shipping_address-email_address').type(mail)
    cy.get('#checkout-email_address').type(mail)

    cy.get('#s2id_shipping_address-country').click()
    cy.get('#select2-drop > .select2-search > .select2-input').type(country)
    cy.get('.select2-result-label').click()

    cy.wait(DEFAULT_WAIT)

    cy.get('.payment_class_cod').click()

    cy.wait(DEFAULT_WAIT)
    
    cy.get('#checkout-terms').check()
    cy.get('.btn-next').click()
})