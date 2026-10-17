# help.peerColorProfileSet

Represents a [color palette that can be used in profile pages »](/api/colors.md).

```tl
help.peerColorProfileSet#767d61eb palette_colors:Vector<int> bg_colors:Vector<int> story_colors:Vector<int> = help.PeerColorSet;
```

### Parameters

| Name | Type | Description |
| --- | :---: | --- |
| **palette\_colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | A list of 1-2 colors in RGB format, shown in the color palette settings to describe the current palette. |
| **bg\_colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | A list of 1-2 colors in RGB format describing the colors used to generate the actual background used in the profile page. |
| **story\_colors** | [Vector](/type/Vector%20t)&lt;[int](/type/int.md)&gt; | A list of 2 colors in RGB format describing the colors of the gradient used for the unread active story indicator around the profile photo. |

### Type
[help.PeerColorSet](/type/help.PeerColorSet.md)

### Related pages

#### [Accent colors](/api/colors.md)
Telegram users and channels can change the accent color and background pattern of their profile page and their messages!