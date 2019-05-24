// this is just a bunch of including the commands
// adding them dynamically is easier but SOMEONE keeps saying it's bad practice so
// this is on her
// this also makes the game easier as i can add the file for both collections needed


/**
 * // const bed = require('./admin/bed');
 * removing the bed commands for now, it feels redundant when permissions can control where the cat goes anyway
 */

const info = require('./admin/info');
const toggle = require('./admin/toggle');
const moms = require('./admin/moms');

module.exports.admin = [info, toggle, moms];

const asleep = require('./commands/asleep');
const feed = require('./commands/feed');
const hunger = require('./commands/hunger');
const meowComm = require('./commands/meow');
const mood = require('./commands/mood');
const pet = require('./commands/pet');
const play = require('./commands/play');

module.exports.commands = [asleep, feed, hunger, meowComm, mood, pet, play];

const blobcat = require('./triggers/blobcat');
const bork = require('./triggers/bork');
const catFace = require('./triggers/catface');
const meowTrigg = require('./triggers/meow');
const owo = require('./triggers/owo');
const shouting = require('./triggers/shouting');

module.exports.triggers = [blobcat, bork, catFace, meowTrigg, owo, shouting];

const twitter = require('./twitter/twitter');

module.exports.twitter = twitter;

const noSimPet = require('./special/pet');

module.exports.special = [noSimPet];