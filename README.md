# Cat.js/Meow 2.0


## LIST OF COMMANDS
### Admin
#### Info
  * used by : Everyone
  * Summon: @me info
  * Returns: info about how to use the bot, via image (or something)

#### Toggle
  * used by: Mods (you need the MANAGE_CHANNELS permission)
  * summmon: @me toggle [sim, twitter]
  * Returns: a private DM about how the guild setup is for the bot
  * info: If you don't put in sim and/or twitter, it'll just dm you the current server settings
### Commands
#### Feed
  * used by: everyone
  * summon: @me feed
  * sim: true
  * info: It'll try to feed the cat, if he's hungry, he'll send an eating emoji, if he's not, he'll turn up his nose
#### Hunger
  * used by: everyone
  * summon: @me hunger
  * sim: true
  * info: it'll spit out an emoji if the cat is hungry or not
#### Meow
  * used by: everyone
  * summon: @me meow
  * sim: true
  * info: a general reaction command, it'll spit out it's mood
#### Mood
  * used by: everyone
  * summon: @me mood
  * sim: true
  * info: a general reaction command, functionally the same as meow
#### Pet
  * used by: everyone
  * summon: @me mood
  * sim: true
  * info: petting the cat, whilst it's in a good mood makes it happier with you, and it'll react poorly if it's in a bad mood, or if it doesn't like you a lot.
#### Play
  * Soon™
### Triggers
#### Blobcat
  * used by: everyone
  * summon: blobcat emoji
  * info: responds to the blobcat emoji
  * chance: 5%
#### Bork
  * used by: everyone
  * summon: bork, byork
  * info: responds to dog sounds
  * chance: 5%
#### Catface
  * used by: everyone
  * summon: :3c
  * info: responds to cat face
  * chance: 5%
#### Meow
  * used by: everyone
  * summon: the long ass regexp in the file
  * info: this will respond to normal cat sounds, and also silently listens for someone to greet the cat, which improves standing with the cat (this will still respond but not actually do anything on non-sim servers)
  -chance: 5%
#### owo
  * used by: everyone
  * summon: owo or uwu
  * info: responds with a owo face
  * chance: 5%
#### Shouting
  * used by: everyone
  * summon: LOUD CAPS LOCK IN THE WHOLE MESSAGE
  * info: gets scared by loud noises, silently listens for consolment (it's ok, poor cat, etc)
  * chance: 10%
### Twitter for discord
#### Twitter for discord
  * used by: everyone
  * summon: twitter links
  * info: auto-gets the next image from a twitter embed, and passes it through a webhook, when possible
  * twitter setting needed: true
