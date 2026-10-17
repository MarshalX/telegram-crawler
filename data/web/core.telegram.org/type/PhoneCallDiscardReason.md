# PhoneCallDiscardReason

Why was the phone call discarded?

```tl
phoneCallDiscardReasonMissed#85e42301 = PhoneCallDiscardReason;
phoneCallDiscardReasonDisconnect#e095c1a0 = PhoneCallDiscardReason;
phoneCallDiscardReasonHangup#57adc690 = PhoneCallDiscardReason;
phoneCallDiscardReasonBusy#faf7e8c9 = PhoneCallDiscardReason;
phoneCallDiscardReasonMigrateConferenceCall#9fbbf1f7 slug:string = PhoneCallDiscardReason;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [phoneCallDiscardReasonMissed](/constructor/phoneCallDiscardReasonMissed.md) | The phone call was missed, see [here »](/api/calls.md) for more info. |
| [phoneCallDiscardReasonDisconnect](/constructor/phoneCallDiscardReasonDisconnect.md) | The phone call was disconnected, see [here »](/api/calls.md) for more info. |
| [phoneCallDiscardReasonHangup](/constructor/phoneCallDiscardReasonHangup.md) | The phone call was ended normally, see [here »](/api/calls.md) for more info. |
| [phoneCallDiscardReasonBusy](/constructor/phoneCallDiscardReasonBusy.md) | The phone call was discarded because the user is busy in another call, see [here »](/api/calls.md) for more info. |
| [phoneCallDiscardReasonMigrateConferenceCall](/constructor/phoneCallDiscardReasonMigrateConferenceCall.md) | This phone call was migrated to a [conference call](/api/end-to-end/group-calls.md). |