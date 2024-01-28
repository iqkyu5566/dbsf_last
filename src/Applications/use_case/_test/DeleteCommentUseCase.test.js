const DeleteCommentUseCase = require("../DeleteCommentUseCase");

describe("DeleteCommentUseCase", () => {
  it("should throw error when thread not found", async () => {
    // Arrange
    const commentRepositoryMock = {
      isCommentExist: jest.fn().mockReturnValueOnce(true),
      isCommentOwner: jest.fn().mockReturnValueOnce(true),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(false),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act & Assert
    await expect(
      deleteCommentUseCase.execute({
        id: "comment-1",
        threadId: "thread-1",
        owner: "user-123",
      })
    ).rejects.toThrowError("DELETE_COMMENT_USE_CASE.THREAD_NOT_FOUND");
  });

  it("should throw error when comment not found", async () => {
    // Arrange
    const commentRepositoryMock = {
      isCommentExist: jest.fn().mockReturnValueOnce(false),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(true),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act & Assert
    await expect(
      deleteCommentUseCase.execute({
        id: "comment-1",
        threadId: "thread-1",
        owner: "user-123",
      })
    ).rejects.toThrowError("DELETE_COMMENT_USE_CASE.COMMENT_NOT_FOUND");
  });

  it("should throw error when user is not the owner of the comment", async () => {
    // Arrange
    const commentRepositoryMock = {
      isCommentExist: jest.fn().mockReturnValueOnce(true),
      isCommentOwner: jest.fn().mockReturnValueOnce(false),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(true),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act & Assert
    await expect(
      deleteCommentUseCase.execute({
        id: "comment-1",
        threadId: "thread-1",
        owner: "user-123",
      })
    ).rejects.toThrowError("DELETE_COMMENT_USE_CASE.COMMENT_NOT_OWNED");
  });

  it("should delete comment when all conditions are met", async () => {
    // Arrange
    const commentRepositoryMock = {
      isCommentExist: jest.fn().mockReturnValueOnce(true),
      isCommentOwner: jest.fn().mockReturnValueOnce(true),
      deleteComment: jest.fn(),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(true),
    };

    const deleteCommentUseCase = new DeleteCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act
    await deleteCommentUseCase.execute({
      id: "comment-1",
      threadId: "thread-1",
      owner: "user-123",
    });

    // Assert
    expect(commentRepositoryMock.isCommentExist).toHaveBeenCalledWith("comment-1");
    expect(commentRepositoryMock.isCommentOwner).toHaveBeenCalledWith("comment-1", "user-123");
    expect(threadRepositoryMock.isThreadExist).toHaveBeenCalledWith("thread-1");
    expect(commentRepositoryMock.deleteComment).toHaveBeenCalledWith("comment-1");
  });
});
