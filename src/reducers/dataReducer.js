import { FETCH_PLAYLISTS, APPEND_PLAYLISTS, FETCH_TRACKS, RETRIEVE_TRACKS_OVERVIEW } from '../actions/types';

export default (state = {}, action) => {
  switch (action.type) {
    case APPEND_PLAYLISTS: {
      const playlists = state.playlists.concat(action.payload.items);
      return {
        ...state,
        playlists: playlists,
        playlistsSize: action.payload.total,
      };
    }

    case FETCH_PLAYLISTS:
      return {
        ...state,
        playlists: action.payload.items,
        playlistsSize: action.payload.total,
      };

    case FETCH_TRACKS:
      return {
        ...state,
        tracks: action.payload,
      };

    case RETRIEVE_TRACKS_OVERVIEW:
      return {
        ...state,
        library: {
          ...state.library,
          trackCount: action.payload.total,
        },
      };

    default:
      return state;
  }
};
