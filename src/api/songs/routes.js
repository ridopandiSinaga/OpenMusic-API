const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHander,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHander,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHander,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongByIdHander,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongByIdHander,
  },
];

module.exports = routes;
