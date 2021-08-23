import { stubDataApi, expectData, searchApiUrl } from './data.json'

const { response_search } = stubDataApi
const { request_search } = expectData

describe('Testing 9thWonder Website 1', () => {
  // beforeEach(() => {})
  it('Test Searching with query in url and check formData', () => {
    let count = 0
    cy.intercept('POST', searchApiUrl, (req) => {
      req.alias = 'searchApi'
      // hiện tại page search đang gửi 3 request 1 lần lúc enter nên check thế này
      // < 3 là nhập Honda và enter để search => alias stubbedSearchApi
      // === 3 là reload lại page => alias searchApi
      // > 3 là nhập Honda 1 và enter để search => alias newSearchApi
      if (count < 3) {
        req.response = response_search // => mock response
        req.alias = 'stubbedSearchApi'
      } else if (count > 3) {
        req.alias = 'newSearchApi'
      }
      count++
    })
    cy.visit('/search')

    // case 1: Go search page and search with keyword Honda, check results
    cy.get('.search-input').type('Honda{enter}')

    // cần đợi fetch xong data rồi mới có result element
    cy.wait('@stubbedSearchApi').then(() => {
      cy.window().then(win => {
        const containers = win.$('.result-containter')
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
    cy.wait('@searchApi').then(() => {
      cy.window().then(win => {
        const containers=  win.$('.result-containter')
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
    cy.get('.search-input').clear()
    cy.get('.search-input').type('Honda 1')
    cy.get('.search-input').type('{enter}')
    cy.wait('@newSearchApi').then(res => {
      expect(res).to.have.property('request')
      expect(res).to.have.property('response')

      const { request } = res
      expect(request).to.have.property('headers').that.is.an('object')
      expect(request).to.have.property('body').that.is.a('string')
      const { headers, body } = request
      expect(body).to.equal(request_search.body)
      for (const key in request_search.headers) {
        expect(headers).to.have.property(key)
        expect(headers[key]).to.equal(request_search.headers[key])
      }
    })
  })
})