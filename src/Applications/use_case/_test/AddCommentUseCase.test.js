const AddCommentUseCase = require("../AddCommentUseCase");

describe("AddCommentUseCase", () => {
  it("should throw error when thread not found", async () => {
    // Arrange
    const commentRepositoryMock = {
      addComment: jest.fn(),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(false),
    };

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act & Assert
    await expect(
      addCommentUseCase.execute({
        threadId: "thread-1",
        content: "A new comment",
        owner: "user-123",
      })
    ).rejects.toThrowError("ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND");

    // Verify
    expect(threadRepositoryMock.isThreadExist).toHaveBeenCalledWith("thread-1");
    expect(commentRepositoryMock.addComment).not.toHaveBeenCalled();
  });

  it("should add comment when thread is found", async () => {
    // Arrange
    const commentRepositoryMock = {
      addComment: jest.fn().mockReturnValue({ id: "comment-1" }),
    };

    const threadRepositoryMock = {
      isThreadExist: jest.fn().mockReturnValueOnce(true),
    };

    const addCommentUseCase = new AddCommentUseCase({
      commentRepository: commentRepositoryMock,
      threadRepository: threadRepositoryMock,
    });

    // Act
    const result = await addCommentUseCase.execute({
      threadId: "thread-1",
      content: "A new comment",
      owner: "user-123",
    });

    // Assert
    expect(result).toEqual({ id: "comment-1" });

    // Verify
    expect(threadRepositoryMock.isThreadExist).toHaveBeenCalledWith("thread-1");
    expect(commentRepositoryMock.addComment).toHaveBeenCalledWith({
      threadId: "thread-1",
      content: "A new comment",
      owner: "user-123",
    });
  });
});
