var Actions = {
  setActive(newvalue) {
    return { actionType: 'set_active', value: newvalue };
  },

  searchEntries(query) {
    return { actionType: 'search_entries', query: query };
  }
};

export default Actions;

