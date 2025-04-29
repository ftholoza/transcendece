export function loadFontPressStart2P() {
	const styles = document.createElement('style');
	styles.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');
    body, html, :host {
        font-family: 'Press Start 2P', cursive !important;
    }
`;
	document.head.appendChild(styles);
}
