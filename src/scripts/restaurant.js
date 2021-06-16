import data from "../DATA.json";

$(() => {
	// Generating restaurant element from data
	const listRestaurant = $("#list-restaurant");
	data.restaurants.forEach((restaurant) => {
		// Setup the element
		const restaurantElement = `
	    <li>
            <article aria-labelledby="restaurant-name-${restaurant.id}">
            	<img 
            		class="restaurant-image" 
            		src=${restaurant.pictureId}
            		alt="${restaurant.name}"
            	>
                <section
                    class="card"
                    aria-label="deksripsi ${restaurant.name}"
                >
                    <h3 id="restaurant-name-${restaurant.id}" class="text-md">
                        <a href="#" class="no-underline">${restaurant.name}</a>
                    </h3>
                    <p
                        class="text-gray-2"
                    >
                        <span class="sr-only">Lokasi </span>${restaurant.city}<span class="text-primary"
                        ><i class="bi bi-star"></i>
                        <span class="sr-only">Penilaian </span>${restaurant.rating}</span>
                    </p>
                    <p>
                        ${restaurant.description}
                    </p>
                </section>
            </article>
        </li>
	    `;

		// Add the element into DOM
		listRestaurant.append(restaurantElement);
	});

	// Make the height of the article properly set
	const setArticleHeight = (list) => {
		const article = list.find("article");
		const articleDescTop = Math.abs(
			parseInt(article.find("section").css("top"))
		);

		// Initial height minus description section top
		article.outerHeight(list.outerHeight() - articleDescTop);
	};
	// Make the article section stretch till the end
	const setArticleSectionHeight = (list) => {
		const article = list.find("article");
		const articleSection = article.find("section");
		const articleImgHeight = article
			.find(".restaurant-image")
			.outerHeight();
		const articleDescTop = Math.abs(
			parseInt(article.find("section").css("top"))
		);

		// Article section height = list height - article img height + article top
		// I can't explain why this formula works, but it works!
		const articleSectionHeight =
			list.outerHeight() - articleImgHeight + articleDescTop;

		articleSection.outerHeight(articleSectionHeight);
	};

	const handleArticleHeight = () => {
		const restaurantLists = $("#list-restaurant li");

		// Reset all of the article height
		restaurantLists.each((_, element) => {
			const article = $(element).find("article");
			const articleSection = $(element).find("section");
			article.height("unset");
			articleSection.height("unset");
		});

		// Set article height
		restaurantLists.each((_, element) => {
			setArticleHeight($(element));
		});

		// Set article section height
		restaurantLists.each((_, element) => {
			setArticleSectionHeight($(element));
		});
	};

	// Initial call
	// I'm using set timeout here because
	// outerHeight usually doesn't load without it
	setTimeout(handleArticleHeight, 1);
	// Set it when the screen size changes
	$(window).on("resize", handleArticleHeight);
});
