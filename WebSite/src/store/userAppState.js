import { reactive, readonly, computed, watch } from "vue";
import { SessionStorage } from "quasar";

const STATE_NAME = "appState";

const defaultState = {
  token: null,
  vaildName: null,
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
  getvaildName: () => {
    return computed(() => state.vaildName);
  },
  getType: () => {
    return computed(() => state.userType);
  },
};

const actions = {
  updateToken: (token) => {
    state.token = token;
  },
  updatevaildName: (vaildName) => {
    state.vaildName = vaildName;
  },
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
