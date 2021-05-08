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

	// // Make nav button right align with the container
	// const containerMargin = parseInt($(".container").css("marginLeft"));
	//
	// // Initial call
	// const handleFixedMargin = (margin) => {
	// 	navButton.css("margin-right", margin);
	// };
	// handleFixedMargin(containerMargin);
	// // Set it when the screen size changes
	// $(window).resize(() => {
	// 	const containerMargin = parseInt($(".container").css("marginLeft"));
	// 	handleFixedMargin(containerMargin);
	// });
});
