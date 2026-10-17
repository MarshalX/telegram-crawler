# GroupCallParticipant

Info about a group call participant

```tl
groupCallParticipant#2a3dc7ac flags:# muted:flags.0?true left:flags.1?true can_self_unmute:flags.2?true just_joined:flags.4?true versioned:flags.5?true min:flags.8?true muted_by_you:flags.9?true volume_by_admin:flags.10?true self:flags.12?true video_joined:flags.15?true peer:Peer date:int active_date:flags.3?int source:int volume:flags.7?int about:flags.11?string raise_hand_rating:flags.13?long video:flags.6?GroupCallParticipantVideo presentation:flags.14?GroupCallParticipantVideo paid_stars_total:flags.16?long = GroupCallParticipant;
```

### Constructors

| Constructor | Description |
| --- | --- |
| [groupCallParticipant](/constructor/groupCallParticipant.md) | Describes a group call participant and their current state, see [applying group call updates »](/api/group-calls.md#applying-group-call-updates). |