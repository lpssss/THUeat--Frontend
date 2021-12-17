import { reactive, readonly, computed, watch } from "vue";
import { SessionStorage } from "quasar";

const STATE_NAME = "appState";

const defaultState = {
  token: null,
  validName: null,
  userType: null,
  name: null
};

const getDefaultStatus = () => {
  if (SessionStorage.getItem(STATE_NAME) !== null) {
    return SessionStorage.getItem(STATE_NAME);
  }
  return defaultState;
};

const state = reactive({...getDefaultStatus()});

const getters = {
  getToken: () => {
    return computed(() => state.token);
  },
  getvalidName: () => {
    return computed(() => state.validName);
  },
  getType: () => {
    return computed(() => state.userType);
  },
  getName: () => {
    return computed(() => state.name);
  },
};

const actions = {
  updateToken: (token) => {
    state.token = token;
  },
  updatevalidName: (validName) => {
    state.validName = validName;
  },
  updateType: (type) => {
    state.userType = type;
  },
  updateName: (name) => {
    state.name = name;
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
