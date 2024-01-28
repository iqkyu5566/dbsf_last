const DeleteComment = require("../DeleteComment");

describe("DeleteComment", () => {
  describe("createNewInstance", () => {
    it("should create a new DeleteComment instance with correct properties", () => {
      // Arrange
      const payload = {
        id: "comment-123",
        owner: "user-789",
        threadId: "thread-456",
      };

      // Act
      const deleteComment = DeleteComment.createNewInstance(payload);

      // Assert
      expect(deleteComment).toBeDefined();
      expect(deleteComment.commentId).toEqual(payload.commentId);
      expect(deleteComment.threadId).toEqual(payload.threadId);
      expect(deleteComment.userId).toEqual(payload.userId);
    });
  });
});
