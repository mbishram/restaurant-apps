// For async await transpile
import "regenerator-runtime";
// To fix web component transpile issue with es5
import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js";

import { Loader } from "@components/Loader";

document.body.appendChild(new Loader());
