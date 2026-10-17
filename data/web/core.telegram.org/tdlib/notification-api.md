# Notification API

This article describes the [TDLib](/tdlib.md) Notification API introduced in TDLib 1.4.0.

#### Notification API overview

TDLib takes care of everything that is related to handling notifications (as usually, except for how exactly the notifications will be shown to the user). TDLib controls when notifications are shown to the user, when they are edited and removed, guarantees consistency of notifications with the database state and persistence of active notifications between client restarts.

All notifications shown to the user are combined into notification groups. For example, notifications about ordinary messages from the one chat belong to one notification group. This grouping is done automatically by TDLib based on message content and the user's notification settings. Currently, there are 4 different notification group types:

* `Messages` notification groups contain notifications with ordinary unread messages from a chat.
* `Mentions` notification groups contain notifications with unread mentions of the current user, replies to their messages, and notifications about pinned messages in a chat.
* `SecretChat` notification groups contain a single notification about creating a new secret chat.
* `Calls` notification groups contain notifications about received calls in a chat.

TDLib ensures that the number of notification groups shown to the user any given moment is limited by the value of the `notification_group_count_max` option and that the number of active notifications, shown to the user in a notification group at any given time, is limited by the value of the `notification_group_size_max` option. Whenever the number of notification groups with active notifications exceeds `notification_group_count_max`, TDLib sends an update hiding all notifications from the oldest group. If subsequently all notifications are hidden in some other group, that first group can be silently brought back by an update from TDLib. Similarly, whenever the number of active notifications in a group exceeds `notification_group_size_max`, TDLib sends an update hiding the oldest notifications in the group. If subsequently some newer notifications are removed from the group, older notifications can be silently brought back by an update from TDLib.

To enable the TDLib Notificaition API you need to set option `notification_group_count_max` to a positive value, to disable the Notification API you can change the option value back to 0 or set the option value to empty.

Every notification group has a unique ID, which is a persistent small integer number, assigned consequently from 1. The client should not assume that the group's type and other fields are fixed, because TDLib may reuse the notification group ID whenever it's known that the group will never be used again in the future. Every notification belongs to a notification group and has a globally unique ID, which is a persistent small integer number, assigned consequently from 1. Notification IDs are never reused and can be used together with their notification group ID to uniquely identify a notification. Within a notification group, notifications must be shown in the order defined by their IDs. If notification grouping isn't available in your operating system, the existence of notification groups can be safely ignored and notifications can be handled separately just by their unique ID.

Currently, there are 4 different kinds of notifications:

* `NewMessage` notifications contain the full information about a new incoming message received from the server. They may be located in Messages and Mentions notification groups.
* `NewPushMessage` notifications contain information about a new incoming message received in a push notification. They contain only partial data about the message and will be replaced by NewMessage notifications as soon as the client downloads the necessary data. They may be located in Messages and Mentions notification groups.
* `NewSecretChat` notifications inform about creating a new secret chat. Only one will be located in each SecretChat notification group. The group may be reused as soon as the notification is removed.
* `NewCall` notifications contain information about a new incoming call. They are located in a Calls notification group. The group may be reused as soon as the notifications are removed.

Messages from new push message notifications will not be shown in the chat message list, but their message identifiers are known and they can be replied to and used in `ViewMessages` calls anyway. 

#### Handling Notification API updates

Notification API introduced 4 new updates from TDLib, namely `updateActiveNotifications`, `updateNotificationGroup`, `updateNotification` and `updateHavePendingNotifications`.

If Notification API is enabled, the client receives an `updateActiveNotifications` update on startup, containing all notifications that are to be shown to the user. The client needs to synchronize the list of notifications that is shown to the user with the list received in `updateActiveNotifications` and save information about all active notifications in memory, because subsequent updates will contain only changes to the list of active notifications.

Whenever a notification is added to a group or is removed from a group, TDLib sends an `updateNotificationGroup` update to the client. Aside from the list of added notifications and list of identifiers of removed notifications, the update contains full information about the new type of the notification group, the identifier of the chat to which all notifications in the group now belong, the identifier of the chat the notification settings of which must be used to show the notification, a flag determining whether the notification must be shown with or without sound and the new total count of unread notifications in the group. Be aware that the total count of unread notifications in a group can be higher than the number of active notifications. Also note that some old notifications can be added through `updateNotificationGroup` when newer notifications are removed, so the client must ensure the correct notification order based on notification identifiers. Whenever possible, `updateNotificationGroup` updates for a group are combined into a single update, so the client can apply the changes together. TDLib also controls the delay before notifications are shown to the user in order to give them a chance to read the messages from a different device before the notification is shown, therefore the updates should be processed on the client side immediately without any additional delays.

Whenever an active notification is changed, TDLib sends an `updateNotification` update to the client. The update contains new content of the notification. The client should be ready to handle the change of notification type, for example, from `NewPushMessage` to `NewMessage`.

