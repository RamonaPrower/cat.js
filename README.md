# Cat.js/Meow 2.0


## LIST OF COMMANDS
### Admin
#### Info
  * Used by: Everyone
  * Summon: @me Info
  * Returns: Info about how to use the bot
#### Moms
  * Used by: Everyone
  * Summon: @me moms
  * Returns: Info about the creators of Meow
#### Toggle
  * Used by: Mods (you need the MANAGE_CHANNELS permission)
  * Summmon: @me toggle [sim, twitter, shouting]
  * Returns: a private DM about how the guild setup is for the bot
  * Extra Info: If you don't put in any options, it'll just dm you the current server settings
### Commands
#### Bazinga
  * Meow doesn't like The Big Bang Theory. Don't Bazinga him.
#### Feed
  * Used by: Everyone
  * Summon: @me feed
  * Sim: true
  * Info: Try to feed the cat. if he's hungry, he'll send an eating emoji, if he's not, he'll turn up his nose
#### Hello
  * Used by: Everyone
  * Summon: @me hello
  * Sim: true
  * Info: Say hello to meow! Depending on his mood, whether he likes you and whether he's asleep or not, he'll react to you
#### Hug
  * Used by: Everyone
  * Summon: @me hug(?)/cuddles(?)/uppies(?)
  * Sim: true
  * Info: You need to ask meow if he wants to be picked up. If he does, then reply with hug(!)/cuddles(!)/uppies(!)
#### Hunger
  * Used by: everyone
  * Summon: @me hunger
  * Sim: true
  * Info: it'll ask if meow is hungry or not
#### Love
  * Used by: Everyone
  * Summon: @meow (love/i would die for/cute)
  * Sim: true
  * Info: Meow reacts if you say that you love him, or would die for him.
#### Meow
  * Used by: everyone
  * Summon: @me meow
  * Sim: true
  * Info: a general reaction command, meow will reply with his mood
#### Mood
  * Used by: everyone
  * Summon: @me mood
  * Sim: true
  * Info: This command reacts with his current guild mood, doesn't take into account your personal relationship with him.
#### Pet
  * Used by: everyone
  * Summon: @me
  * Sim: true
  * Info: petting the cat, whilst it's in a good mood makes it happier with you, and it'll react poorly if it's in a bad mood, or if it doesn't like you a lot.
#### Vibe Check
  * Vibe Check
### Triggers
#### Blobcat
  * Used by: everyone
  * Summon: blobcat emoji
  * Info: responds to the blobcat emoji
  * chance: 5%
#### Bork
  * Used by: everyone
  * Summon: bork, byork
  * Info: responds to dog sounds
  * chance: 5%
#### Catface
  * Used by: everyone
  * Summon: :3c
  * Info: responds to cat face
  * chance: 5%
#### Meow
  * Used by: everyone
  * Summon: the long ass regexp in the file
  * Info: this will respond to normal cat sounds, and also silently listens for someone to greet the cat, which improves standing with the cat (this will still respond but not actually do anything on non-sim servers)
  -chance: 5%
#### owo
  * Used by: everyone
  * Summon: owo or uwu
  * Info: responds with a owo face
  * chance: 5%
#### sus
  * amogus
#### Shouting
  * Used by: everyone
  * Summon: LOUD CAPS LOCK IN THE WHOLE MESSAGE
  * Info: gets scared by loud noises, silently listens for consolment (it's ok, poor cat, etc)
  * chance: 10%
### Twitter for discord
#### Twitter for discord
  * Used by: everyone
  * Summon: twitter links
  * Info: auto-gets any quoted tweets from a tweet, and passes it through a webhook, when possible
  * twitter setting needed: true
