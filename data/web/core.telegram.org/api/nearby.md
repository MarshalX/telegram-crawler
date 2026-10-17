# Nearby users&amp;chats


How to work with geolocation-based features like geogroups and the nearby users feature.

### Fetching nearby users and geogroups

    inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;

    ---functions---
    
    contacts.getLocated#d348bc44 flags:# background:flags.1?true geo_point:InputGeoPoint self_expires:flags.0?int = Updates;

Use [contacts.getLocated](/method/contacts.getLocated.md) to fetch a list of nearby users and groups.  

Do **not** set any of the `background`, `self_expires` flags: only populate `geo_point` with the current geolocation of the user: a list of users and geogroups located nearby will be returned (**without** publishing the current location of the user).  

This functionality is useful for example to [exchange contacts](/api/contacts.md#adding-telegram-users-as-contacts) with a nearby Telegram user, or [join](/method/channels.joinChannel.md) a location-based group chat, see [here&nbsp;&raquo;](https://telegram.org/blog/contacts-local-groups) for more use cases.  

See [here&nbsp;&raquo;](#creating-a-geogroup) for more info on how to create a geogroup, and [here&nbsp;&raquo;](#advertising-our-current-location) for more info on how to advertise our current location to other users.  

### Creating a geogroup

    inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;

    ---functions---

    channels.createChannel#91006707 flags:# broadcast:flags.0?true megagroup:flags.1?true for_import:flags.3?true forum:flags.5?true title:string about:string geo_point:flags.2?InputGeoPoint address:flags.2?string ttl_period:flags.4?int = Updates;

    channels.editLocation#58e63f6d channel:InputChannel geo_point:InputGeoPoint address:string = Bool;

Pass a `geo_point` to [channels.createChannel](/method/channels.createChannel.md) when creating a [supergroup](/api/channel.md) in order to create a geogroup associated to a geolocation, that will be returned to [nearby users&nbsp;&raquo;](#fetching-nearby-users-and-geogroups).  

A textual description of the location (1-64 UTF-8 chars) should also be passed in `address`.  

Use [channels.editLocation](/method/channels.editLocation.md) to change the group's location.

### Advertising our current location

    inputGeoPoint#48222faf flags:# lat:double long:double accuracy_radius:flags.0?int = InputGeoPoint;

    ---functions---
    
    contacts.getLocated#d348bc44 flags:# background:flags.1?true geo_point:InputGeoPoint self_expires:flags.0?int = Updates;

Our current location may be [advertised to other users](#fetching-nearby-users-and-geogroups) using [contacts.getLocated](/method/contacts.getLocated.md): in this case the `self_expires` flag **must always be set**.  

Note that if the current user is already advertising their location using the [Telegram Business location feature&nbsp;&raquo;](/api/business.md#location) (even without a `geo_point`, just with a textual `address`), the method will return a `BUSINESS_ADDRESS_ACTIVE` error, indicating that the location may only be changed (or removed) using [account.updateBusinessLocation&nbsp;&raquo;](/method/account.updateBusinessLocation.md), instead of [contacts.getLocated](/method/contacts.getLocated.md).  

This flag is used to specify the expiration TTL of the passed geolocation (i.e. the geolocation will expire after `self_expires` seconds); pass `0x7fffffff` to disable expiry, 0 to make the current geolocation private.  

The method will also return a list of nearby users and chats, but only if the passed expiration TTL is not equal to zero.  
Users may still fetch nearby users and chats without making their geolocation public by simply not setting the flag, see [here&nbsp;&raquo;](#fetching-nearby-users-and-geogroups) for more info.  

While the geolocation of the current user is public, clients should update it in the background every half-an-hour or so (or in any case before the expiration date specified with `self_expires`), while setting this flag: if the new location is more than 1 KM away from the previous one, or if the previous location is unknown, the `background` flag should be set.  
