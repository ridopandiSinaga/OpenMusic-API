const autoBind = require('auto-bind');

class UserAlbumLikesHandler {
  constructor(userAlbumLikesService, albumService) {
    this._userAlbumLikesService = userAlbumLikesService;
    this._albumService = albumService;

    autoBind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._albumService.getAlbumById(id);
    await this._userAlbumLikesService.addLikeDislikeAlbum(id, credentialId);
    return h.response({
      status: 'success',
      message: 'Berhasil like Album',
    }).code(201);
  }

  async getAlbumLikesHandler(request, h) {
    const { id } = request.params;
    await this._albumService.getAlbumById(id);
    const result = await this._userAlbumLikesService.getLikes(id);
    const response = h.response({
      status: 'success',
      data: {
        likes: result.likes,
      },
    });
    // response.code(200);
    response.header('X-Data-Source', result.source);
    return response;
  }

  async deleteAlbumLikesHandler(request, h) {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._albumService.getAlbumById(id);
    await this._userAlbumLikesService.deleteLikes(id, credentialId);
    return h.response({
      status: 'success',
      message: 'Batal menyukai album',
    }).code(200);
  }
}

module.exports = UserAlbumLikesHandler;
