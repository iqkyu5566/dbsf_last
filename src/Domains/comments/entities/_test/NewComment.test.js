const NewComment = require("../NewComment");

describe("NewComment", () => {
  describe("createNewInstance", () => {
    it("should create a new NewComment instance with correct properties", () => {
      // Arrange
      const payload = {
        content: "This is a new comment",
        threadId: "thread-123",
        owner: "user-123",
      };

      // Act
      const newComment = NewComment.createNewInstance(payload);

      // Assert
      expect(newComment).toBeDefined();
      expect(newComment.content).toEqual(payload.content);
      expect(newComment.threadId).toEqual(payload.threadId);
      expect(newComment.owner).toEqual(payload.owner);
    });
  });
});
