describe('Buy concrete watch as guest', () => {

  it('should display order confirmation', () => {
    cy.fixture('watches')
    .its('data')
    .then(watches => {
      watches.forEach((watch) => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.visit('https://sqademosatp.net/watch')

        const watchModel = watch.model
        const watchQty = watch.quantity

        cy.search(watchModel)
        cy.addAndGoToBasket(watchQty)
        cy.checkout('Adrià',
        'Sala',
        'Carrer de Badajoz, 73',
        '08005',
        'Barcelona',
        'Spain',
        'adri.sala@test.com')

        cy.get('.item > .qty').should('contain', watchQty)
        cy.get('.name > a').should('contain', watchModel)
        cy.get('.text-2').should('contain.text', 'We\'ve received your order')
        cy.get('#box-36745').should('contain.text', 'Carrer de Badajoz, 73')
      });
    })
  })

  it('should display order invalid check', () => {
    cy.fixture('watches')
    .its('invalid')
    .then(watches => {
      watches.forEach((watch) => {
        cy.clearAllCookies()
        cy.clearAllLocalStorage()
        cy.clearAllSessionStorage()
        cy.visit('https://sqademosatp.net/watch')

        const watchModel = watch.model
        const watchQty = watch.quantity

        cy.search(watchModel)
        cy.addAndGoToBasket(watchQty)
        cy.checkout('Adrià',
        'Sala',
        'Carrer de Badajoz, 73',
        '08005',
        'Barcelona',
        'Spain',
        'adri.sala@test.com')

        cy.get('.item > .qty').should('contain', watchQty)
        cy.get('.name > a').should('contain', watchModel)
        cy.get('.text-2').should('contain.text', 'We haven\'t received your order')
        cy.get('#box-36745').should('contain.text', 'Carrer de Badajoz, 73')
      });
    })
  })
})
