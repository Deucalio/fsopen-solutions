describe("Blog app", function () {
  it("Login form is shown", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Log in to application");
  });
});

describe("Login", function () {
  it("succeeds with correct credentials", function () {
    // http://localhost:3003/api/login
    cy.visit("http://localhost:3000");
    cy.get("#username").type("Tom");
    cy.get("#password").type("tommy");
    cy.get("#loginBtn").click();

    cy.contains("Jun luna logged in");
  });

  it("fails with wrong credentials", function () {
    // ...
  });
});
