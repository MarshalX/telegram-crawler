# Phone.PhoneCall

Phone call

```tl
phone.phoneCall#ec82e140 phone_call:PhoneCall users:Vector<User> = phone.PhoneCall;

---functions---

phone.requestCall#42ff96ed flags:# video:flags.0?true user_id:InputUser random_id:int g_a_hash:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.acceptCall#3bd2b4a0 peer:InputPhoneCall g_b:bytes protocol:PhoneCallProtocol = phone.PhoneCall;
phone.confirmCall#2efe1722 peer:InputPhoneCall g_a:bytes key_fingerprint:long protocol:PhoneCallProtocol = phone.PhoneCall;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phone.phoneCall](/constructor/phone.phoneCall.md) | A VoIP phone call |

### Methods

| Method | Description |
| --- | --- |
| [phone.requestCall](/method/phone.requestCall.md) | Start a telegram phone call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.acceptCall](/method/phone.acceptCall.md) | Accept incoming call, see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |
| [phone.confirmCall](/method/phone.confirmCall.md) | [Complete phone call E2E encryption key exchange »](/api/end-to-end/voice-calls.md), see [here »](/api/calls.md#one-to-one-calls) for more info on the full flow. |