export const types = {
  SET_SEARCH: 'SET_SEARCH:ranking:melon.fund',
  SET_ORDERING: 'SET_ORDERING:ranking:melon.fund',
};

export const actions = {
  setSearch: search => ({
    type: types.SET_SEARCH,
    search,
  }),
  setOrdering: ordering => ({
    type: types.SET_ORDERING,
    ordering,
  }),
};
