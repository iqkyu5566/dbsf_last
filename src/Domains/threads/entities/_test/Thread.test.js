const Thread = require("../Thread");
const Comment = require("../../../comments/entities/Comment");

describe("Thread", () => {
  describe("constructor", () => {
    it("should create a new Thread instance with correct properties", () => {
      // Arrange
      const payload = {
        id: "thread-123",
        title: "Test Thread",
        body: "This is a test thread",
        date: "2024-01-28T12:00:00.000Z",
        username: "dicoding",
      };

      // Act
      const thread = new Thread(payload);

      // Assert
      expect(thread).toBeDefined();
      expect(thread.id).toEqual(payload.id);
      expect(thread.title).toEqual(payload.title);
      expect(thread.body).toEqual(payload.body);
      expect(thread.date).toEqual(payload.date);
      expect(thread.username).toEqual(payload.username);
      expect(thread.comments).toEqual([]);
    });

    it("should throw an error if required properties are not provided", () => {
      // Arrange
      const invalidPayload = {
        // Missing required properties
      };

      // Act & Assert
      expect(() => new Thread(invalidPayload)).toThrowError("THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    });

    it("should throw an error if data types of properties are not correct", () => {
      // Arrange
      const invalidPayload = {
        id: 123, // Incorrect data type
        title: "Test Thread",
        body: "This is a test thread",
        date: "2024-01-28T12:00:00.000Z",
        username: "dicoding",
      };

      // Act & Assert
      expect(() => new Thread(invalidPayload)).toThrowError("THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    });
  });

  describe("setComments", () => {
    it("should set comments correctly if provided with a valid array of Comment instances", () => {
      // Arrange
      const thread = new Thread({
        id: "thread-123",
        title: "Test Thread",
        body: "This is a test thread",
        date: "2024-01-28T12:00:00.000Z",
        username: "dicoding",
      });

      const validComments = [
        new Comment({
          id: "comment-1",
          username: "dicoding",
          date: "2024-01-28T12:05:00.000Z",
          content: "This is a comment",
          isDelete: false,
        }),
        new Comment({
          id: "comment-2",
          username: "dicoding",
          date: "2024-01-28T12:10:00.000Z",
          content: "Another comment",
          isDelete: false,
        }),
      ];

      // Act
      thread.setComments(validComments);

      // Assert
      expect(thread.comments).toEqual(validComments);
    });

    it("should throw an error if comments parameter is not an array", () => {
      // Arrange
      const thread = new Thread({
        id: "thread-123",
        title: "Test Thread",
        body: "This is a test thread",
        date: "2024-01-28T12:00:00.000Z",
        username: "dicoding",
      });

      // Act & Assert
      expect(() => thread.setComments("invalid")).toThrowError("THREAD.COMMENTS_NOT_ARRAY");
    });

    it("should throw an error if comments array contains invalid members", () => {
      // Arrange
      const thread = new Thread({
        id: "thread-123",
        title: "Test Thread",
        body: "This is a test thread",
        date: "2024-01-28T12:00:00.000Z",
        username: "dicoding",
      });

      const invalidComments = [
        new Comment({
          id: "comment-1",
          username: "dicoding",
          date: "2024-01-28T12:05:00.000Z",
          content: "This is a comment",
          isDelete: false,
        }),
        // Invalid comment (not an instance of Comment)
        {
          id: "comment-2",
          username: "dicoding",
          date: "2024-01-28T12:10:00.000Z",
          content: "Another comment",
          isDelete: false,
        },
      ];

      // Act & Assert
      expect(() => thread.setComments(invalidComments)).toThrowError("THREAD.COMMENTS_CONTAINS_INVALID_MEMBER");
    });
  });
});
