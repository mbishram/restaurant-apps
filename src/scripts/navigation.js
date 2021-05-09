$(() => {
	const nav = $("nav");
	const navButton = $("#nav-button");
	const navButtonIcon = $("#nav-button i");
	const body = $("body");

	// Handler for when navigation button is clicked
	const handleNav = (event) => {
		// Setting up button
		navButtonIcon.toggleClass("bi-x");
		navButtonIcon.toggleClass("bi-list");
		navButtonIcon.toggleClass("text-dark");

		// Handle the nav
		nav.toggleClass("open");

		// Stop it from immediately closing nav when nav button is clicked
		event.stopPropagation();
	};

	// Function to close nav
	const closeNav = () => {
		if (nav.hasClass("open")) {
			// Setting up button
			navButtonIcon.removeClass("bi-x");
			navButtonIcon.addClass("bi-list");
			navButtonIcon.removeClass("text-dark");

			// Close nav
			nav.removeClass("open");
		}
	};

	navButton.click(handleNav);
	body.click(closeNav);
	nav.click((event) => {
		// Stop it from closing the nav when nav is clicked
		event.stopPropagation();
	});

	const skipMain = $("#skip-main");
	const skipRestaurant = $("#skip-restaurant");
	const skipCTA = $("#skip-cta");
	const containerMargin = parseInt($(".container").css("marginLeft"));

	// Make nav and skip to content to align with the container
	// on tablet devices an up
	const handleFixedMargin = (margin) => {
		// Only apply it on tablet and up
		const mediaTablet = matchMedia("only screen and (min-width: 768px)");
		if (mediaTablet.matches) {
			navButton.css("margin-right", margin);
			nav.css("margin-right", margin);
			skipMain.css("margin-left", margin);
			skipRestaurant.css("margin-left", margin);
			skipCTA.css("margin-left", margin);
		} else {
			navButton.css("margin-right", "unset");
			nav.css("margin-right", "unset");
			skipMain.css("margin-left", "unset");
			skipRestaurant.css("margin-left", "unset");
			skipCTA.css("margin-left", "unset");
		}
	};
	// Initial call
	handleFixedMargin(containerMargin);
	// Set it when the screen size changes
	$(window).resize(() => {
		const containerMargin = parseInt($(".container").css("marginLeft"));
		handleFixedMargin(containerMargin);
	});
});
