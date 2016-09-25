//Important vars:
//roomCollection(object array)
//itemCollection(object array)
//currentRoomId(int)
//inventoryItems(int array)

var Room = {
	id: -1,
	name: "unset",
	description: "I wasn't set!",
	exits: [],
	connectedRooms: [],
	containedItems: [],
	isDark: false,
	lockedExits: [],
	roomImage: "",
	haunted: false
}

var roomCollection = [];

var Item = {
	id: -1,
	name: "unset",
	interactNames: [],
	verbs: [],
	takeable: false,
	inInventory: false,
	description: "I wasn't set!",
	takeText: "",
	openText: "",
	opened: false,
	combineable: false,
	containedItems: [],
	inContainer: false,
	revealed: true,
	onUse: [],
	diolauge: "none",
	combineID: -1,
	combineText: "",
	combineResult: [],
	talkText: ""
}

var itemCollection = [];

var acceptedVerbs = ["help", "n", "north", "e", "east", "s", "south", "w", "west", "talk", "talk to", "speak", "speak to", "pick up", "take", "use", "flip", "open", "activate", "i", "inventory", "look", "examine", "read", "give", "put"];
var notAcceptedResponses = ["...What?", "I don't know what you mean by that.", "That's not something I'm letting you do, no.", "You might want to type in HELP, there, buddy.", "I was preprogrammed with acceptable actions, and that's definately not one of them.", "Are you drunk again?", "I'm not doing that.", "I don't even.", "Clever, but not something I know how to work with.", "I swear to god, I don't understand what you just typed in, but if it's something insulting, I'm gonna subscribe your cell phone number to Cat Facts.", "I don't understand that action.", "I don't understand.", "I don't get it.", "That's not an action that I understand.", "I don't know how to do that.", "Huh?", "Whatever that was, it's certainly not the answer to this problem.", "That's not an action I've been programmed to understand.", "Come again?", "You'll have to rephrase that one.", "Not understood, type in HELP to see the actions you can use.", "You're just trying to see all of these messages, aren't you?", "No.", "I'm not gonna do that.", "You can't make me do that!", "That's not happening.", "[NEGATIVE RESPONSE]", "I think there's a problem between the monitor and the chair, here.", "u wot m8?", "No entiendo, señor", "Qué?", "うん、参照してください？私はあなたがあまりにも理解していない言語で入力することができます.\n[Yeah, see? I can type in languages you don't understand too.]", "I don't get it.", "What was that?", "Oh boy, I'm gonna give you a lot of snark for whatever the heck you just said.", "Was that a Watto reference?", "I don't get it.", "I don't understand that.", "I don't understand that.", "I don't understand that." ,"I don't understand that." ,"I don't understand that.","I don't understand that.", "I don't understand that.", "I don't understand that."]

var currentRoomId = 0;
var inventoryItems = [];
var isHaunted = false;

//+++++++++++++
//ROOM + ITEM DECLARATIONS
//+++++++++++++

//Starting Room
var room1 = Object.create(Room);
room1.id = 0;
room1.name = "your office";
room1.description = "This is your office. It's about as drab and boring as you are. As much as you love taking in the same exact sight you've been seeing for the past 30 years of your life, it's probably best to move along.;This is your office. You're pretty sure, anyway, because it's pitch black in here. You should probably use that LIGHT SWITCH.";
room1.exits = ["n"];
room1.connectedRooms = ["n", 1];
room1.containedItems = [0, 1, 2, 3, 4];
room1.roomImage = "img/room1.jpg";
room1.isDark = true;

roomCollection.push(room1);

var lightSwitch1 = Object.create(Item);
lightSwitch1.id = 0;
lightSwitch1.name = "a light switch";
lightSwitch1.interactNames = ["light", "switch", "light switch"]
lightSwitch1.verbs = ["look", "examine", "activate", "use", "flip"];
lightSwitch1.description = "An ordinary light switch. The lost civilization of New York City once used these primitive devices to signal to their lightbulb overlords that they wish to be able to see again.";
lightSwitch1.onUse = ["tgl", "isDark", "You turn on the light, casting an immediate white glow in the room.", "You turn off the light, and now you're sitting in darkness again. Good job."];

itemCollection.push(lightSwitch1);

var gun2 = Object.create(Item);
gun2.id = 1;
gun2.name = "a gun";
gun2.interactNames = ["gun", "a gun", "the gun"];
gun2.verbs = ["look", "examine", "shoot", "use", "give", "put"];
gun2.takeable = true;
gun2.inContainer = true;
gun2.revealed = false;
gun2.description = "This is your personal firearm. There's been plenty of puzzles about, and you, being of brilliant mind, purchased this in order to solve them by force. Ironically, force hasn't been the answer to any puzzle, so it's been a pretty big waste of money.";
gun2.takeText = "You pick up the gun and put it in your inventory. Your manliness stat has increased by 5."
gun2.onUse = ["txt", "You begin to have serious second thoughts about using this thing to solve any of your problems, really."]

