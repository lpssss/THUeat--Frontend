//Base URL 可以在 boot/axios 里找到
const ADMIN_API_LINKS = {
  auth: "/authorization",
  personalDetails: "/details",
  admins: "/admins",
  users: "/users",
  staffs: "/staffs",
  canteens: "/canteens",
  stalls: "/stalls",
  notices: "/notices",
  adminStatistics: "/adminStatistics",
};

const STAFF_API_LINKS = {
  dashboard: "",
  reviews: "/reviews",
  dishes: "/dishes",
};

export { ADMIN_API_LINKS, STAFF_API_LINKS };
