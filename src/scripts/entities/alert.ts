import { ALERT_TYPES } from "@scripts/constants/alert-types";

export class Alert {
	type: string
	message: string

	constructor(alert?: Alert) {
		this.type = alert?.type || ALERT_TYPES.WARNING;
		this.message = alert?.message || "";
	}
}