itemCollection.push(gun2);

var door3 = Object.create(Item);
door3.id = 2;
door3.name = "an office front door";
door3.interactNames = ["door", "front door", "office front door"];
door3.verbs = ["look", "examine", "open"];
door3.description = "The front door of your office. The words on it read 'Blockhead - I do anything, give me work. Please.' You were hoping the desperate worker angle would bring in lots of customers, but so far all it's done is become on a meme on the trendiest social networking sites.";
door3.openText = "You open the door. You didn't go through it, but you sure did open it."

itemCollection.push(door3);

var coatRack4 = Object.create(Item);
coatRack4.id = 3;
coatRack4.name = "a coat rack";
coatRack4.interactNames = ["rack", "coat rack"];
coatRack4.verbs = ["look", "examine"];
coatRack4.description = "A coat rack. You don't own any coats. This coat rack's existence is about as redundant as your own."

itemCollection.push(coatRack4);

var desk5 = Object.create(Item);
desk5.id = 4;
desk5.name = "a white desk";
desk5.interactNames = ["desk", "white desk", "drawer"];
desk5.verbs = ["look", "examine", "open"];
desk5.description = "Your blank white desk, complete with one singular blank white drawer. If this world wasn't entirely black and white, you'd have some difficulty keeping this clean, but thankfully this abstract concept hasn't even crossed your mind.";
desk5.containedItems = [1];
desk5.openText = "You open your desk drawer, revealing some pointless trinkets that you're not even going to bother mentally describing to yourself. Oh, yes, also a gun.";

itemCollection.push(desk5);

//End Starting Room

//Hallway outside of office
var room2 = Object.create(Room);
room2.id = 1;
room2.name = "the building's hallway";
room2.description = "You're in the office building hallway. The front entrance is blocked off for the yearly zombie raid drill. It's just a drill, do not panic. There's a maintence door to the east, and your office is to the south.\n\nMost of the offices in this building are vacant, the few that are used are occupied by tenants that spend their entire day watching QaziTV, the only form of entertainment in this world.\n\nYou silently wonder if Qazi's nose is real.";
room2.exits = ["s", "e"];
room2.connectedRooms = ["s", 0, "e", 2];
room2.roomImage = "img/room2.jpg";
room2.containedItems = [5, 6];

roomCollection.push(room2);

var tape6 = Object.create(Item);
tape6.id = 5;
tape6.name = "a roll of duct tape";
tape6.interactNames = ["tape", "duct tape", "roll of duct tape"];
tape6.verbs = ["look", "examine", "use", "give"];
tape6.takeable = true;
tape6.description = "A partially used roll of duct tape. This tape is said to fix all phyiscal problems, but sadly, doesn't fix any of the mental ones.";
tape6.takeText = "You take the duct tape. Your affinity for taking objects that probably don't belong to you has increased by one."
tape6.onUse = ["txt", "You don't really have that much duct tape to be using all willy-nilly like that."];

itemCollection.push(tape6);

var sign7 = Object.create(Item);
sign7.id = 6;
sign7.name = "a small sign";
sign7.interactNames = ["sign", "small sign"];
sign7.verbs = ["look", "examine", "read"];
sign7.description = "A piece of paper has been stapled to the wall next to one of the offices. It reads:\n\n'ATTN: Everyone\nRemember that QaziTV broadcasts mon/wed/fri at 2pm EST. Expect delays. Constantly.\nQaziTV is committed to high quality broadcasts, please use the remainder of this sheet to note when mistakes occured during broadcast so we can better improve our show!'\n\nThe rest of the paper is filled to the brim with dates and time codes. There's so many that people had to start writing on the wall around the paper.";

itemCollection.push(sign7);

//End hallway outside of office

//Maintence room
var room3 = Object.create(Room);
room3.id = 2;
room3.name = "a musky maintenance office";
room3.description = "You enter a rough-smelling maintenance office. Black water drips down the sides of the walls. This place looks like it hasn't been cleaned in years.";
room3.exits = ["w", "n"];
room3.connectedRooms = ["w", 1, "n", 3];
room3.lockedExits = ["n"];
room3.containedItems = [7];

roomCollection.push(room3);

