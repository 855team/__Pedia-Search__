context('redirect', () => {
    it('redirect1', () => {
        cy.visit('http://localhost:3000/')
        cy.title('http://localhost:3000/index')
    })

    it('redirect2', () => {
        cy.visit('http://localhost:3000/ffdgf')
        cy.title('http://localhost:3000/index')
    })
    it('redirect3', () => {
        cy.visit('http://localhost:3000/index')
        cy.title('http://localhost:3000/index')
    })
})