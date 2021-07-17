// For async await transpile
import "regenerator-runtime";
// To fix web component transpile issue with es5
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";

import $ from "jquery";

import "@styles/index.scss";

import { App } from "@views/App";
import { SWHelper } from "@utils/sw-helper";

import "@components/Navigation";
import "@components/NavigationLink";
import "@components/Footer";

import "@components/PageSection";
import "@components/RestaurantList";
import "@components/MenuList";
import "@components/ReviewList";
import "@components/FavoriteButton";
import "@components/Loader";
import "@components/Alert";
import "@components/SkeletonLoader";

$(window).on("load", () => {
	$("body").css("opacity", "1");
	App.renderPage();
	SWHelper.registerSW();
});

$(window).on("hashchange", () => {
	App.renderPage();
});
