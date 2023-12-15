const ThreadRepository = require("../ThreadRepository");

describe("ThreadRepository abstract", () => {
  it("should throw error when invoke abstract behavior", async () => {
    class FakeThreadRepository extends ThreadRepository {
      // Implementasi method-method yang diperlukan
      async addThread() {
        throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
      }

      async isThreadExist() {
        throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
      }

      async getThreadById() {
        throw new Error("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
      }
    }

    const threadRepository = new FakeThreadRepository();
    await expect(threadRepository.addThread({})).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.isThreadExist("")).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
    await expect(threadRepository.getThreadById("")).rejects.toThrowError("THREAD_REPOSITORY.METHOD_NOT_IMPLEMENTED");
  });
});
