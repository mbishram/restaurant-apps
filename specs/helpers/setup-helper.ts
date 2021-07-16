// For async await transpile
import "regenerator-runtime";
// To fix web component transpile issue with es5
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";
import { TestFactories } from "./test-factories";

TestFactories.createEmptyState();
