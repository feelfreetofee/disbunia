# Disbunia
Disbunia wrappers Discord API endpoints and handles [Discord Rate Limits](https://discord.com/developers/docs/topics/rate-limits)
## Usage
This module **exports disbunia** class **as default**.

You can create an object instance passing an [Authentication Token](https://discord.com/developers/docs/reference#authentication)
``TOKEN_TYPE TOKEN``

[Example Bot Token](https://discord.com/developers/docs/reference#authentication-example-bot-token-authorization-header)
``Bot MTk4NjIyNDgzNDcxOTI1MjQ4.Cl2FMQ.ZnCjm1XVW7vRze4b7Cq4se7kKWs``

[Example Bearer Token](https://discord.com/developers/docs/reference#authentication-example-bearer-token-authorization-header)
``Bearer CZhtkLDpNYXgPH9Ml6shqh2OwykChw``

```js
import {default as disbunia} from 'disbunia'

const Discord = new disbunia(process.env.token)
```
## Examples
### [Delete all messages](https://discord.com/developers/docs/resources/message#create-message) in a channel 
```js
const channel_id = '103735883630395392'

for await (const messages of Discord.GetChannelMessagesBefore(channel_id, undefined, 100))
  await Discord.BulkDeleteMessages(channel_id, messages)
```
### Delete [all messages after](https://discord.com/developers/docs/resources/message#create-message) a message
```js
let message_id = '233648473390448641'

for await (const messages of Discord.GetChannelMessagesAfter(channel_id, message_id, 100))
  await Discord.BulkDeleteMessages(channel_id, messages)
```
### [Send A Message](https://discord.com/developers/docs/resources/message#create-message)
```js
await Discord.CreateMessage(channel_id, {
  content: 'Look what a nice meme'
}, [
  Bun.file('skibidi.webp')
])
```
