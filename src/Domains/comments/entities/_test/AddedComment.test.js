const AddedComment = require("../AddedComment");

describe("AddedComment", () => {
  describe("createNewInstance", () => {
    it("should create a new AddedComment instance with correct properties", () => {
      // Arrange
      const payload = {
        id: "comment-123",
        content: "This is a test comment",
        owner: "user-789",
      };

      // Act
      const addedComment = AddedComment.createNewInstance(payload);

      // Assert
      expect(addedComment).toBeDefined();
      expect(addedComment.commentId).toEqual(payload.commentId);
      expect(addedComment.threadId).toEqual(payload.threadId);
      expect(addedComment.content).toEqual(payload.content);
      expect(addedComment.owner).toEqual(payload.owner);
    });
  });
});
