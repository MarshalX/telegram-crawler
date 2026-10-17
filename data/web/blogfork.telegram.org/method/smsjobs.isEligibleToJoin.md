# smsjobs.isEligibleToJoin

Check if we can process SMS jobs (official clients only).

```tl
smsjobs.eligibleToJoin#dc8b44cf terms_url:string monthly_sent_sms:int = smsjobs.EligibilityToJoin;
---functions---
smsjobs.isEligibleToJoin#edc39d0 = smsjobs.EligibilityToJoin;
```

### Parameters

This constructor does not require any parameters.

### Result
[smsjobs.EligibilityToJoin](/type/smsjobs.EligibilityToJoin.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 403 | NOT\_ELIGIBLE | The current user is not eligible to join the Peer-to-Peer Login Program. |