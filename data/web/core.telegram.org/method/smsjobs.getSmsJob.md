# smsjobs.getSmsJob

Get info about an SMS job (official clients only).

```tl
smsJob#e6a1eeb8 job_id:string phone_number:string text:string = SmsJob;
---functions---
smsjobs.getSmsJob#778d902f job_id:string = SmsJob;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **job\_id** | [string](/type/string.md) | Job ID |

### Result
[SmsJob](/type/SmsJob.md)

### Only users can use this method

### Possible errors

| Code | Type | Description |
| --- | --- | --- |
| 400 | SMSJOB\_ID\_INVALID | The specified job ID is invalid. |