var door8 = Object.create(Item);
door8.id = 7;
door8.name = "a strange-looking door";
door8.interactNames = ["door", "strange door", "strange-looking door", "slot"];
door8.verbs = ["look", "examine", "on"];
door8.description = "You take a closer look at the door, and you notice that it's completely covered in what appear to be complicated locking mechanisms. There's a strange gun-shaped slot in the middle of it.";
door8.combineID = 1;
door8.combineText = "You insert the gun into the gun-shaped hole. What a suprise, it fits! The door's mechanisms turn and grind, and the door opens. You take your gun back as the door bolts itself in it's new location."
door8.combineResult = ["unlk", "n"];

itemCollection.push(door8);
//End maintence room

//Completely normal hallway
var room4 = Object.create(Room);
room4.id = 3;
room4.name = "a completely normal hallway";
room4.description = "You walk into a completely normal hallway. It's extremely plain. The only object of interest is a big sign next to the east door.";
room4.exits = ["s", "e", "n"];
room4.connectedRooms = ["s", 2, "e", 4, "n", 5];
room4.roomImage = "img/room4.jpg";
room4.containedItems = [8];

roomCollection.push(room4);

var sign9 = Object.create(Item);
sign9.id = 8;
sign9.name = "a large sign";
sign9.interactNames = ["sign", "large sign"];
sign9.verbs = ["look", "examine", "read"];
sign9.description = "The sign next to the east door reads, in large, bold font :\n\n'Don't come in here.'";
itemCollection.push(sign9);
//End completely normal hallway

//Dead end, fucko.
var room666 =  Object.create(Room);
room666.id = 4;
room666.name = "You shouldn't have come in here."
room666.description = "You shouldn't have come in here."
room666.haunted = true;

roomCollection.push(room666);
//RIP in piss

//Office Room
var room5 = Object.create(Room);
room5.id = 5;
room5.name = "a non-descript office"
room5.description = "You enter an empty office, complete with depressing-looking cubicles. You're reminded of your previous job, where you worked in a white office with a white desk, a coat rack, and you're describing your current job. Crap.";
room5.exits = ["s", "w"];
room5.connectedRooms = ["s", 3, "w", 6];
room5.roomImage = "img/room5.jpg";
room5.lockedExits = ["w"];
room5.containedItems = [9];

roomCollection.push(room5);

var man10 = Object.create(Item);
man10.id = 9;
man10.name = "a vibrating old man";
man10.interactNames = ["man", "old man", "vibrating man"];
man10.verbs = ["look", "examine", "on", "to", "talk", "talk to", "speak", "speak to"];
man10.description = "You see a strange old man sitting in a cubicle. He vibrates intensely, for no real discernible reason.\n\n'Gimme a thing!!', he yells at you.";
man10.combineID = 5;
man10.combineText = "You give the old man your tape. He jumps up and rips it out of your hands, immediately wrapping it around himself. You watch in an odd mixure of confusion and amazement as the old man turns himself into a duct-tape cocoon. After a couple of minutes, the only thing left of him is one wierdly vibrating arm.\n\nThe old man falls over, and the impact causes the west door to open. He's still vibrating, you don't think that's ever going to stop.";
man10.combineResult = ["unlk", "w"];
man10.talkText = "'SHUT UP!!'\n\nHe bangs on his desk a few times."

itemCollection.push(man10);
//End office room

//Qaziroom
var room6 = Object.create(Room);
room6.id = 6;
room6.name = "the Qaziroom"
room6.description = "You enter the corner office. Sitting behind a large white desk is a boring looking ma- no wait, that's Qazi. He's sitting completely motionless, staring straight through you. He doesn't even seem to acknowledge your presense when you enter. Is this what he does when he's not broadcasting himself over the internet?";
room6.exits = ["e"];
room6.connectedRooms = ["e", 5];
room6.containedItems = [10];

roomCollection.push(room6);

var man11 = Object.create(Item);
man11.id = 10;
man11.name = "Qazi";
man11.interactNames = ["qazi", "man", "streamer"];
man11.verbs = ["look", "examine", "talk", "talk to", "speak", "speak to"];
man11.description = "It's Qazi. If you want a more accurate description, look at the bottom right of the stream.";
man11.talkText = "Before you can manage to utter a word, Qazi speaks.\n\n'My son. I am the Prism.'\n\nYour heart skips a beat. You pause for a brief moment before finding your voice again.\n\n'The colors...\nCan you give the world color?'\n\nQazi looks at you and lifts his arms in the air. He begins to ascend towards the ceiling.\n\n'My child. I have already given this world color. You are colorblind.'\n\nQazi phases through the ceiling as you faintly hear a metal version of a Chrono Trigger song, followed by the muffled noises of Qazi telling someone how they have access to a subscriber only Discord.\n\n**THANKS FOR PLAYING?**";

itemCollection.push(man11);
