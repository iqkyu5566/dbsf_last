const NewThread = require("../NewThread");

describe("NewThread", () => {
  describe("constructor", () => {
    it("should create a new NewThread instance with correct properties", () => {
      // Arrange
      const payload = {
        title: "Test New Thread",
        body: "This is a test new thread",
        owner: "user-789",
      };

      // Act
      const newThread = new NewThread(payload);

      // Assert
      expect(newThread).toBeDefined();
      expect(newThread.title).toEqual(payload.title);
      expect(newThread.body).toEqual(payload.body);
      expect(newThread.owner).toEqual(payload.owner);
    });

    it("should throw an error if required properties are not provided", () => {
      // Arrange
      const invalidPayload = {
        // Missing required properties
      };

      // Act & Assert
      expect(() => new NewThread(invalidPayload)).toThrowError("NEW_THREAD.NOT_CONTAIN_NEEDED_PROPERTY");
    });

    it("should throw an error if data types of properties are not correct", () => {
      // Arrange
      const invalidPayload = {
        title: "Test New Thread",
        body: "This is a test new thread",
        owner: 123, // Incorrect data type
      };

      // Act & Assert
      expect(() => new NewThread(invalidPayload)).toThrowError("NEW_THREAD.NOT_MEET_DATA_TYPE_SPECIFICATION");
    });
  });
});
