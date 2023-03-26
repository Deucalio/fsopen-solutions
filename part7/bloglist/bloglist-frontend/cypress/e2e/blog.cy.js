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
      cy.get("#open-blog-form").click();

      cy.get("#title").type("May the force be with you");
      cy.get("#author").type("Luke");
      cy.get("#url").type("00001");
      cy.get("#createBtn").click();

      cy.contains("A new blog has been added");
    });
  });
});

describe("test that confirms user can like and delete a blog", function () {
  beforeEach(function () {
    // log in user here
    cy.visit("http://localhost:3000");
    cy.get("#username").type("Tom");
    cy.get("#password").type("tommy");
    cy.get("#loginBtn").click();
  });

  it("like a blog", function () {
    // create a new blog
    cy.get("#open-blog-form").click();

    cy.get("#title").type("How to read");
    cy.get("#author").type("Hammad Ali");
    cy.get("#url").type("00001");
    cy.get("#createBtn").click();
    // ...
    cy.contains("How to read").contains("view").click();
    cy.contains("How to read").contains("hide").get("#likeBtn").click();
  });

  it("delete a blog", function () {
    // ...
    cy.contains("How to read")
      .contains("view")
      .click()
      .get("#removeBtn")
      .click();
    cy.on("window:confirm", (text) => {
      expect(text).to.contains("Are you sure you want this blog removed?");
    });
  });
});

it("sort by likes", function () {
  cy.visit("http://localhost:3000");
  cy.get("#username").type("Tom");
  cy.get("#password").type("tommy");
  cy.get("#loginBtn").click();
  cy.wait(1000);
  cy.get("#sortBtn").click();

  cy.get(".box").eq(0).should("contain", "star wars");
});
