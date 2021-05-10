import data from "../DATA.json";

$(() => {
	// Generating restaurant element from data
	const listRestaurant = $("#list-restaurant");
	data.restaurants.forEach((restaurant) => {
		// Setup the element
		const restaurantElement = `
	    <li>
            <article aria-labelledby="restaurant-name-${restaurant.id}">
                <div
                    class="restaurant-image"
                    role="img"
                    aria-label="Foto ${restaurant.name}"
                    style="
                        background-image: url(${restaurant.pictureId});
                    "
                ></div>
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
	const setArticleHeight = (article) => {
		const articleDescTop = Math.abs(
			parseInt(article.find("section").css("top"))
		);

		// Reset the height
		article.height("initial");

		// Initial height minus description section top
		article.height(article.outerHeight() - articleDescTop);
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

		// Article section height = list height - article img height - article top
		const articleSectionHeight =
			list.outerHeight() - (articleImgHeight - articleDescTop);

		articleSection.height(articleSectionHeight - articleDescTop);
	};

	const handleArticleHeight = () => {
		const restaurantArticles = $("#list-restaurant article");
		// Reset all of the article sections height
		restaurantArticles.each((_, element) => {
			const articleSection = $(element).find("section");
			articleSection.height("unset");
		});

		// Set article height
		restaurantArticles.each((_, element) => {
			setArticleHeight($(element));
		});

		// Set article section height
		const restaurantLists = $("#list-restaurant li");
		restaurantLists.each((_, element) => {
			setArticleSectionHeight($(element));
		});
	};

	// Initial call
	handleArticleHeight();
	// Set it when the screen size changes
	$(window).resize(handleArticleHeight);
});
