exports.paginate = (page, limit, data) => {
  if (!page) page = 1;
  if (!limit) limit = 30;
  const startIdx = (page - 1) * limit;
  const endIdx = page * limit;
  const paginatedData = data.slice(startIdx, endIdx);
  return paginatedData;
};

exports.isAuthorized = (token) => {
  if (token === "testToken") return true;
  return false;
};
