# Bots.RequestedButton

Contains the Mini App request ID generated when a bot prepares a peer request button, see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info.

```tl
bots.requestedButton#f13bbcd7 webapp_req_id:string = bots.RequestedButton;

---functions---

bots.requestWebViewButton#31a2a35e user_id:InputUser button:KeyboardButton = bots.RequestedButton;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [bots.requestedButton](/constructor/bots.requestedButton.md) | Contains the request ID a bot should pass to a [Mini App](/api/bots/webapps.md) after preparing a peer request button with [bots.requestWebViewButton](/method/bots.requestWebViewButton.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info. |

### Methods

| Method | Description |
| --- | --- |
| [bots.requestWebViewButton](/method/bots.requestWebViewButton.md) | Bots may use this method to prepare a peer request button for a [Mini App](/api/bots/webapps.md), see [here »](/api/bots/buttons.md#requesting-peers-via-mini-apps) for more info. |

### Related pages

#### [Bot buttons](/api/bots/buttons.md)
Users can interact with your bot via buttons or even inline buttons, straight from inline messages in any chat.