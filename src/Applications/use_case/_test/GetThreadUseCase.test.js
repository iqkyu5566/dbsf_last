const GetThreadUseCase = require("../GetThreadUseCase");
const Thread = require("../../../Domains/threads/entities/Thread");
const Comment = require("../../../Domains/comments/entities/Comment");

describe("GetThreadUseCase", () => {
  it("should throw error when thread is not found", async () => {
    // Arrange
    const threadRepository = {
      getThreadById: jest.fn().mockReturnValue(null),
    };
    const commentRepository = {
      getCommentsByThreadId: jest.fn().mockReturnValue([]),
    };
    const getThreadUseCase = new GetThreadUseCase({ threadRepository, commentRepository });

    // Act & Assert
    await expect(getThreadUseCase.execute("nonexistent-thread-id")).rejects.toThrowError("GET_THREAD_USE_CASE.THREAD_NOT_FOUND");
  });

  it("should return thread with comments when found", async () => {
    // Arrange
    const mockThread = new Thread({
      id: "thread-123",
      title: "Test Thread",
      body: "Test Body",
      date: "2024-01-28T14:14:49.105Z",
      username: "user-123",
      owner: "user-123",
    });

    // Create a valid payload for Comment
    const commentPayload = {
      id: "comment-1",
      username: "user-456",
      date: "2024-01-28T14:15:00.000Z",
      content: "Test Comment",
      isDelete: false,
    };

    const mockComments = [new Comment(commentPayload)];
    const threadRepository = {
      getThreadById: jest.fn().mockReturnValue(mockThread),
    };
    const commentRepository = {
      getCommentsByThreadId: jest.fn().mockReturnValue(mockComments),
    };
    const getThreadUseCase = new GetThreadUseCase({ threadRepository, commentRepository });

    // Act
    const result = await getThreadUseCase.execute("thread-123");

    // Assert
    expect(result.id).toEqual("thread-123");
    expect(result.title).toEqual("Test Thread");
    expect(result.username).toEqual("user-123");
    expect(result.body).toEqual("Test Body");
    expect(result.date).toEqual("2024-01-28T14:14:49.105Z");

    // Perbarui expect statement untuk properti comments
    // Perbarui expect statement untuk properti comments
    expect(result.comments).toEqual([
      new Comment({
        id: "comment-1",
        username: "user-456",
        date: "2024-01-28T14:15:00.000Z",
        content: "Test Comment",
        isDelete: false,
      }),
    ]);
  });
});
