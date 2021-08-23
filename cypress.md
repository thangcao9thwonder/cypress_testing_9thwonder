# Cypress testing for Mazi

> [Recipes](https://docs.cypress.io/examples/examples/recipes)

> Example: [Testing Vue + Vuex + REST app](https://github.com/cypress-io/cypress-example-recipes/tree/master/examples/blogs__vue-vuex-rest)

## Concerns
+ Each test need to login use `cy.loginAsSupperAdmin()` => need optimize.

### Notes
+ Mock Http Request:
  - use `cy.intercept()` : https://docs.cypress.io/api/commands/intercept
  - or `cy.route()` : https://docs.cypress.io/api/commands/route
  - Note: có thể dùng * để match url
+ [Getting Text from List of Elements](https://glebbahmutov.com/cypress-examples/6.5.0/recipes/get-text-list.html)
---
## What we test?
1. check networks/fetch data (entitis) #NETWORKS: use `cy.route().as(<aliasName>)` to check network data
2. verify url #VALIDURL
3. show good data #VISUALIZE
4. good actions in page #ACTIONS
### Page list
1. #NETWORKS:
  + check status code
  + check response data
    - include properties
    - right data

2. #VALIDURL:
  + params
  + query

3. #VISUALIZE
  + exists elements
  + page header
  + column
  + classes
  + list item (check mock API for test)
  + show element with conditional
    - show sort arrow when hover/click
    - show right placeholder text when click/focusing search...
    - show paginate current + total page numbers (check mock API for test)
  + wait for static resource (pdf, img...)
4. #ACTIONS:
  + go to detail item
  + open popup add/edit
  + remove item
  + mini menu
  + filter
  + search
  + sort
  + paginate
  + handling errors
  + download files
  + ...
---
### Detail itemm
1. #NETWORKS
2. #VALIDURL
3. #VISUALIZE
  + exists elements
  + page header
  + classes
  + item data
  + show element with conditional
  + wait for static resource (pdf, img...)
4. #ACTIONS
  + open popup edit
  + remove item
  + download files
  + ...
---
### Popup
1. #NETWORKS
2. #VISUALIZE
  + popup header, breadcrumb
  + inputs
  + buttons (add new, save, close, ...)
  + wait for static resource (pdf, img...)
3. #ACTIONS:
  + change inputs
  + click buttons
  + download files
