context('register', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register')
    })
    it('successregister', () => {
        let num=Math.floor(Math.random()*10000+100);
        cy.get('.uinput').type('test'+num)
        cy.get('.pinput').type('test'+num)
        cy.get('.login-form-button').click()
        cy.get('.my-message').contains('注册成功');
        cy.title('localhost:3000/index')
    })

    it('failregister', () => {

        cy.get('.uinput').type('test');
        cy.get('.pinput').type('test');
        cy.get('.login-form-button').click();
        cy.get('.my-message').contains('注册失败');
    })
})