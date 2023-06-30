const routes = (handler) => [
  {
    method: 'GET',
    path: '/playlists/{id}/activities',
    handler: handler.getPlaylistSongActivities,
    options: {
      auth: 'jwt_openmusic',
    },
  },
];

module.exports = routes;
