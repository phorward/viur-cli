import localforage from "localforage";

export default {
	theme(state, theme) {
		state.theme = theme;
		const elementResource = document.querySelector("html");
		elementResource.className = "";
		elementResource.classList.add("sl-theme-" + theme);

		//localforage.setItem("theme", theme);
		localforage.setItem("theme", theme, async function () {});
	},

	connected(state, connected) {
		state.connected = connected;
	},

	started(state, started) {
		state.started = started;
	},
};
