import FCM from "fcm-node";
import config from "../../config/config";
const { Notifications } = db;

const notificationService = () => {
	const androidPushNotification = async (userInput, notificationdata) => {
		var serverKey = config.API_KEY;
		var fcm_a = new FCM(serverKey);

		var message = {
			// to: 'e3O9UcPA3NM:APA91bGPphbb_1q6xUxLWv5lLQo78TBAGIuOcGFK1rcaV2eK-LvQUe9CuFoIOsGk7tpu1VYHOlHeRnxkLEoPoM214mfdKlsnTn4Mkd4R_MLamF49v2ax1W93eys7kVhJ5ir8VEliSyjE', // required fill with device token or topics
			to: userInput.accessToken,
			collapse_key: "your_collapse_key",
			data: {
				title: notificationdata.title,
				body: notificationdata.message,
				type: "Notification",
				userId: notificationdata.userId
			}
		};
		fcm_a.send(message, async (err, response) => {
			if (err) {
				console.log("Something has gone wrong!", err);
			} else {
				let notifyObj = {
					userId: "2",
					title: "title",
					description: "message",
					notificationType: "Notification"
				};
				await Notifications.create(notifyObj);
				console.log("Successfully sent with response: ", response);
			}
		});
	};
	return {
		androidPushNotification
	};
};
export default notificationService();
