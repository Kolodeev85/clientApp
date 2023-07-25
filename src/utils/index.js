const log = async (...args) => {
  console.log(...args);
};

export const loggerFE = {
  log,
};

export const loggerBE = {
  log,
};

export const strapiNormalize = (data) => {
  const isObject = (data) =>
    Object.prototype.toString.call(data) === "[object Object]";
  const isArray = (data) =>
    Object.prototype.toString.call(data) === "[object Array]";

  const flatten = (data) => {
    if (!data.attributes) {
      if (data.id) {
        return {
          ...data,
          id: `${data.id}`,
        };
      }
      return {
        ...data,
      };
    }

    return {
      id: `${data.id}`,
      ...data.attributes,
    };
  };

  if (isArray(data)) {
    return data.map((item) => strapiNormalize(item));
  }

  if (isObject(data)) {
    if (isArray(data.data)) {
      data = [...data.data];
    } else if (isObject(data.data)) {
      data = flatten({ ...data.data });
    } else if (data.data === null) {
      data = null;
    } else {
      data = flatten(data);
    }

    for (const key in data) {
      data[key] = strapiNormalize(data[key]);
    }

    return data;
  }

  return data;
};

export const createImageURL = (url = "") => {
  if (url.charAt(0) === "/") return `${process.env.REACT_APP_STRAPI_URL}${url}`;
  else return url;
};
