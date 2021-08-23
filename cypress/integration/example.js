import { stubDataApi } from './data.json'

const { response1, response2, response3 } = stubDataApi
const searchApiUrl = 'https://search.agilitycms.com/search'

describe('Testing 9thWonder Website', () => {
  // beforeEach(() => {})
  // it('Should visit homepage', () => {
  // })
  it('Should show enough items of capbility when hover Capabilities', () => {
    cy.visit('/')
    // Cypress không có hover => dùng invoke show để show dropdown
    cy.get('.main-menu-ul > li:nth-child(1) .dropdown-menu').invoke('show')
    const capabilities = ['Brand Strategy', 'Research', 'Media', 'Creative & Content', 'Public Relations', 'Website Development', 'Consumer Engagement', 'Consumer X', 'Social Media']
    for (const index in capabilities) {
      const capability = capabilities[index]
      cy.get(`.main-menu-ul > li:nth-child(1) .dropdown-menu ul.item-col-menu>li:nth-child(${Number(index) + 1})`).then($els => {
        expect($els[0].innerText).to.equal(capability)
      })
    }
  })

  it(`Should fake search Honda's result to 3 items`, () => {
    cy.visit('/')
    cy.server()
    // stub result 3 items
    cy.route({
      method: 'POST',
      url: searchApiUrl,
      response: response1,
    }).as('stubbedSearchApi')
    cy.get('.menu-search-btn').click()
    cy.get('#search-menu').type('Honda')
    cy.get('#search-menu').type('{enter}')
    cy.wait('@stubbedSearchApi')
    cy.get('.result-containter .col-item-result').should('have.length', 3)
  })

  it(`Should fake search Honda's result to 9 items`, () => {
    cy.visit('/')
    cy.server()
    // stub result 9 items
    cy.route({
      method: 'POST',
      url: searchApiUrl,
      response: response2
    }).as('stubbedSearchApi')
    cy.get('.menu-search-btn').click()
    cy.get('#search-menu').type('Honda')
    cy.get('#search-menu').type('{enter}')
    cy.wait('@stubbedSearchApi')
    cy.get('.result-containter .col-item-result').should('have.length', 9)
  })

  it('Should get result slowdown (5s), verify: loading icon shown => received result => loading icon hide', () => {
    cy.server()
    // stub result 5 items
    cy.route({
      method: 'POST',
      url: searchApiUrl,
      response: response3,
      delay: 5000
    }).as('stubbedSearchApi')

    cy.visit('/search')

    // mới mở lên sẽ không hiện load
    cy.get('.loading-result').should('not.be.visible')

    cy.get('.search-input').type('Honda')
    cy.get('.search-input').type('{enter}')

    // sau khi enter search => show load
    cy.get('.loading-result').should('be.visible')

    // vì delay 5s nên set thêm chút timeout cho kết quả (default 4s sẽ làm lỗi test)
    cy.get('.result-containter .col-item-result', { timeout: 10000 }).should('have.length', 5)

    // load xong kết quả => hide load
    cy.get('.loading-result').should('not.be.visible')
  })
})