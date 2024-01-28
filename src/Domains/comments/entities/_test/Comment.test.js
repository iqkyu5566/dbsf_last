const Comment = require("../Comment");

describe("Comment", () => {
  describe("createNewComment", () => {
    it("should create a new Comment instance with correct properties", () => {
      // Arrange
      const payload = {
        id: "comment-123",
        username: "user-789", // ganti userId menjadi username
        date: "2024-01-28T12:00:00.000Z",
        content: "This is a test comment",
        isDelete: false, // tambahkan isDelete dengan nilai boolean
      };

      // Act
      const comment = Comment.createNewComment(payload);

      // Assert
      expect(comment).toBeDefined();
      expect(comment.id).toEqual(payload.id);
      expect(comment.content).toEqual(payload.content);
      expect(comment.threadId).toEqual(payload.threadId);
      expect(comment.userId).toEqual(payload.userId);
      expect(comment.date.toISOString()).toEqual(new Date(payload.date).toISOString());
    });
  });
});
