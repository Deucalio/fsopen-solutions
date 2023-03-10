describe("Blog app", function () {
  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to application");
  });
});

describe("Login", function () {
  it("succeeds with correct credentials", function () {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("Tom");
    cy.get("#password").type("tommy");
    cy.get("#loginBtn").click();

    cy.contains("Jun luna logged in");
  });

  it("fails with wrong credentials", function () {
    cy.visit("http://localhost:3000");
    cy.get("#username").type("Tom");
    cy.get("#password").type("Tommy");
    cy.get("#loginBtn").click();

    cy.contains("Log in to application");
  });
});

describe("Blog app", function () {
  // ...

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.visit("http://localhost:3000");
      cy.get("#username").type("Tom");
      cy.get("#password").type("tommy");
      cy.get("#loginBtn").click();
    });

    it("A blog can be created", function () {
      // ...
      cy.get("#open-blog-form").click()

      cy.get("#title").type("May the force be with you");
      cy.get("#author").type("Luke");
      cy.get("#url").type("00001");
      cy.get("#createBtn").click();

      cy.contains("A new blog has been added")
      
    });
  });
});
