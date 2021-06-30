import { Alert } from "@scripts/entities/alert";
import $ from "jquery";
import { CustomAlert } from "@components/Alert";

export class AlertHelper {
	private static alert = $("custom-alert")[0] as CustomAlert

	static createAlert = (type: string, message: string) => {
		AlertHelper.alert.setAlertData = new Alert({
			type,
			message,
		});
	}
}
