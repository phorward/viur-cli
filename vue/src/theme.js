import localforage from 'localforage';
import { store } from '@/store';

document.addEventListener("DOMContentLoaded", async function() {
	//const htmlElement = document.querySelector("html");
	var selectedTheme = await localforage.getItem("theme");
	
	if (selectedTheme === undefined || selectedTheme == null)
	{
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			//if (store.getters.theme != "dark")
			//	store.commit("theme", "dark");
			selectedTheme = "dark"; 
		}
		else
		{
			selectedTheme = "light"; 
			//if (store.getters.theme != "light")
			//	store.commit("theme", "light");
		}
	}

	store.commit("theme", selectedTheme);
	//htmlElement.classList.add("sl-theme-" + store.state.theme);
});

/*window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
	//const store  = useStore();

	const htmlElement = document.querySelector("html");
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		store.state.theme = "dark"; 
	}
	else
		store.state.theme = "light"; 

	htmlElement.classList.add("sl-theme-" + store.state.theme);
});*/