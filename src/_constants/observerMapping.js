// Admin user ID → Observer ID mapping per environment

const PROD_OBSERVER_MAP = {
  20: 104,
  2: 1,
  4: 184,
};

const DEV_OBSERVER_MAP = {
  20: 104,
  2: 1,
  4: 184,
};

export const getObserverId = (adminUserId, isProd = true) => {
  const map = isProd ? PROD_OBSERVER_MAP : DEV_OBSERVER_MAP;
  return map[adminUserId] || null;
};
