const NewComment = require("../../Domains/comments/entities/NewComment");

class AddCommentUseCase {
  constructor({ commentRepository, threadRepository }) {
    this._commentRepository = commentRepository;
    this._threadRepository = threadRepository;
  }

  async execute(useCasePayload) {
    const newComment = new NewComment(useCasePayload);

    // Memastikan nilai payload yang diterima adalah valid
    const isThreadExist = await this._threadRepository.isThreadExist(newComment.threadId);

    if (!isThreadExist) {
      throw new Error("ADD_COMMENT_USE_CASE.THREAD_NOT_FOUND");
    }

    // Menambahkan komentar baru ke dalam database menggunakan commentRepository
    return this._commentRepository.addComment(newComment);
  }
}

module.exports = AddCommentUseCase;
