module.exports = ({ env }) => ({
  'content-search': {
    transformResponse: (payload) => {
      return {
        ...payload
      };
    },
  },
});