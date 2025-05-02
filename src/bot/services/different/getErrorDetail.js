var getErrorDetail = ({ code, path }) => {
  return "\n\nкод: " + code + "\n\nпуть: " + path;
};

module.exports = getErrorDetail;
