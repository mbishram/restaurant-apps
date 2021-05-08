$(() => {
	const navButton = $("#nav-button");
	const nav = $("nav");
	const navButtonIcon = $("#nav-button i");

	navButton.click(() => {
		// Setting up button
		navButtonIcon.toggleClass("bi-x");
		navButtonIcon.toggleClass("bi-list");
		navButtonIcon.toggleClass("text-dark");

		// Handle the nav
		nav.toggleClass("open");
	});
});
