//Item as an object : referrs to all interactable entities within rooms : items & people
	//Properties : Verbs (delimited list or array that can be used on this item)
	//IsTakeable
	//Description : What to display when examined
	//IsCombineable : Can you mash this with something else to make a new item?
	//ChatDiolauge : If 'talk' is an accepted verb, write diolauge here. (delimited string or array?)

//Rooms : array of all available rooms
	//Description : What player sees on entry/examine
	//Exits : N S W E

var Room = {
	id: -1,
	name: "unset",
	description: "I wasn't set!",
	exits: "N;S;E;W",
	containedItems: "-1",
	isDark: false
}

var roomCollection = [];

var Item = {
	id: -1,
	name: "unset",
	interactNames: "",
	verbs: "",
	takeable: false,
	description: "I wasn't set!",
	takeText: "",
	openText: "",
	combineable: false,
	containedItems: "-1",
	inContainer: false,
	revealed: true,
	diolauge: "none"
}

var itemCollection = [];

var acceptedVerbs = ["help", "n", "north", "e", "east", "s", "south", "w", "west", "talk", "chat", "speak", "pick up", "take", "use", "open", "activate", "turn on", "i", "inventory", "look", "examine", "hit", "shoot"];
var notAcceptedResponses = ["...What?", "I don't know what you mean by that.", "That's not something I'm letting you do, no.", "You might want to type in HELP, there, buddy.", "I was preprogrammed with acceptable actions, and that's definately not one of them.", "Are you drunk again?", "I'm not doing that.", "I don't even.", "Clever, but not something I know how to work with.", "I swear to god, I don't understand what you just typed in, but if it's something insulting, I'm gonna subscribe your cell phone number to Cat Facts.", "I don't understand that action.", "I don't understand.", "I don't get it.", "That's not an action that I understand.", "I don't know how to do that.", "Huh?", "Whatever that was, it's certainly not the answer to this problem.", "That's not an action I've been programmed to understand.", "Come again?", "You'll have to rephrase that one.", "Not understood, type in HELP to see the actions you can use.", "You're just trying to see all of these messages, aren't you?", "No.", "I'm not gonna do that.", "You can't make me do that!", "That's not happening.", "[NEGATIVE RESPONSE]", "I think there's a problem between the monitor and the chair, here.", "u wot m8?", "No entiendo, señor", "Qué?", "うん、参照してください？私はあなたがあまりにも理解していない言語で入力することができます.\n[Yeah, see? I can type in languages you don't understand too.]", "I don't get it.", "What was that?", "Oh boy, I'm gonna give you a lot of snark for whatever the heck you just said.", "Was that a Watto reference?", "I don't get it.", "I don't understand that.", "I don't understand that.", "I don't understand that." ,"I don't understand that." ,"I don't understand that.","I don't understand that.", "I don't understand that.", "I don't understand that."]

var currentRoomId = 0;
var inventoryItems = "";

//+++++++++++++
//ROOM + ITEM DECLARATIONS
//+++++++++++++

//Starting Room
var room1 = Object.create(Room);
room1.id = 0;
room1.name = "your office";
room1.description = "This is your office. It's about as drab and boring as you are. As much as you love taking in the same exact sight you've been seeing for the past 30 years of your life, it's probably best to move along.;This is your office. You're pretty sure, anyway, because it's pitch black in here. You should probably turn on that LIGHT SWITCH.";
room1.exits = "N";
room1.containedItems = "0;1;2;3;4";
room1.isDark = true;

roomCollection.push(room1);

var lightSwitch1 = Object.create(Item);
lightSwitch1.id = 0;
lightSwitch1.name = "a light switch";
lightSwitch1.interactNames = "switch;light switch";
lightSwitch1.verbs = "look;examine;turn on;activate;use";
lightSwitch1.description = "An ordinary light switch. The lost civilization of New York City once used these primitive devices to signal to their lightbulb overlords that they wish to be able to see again.";

itemCollection.push(lightSwitch1);

var gun2 = Object.create(Item);
gun2.id = 1;
gun2.name = "a gun";
gun2.interactNames = "gun;a gun;the gun;";
gun2.verbs = "look;examine;shoot;use";
gun2.takeable = true;
gun2.inContainer = true;
gun2.revealed = false;
gun2.description = "This is your personal firearm. There's been plenty of puzzles about, and you, being of brilliant mind, purchased this in order to solve them by force. Ironically, force hasn't been the answer to any puzzle, so it's been a pretty big waste of money.";
gun2.takeText = "You pick up the gun and put it in your inventory. Your manliness stat has increased by 5."

itemCollection.push(gun2);

var door3 = Object.create(Item);
door3.id = 2;
door3.name = "the office front door";
door3.interactNames = "door;front door; office front door;";
door3.verbs = "look;examine;open";
door3.description = "The front door of your office. The words on it read 'Blockhead - I do anything, give me work. Please.' You were hoping the desperate worker angle would bring in lots of customers, but so far all it's done is become on a meme on the trendiest social networking sites.";

itemCollection.push(door3);

var coatRack4 = Object.create(Item);
coatRack4.id = 3;
coatRack4.name = "a coat rack";
coatRack4.interactNames = "rack;coat rack";
coatRack4.verbs = "look;examine";
coatRack4.description = "A coat rack. You don't own any coats. This coat rack's existence is about as redundant as your own."

itemCollection.push(coatRack4);

var desk5 = Object.create(Item);
desk5.id = 4;
desk5.name = "your white desk";
desk5.interactNames = "desk;white desk";
desk5.verbs = "look;examine;open";
desk5.description = "Your blank white desk, complete with one singular blank white drawer. If this world wasn't entirely black and white, you'd have some difficulty keeping this clean, but thankfully this abstract concept hasn't even crossed your mind.";
desk5.containedItems = "3";
desk5.openText = "You open your desk drawer, revealing some pointless trinkets that you're not even going to bother mentally describing to yourself. Oh, yes, also a gun.";

itemCollection.push(desk5);

//End Starting Room
