import {createHomePage} from "./components/home.js";
import {generateLoggedPage} from "./components/logged.js";
import {getState} from "./states/state.js";

const state = getState();

if (!state.isAuthenticated) {
	createHomePage();
} else {
	generateLoggedPage();
}
