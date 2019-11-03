describe('My First Test', function () {
  it('Does not do much!', function () {
    expect(true).to.equal(true)
  })
})

describe('My First Test', function () {
  it('Gets, types and asserts', function () {
    cy.visit('https://example.cypress.io')
    cy.contains('type').click()
    // 暂停
    // cy.pause()
    // cy.debug()
    // 截屏
    cy.screenshot()
    // 应该存在一个包含'/commands/actions'的新URL
    cy.url().should('include', '/commands/actions')
    // 获取一个输入, 输入进去并且验证文本值已经更新了
    cy.get('.action-email')
      .type('fake@email.com')
      .should('have.value', '1fake@email.com')
  })
})
