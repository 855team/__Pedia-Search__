context('login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login')
    })
    it('toregister', () => {
        cy.get('.toregister').click()
        cy.title('localhost:3000/register')
    })
    it('successlogin', () => {
        let num=Math.floor(Math.random()*10000+100);
        cy.get('.uinput').type('test')
        cy.get('.pinput').type('test')
        cy.get('.login-form-button').click()
        cy.get('.my-message').contains('登录成功');
        cy.title('localhost:3000/index')
    })

    it('faillogin', () => {
        cy.get('.uinput').type('test');
        cy.get('.pinput').type('wrong');
        cy.get('.login-form-button').click();
        cy.on('window:confirm', str => {
            expect(str).to.eq('登陆失败')
        })
    })
})