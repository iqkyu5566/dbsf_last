class GetThreadUseCase {
  constructor({ threadRepository, commentRepository }) {
    this._threadRepository = threadRepository;
    this._commentRepository = commentRepository;
  }

  async execute(threadId) {
    const thread = await this._threadRepository.getThreadById(threadId);

    if (!thread) {
      throw new Error("GET_THREAD_USE_CASE.THREAD_NOT_FOUND");
    }

    const comments = await this._commentRepository.getCommentsByThreadId(threadId);

    // Memastikan thread memiliki metode setComments sebelum memanggilnya
    if (thread.setComments) {
      thread.setComments(comments);
    }

    return thread;
  }
}

module.exports = GetThreadUseCase;
