// this is just a bunch of including the commands
// adding them dynamically is easier but SOMEONE keeps saying it's bad practice so
// this is on her
// this also makes the game easier as i can add the file for both collections needed

// admin
const info = require('./admin/info');
const toggle = require('./admin/toggle');
const moms = require('./admin/moms');
// commands
const bazinga = require('./commands/bazinga');
const feed = require('./commands/feed');
const hello = require('./commands/hello');
const hug = require('./commands/hug');
const hunger = require('./commands/hunger');
const love = require('./commands/love');
const meowComm = require('./commands/meow');
const mood = require('./commands/mood');
const pet = require('./commands/pet');
// triggers
const blobcat = require('./triggers/blobcat');
const bork = require('./triggers/bork');
const catFace = require('./triggers/catface');
const kawaii = require('./triggers/kawaii');
const meowTrigg = require('./triggers/meow');
const owo = require('./triggers/owo');
const shouting = require('./triggers/shouting');
// twitter
const twitter = require('./twitter/twitter');
// special
const noSimPet = require('./special/pet');
const flower = require('./special/flower');

module.exports.admin = [info, toggle, moms];
module.exports.commands = [bazinga, feed, hello, hug, hunger, love, meowComm, mood, pet, shouting];
module.exports.special = [noSimPet, flower];
module.exports.triggers = [blobcat, bork, catFace, kawaii, meowTrigg, owo, shouting];
module.exports.twitter = twitter;