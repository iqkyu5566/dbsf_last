const ThreadRepository = require("../../../Domains/threads/ThreadRepository");
const AddedThread = require("../../../Domains/threads/entities/AddedThread");
const AddThreadUseCase = require("../AddThreadUseCase");

describe("AddThreadUseCase", () => {
  it("should orchestrating the add thread action correctly", async () => {
    // Arrange
    const useCasePayload = {
      title: "Thread A",
      body: "ini body",
      owner: "user-123",
    };

    const mockReturnAddedThread = new AddedThread({
      id: "thread-123",
      title: "Thread A",
      owner: "user-123",
    });

    const mockThreadRepository = {
      addThread: jest.fn(() => Promise.resolve(mockReturnAddedThread)),
    };

    const expectedAddedThread = {
      id: "thread-123",
      title: "Thread A",
      owner: "user-123",
    };

    const useCase = new AddThreadUseCase({
      threadRepository: mockThreadRepository, // Gunakan mockThreadRepository
    });

    // Action
    const addedThread = await useCase.execute(useCasePayload);

    // Assert
    expect(addedThread).toEqual(expectedAddedThread);
    expect(mockThreadRepository.addThread).toHaveBeenCalledWith(useCasePayload);
  });
});