Whenever there are some received but delayed notifications or there can be some yet unreceived notifications because of unavailable network connection to the Telegram servers, TDLib informs the client about that via `updateHavePendingNotifications` update. Client is supposed to keep the application running in order to receive all delayed notifications. If there is no possibility to keep the application running, the client can close the TDLib instance in order to immediately receive all delayed notification updates.

TDLib tries to ensure that whenever a notification about a pinned message is sent, the pinned message is already available locally in the memory, so the client can use a new request `getMessageLocally` to get the pinned message. Also, `updateNotification` will be sent whenever pinned message is changed, despite that the notification itself wasn't changed.

#### Customizing the Notification API

The client controls the maximum number of active notification groups by using the option `notification_group_count_max`. This option's value defaults to 0, i.e. there are no active notification groups and the Notification API is effectively disabled. Any integer value between 0 and 25 can be used as the value of the option. Values above 25 are not allowed because most operating systems will not show so many notification groups anyway.

The client also controls the maximum number of active notifications in a group by using the option `notification_group_size_max`. This option's value defaults to 10 and can be set to any integer value between 1 and 25. Values above 25 are not allowed, because most operating systems will not show so many notifications in a group anyway.

The user may choose to show pinned messages or mentions among ordinary messages in the `Messages` notification group instead of the `Mentions` notification group and choose to not apply notification settings from the sender's private chat to them. This can be done on a per chat basis or for the whole chats notification scope via the new options `disable_pinned_message_notifications` and `disable_mention_notifications` which were added to `chatNotificationSettings` and `scopeNotificationSettings` classes.

#### Handling push notifications

In order to support multiple accounts in one app, the method `registerDevice` now returns a globally unique identifier of the push notification subscription. This identifier can be used to match a push notification with the corresponding account and process the notification only by the account for which the notification was sent.

Whenever a push notification is received, the client needs to call the synchronous method `getPushReceiverId` with the payload of the push notification. The method will return a globally unique identifier of the push notification subscription (aka push receiver ID), which can be used to find the TDLib instance which needs to be launched and used to process the push notification. If the method returns 0 as a push receiver ID, then the push notification should be processed by all clients (this usually happens when there is only one client).

To process a notification, the method `processPushNotification` needs to be called in the TDLib instance (or instances) found by push receiver ID. This method can be called before authorization and its execution will be automatically postponed until TDLib initialization. The method returns the result only after all updates caused by the push notification have been sent and the TDLib instance can be safely closed. If the method returns an error with the code 406, then the push notification is known to be unsupported and connection to the server is required to fetch new data. If any other error is returned, an error occurred while processing the push notification, i.e. the notification payload has failed to decrypt or parse. In that case, connection to the server isn't required, but there can be new notifications there. After a successful response from `processPushNotification` the TDLib instance can be immediately closed in order to reduce battery usage. Alternatively, the client can wait for an `updateHavePendingNotifications` update telling that there are no more delayed or unreceived notifications.

Android and iOS clients can opt-in to receive end-to-end encrypted push notifications via a Firebase Cloud Messaging or Apple Push Notification service VoIP notifications while subscribing to push notifications through `registerDevice` method. In case of Firebase Cloud Messaging, if end-to-end encrypted push notifications are disabled, push notifications are sent without content, so there no notifications of the type `NewPushMessage` will be created, the client will always need to connect to Telegram servers to download new messages whenever a push notification is received.

Examples of push notification payloads, which are accepted by TDLib:
```
{
  "date": 1234567890,
  "data": {
    "custom": {
      "msg_id": "1234567",
      "from_id": "12345678",
      "mtpeer": {
        "ah": "-1234567",
        "ph": {
          "volume_id": "987654321",
          "local_id": "98765",
          "secret": "998877665544332211",
          "file_reference": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
          "dc_id": 6,
          "_": "fileLocation"
        }
      }
    },
    "badge": "239",
    "loc_key": "MESSAGE_TEXT",
    "loc_args": [
      "First name Last name",
      "qwerty"
    ],
    "line1": "First name Last name",
    "line2": "qwerty",
    "random_id": 728931540,
    "text": "First name Last name: qwerty",
    "system": "Windows 10.0.20573.1"
  }
}
{
  "google.sent_time": 1234567890123,
  "p": "jdTXkJnEMUTK6R82AB-55bLA3U_RB-2K-CLDz7mWp7ckjMIfnCoHEcm710SkN"
}
{
  "date": 1234567890,
  "loc_key": "CHAT_MESSAGE_TEXT",
  "loc_args": [
    "First name Last name",
    "Chat title",
    "qwerty"
  ],
  "custom": {
    "msg_id": "1234567",
    "channel_id": "56781234",
    "chat_from_id": "12345678",
    "mention": "1"
  },
  "badge": "239"
}
```

#### Users removing active notifications

There are two methods for removing notifications from the list of active notifications when they are hidden by the user. If the user removes a single notification, it can be removed by calling the method `removeNotification`. If the user dismisses the whole notification group, this can be achieved using the method `removeNotificationGroup`. Removed notifications will never return to the list of active notifications, but can be still counted in the total count of unread notifications of the group.
