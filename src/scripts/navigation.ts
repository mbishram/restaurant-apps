$(() => {
	const nav = $("nav");
	const navButton = $("#nav-button");
	const navButtonIcon = $("#nav-button i");
	const body = $("body");

	// Handler for when navigation button is clicked
	const handleNav = (event: Event) => {
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

	navButton.on("click", handleNav);
	body.on("click", closeNav);
	nav.on("click", (event) => {
		// Stop it from closing the nav when nav is clicked
		event.stopPropagation();
	});

	const skipMain = $("#skip-main");
	const skipRestaurant = $("#skip-restaurant");
	const skipCTA = $("#skip-cta");

	// Make nav and skip to content to align with the container
	// on tablet devices an up
	const handleFixedSpacing = (spacing: number) => {
		// Only apply it on tablet and up
		const mediaTablet = matchMedia("only screen and (min-width: 768px)");
		if (mediaTablet.matches) {
			nav.css("left", spacing);
			nav.css("right", spacing);
			skipMain.css("margin-left", spacing);
			skipRestaurant.css("margin-left", spacing);
			skipCTA.css("margin-left", spacing);
		} else {
			nav.css("left", 0);
			nav.css("right", 0);
			skipMain.css("margin-left", "unset");
			skipRestaurant.css("margin-left", "unset");
			skipCTA.css("margin-left", "unset");
		}
	};

	const container = $(".container");
	const containerSpacing =
		parseInt(container.css("marginLeft")) +
		parseInt(container.css("paddingLeft"));
	// Initial call
	handleFixedSpacing(containerSpacing);
	// Set it when the screen size changes
	$(window).on("resize", () => {
		// I'm declaring the variable again because the value of the variable
		// outside of this scope will become outdated when window is resized
		const containerSpacing =
			parseFloat(container.css("marginLeft")) +
			parseFloat(container.css("paddingLeft"));
		handleFixedSpacing(containerSpacing);
	});
});
