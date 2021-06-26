// For async await transpile
import "regenerator-runtime";
// To fix web component transpile issue with es5
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";

import $ from "jquery";

import "@styles/index.scss";

import { App } from "@views/App";

import "@components/Navigation/index";
import "@components/NavigationLink/index";
import "@components/Footer/index";
import "@components/PageSection/index";
import "@components/RestaurantList/index";
import "@components/RestaurantItem/index";

$(() => {
	App.renderPage();
});

$(window).on("hashchange", () => {
	App.renderPage();
});
