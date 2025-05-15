import {createHomePage} from "./components/home.js";
import {generateLoggedPage} from "./components/logged.js";
import { api } from "./services/api.js";

(async () => {
	const log = await api.isAlreadyLog();

	if (log) {
		generateLoggedPage();
	} else {
		createHomePage();
	}
})();


