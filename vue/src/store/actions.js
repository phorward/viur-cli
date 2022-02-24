//import * as api from '../api'

export const setTheme = ({ commit }, theme) => {
	commit("changeTheme", theme);
};

export const setConnected = ({ commit }, state) => {
	commit("connected", state);
	//api.createMessage(payload, message => {
	//  commit('receiveMessage', message)
	// })
};
