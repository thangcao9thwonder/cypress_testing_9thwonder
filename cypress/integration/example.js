import { stubDataApi, expectData } from './data.json'

const { response1, response2, response3 } = stubDataApi
const { request_search } = expectData
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

  it('Test Searching with query in url and check formData', () => {
    cy.server()
    cy.visit('/search')

    // case 1: Go search page and search with keyword Honda, check results
    
    cy.route({
      method: 'POST',
      url: searchApiUrl
    }).as('stubbedSearchApi')
    cy.get('.search-input').type('Honda')
    cy.get('.search-input').type('{enter}')
    cy.wait('@stubbedSearchApi').then(() => {
      cy.get('.result-containter').then(containers => {
        const container = containers[0]
        const $els = container.querySelectorAll('.col-item-result h5')

        expect($els.length).to.equal(10)
        const firstItemTitle = $els[0].innerText
        const lastItemTitle = $els[$els.length - 1].innerText
        cy.wrap(firstItemTitle).as('firstItemTitle')
        cy.wrap(lastItemTitle).as('lastItemTitle')
        cy.wrap($els.length).as('countLastResult')
      })
    })
    
    // case 2: Reload page, check result = result case 1
    cy.reload()
    
    cy.wait('@stubbedSearchApi').then(() => {
      cy.get('.result-containter').then(containers => {
        const container = containers[0]
        const $els = container.querySelectorAll('.col-item-result h5')
  
        cy.get('@countLastResult').then(count => {
          expect($els.length).to.equal(count)
        })
  
        const firstItemTitle = $els[0].innerText
        const thirdItemTitle = $els[2].innerText
        const lastItemTitle = $els[$els.length - 1].innerText
        
        // check item đầu có bắt đầu bằng Honda
        const splitArr1 = firstItemTitle.split(' ')
        expect(splitArr1[0]).to.equal('Honda')
        
        // check item cuối có kết thúc bằng Guide
        const splitArr3 = thirdItemTitle.split(' ')
        expect(splitArr3[splitArr3.length - 1]).to.equal('Guide')
  
        // check kết quả đầu và cuối vẫn match với case1
        cy.get('@firstItemTitle').then(case1FirstItemTitle => {
          expect(case1FirstItemTitle).to.equal(firstItemTitle)
        })
        expect()
        cy.get('@lastItemTitle').then(case1LastItemTitle => {
          expect(case1LastItemTitle).to.equal(lastItemTitle)
        })
      })
    })

    // case 3: search with keyword Honda 1, check formData
    cy.route({
      method: 'POST',
      url: searchApiUrl
    }).as('stubbedSearchApi_New')
    cy.get('.search-input').clear()
    cy.get('.search-input').type('Honda 1')
    cy.get('.search-input').type('{enter}')
    cy.wait('@stubbedSearchApi_New').then(res => {
      expect(res).to.have.property('status')
      expect(res).to.have.property('request')
      expect(res).to.have.property('response')
      expect(res.status).to.eq(200)

      const { request } = res
      expect(request).to.have.property('headers').that.is.an('object')
      expect(request).to.have.property('body').that.is.a('string')
      const { headers, body } = request
      for (const key in request_search.headers) {
        expect(headers).to.have.property(key)
        expect(headers[key]).to.equal(request_search.headers[key])
      }
      expect(body).to.equal(request_search.body)
    })
  })
})