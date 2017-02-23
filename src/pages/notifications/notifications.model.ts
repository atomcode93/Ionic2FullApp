export class NotificationModel {
  image: string;
  message: string;
  name: string;
  date: Date;
}

export class NotificationsModel {
  today: Array<NotificationModel> = [];
  yesterday: Array<NotificationModel> = [];
}
