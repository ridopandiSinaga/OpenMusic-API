const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class UserAlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addLikeDislikeAlbum(albumId, userId) {
    const queryCheckLike = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const resultCheckLike = await this._pool.query(queryCheckLike);
    if (resultCheckLike.rowCount) {
      throw new InvariantError('Album Gagal Ditambahkan');
    } else {
      const id = `album-like-${nanoid(16)}`;
      const queryAddLike = {
        text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
        values: [id, userId, albumId],
      };
      const result = await this._pool.query(queryAddLike);
      if (!result.rows[0].id) {
        throw new InvariantError('Album Gagal Ditambahkan');
      }
      await this._cacheService.remove(`albumLikes:${albumId}`);
    }
  }

  async getLikes(id) {
    try {
      const result = await this._cacheService.get(`albumLikes:${id}`);
      return {
        likes: JSON.parse(result),
        source: 'cache',
      };
    } catch (error) {
      const query = {
        text: 'SELECT * FROM user_album_likes WHERE album_id = $1',
        values: [id],
      };
      const result = await this._pool.query(query);
      await this._cacheService.set(`albumLikes:${id}`, JSON.stringify(result.rowCount));
      return {
        likes: result.rowCount,
        source: 'database',
      };
    }
  }

  async deleteLikes(albumId, userId) {
    const queryCheckLike = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const resultCheckLike = await this._pool.query(queryCheckLike);
    if (resultCheckLike.rowCount) {
      const queryDeleteLike = {
        text: 'DELETE FROM user_album_likes WHERE id = $1',
        values: [resultCheckLike.rows[0].id],
      };
      const result = await this._pool.query(queryDeleteLike);
      await this._cacheService.remove(`albumLikes:${albumId}`, JSON.stringify(result.rowCount));
    }
  }
}

module.exports = UserAlbumLikesService;
