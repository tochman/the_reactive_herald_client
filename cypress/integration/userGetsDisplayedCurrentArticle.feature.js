describe("User is shown current article", () => {
  beforeEach(() => {
    cy.server();
  });

  it("successfully", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_shown.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/1",
      response: "fixture:article_show.json"
    });
    cy.visit("/");
    cy.get("#main-article-div").should("contain", "Body 1");
  });

  it("unsuccessfully, specific article not found", () => {
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles",
      response: "fixture:side_articles_empty.json"
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/articles/**",
      response: "fixture:specific_article_not_found.json",
      status: 404
    });
    cy.visit("/");
    cy.get("#message").should("contain", "Article not found");
  });
});
