describe("User Management", () => {
    it("should list all users", () => {
      cy.visit("http://localhost:5173/");
    });
  
    it("should create a new users", () => {
      cy.visit("http://localhost:5173/");
      cy.get(".RaCreateButton-root").click();
      cy.get('input[name="name"]').type("Test User");
      cy.get('input[name="email"]').type("gabriellap@teste.com");
      cy.get('input[name="password"]').type("123456");
  
      cy.get(".RaToolbar-defaultToolbar > .MuiButtonBase-root").click();
      cy.contains("Element created").should("be.visible");
    });
  
    it("should edit an existing user", () => {
      cy.visit("http://localhost:5173/");
  
      cy.contains("Users").click();
      cy.get(".MuiTableBody-root > :nth-child(1)").click();
      cy.get('input[name="name"]').clear().type("Thales");
      cy.contains("button", "Save").click();
      cy.contains("Element updated").should("be.visible");
    });
  
    it("should delete a user", () => {
      cy.visit("http://localhost:5173/");
  
      cy.contains("Users").click();
      cy.get(".MuiTableBody-root > :nth-child(1)").click();
      cy.contains("button", "Delete").click();
      cy.contains("Element deleted").should("be.visible");
    });

    it("should create a new user by pressing 'Enter' ", () => {
        cy.visit("http://localhost:5173/");
        cy.get(".RaCreateButton-root").click();
        cy.get('input[name="name"]').type("New User");
        cy.get('input[name="email"]').type("newuser@example.com");
        cy.get('input[name="password"]').type("123456");

        cy.get('input[name="password"]').type("{enter}");
    
      });
  });