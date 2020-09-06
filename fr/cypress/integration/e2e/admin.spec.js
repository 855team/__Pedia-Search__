context('admin', () => {
    it('loginasadmin', () => {
        cy.visit('http://localhost:3000/index')
        cy.get('.tologin').click()
        cy.title('localhost:3000/login')
        cy.get('.uinput').type('root')
        cy.get('.pinput').type('pedia_search')
        cy.get('.login-form-button').click()
        cy.wait(500)
        cy.title('localhost:3000/admin')
        cy.visit('http://localhost:3000/index')
        cy.get('.dropdown').trigger('mouseover').get('.tologout').click()
    })
    it('dashboard', () => {
        cy.visit('http://localhost:3000/index')
        cy.get('.tologin').click()
        cy.title('localhost:3000/login')
        cy.get('.uinput').type('root')
        cy.get('.pinput').type('pedia_search')
        cy.get('.login-form-button').click()
        cy.wait(500)
        cy.get('.todashboard').click()
        cy.title('localhost:3000/dashboard')
        cy.visit('http://localhost:3000/index')
        cy.get('.dropdown').trigger('mouseover').get('.tologout').click()
    })
    it('managemember', () => {
        cy.visit('http://localhost:3000/index')
        cy.get('.tologin').click()
        cy.title('localhost:3000/login')
        cy.get('.uinput').type('root')
        cy.get('.pinput').type('pedia_search')
        cy.get('.login-form-button').click()
        cy.wait(500)
        cy.get('.todashboard').click()
        cy.title('localhost:3000/dashboard')
        cy.get('.toadmin').click()
        cy.title('localhost:3000/admin')
        cy.visit('http://localhost:3000/index')
        cy.get('.dropdown').trigger('mouseover').get('.tologout').click()
    })

})