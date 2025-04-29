interface AppState {
  isAuthenticated: boolean;
  username: string | null;
}

const state: AppState = {
  isAuthenticated: false,
  username: null,
};

export const setUser = (username: string) => {
  state.username = username;
  state.isAuthenticated = true;
};

export const logout = () => {
  state.username = null;
  state.isAuthenticated = false;
}

export const getState = (): AppState => state;