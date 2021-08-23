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
      url: 'https://search.agilitycms.com/search',
      response: {
        "IsError": false,
        "ErrorMessage": null,
        "ResponseData": {
          "Count": 3,
          "Query": "Honda*",
          "FromNumber": 1,
          "ToNumber": 3,
          "Results": [
            {
              "Title": "Stubbed response 1",
              "Description": "",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/work/honda-talon",
              "Score": 1.1338934,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 2",
              "Description": "Humans have trouble distinguishing between an insight and an observation (or fact). Run through the following filters to make your insights fit the bill.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/9thwonder%20assets/ideas_marketinginsights_1356x658.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/blog/making-insights-insightful",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 3",
              "Description": "Learn how to optimize your Hispanic marketing strategy for direct-to-collective online behavior with our 2020 guide to Hispanic Digital Purchasing Behavior.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/DtoC_20200528184811_0.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/guide-to-hispanic-digital-purchasing-behavior",
              "Score": 0.37796447,
              "LanguageCode": null
            }
          ]
        },
        "Token": null,
        "AdditionalValues": {},
        "IsManagementException": false,
        "StackTrace": null
      }
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
      url: 'https://search.agilitycms.com/search',
      response: {
        "IsError": false,
        "ErrorMessage": null,
        "ResponseData": {
          "Count": 9,
          "Query": "Honda*",
          "FromNumber": 1,
          "ToNumber": 9,
          "Results": [
            {
              "Title": "Stubbed response 1",
              "Description": "",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/work/honda-talon",
              "Score": 1.1338934,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 2",
              "Description": "Humans have trouble distinguishing between an insight and an observation (or fact). Run through the following filters to make your insights fit the bill.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/9thwonder%20assets/ideas_marketinginsights_1356x658.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/blog/making-insights-insightful",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 3",
              "Description": "Learn how to optimize your Hispanic marketing strategy for direct-to-collective online behavior with our 2020 guide to Hispanic Digital Purchasing Behavior.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/DtoC_20200528184811_0.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/guide-to-hispanic-digital-purchasing-behavior",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 4",
              "Description": "We partner with our customers to create some of the best marketing work across industries. Check out our work and imagine what we could accomplish for your brand.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/work",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 5",
              "Description": "Doug Greiff is President of 9thWonder StoryLab. Doug is in charge of a collective of diverse storytellers and pop culture engineers who craft branded entertainment strategies.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/about/leadership/doug-greiff",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 6",
              "Description": "9thWonder is a global independent marketing agency with offices each purposely created to specialize in a few things. Use some of us or all of us.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/about",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 7",
              "Description": "",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/DtoC_20200528184811_0.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/building-latinx-brand-advocates",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 8",
              "Description": "",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/about/leadership/marcus-wesson",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 9",
              "Description": "9thWonder is a full service, independent marketing agency. Our specialties range from research and brand strategy to digital marketing, media and creative services.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/",
              "Score": 0.37796447,
              "LanguageCode": null
            }
          ]
        },
        "Token": null,
        "AdditionalValues": {},
        "IsManagementException": false,
        "StackTrace": null
      }
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
      url: 'https://search.agilitycms.com/search',
      response: {
        "IsError": false,
        "ErrorMessage": null,
        "ResponseData": {
          "Count": 5,
          "Query": "Honda*",
          "FromNumber": 1,
          "ToNumber": 5,
          "Results": [
            {
              "Title": "Stubbed response 1",
              "Description": "",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/work/honda-talon",
              "Score": 1.1338934,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 2",
              "Description": "Humans have trouble distinguishing between an insight and an observation (or fact). Run through the following filters to make your insights fit the bill.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/9thwonder%20assets/ideas_marketinginsights_1356x658.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/blog/making-insights-insightful",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 3",
              "Description": "Learn how to optimize your Hispanic marketing strategy for direct-to-collective online behavior with our 2020 guide to Hispanic Digital Purchasing Behavior.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/DtoC_20200528184811_0.jpg",
              "Category": "",
              "Url": "https://www.9thwonder.com/guide-to-hispanic-digital-purchasing-behavior",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 4",
              "Description": "We partner with our customers to create some of the best marketing work across industries. Check out our work and imagine what we could accomplish for your brand.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/work",
              "Score": 0.37796447,
              "LanguageCode": null
            },
            {
              "Title": "Stubbed response 5",
              "Description": "Doug Greiff is President of 9thWonder StoryLab. Doug is in charge of a collective of diverse storytellers and pop culture engineers who craft branded entertainment strategies.",
              "Highlight": null,
              "ImageUrl": "https://cdn.agilitycms.com/9th-wonder/Attachments/NewItems/9thwonder-logo_20210426043109_0.png",
              "Category": "",
              "Url": "https://www.9thwonder.com/about/leadership/doug-greiff",
              "Score": 0.37796447,
              "LanguageCode": null
            }
          ]
        },
        "Token": null,
        "AdditionalValues": {},
        "IsManagementException": false,
        "StackTrace": null
      },
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