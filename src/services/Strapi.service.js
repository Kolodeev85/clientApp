import { STRAPI_API_ROUTES, strapiRestClient } from "../config/configStrapi";
import { strapiNormalize, loggerBE } from "../utils/index";

const getAllAreas = async (token, pagination = { page: 1, pageSize: 10 }) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.AREAS, {
        params: {
          populate: "deep",
          pagination,
        },
      });
      if (response.status === 200) {
        return {
          areas: strapiNormalize(response.data),
          pagination: response.data.meta.pagination,
        };
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT AREAS DATA");
      return null;
    }
  }
  return;
};

const deleteArea = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.AREAS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT AREAS DELETE DATA");
      return null;
    }
  }
  return;
};

const getAreasByStatusType = async (
  token,
  type,
  namegroup,
  subnamegroup,
  pagination = { page: 1, pageSize: 500 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.AREAS, {
        params: {
          filters: {
            statusName: { $eq: type },
            group: {
              name: {
                $eq: namegroup,
              },
            },
            subgroup: {
              name: {
                $eq: subnamegroup,
              },
            },
          },
          populate: "deep",
          sort: ["updatedAt:desc"],
        },
        pagination: pagination,
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT AREAS DATA");
      return null;
    }
  }
  return;
};

const getAreaById = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.AREAS}/${id}`,
        {
          params: {
            populate: "deep",
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data) ?? null;
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT AREA BY ID DATA");
      return null;
    }
  }
  return;
};

const getAllPublisher = async (
  token,
  pagination = { page: 1, pageSize: 500 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        STRAPI_API_ROUTES.PUBLISHERS,
        {
          params: {
            populate: "deep",
            pagination: pagination,
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT PUBLISHERS DATA");
      return null;
    }
  }
  return;
};

const getAllEvents = async (token) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.EVENTS, {
        params: {
          populate: "deep",
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT EVENTS DATA");
      return null;
    }
  }
  return;
};

const getAllGroup = async (token) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.GROUPS, {
        params: {
          populate: "deep",
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT GROUP DATA");
      return null;
    }
  }
  return;
};

const getLatestHistoryInAreaById = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.AREAS}/${id}`,
        {
          params: {
            populate: "deep",
            sort: ["histories.createdAt:desc"],
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data.histories)[0] ?? null;
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT LATEST HISTORY AREA BY ID DATA");
      return null;
    }
  }
  return;
};

const getAllSubGroups = async (token) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.SUBGRUPS, {
        params: {
          populate: "deep",
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT SUBGROUPS DATA");
      return null;
    }
  }
  return;
};

const getAllSubEvent = async (token) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.SUBEVENTS, {
        params: {
          populate: "deep",
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT SUBEVENTS DATA");
      return null;
    }
  }
  return;
};

const deleteGroup = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.GROUPS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT GROUP DELETE DATA");
      return null;
    }
  }
  return;
};
const deleteHistory = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.HISTORIES}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT HISTORIES DELETE DATA");
      return null;
    }
  }
  return;
};
const deleteSubGroup = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.SUBGRUPS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT SUBGROUP DELETE DATA");
      return null;
    }
  }
  return;
};
const deleteEventGroup = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.EVENTS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT SUBEVENT DELETE DATA");
      return null;
    }
  }
  return;
};

const deleteSubEvent = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.SUBEVENTS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT SUBEVENT DELETE DATA");
      return null;
    }
  }
  return;
};

const getAllAreasByGroup = async (
  token,
  id,
  pagination = { page: 1, pageSize: 500 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.GROUPS}/${id}`,
        {
          params: {
            populate: "deep",
            pagination: pagination,
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT ALL AREAS BY GROUP DATA");
      return null;
    }
  }
  return;
};

const getAllAreasBySubGroup = async (
  token,
  id,
  pagination = { page: 1, pageSize: 500 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.SUBGRUPS}/${id}`,
        {
          params: {
            populate: "deep",
            pagination: pagination,
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT ALL SUBAREAS BY GROUP DATA");
      return null;
    }
  }
  return;
};

const getAllAreasByEventGroup = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.EVENTS}/${id}`,
        {
          params: {
            populate: "deep",
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT ALL AREAS BY EVENT GROUP DATA");
      return null;
    }
  }
  return;
};

const getAllAreasBySubEventGroup = async (
  token,
  id,
  pagination = { page: 1, pageSize: 500 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(
        `${STRAPI_API_ROUTES.SUBEVENTS}/${id}`,
        {
          params: {
            populate: "deep",
            pagination: pagination,
          },
        }
      );
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT ALL SUBAREAS BY SUBGROUP DATA");
      return null;
    }
  }
  return;
};

const deletePublisher = async (token, id) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      await strapiRestClient.delete(`${STRAPI_API_ROUTES.PUBLISHERS}/${id}`);
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT PUBLISHERS DELETE DATA");
      return null;
    }
  }
  return;
};

const getAllHistories = async (
  token,
  pagination = { page: 1, pageSize: 1000 }
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.HISTORIES, {
        params: {
          populate: "deep",
          pagination: pagination,
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT HISTORIES DATA");
      return null;
    }
  }
  return;
};

const getAllHistoriesForReport = async (
  token,
  pagination = { page: 1, pageSize: 1000 },
  startDate,
  endDate
) => {
  if (token) {
    strapiRestClient.defaults.headers.Authorization = `Bearer ${token}`;
    try {
      const response = await strapiRestClient.get(STRAPI_API_ROUTES.HISTORIES, {
        params: {
          populate: "deep",
          pagination: pagination,
          filters: {
            updatedAt: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },
      });
      if (response.status === 200) {
        return strapiNormalize(response.data);
      }
      return null;
    } catch (e) {
      loggerBE.log(e, "ERROR AT HISTORIES DATA");
      return null;
    }
  }
  return;
};

export const ServicesStrapi = {
  getAllAreas,
  deleteArea,
  getAreasByStatusType,
  getAreaById,
  getAllPublisher,
  getAllEvents,
  getAllGroup,
  getLatestHistoryInAreaById,
  getAllSubGroups,
  getAllSubEvent,
  deleteGroup,
  deleteSubGroup,
  deleteEventGroup,
  deleteSubEvent,
  deleteHistory,
  getAllAreasByGroup,
  getAllAreasBySubGroup,
  getAllAreasByEventGroup,
  getAllAreasBySubEventGroup,
  deletePublisher,
  getAllHistories,
  getAllHistoriesForReport,
};
