const CommentRepository = require("../CommentRepository");

describe("CommentRepository", () => {
  it("should throw error for addComment method", async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.addComment()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it("should throw error for isCommentExist method", async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.isCommentExist()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it("should throw error for isCommentOwner method", async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.isCommentOwner()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it("should throw error for deleteComment method", async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.deleteComment()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });

  it("should throw error for getCommentsByThreadId method", async () => {
    const commentRepository = new CommentRepository();

    await expect(commentRepository.getCommentsByThreadId()).rejects.toThrowError("COMMENT_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
