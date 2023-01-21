const message = (type, message) => {
  return {
    alert: {
      message: message,
      type: type,
    },
  };
};

exports.message = message;
