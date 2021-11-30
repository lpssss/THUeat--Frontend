import { reactive, readonly, computed, watch } from "vue";
import { SessionStorage } from "quasar";

const STATE_NAME = "appState";

const defaultState = {
  token: null,
  //  firstLogin: true,
  userType: null,
};

const getDefaultStatus = () => {
  if (SessionStorage.getItem(STATE_NAME) !== null) {
    return SessionStorage.getItem(STATE_NAME);
  }
  return defaultState;
};

const state = reactive(getDefaultStatus());

const getters = {
  getToken: () => {
    return computed(() => state.token);
  },
  // getFirstLogin: () => {
  //   return computed(() => state.firstLogin);
  // },
  getType: () => {
    return computed(() => state.userType);
  },
};

const actions = {
  updateToken: (token) => {
    state.token = token;
  },
  // updateFirstLogin: (firstLogin) => {
  //   state.firstLogin = firstLogin;
  // },
  updateType: (type) => {
    state.userType = type;
  },
  resetState: () => {
    Object.assign(state, defaultState);
  },
};

watch(
  () => state,
  () => {
    SessionStorage.set(STATE_NAME, state);
  },
  { deep: true }
);

export default () => {
  if (SessionStorage.getItem(STATE_NAME) === null) {
    SessionStorage.set(STATE_NAME, state);
  }
  return {
    state: readonly(state),
    ...getters,
    ...actions,
  };
};
