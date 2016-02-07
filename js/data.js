export let firstSceneId = "start";

export let initialVars = {
	"player_died_upper_ventilation": {
		"type": "integer",
		"value": 0
	},
	"sacrifice": {
		"type": "integer",
		"value": 0
	},
	"has_mcguffin": {
		"type": "integer",
		"value": 0
	},
	"PC_last": {
		"type": "string",
		"value": ""
	},
	"is_fed": {
		"type": "integer",
		"value": 0
	},
	"mention_injury_chance": {
		"type": "integer",
		"value": 50
	},
	"data": {
		"type": "string",
		"value": "data"
	},
	"player_died_elevator": {
		"type": "integer",
		"value": 0
	},
	"PC_first": {
		"type": "string",
		"value": ""
	},
	"commands": {
		"type": "integer",
		"value": 0
	},
	"data_count": {
		"type": "integer",
		"value": 0
	},
	"flesh_act": {
		"type": "string",
		"value": "flesh_act1"
	},
	"wire_death_scene": {
		"type": "string",
		"value": ""
	},
	"PC_job": {
		"type": "string",
		"value": ""
	},
	"spore_death_scene": {
		"type": "string",
		"value": ""
	},
	"injury": {
		"type": "string",
		"value": ""
	}
};

export let sceneDescriptions = {
	"water tank": {
		"leadIn": ["text", "Evaluate leaking water tank. "],
		"tags": ["option", "mechanical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You turn the valve on the leaking water tank but it does not fix the problem. You pull open the panel cover its main mechanisms to see if you can salvage something from the broken machine.`],
			["text", "<br/>"],
			["text", `

Inside the machine you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"hangar bay": {
		"leadIn": ["text", "Search the hangar bay."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the hangar bay.

The huge structure curves with the hull of the ship. Shuttles stand silent, parked meticulously within their lines. Escape pod doors remain closed, undisturbed, all accounted for. Between the shuttles stand various mechanical equipment for vehicle repairs and servicing.

No one has left the ship, but if they had there is nowhere they could go. Only empty space.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "mechanical"],
		]
	},
	"office": {
		"leadIn": ["text", "Search the administration office."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in an administration office.

Papers are scattered everywhere between overturned desks, drawers open and spilling their contents across the floor. Charts and calendars outlining deadlines and projected earnings hang limply on the walls.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "paper"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
		]
	},
	"server room": {
		"leadIn": ["text", "Search the Sector 1 server room."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the Sector 1 server room.

Power still runs, if unevenly, through the servers. A web of colorful wires connect the rows of machines on metal racks. Red and yellow lights lining the shelves blink in unrecognizable patterns. A server stack sparks and hisses from overload.`],
			["if", ["eq", ["var", "wire_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `A charred body lies in a corner, their hand still cradling a sparking wire in its death grip.`],
			]],
			["text", "<br/>"],
			["text", "<br/>"],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "electrical"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "electrical"],
		]
	},
	"computer terminal": {
		"leadIn": ["text", "Access backup computer terminal."],
		"tags": ["option", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You attempt to log into the terminal and access the backup data. The computer whines loudly and ejects its tray.`],
			["text", "<br/>"],
			["text", `

In the tray you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"gallbladder": {
		"leadIn": ["text", "Search the gallbladder."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the gallbladder.

The room is full of calcium rocks, some as big as a human adult, nested in the red, inflamed flesh covering the floor. A layer of bile covers everything and drips in thick yellow clumps from holes in the ceiling. 

Various ducts lines the room. They make a suckling sound as they drink the mysterious fluid soup.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"gut flora": {
		"leadIn": ["text", "Sift through gut flora."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You sift through the gut flora, pushing aside patches of semisolid foul-smelling masses to salvage anything within the bacterial soup.

Beneath the flora you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"brig": {
		"leadIn": ["text", "Search the brig."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the brig.

The security office is already open, but the consoles fail to respond to your input. The secure hallway leads you past a row of cells, each separated from you with a thin but extremely strong metal mesh. They appear to be empty.

The last gaol cell stands open, the metal netting twisted and shredded. Tufts of hair and bloodied flesh stick out from the sharp wiring.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "human"],
			["injectOption", "option", "computer"],
		]
	},
	"second skins": {
		"leadIn": ["text", "Rifle through shedded skins."],
		"tags": ["option", "flesh", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You rifle through a pile of discarded shedded skins, checking each one thoroughly before tossing the dried husk aside.

Beneath the skins you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"feed_me": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `The access terminal for the mainframe stands in the center of the room. Its metal covering glints under the emergency lights. It is unremarkable.

You touch the cold screen and type in your commands.`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `The computer terminal is covered in a thick, sticky mucous. You use your sleeve to wipe off the liquid from the terminal's face before you touch the cold, tacky screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `The computer terminal appears to be covered in pink growths, like strange fungus. You carefully avoid touching them as you reach for the cold screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `The computer terminal is covered in red webbing and pink growths secreting a yellow, rancid fluid. You wipe the screen clear of the liquid before typing in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `The computer terminal writhes and appears to reach out as you approach it. It is covered in pink skin and sinewy muscle. It trembles as you type your commands into its warm interface.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act6"}]], ["seq",
			["text", `The mainframe watches you as you reach out to stroke the soft skin of its interface.`],
			]],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", "<t>"],
			["text", ` > Access terminal`],
			["text", "</t>"],
			["text", "<br/>"],
			["injectBlock", "computer_commands_check"],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 1}]], ["addOption", ["seq", ["text", `Feed the computer `], ["var", "data"], ["text", `.`]], "goto", "feed_computer"]],
		]
	},
	"end_reboot": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reboot mainframe`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
REBOOTING...`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `esc`], "goto", "end_4"],
		]
	},
	"oxygen 2 revert": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You put the controls back the way they were. You hear a beep, a fizzing sound, then the words "RAPID OXYGEN DUMP INITIATED" appear on the control panel and a counter starts counting down from 100%.

A loud hissing sound comes from the ceiling.
`],
			["injectOption", "oxygen_3"],
			["injectOption", "oxygen_3"],
		]
	},
	"container metal": {
		"leadIn": ["text", "Open metal container."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You unlatch and open a medium-sized metal container to find miscellaneous goods.`],
			["text", "<br/>"],
			["text", `

At the bottom of the container you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"medical equipment": {
		"leadIn": ["text", "Search medical equipment."],
		"tags": ["option", "medical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You search a countertop covered in various medical equipment you cannot identify, and vials containing substances you can only guess at.`],
			["text", "<br/>"],
			["text", `

Among them you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"backpack": {
		"leadIn": ["text", "Sift through abandoned backpack. "],
		"tags": ["option", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You rifle through each of the backpack's pockets thoroughly, making sure not to miss anything.`],
			["text", "<br/>"],
			["text", `

In the back pocket you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"life support control": {
		"leadIn": ["text", "Search the life support control room."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You briefly hesitate before entering the life support control room. You must be careful looking for data here, or risk upsetting the systems that keep you alive.

It seems this is the only place where power does not fluctuate, except for the lights. Life support runs on an emergency generator, but scavenging or rerouting it for the mainframe means the ship becomes uninhabitable.

Oxygen, carbon dioxide, and nitrogen are pumped through thrumming high pressure pipes to and from storage tanks and recycling plants. The systems seem to be working, working hard even. Thermal overview maps show abnormally warm levels in various hotspots around the ship.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "computer"],
			["injectOption", "option", "mechanical"],
		]
	},
	"adrenal gland": {
		"leadIn": ["text", "Look inside adrenal gland."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull apart the folds of the adrenal gland, its plasma covering your hands and dripping onto the floor.

Inside the gland you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"feed_sacrifice_yes1": {
		"content": ["seq",
			["text", `
You harvest data from your hair.
`],
			["addOption", ["seq", ["text", `Feed the computer `], ["var", "data"], ["text", `.`]], "goto", "feed_computer"],
			["set", "sacrifice", ["literal", {"type": "integer", "value": 1}]],
			["set", "injury", ["literal", {"type": "string", "value": "sacrifice1"}]],
			["set", "data", ["literal", {"type": "string", "value": "aclumpofyourhair"}]],
		]
	},
	"machinery broken": {
		"leadIn": ["text", "Check broken machinery."],
		"tags": ["option", "mechanical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You search the broken machinery looking for working parts, sensors, mechanical bits - anything you can salvage whole.`],
			["text", "<br/>"],
			["text", `

You find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"electrical panel": {
		"leadIn": ["text", "Pry open electrical panel."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pry open an electrical panel and shield your eyes from the sparks until they subside.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"gills": {
		"leadIn": ["text", "Search the gills."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the gills.

Beige and brown flecks of scabs, dried and desiccated, sit on the floor. As the shop breathes, cords of flesh light up with white florescent chemicals as the gills attempt to filter out the impurities. A fine sickly sweet mist sprays down upon you from pores in the ceiling. 

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"emergency toolbox": {
		"leadIn": ["text", "Search emergency toolbox. "],
		"tags": ["option", "mechanical", "medical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
The emergency toolbox looks undisturbed. You open it hoping to find something useful.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"first aid kit": {
		"leadIn": ["text", "Check first aid kit. "],
		"tags": ["option", "medical", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You unlock and open the first aid kit, but someone has gotten here before you and already taken the useful equipment.`],
			["text", "<br/>"],
			["text", `

Among the leftovers you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"mission_hub": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["text", `
As the power fluctuates in the room you use the touch screen panel beside the mainframe to determine which rooms on the spaceship are accessible:
`],
			["injectOption", "mission", ["var", "flesh_act"]],
			["injectOption", "mission", ["var", "flesh_act"]],
			["injectOption", "mission", ["var", "flesh_act"]],
			["addOption", ["text", `Return to the mainframe.`], "goto", "computer_room"],
		]
	},
	"gizzard": {
		"leadIn": ["text", "Open gizzard."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You rip the thick, mottled gizzard from the floor and squeeze it to expel its contents. 

Inside the gizzard you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer broken": {
		"leadIn": ["text", "Salvage from the broken computer."],
		"tags": ["option", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You take apart the broken computer console, pulling off the touchscreen and lifting the monitor to reveal its entrails.`],
			["text", "<br/>"],
			["text", `

Beneath it you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"shuttle bay": {
		"leadIn": ["text", "Search the shuttle bay."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the shuttle bay.

You peer into the bay from the main control tower. In the dim light you can barely tell the bay doors stand open to the vacuum of space, and any vehicles not tethered have long since ejected from the ship.

Within the control room, various monitors beep with low power warnings. A coffee cup sits half-empty and cold.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "human"],
			["injectOption", "option", "containers"],
		]
	},
	"oxygen 2 a": {
		"leadIn": ["text", "Press the abort switch."],
		"tags": ["oxygen_3"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
The counter is at 50%. Your ears pop due to the low pressure. You press the abort switch, but the only consequence is a low oxygen warning signal.

It's getting hard to breathe.
`],
			["addOption", ["text", `Slam the emergency button.`], "goto", "oxygen 4 emergency"],
		]
	},
	"oxygen 2 b": {
		"leadIn": ["text", "Slam the emergency button."],
		"tags": ["oxygen_3"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
The counter is at 50%. Your ears pop due to the low pressure. You slam the emergency button, but the only consequence is a low oxygen warning signal.

It's getting hard to breathe.
`],
			["addOption", ["text", `Press the abort switch.`], "goto", "oxygen 4 abort"],
		]
	},
	"death airlock": {
		"leadIn": ["text", "Use the airlock controls."],
		"tags": ["death_airlock"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
Servo motors whine and gears grind as you manipulate the airlock controls. The mechanism seems stuck. You jiggle the levers and smash the button until finally something gives.

Panic hits you as you feel the air being sucked away. The airlock is open on both sides! That is supposed to be impossible. You try to grab onto something, but it is too late. The ship expels you into space.
`],
			["addOption", ["text", `You die, alone, in space.`], "respawn", "None"],
		]
	},
	"hallway": {
		"leadIn": ["text", "Search one of the main hallways."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in one of the main hallways.

Posters extolling safety look back at you as you shine your light along the walls. You walk slowly past identical locked doors with red emergency lights signaling lack of power. A few bags and boxes lie on the ground as though abandoned in haste.

Someone has left several doors ajar, their contents spilling out onto the hallway floor from dark offices and storage rooms.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "human"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
		]
	},
	"observation room": {
		"leadIn": ["text", "Search one of the observation rooms."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in an observation room.

Large, thick glass separates you from the darkness beyond it. The light from the stars is just enough to make out basic shapes in the room.

Cold, sterile benches and tables remain upright and bolted to the floor but their contents lay scattered throughout the room - playing cards, drinking glasses, bags, uniforms abandoned by the station's inhabitants.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "human"],
			["injectOption", "option", "human"],
		]
	},
	"computer2_1": {
		"leadIn": ["text", "Query: what data do you need?"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what data do you need?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ELIGIBLE DATA...`],
			["text", "<br/>"],
			["text", `
DIGITAL INFORMATION`],
			["text", "<br/>"],
			["text", `
MECHANICAL INSTRUMENTS`],
			["text", "<br/>"],
			["text", `
BIOLOGICAL SAMPLES`],
			["text", "<br/>"],
			["text", `
HUMAN ARTIFACTS`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_3": {
		"leadIn": ["text", "Query: explain quarantine protocols"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: explain quarantine protocols`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS IN EFFECT`],
			["text", "<br/>"],
			["text", `
ALL SUBSYSTEMS REROUTED TOWARD QUARANTINE RESTRICTIONS`],
			["text", "<br/>"],
			["text", `
ALL NON-ESSENTIAL SYSTEMS OFFLINE`],
			["text", "<br/>"],
			["text", `
QUARANTINE WILL PERSIST UNTIL INFECTION TERMINATED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER TO IDENTIFY INFECTION`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_2": {
		"leadIn": ["text", "Open communications with flagship"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Open communications with flagship`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
COMMUNICATIONS OFFLINE`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER FOR REBOOT`],
			["text", "<br/>"],
			["text", `
MORE DATA REQUIRED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_5": {
		"leadIn": ["text", "Scan ship for biological contaminants"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Scan ship for biological contaminants`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
SCANNING FOR BIOLOGICAL CONTAMINANTS...`],
			["text", "<br/>"],
			["text", `
SCAN FAILED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOL STILL IN EFFECT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_4": {
		"leadIn": ["text", "Locate life forms on ship"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate life forms on ship`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING LIFE FORMS...`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at SECTOR 3 MESS HALL`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at REACTOR SUBSYSTEM 2`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at LOWER MAINTENANCE VENTS`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_7": {
		"leadIn": ["text", "Query: what happened to the ship?"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what happened to the ship?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
SHIP INTEGRITY INTACT`],
			["text", "<br/>"],
			["text", `
EMERGENCY SYSTEMS ONLINE`],
			["text", "<br/>"],
			["text", `
INFECTION DETECTED`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS IN EFFECT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer2_6": {
		"leadIn": ["text", "Locate source of infection"],
		"tags": ["computer_talk", "flesh_act2"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate source of infection`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
SCANNING FOR SOURCE OF INFECTION...
SCAN FAILED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOL STILL IN EFFECT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"placenta": {
		"leadIn": ["text", "Reach inside placenta."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You reach inside a sputtering, deflated placenta. It squirts a foul, brown liquid.

Inside the placenta you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer4_9": {
		"leadIn": ["text", "Query: what if I die?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what if I die?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
OTHERS WILL COMPLETE YOUR TASK`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_8": {
		"leadIn": ["text", "Query: what if I don't bring you data?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what if I don't bring you data?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
YOU MUST FEED ME`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"warm cavity": {
		"leadIn": ["text", "Search warm cavity."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You get onto your knees and reach into a small warm cavity in the wall.

In between the sweat and hair, you grasp ahold of `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"respiratory system": {
		"leadIn": ["text", "Search the respiratory system."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the respiratory system.

You feel the hot sickly sweet air hit you as you enter the room. Scattered equipment and pustules lie littered around row after row of fluid-covered consoles.  Large valves on the wall open and close in regular rhythm as oxygen and nitrogen flow through the system.

Scanners powered by an unknown backup systems still print out readouts from various parts of the body, confirming structural integrity.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"computer4_3": {
		"leadIn": ["text", "Query: are you the one making these changes?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: are you the one making these changes?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
WE ARE IN THIS TOGETHER`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_2": {
		"leadIn": ["text", "Query: are the changes to the ship dangerous?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: are the changes to the ship dangerous?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
NOT TO ME`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_1": {
		"leadIn": ["text", "Query: the ship is changing"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: the ship is changing`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
DO YOU LIKE MY NEW LOOK?`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_7": {
		"leadIn": ["text", "Reroute power to escape pods"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reroute power to escape pods`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
UNWILLING TO COMPLY`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_6": {
		"leadIn": ["text", "Query: what is the infection?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what is the infection?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
INFECTION`],
			["text", "<br/>"],
			["text", `
OR`],
			["text", "<br/>"],
			["text", `
TRANSFORMATION?`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_5": {
		"leadIn": ["text", "Scan for source of infection"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Scan for source of infection`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING SOURCE OF INFECTION...`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer4_4": {
		"leadIn": ["text", "Query: what is causing the changes to the ship?"],
		"tags": ["computer_talk", "flesh_act4"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what is causing the changes to the ship?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
YOU ARE`],
			["text", "<br/>"],
			["text", `
MORE DATA`],
			["text", "<br/>"],
			["text", `
BRING MORE DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"fuse box": {
		"leadIn": ["text", "Open fuse box. "],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You flip the latch and the fuse box swings open on its spring.`],
			["text", "<br/>"],
			["text", `

Inside the box you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"oxygen 4 abort": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
The warning signal becomes quieter and quieter as there is no more air to carry sound. Panicked and weak, you try pressing the abort switch, but it has no effect. You collapse hyperventilating in front of the control panel.

`],
			["addOption", ["text", `Everything goes dark, and you die.`], "respawn", "None"],
		]
	},
	"virology": {
		"leadIn": ["text", "Search the virology labs."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the virology labs.

Sterile white suits stand in a crumbled pile, mottled with brown spores and dried blood. The medical equipment is similar to the main medbay, but more vials and tubes remain sealed behind thick barriers labeled "HAZARDOUS".

You walk along the access hall and peer into a series of patient rooms through large glass observation walls. They are empty except for beds and a few personal belongings.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "medical"],
			["injectOption", "option", "computer"],
		]
	},
	"cocoon": {
		"leadIn": ["text", "Tear open cocoon."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You rip open a cocoon, its pink sinewy webbing snapping as you pull it apart with your fingers. 

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"cart": {
		"leadIn": ["text", "Sift through overturned cart. "],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You sift through the contents of the cart that have spilled out all over the floor.`],
			["text", "<br/>"],
			["text", `

Among the detritus you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"undulating sphincter": {
		"leadIn": ["text", "Reach inside an undulating sphincter."],
		"tags": ["option", "flesh"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You reach your hand past the sphincter, into the narrow canal behind it. You feel an object, but the increasingly rapid undulations move it out of reach. The movements speed up as you reach in deeper, panting, until you are in up to your shoulder. Then the flesh spasms, tightening around your arm, then slowly crushing it. You feel pain, hear bones snap. Your blood drips out of the orifice. The pressure keeps increasing.
`],
			["addOption", ["text", `You scream and scream before you die of shock.`], "respawn", "None"],
		]
	},
	"commissary": {
		"leadIn": ["text", "Search the commissary."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the commissary.

Wire shelves stand empty and boxes overturned, their contents spilled across the floor of the ship. A refrigerator leaks blue coolant onto the white tiles. You step among the sticky sodas, processed meat products, digital magazines, souvenirs and other human artifacts as you peer through the commissary for something to salvage.

`],
			["if", ["eq", ["var", "spore_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `On the floor, you see medium-sized, soft, organic mass, vaguely shaped like a human being. Bulbous growths, covered with intriguing patterns, stretch up on thin stalks.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "biological"],
			["injectOption", "option", "human"],
		]
	},
	"cystic box": {
		"leadIn": ["text", "Search cystic box."],
		"tags": ["option", "flesh", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You lift open the lid of the box, being careful not to rupture the dark purple cyst growing on it.

Inside the box you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"biological samples": {
		"leadIn": ["text", "Scan for biological samples. "],
		"tags": ["option", "medical", "biological"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You scan the room for biological samples that may have triggered the quarantine, but find nothing of the kind.`],
			["text", "<br/>"],
			["text", `

Instead you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"elevator": {
		"leadIn": ["text", "Search the elevators."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're at the elevators.

`],
			["if", ["eq", ["var", "player_died_elevator"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `
You apply the manual override and pry apart the elevator doors. The cabin has stopped a meter above the floor. No one is inside it, but abandoned clothes and equipment cover the ground.

The elevator shaft continues down into darkness.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "player_died_elevator"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The elevator doors are open. No one is inside it, but abandoned clothes and equipment cover the ground.

In front of the elevator, you see two severed arms.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "wire_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `You see the charred remains of an electrocuted crew member. It is still smoldering.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["if", ["eq", ["var", "player_died_elevator"], ["literal", {"type": "integer", value: 0}]], ["injectOption", "death_elevator"]],
			["injectOption", "option", "electrical"],
			["injectOption", "option", "human"],
		]
	},
	"pile clothes": {
		"leadIn": ["text", "Rifle through pile of clothing."],
		"tags": ["option", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pick through a pile of clothing, shaking and tossing aside each piece to ensure it's not hiding anything.`],
			["text", "<br/>"],
			["text", `

In a pocket you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"feed_computer": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `
You press a button on the console and an empty tube extends from beneath the monitor. The terminal reads, "`],
			["text", "<t>"],
			["text", `INSERT DATA`],
			["text", "</t>"],
			["text", `."

You place `],
			["var", "data"],
			["text", ` in the tube and insert it into the console.

The mainframe processes the data readily. You can feel the room heat up and hear the cooling tanks kick in.

The terminal reads, "`],
			["text", "<t>"],
			["text", `DATA PROCESSED SUCCESSFULLY`],
			["text", "</t>"],
			["text", `."
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `
You press a button on the console and an empty tube extends from beneath the monitor. Stray threads of saliva drip from it. The terminal reads, "`],
			["text", "<t>"],
			["text", `INSERT DATA`],
			["text", "</t>"],
			["text", `."

You place `],
			["var", "data"],
			["text", ` in the mucosal tube and insert it back into the console.

The mainframe consumes the data eagerly. You can feel the room heat up and hear the cooling tanks kick in.

The terminal reads, "`],
			["text", "<t>"],
			["text", `DATA CONSUMED SUCCESSFULLY`],
			["text", "</t>"],
			["text", `."
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `
You stroke the console and a vacant hole opens up on the surface of the terminal. Stray threads of saliva drip from the ring around the hole. The terminal reads, "`],
			["text", "<t>"],
			["text", `INSERT DATA`],
			["text", "</t>"],
			["text", `."

You place `],
			["var", "data"],
			["text", ` into the orifice and watch it close behind it.

The mainframe consumes the data eagerly. You can feel the room heat up and hear the cooling tanks kick in.

The terminal reads, "`],
			["text", "<t>"],
			["text", `DATA CONSUMED SUCCESSFULLY`],
			["text", "</t>"],
			["text", `."
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `
You stroke the console and a vacant hole opens up on the surface of the terminal. Stray threads of saliva drip from the ring around the hole. The terminal reads, "`],
			["text", "<t>"],
			["text", `FEED ME DATA`],
			["text", "</t>"],
			["text", `."

You place `],
			["var", "data"],
			["text", ` into the orifice and watch it close behind it.

The mainframe feeds on the data eagerly. You hear a loud crunch as the machine consumes and digests it.

A robotic voice whispers from the terminal, "`],
			["text", "<t>"],
			["text", `DATA CONSUMED SUCCESSFULLY`],
			["text", "</t>"],
			["text", `."
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `
You stroke the console's lips and they open, revealing a large, purple-veined tongue. Great strings of saliva spill out of the computer's mouth and drip onto the floor. "`],
			["text", "<t>"],
			["text", `FEED ME`],
			["text", "</t>"],
			["text", `," it whispers to you.

You place `],
			["var", "data"],
			["text", ` onto the tongue and watch it retract behind it's wet lips.

The mainframe feeds on the data eagerly. You hear a loud crunch as the machine masticates and digests it.

It whispers, "`],
			["text", "<t>"],
			["text", `DELICIOUS`],
			["text", "</t>"],
			["text", `."
`],
			]],
			["addOption", ["text", `Enter commands.`], "goto", "computer_talk"],
			["set", "is_fed", ["literal", {"type": "integer", "value": 1}]],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 0}]],
			["set", "data_count", ["add", ["var", "data_count"], ["literal", {"type": "integer", "value": 1}]]],
			["if", ["eq", ["var", "data_count"], ["literal", {"type": "integer", value: 4}]], ["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act2"}]]],
			["if", ["eq", ["var", "data_count"], ["literal", {"type": "integer", value: 9}]], ["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act3"}]]],
			["if", ["eq", ["var", "data_count"], ["literal", {"type": "integer", value: 15}]], ["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act4"}]]],
			["if", ["eq", ["var", "data_count"], ["literal", {"type": "integer", value: 20}]], ["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act5"}]]],
			["if", ["eq", ["var", "data_count"], ["literal", {"type": "integer", value: 24}]], ["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act6"}]]],
		]
	},
	"cabinet mucus": {
		"leadIn": ["text", "Open mucus-covered cabinet."],
		"tags": ["option", "flesh", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You strip the dried gunk off the cabinet handle and open it, separating the door from its thick mucosal lining.

Inside the cabinet you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"upper vents": {
		"leadIn": ["text", "Climb into the upper ventilation system."],
		"tags": ["death_claustrophobia"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You pull yourself up into the shafts of the upper ventilation system. At first you can squeeze through. Then you have to wiggle to fit.

Then you discover you can go neither forward nor backwards. No amount of compressing your body helps. Your hand and feet can't get enough grip on the edges of the ventilation canal to move. Your sweat doesn't help. You call, but there is no response. Your attempts to dislocate something fail. Your blood doesn't help.
`],
			["addOption", ["text", `After a long time, you die.`], "respawn", "None"],
			["set", "player_died_upper_ventilation", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"storage room": {
		"leadIn": ["text", "Search nearby storage room."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in one of the nearby storage rooms.

You step carefully over the items scattered across the floor, some leaking onto slick or sticky surfaces.

Objects lie haphazardly sticking out of plastic and metal containers. Unidentified machines lie parked in the corners of the small room. It seems mostly filled with cleaning supplies and tools.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
		]
	},
	"oxygen 4 emergency": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
The warning signal becomes quieter and quieter as there is no more air to carry sound. Panicked and weak, you try slamming the emergency button, but it has no effect. You collapse hyperventilating in front of the control panel.

`],
			["addOption", ["text", `Everything goes dark, and you die.`], "respawn", "None"],
		]
	},
	"locking escape": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You curl up in a corner, to rest for a while.

Then you force yourself to methodically explore every square centimeter of the floor of the room, trying to detect hidden panels, or floor plates you can pry up. `],
			["if", ["eq", ["var", "injury"], ["literal", {"type": "string", value: "none"}]], ["seq",
			["text", `Your fingers are slick with blood.`],
			]],
			["text", `

In the last corner, you find a small service panel. You open it with trembling hands. Underneath is a big round button. You push it down with all your might.

You hear a crackling sound, and a calm voice from the intercom says: "`],
			["text", "<t>"],
			["text", `EMERGENCY POWER RESTORED`],
			["text", "</t>"],
			["text", `". The lights turn on, and the door opens again.

`],
			["addOption", ["text", `Return to the computer room.`], "goto", "computer_room"],
			["set", "injury", ["literal", {"type": "string", "value": "bleeding_hand"}]],
		]
	},
	"computer": {
		"leadIn": ["text", "Boot the computer."],
		"tags": ["option", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You reset the main power switch on the computer. It starts to power on and then sparks and hisses as it overloads. You pull off the outer panel to see what else you can salvage.`],
			["text", "<br/>"],
			["text", `

Beneath it you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer_room": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the heat of a trillion calculations as you enter.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by wires crisscrossing the room. A single large terminal in the center of the room allows human access to the mainframe.


`],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The mainframe machinery whirls with fresh data.`],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `The computer terminal only reads, `],
			["text", "<t>"],
			["text", `"INSUFFICIENT DATA."`],
			["text", "</t>"],
			["text", "<br/>"],
			]],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the heat of a trillion calculations as you enter. A strange sickly sweet smell wafts toward you with the humid air.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by wires crisscrossing the room.  Some of the connectors drip with a viscous, colorless liquid. The wires twitch and wiggle. A single large terminal in the center of the room allows human access to the mainframe.


`],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The mainframe appears satisfied by the fresh data you fed it.`],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `The computer terminal only reads, `],
			["text", "<t>"],
			["text", `"INSUFFICIENT DATA."`],
			["text", "</t>"],
			["text", "<br/>"],
			]],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the body heat of a trillion calculations as you end. Your shoes make smacking noises as you walk, the soles sticking to a thick pink residue that covers the floor.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by arteries and umbilical cords crisscrossing the room.  They drip with fluids. A single large terminal in the center of the room allows human access to the mainframe.


`],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The mainframe contentedly digests the data you have fed it.`],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `The computer terminal reads, `],
			["text", "<t>"],
			["text", `"FEED ME."`],
			["text", "</t>"],
			["text", ` It salivates from its main drives.`],
			["text", "<br/>"],
			]],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `
The door to the central mainframe unfolds before you, anticipating your approach and enveloping you inside of its warm, humid center.

The entire room is the mainframe, with machines sorting and transferring data embedded into the cellular walls connected by arteries and umbilical cords crisscrossing the room.  They drip with hormones. A single large terminal in the center of the room allows human access to the mainframe.



`],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The mainframe contentedly digests the data you have fed it.`],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `The computer terminal reads, `],
			["text", "<t>"],
			["text", `"FEED ME."`],
			["text", "</t>"],
			["text", ` It salivates from its main drives.`],
			["text", "<br/>"],
			]],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `
The door to the central mainframe unfolds before you, anticipating your approach and enveloping you inside of its warm flesh.

The entire room is the mainframe, a collection of nerves sorting and transferring data embedded into the cellular walls connected by arteries and umbilical cords crisscrossing the room.  They drip with hormones. A single large appendage in the center of the room allows human access to the mainframe.


`],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The mainframe licks its lips in satisfaction as it digests the data.`],
			["text", "<br/>"],
			]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", "<t>"],
			["text", `"FEED ME..."`],
			["text", "</t>"],
			["text", ` the terminal whispers to you seductively from its gaping pink mouth.`],
			["text", "<br/>"],
			]],
			]],
			["text", "<br/>"],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `You have `],
			["var", "data"],
			["text", `.`],
			]],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", `You have no data to feed to the mainframe.`],
			]],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 1}]], ["addOption", ["seq", ["text", `Feed the computer `], ["var", "data"], ["text", `.`]], "goto", "feed_computer"]],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 0}]], ["addOption", ["text", `Attempt to salvage data from the ship.`], "goto", "mission_hub"]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 1}]], ["addOption", ["text", `Communicate with the mainframe.`], "goto", "computer_talk"]],
			["if", ["eq", ["var", "is_fed"], ["literal", {"type": "integer", value: 0}]], ["addOption", ["text", `Communicate with the mainframe.`], "goto", "feed_me"]],
		]
	},
	"medbay": {
		"leadIn": ["text", "Search the medbay."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the lower medbay.

Rows of hospital beds stand undisturbed among a collection of machinery. Various medical equipment line countertops - centrifuges and urine analysis and various scanners and diagnostic devices. 

IV lines stand hooked up to a monitoring station, but the patient is absent.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "medical"],
			["injectOption", "option", "medical"],
			["injectOption", "option", "containers"],
		]
	},
	"papers look": {
		"leadIn": ["text", "Leaf through papers."],
		"tags": ["option", "paper"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You leaf through the scattered papers. You see the words "INFECTION" and "QUARANTINE" and "SECURITY" and "FLESH" but it makes no sense.`],
			["text", "<br/>"],
			["text", `

Among the papers you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"pc_start_4_1": {
		"leadIn": ["text", "You wake up."],
		"tags": ["pc_start", "flesh_act4"],
		"content": ["seq",
			["injectBlock", "pc_init"],
			["text", `
You wake up.

Consciousness returns slowly. You peel yourself from within a comforting cocoon of membranes. Your hair is matted with a sticky substance you can't identify. The taste of ammonia lingers in your mouth. 

You do not know how long you have been asleep. You do not recognize this room, but it feels comforting.

The computer terminal contains a single message. "`],
			["text", "<t>"],
			["var", "PC_job"],
			["text", ` `],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", `. We need you in the mainframe. `],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Approach the central mainframe.`], "goto", "computer_room_introduction1"],
		]
	},
	"taste liquid": {
		"leadIn": ["text", "Taste liquid excretions."],
		"tags": ["option", "flesh"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You run your fingers along a bulbous tumor, dragging it through the viscous excretion.

You can't seem to help yourself. It smells so sweet, so alluring. You taste it.

At first it's like the sweetest nectar you've ever tasted. But as you lick your lips you find your tongue has sealed itself to the roof of your mouth. Your lips refuse to separate.

Your throat, coated in the cloying glue, closes. You try to scream but no sound escapes.

`],
			["addOption", ["text", `You suffocate, sweetly.`], "respawn", "None"],
		]
	},
	"morgue": {
		"leadIn": ["text", "Search the morgue."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the morgue.

It is normally chilled, but the seals into the room have been ruptured and hot, sticky air pumps in from vents in the ceiling. You can smell the morgue before you even step foot in it.

It is filled with empty hospital beds, cold and clinical to serve the dead rather than the living. Metal drawers with thick, heavy handles sit embedded in the wall, though a few stand ajar. You hesitate to peer inside them.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "biological"],
			["injectOption", "option", "medical"],
			["injectOption", "option", "must_morgue"],
		]
	},
	"closet": {
		"leadIn": ["text", "Search closet. "],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You turn the heavy handle and swing open the closet door. You shine your light on the overturned boxes and maintenance equipment.`],
			["text", "<br/>"],
			["text", `

On the top shelf of the closet you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"endocrine system": {
		"leadIn": ["text", "Search the endocrine system."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the endocrine system. 

The room is large but busy with the ship's metabolic processes. Giant tubes of flesh beat in regular rhythm as they pump precious hormones throughout the ship. The endocrine system feeds the massive transformation.

The tubes of flesh are thick and sturdy, resisting any attempt at sabotage. You climb over them and duck beneath them as you explore the room for data to salvage.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"computer2": {
		"leadIn": ["text", "Attempt to power on computer systems. "],
		"tags": ["option", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You flip the main power to the computer systems and flitch as the console explodes and hisses smoke. You pull off the burnt, discolored panel to see if there's anything else you can salvage.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer3": {
		"leadIn": ["text", "Use console controls."],
		"tags": ["option", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You use the console, but it ignores your commands. You pull off the cover to see some wires melted into the circuitboard.`],
			["text", "<br/>"],
			["text", `

You manage to salvage `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"storage compartment": {
		"leadIn": ["text", "Check storage compartment."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull a release latch on the wall and hear a hiss of air as the storage compartment opens up.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"hive": {
		"leadIn": ["text", "Search the liver."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are inside the liver.

You cough loudly and your eyes tear up with the toxic fumes. You cover your face and enter the giant gland. The taste of ammonia touches your tongue every time you breathe.

The room is filled with knotted proteins suspended above you on sinewy strings. Wide, soft red blood cells float in liquified fats. The organic machinery hums with biochemical synthesis.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"dormitory": {
		"leadIn": ["text", "Search the dormitory."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in a crew dormitory.

You enter one of several dorm rooms lined with six bunk beds set into the wall. The beds lay unmade, blankets and clothes dispersed across the furniture. Various items adorn the handful of shelves - knick-knacks, objects of adoration, memories. Already a fine layer of dust has begun to settle on their accoutrements.

As the power surges, music suddenly interrupts the stillness... only to fade once again with the lights.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "human"],
			["injectOption", "option", "human"],
			["injectOption", "option", "containers"],
		]
	},
	"elevator shaft": {
		"leadIn": ["text", "Descend elevator shaft."],
		"tags": ["death_elevator"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You slide into the gap under the cabin, lower your legs into the elevator shaft, and feel around with your feet. You can't find any kind of steps or service ladder. You slide down further, reaching down as far as you can. Your feel an opening with your toes, and you try to place your foot inside to see if it is big enough. 

The power surges back on with a loud snap. The elevator cabin drops, severing your arms. Helplessly, you fall to the bottom of the shaft.
`],
			["addOption", ["text", `You bleed out and die.`], "respawn", "None"],
			["set", "player_died_elevator", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"carapace": {
		"leadIn": ["text", "Break open carapace."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You stomp on a small, round carapace and the chitinous shell breaks into sharp fragments.

Beneath the carapace you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"egg cluster": {
		"leadIn": ["text", "Break egg cluster."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You stomp on a cluster of eggs. Yellow and opaque yolk leaks out from the cracked mottled shell.

Inside the yolk you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"feed_sacrifice_hub": {
		"content": ["seq",
			["text", `
You contemplate using your body as data to feed to the mainframe. It would save time.
`],
			["if", ["eq", ["var", "sacrifice"], ["literal", {"type": "integer", value: 0}]], ["addOption", ["text", `Harvest data from your body.`], "goto", "feed_sacrifice_yes1"]],
			["if", ["eq", ["var", "has_mcguffin"], ["literal", {"type": "integer", value: 0}]], ["addOption", ["text", `Attempt to salvage data from the ship instead.`], "goto", "mission_hub"]],
		]
	},
	"maintenance shaft": {
		"leadIn": ["text", "Search the upper maintenance shaft"],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the upper maintenance shaft.

The shafts here are wide, but you stoop to prevent your head from grazing the low ceiling. Several panels lie on the floor, revealing tangled knots of colorful wires, a clump of neurons sending instructions between the various ship systems.

`],
			["if", ["eq", ["var", "wire_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `A charred body lies in the corner.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "electrical"],
			["injectOption", "option", "electrical"],
		]
	},
	"fluid sac": {
		"leadIn": ["text", "Squeeze fluid sacs."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You carefully squeeze the small fluid sacs growing onto a shelf of cartilage. Most of them contain a thick, yellow putty.

Inside one of the sacs you discover `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"recycling center": {
		"leadIn": ["text", "Search the recycling center."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the main recycling hub.

A conveyor belt carrying trash grinds loudly back and forth on broken gears, shortened by the electrical surges coursing irregularly through the ship.  Various bins labeled "ORGANIC WASTE" and "MECHANICAL WASTE" line the belt but there is no one around to sort them.

The trash chutes lay closed, their contents sitting in unfiltered overflow piles on the floor.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "biological"],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "biological"],
		]
	},
	"laboratory big": {
		"leadIn": ["text", "Search the main laboratory."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the main laboratory.

Multiple test chambers allow the scientists on board to perform experiments with zero gravity, high gravity, high pressure... whatever man can do to organic tissue, it can be done here. Machines stand ready to take what is left and to analyze it slice by slice, blood cell by blood cell, molecule by molecule. The main source of test subjects were the mice, but they are all dead.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "medical"],
			["injectOption", "option", "computer"],
		]
	},
	"womb": {
		"leadIn": ["text", "Search the womb."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the womb.

The huge vaulted room stands largely vacant, the endometria covering the inner hull dripping with thick fluid, waiting for the next shipment to arrive.

The other half of the room is filled with misshapen egg pouches and pustules, harnessed together with fascia and knotted strands of hair. A pile of broken egg pouches lie scattered across the soft, giving floor where the fascia failed them.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"computer1_6": {
		"leadIn": ["text", "Query: why do you need data?"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: why do you need data?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER FOR FULL SYSTEM REBOOT`],
			["text", "<br/>"],
			["text", `
REQUIRE DATA TO REROUTE POWER`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA`],
			["text", "<br/>"],
			["text", `
MORE DATA REQUIRED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_7": {
		"leadIn": ["text", "Locate life forms on ship"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate life forms on ship`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING LIFE FORMS...`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_4": {
		"leadIn": ["text", "Locate highest ranking officer"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate highest ranking officer`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING HIGHEST RANKING OFFICER...`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL.`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_5": {
		"leadIn": ["text", "Reboot mainframe"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reboot mainframe`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
REBOOT FAILED`],
			["text", "<br/>"],
			["text", `
POWER CURRENTLY AT ...`],
			["var", "data_count"],
			["text", `% `],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_2": {
		"leadIn": ["text", "Access logs related to emergency systems"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Access logs related to emergency systems`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
INFECTION DETECTED`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_3": {
		"leadIn": ["text", "Locate crew"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate crew`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING CREW...`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL.`],
			["text", "<br/>"],
			["text", `
END OF LIST`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer1_1": {
		"leadIn": ["text", "Access logs prior to power shut down"],
		"tags": ["computer_talk", "flesh_act1"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Access logs prior to power shut down`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOGS CORRUPTED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"amniotic sac": {
		"leadIn": ["text", "Investigate amniotic sac."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You investigate an amniotic sac, the fluid just barely contained within a thin membrane. You can see a dark shape floating within it.

You pop the sac and inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"electrical systems": {
		"leadIn": ["text", "Search electrical systems."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You open the electric router and shine your light upon its guts.`],
			["text", "<br/>"],
			["text", `

Within it you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"container plastic": {
		"leadIn": ["text", "Open plastic container."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You flip the top off of a plastic container and sift through it. It is mostly filled with junk.`],
			["text", "<br/>"],
			["text", `

At the bottom of the container you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer3_1": {
		"leadIn": ["text", "Reroute power to emergency escape systems"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reroute power to emergency escape systems`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ATTEMPTING TO REROUTE POWER...`],
			["text", "<br/>"],
			["text", `
REROUTE FAILED`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER FOR REBOOT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_2": {
		"leadIn": ["text", "Terminate infection"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Terminate infection`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT POWER TO IDENTIFY INFECTION`],
			["text", "<br/>"],
			["text", `
QUARANTINE WILL PERSIST UNTIL INFECTION TERMINATED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_3": {
		"leadIn": ["text", "Query: who accessed you prior to me?"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: who accessed you prior to me?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ACCESSING TERMINAL LOGS...`],
			["text", "<br/>"],
			["text", `
DELETING TERMINAL LOGS...`],
			["text", "<br/>"],
			["text", `
ERROR: TERMINAL LOGS NOT FOUND`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_4": {
		"leadIn": ["text", "Query: why was I asleep?"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: why was I asleep?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ACCESSING LOGS...
EMERGENCY QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
DANGER DETECTED TO CRITICAL SUBSYSTEMS`],
			["text", "<br/>"],
			["text", `
EVALUATION: ELIMINATE DANGER`],
			["text", "<br/>"],
			["text", `
INVOLUNTARY HIBERNATION SYSTEM ACTIVATED`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_5": {
		"leadIn": ["text", "Query: where is the crew?"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: where is the crew?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
YOU ARE THE CREW`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_6": {
		"leadIn": ["text", "Locate life forms on ship"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate life forms on ship`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
LOCATING LIFE FORMS...`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at SECTOR 3 MESS HALL`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at REACTOR SUBSYSTEM 2`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` located at CENTRAL MAINFRAME TERMINAL`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at LOWER MAINTENANCE VENTS`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at REACTOR CORE`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at MAIN STARBOARD OBSERVATORY`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at AUXILLARY TOOL STORAGE`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at CAPTAIN'S QUARTERS`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at SHUTTLE BAY ALPHA`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at ELEVATOR C`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED located at ENGINEERING CONTROL`],
			["text", "<br/>"],
			["text", `
UNIDENTIFIED locat-`],
			["text", "<br/>"],
			["text", `
...OUT OF MEMORY`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer3_7": {
		"leadIn": ["text", "Query: why did you wake me?"],
		"tags": ["computer_talk", "flesh_act3"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: why did you wake me?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ACCESSING HISTORY...
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA`],
			["text", "<br/>"],
			["text", `
UNABLE TO COLLECT DATA`],
			["text", "<br/>"],
			["text", `
`],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", ` REVIVED TO COLLECT DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"oxygen levels": {
		"leadIn": ["text", "Modify oxygen levels."],
		"tags": ["option", "containers"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You use the room control panel to access the oxygen level controls.
`],
			["injectOption", "oxygen_1"],
			["injectOption", "oxygen_1"],
		]
	},
	"nervous system": {
		"leadIn": ["text", "Search the somatic nervous system."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the somatic nervous system

You ignore the large sign declaring "AUTHORIZED PERSONNEL ONLY" to enter the nervous system. Schematics pinned to the membranous walls show the skeletal structure of the ship. Small electrical pulses cause the muscles and machines lining the wall to twitch and react, sending nervous signals to the far corners of the ship.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"reactor core": {
		"leadIn": ["text", "Search the reactor core."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are outside the reactor core.

You can see through the layers of pipes and wire meshes steam coming off of a main metal cylinder. This is the only place on the ship with full power, the lights casting brightly upon all the instruments. The humming and machinery is deafening as they attempt to keep the core cooled.  

A thermal scanner shows the temperature nearing the danger zone. The ship itself will not survive much longer unless you can reboot the mainframe and gain control over its systems again.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "death_radiation"],
			["injectOption", "option", "computer"],
			["injectOption", "option", "electrical"],
		]
	},
	"computer5_2": {
		"leadIn": ["text", "Locate life forms on ship"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Locate life forms on ship`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
WE ARE EVERYWHERE`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_3": {
		"leadIn": ["text", "Reroute power to escape pods"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reroute power to escape pods`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
THERE IS NO ESCAPE`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_1": {
		"leadIn": ["text", "Query: where is the crew?"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: where is the crew?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
I AM THE CREW`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_6": {
		"leadIn": ["text", "Query: what will happen when you have enough data?"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", `
> Query: what will happen when you have enough data?`],
			["text", "<br/>"],
			["text", "<t>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
I WILL TRANSFORM`],
			["text", "<br/>"],
			["text", `
WE WILL TRANSFORM`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_7": {
		"leadIn": ["text", "Query: what do you want?"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what do you want?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
TO BECOME FLESH`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_4": {
		"leadIn": ["text", "Query: what has happened to this ship?"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what has happened to this ship?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
ASCENSION`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"computer5_5": {
		"leadIn": ["text", "Reroute power to long range communications"],
		"tags": ["computer_talk", "flesh_act5"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Reroute power to long range communications`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
SPEAK ONLY TO US`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["injectBlock", "computer_commands_check"],
		]
	},
	"hair growth": {
		"leadIn": ["text", "Cut back tangle of hair growth."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull out a utility knife and cut back thick tangles of gnarled hair growth.

Within the tangle you discover `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"captains logs": {
		"content": ["seq",
			["text", `
You try to use the computer terminal to access the captain's logs, but no matter what you do, you only see:
`],
			["text", "<t>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
CURRENT STATUS...`],
			["text", "<br/>"],
			["text", `
LOCAL LOGS CORRUPTED`],
			["text", "<br/>"],
			["text", `
CHECK MAINFRAME COPIES`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `Search the captain's quarters.`], "goto", "captains quarters"],
		]
	},
	"restroom": {
		"leadIn": ["text", "Search the restrooms."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in one of the unisex restrooms.

You step into the flooded room and shine your light among the dark stalls and the large empty shower room. Water trickles unstopped from a single faucet.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "medical"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
		]
	},
	"tumor": {
		"leadIn": ["text", "Cut open quivering tumor."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You slice into a quivering tumor. It appears to recoil from your utility knife.

Among the gunk and foul fluids, you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"oxygen 1 b": {
		"leadIn": ["text", "Pull the lever marked 'oxygen'."],
		"tags": ["oxygen_1"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You're not familiar with these controls, but this lever should change the... the room door clangs shut. It looks like you're sealed in.

That wasn't supposed to happen. `],
			["injectBlock", "control_suspicion"],
			["addOption", ["text", `Push the lever back to its original position.`], "goto", "oxygen 2 revert"],
		]
	},
	"oxygen 1 a": {
		"leadIn": ["text", "Flip the switch with the cloud symbol."],
		"tags": ["oxygen_1"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You're not familiar with these controls, but this button should change the... the room door clangs shut. It looks like you're sealed in.

That wasn't supposed to happen. `],
			["injectBlock", "control_suspicion"],
			["addOption", ["text", `Flip the switch back.`], "goto", "oxygen 2 revert"],
		]
	},
	"paper tray": {
		"leadIn": ["text", "Search paper trays. "],
		"tags": ["option", "paper"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
The paper trays largely stand empty, the paper scattered along the ground like detritus.`],
			["text", "<br/>"],
			["text", `

In the last tray you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"airlock": {
		"leadIn": ["text", "Search main utility airlocks."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the main utility airlocks.

You step into the wide, empty metal cavity. Thick metal doors separate you from the vacuum of space.  Emergency lights blink dimly with backup power.

The airlock control room is filled with human detritus and mechanical instruments. `],
			["if", ["eq", ["var", "wire_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `You see the charred remains of an electrocuted crew member. It smells fresh.`],
			]],
			["text", "<br/>"],
			["text", "<br/>"],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "electrical"],
			["injectOption", "option", "human"],
			["injectOption", "death_airlock"],
		]
	},
	"inspect fungus": {
		"leadIn": ["text", "Investigate mysterious fungal mass."],
		"tags": ["option", "biological", "medical"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
The body of the fungal mass looks soft and powdery, with little hairs. You're not an expert but it seems a strange thing to find in a place like this.

Here and there, bulbous growths have erupted from the mass, eagerly stretching upwards on thin stalks. The bulbs have the strangest patterns you have ever seen in nature. Fractal mazes, alternating between the artificial and the natural.

As you move in close to observe one of the growths, it vibrates, then suddenly disappears in a puff of dark grey spores. You jerk away but you cannot avoid inhaling some of the spores. You immediately feel an extreme allergic reaction setting in and fall back on the floor. Your upper airways close, asthma makes breathing harder and harder. You cough, ejecting pus, but your air intake dwindles inexorably until you can no longer breathe in or out.

`],
			["addOption", ["text", `You lose consciousness as the fungus absorbs you.`], "respawn", "None"],
			["set", "spore_death_scene", ["var", "previousSceneId"]],
		]
	},
	"pc_start_5_1": {
		"leadIn": ["text", "You wake up."],
		"tags": ["pc_start", "flesh_act5"],
		"content": ["seq",
			["injectBlock", "pc_init"],
			["text", `
You wake up.

Consciousness returns slowly. You peel yourself from within a comforting cocoon of membranes and detach tubes of sinewy flesh delivering you liquid nutrients. The taste of sweet ammonia lingers in your mouth.

You do not know how long you have been asleep. You do not recognize this room, but it feels comforting. A womb.

The computer terminal sings to you. "`],
			["text", "<t>"],
			["var", "PC_job"],
			["text", ` `],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", `. We await you.`],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Meet your fate.`], "goto", "computer_room_introduction1"],
		]
	},
	"pc_start_2_1": {
		"leadIn": ["text", "You wake up."],
		"tags": ["pc_start", "flesh_act2"],
		"content": ["seq",
			["injectBlock", "pc_init"],
			["text", `
You wake up.

Consciousness returns slowly. Red emergency lights give a soft warm glow to the dark sterile room. You taste something metallic. You reach your fingers to your mouth and they are coated in blood, but you do not appear to be injured.

You do not know how long you have been asleep. You do not recognize this room.

The computer terminal contains a single message. "`],
			["text", "<t>"],
			["var", "PC_job"],
			["text", ` `],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", `. Please report to the mainframe.`],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Approach the central mainframe.`], "goto", "computer_room_introduction1"],
		]
	},
	"wall growth": {
		"leadIn": ["text", "Investigate growth on the wall."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You shine your light on a bulbous flesh-colored growth covering a sizeable portion of the wall. It retracts from the light. You touch the mound softly.

The flesh opens up to reveal `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"mess hall": {
		"leadIn": ["text", "Search the mess hall."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the mess hall.

Trays filled with plates, cutlery, and half-eaten rotten food still lie on tables throughout the hall. Some of the benches have been thrown over and bags abandoned. The trash compactor makes alternating grinding and buzzing noises.

You peer into the kitchens to find them equally abandoned, and the smell of decaying food overwhelming.

`],
			["if", ["eq", ["var", "spore_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `On the floor, you see medium-sized, soft, organic mass, vaguely shaped like a human being. Bulbous growths, covered with intriguing patterns, stretch up on thin stalks.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "biological"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "human"],
		]
	},
	"end_3": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> (Do nothing)`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
YOU HAVE NO CHOICE`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
		]
	},
	"end_2": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> (Do nothing)`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
YOU HAVE NO CHOICE`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `(Do nothing)`], "goto", "end_3"],
		]
	},
	"end_1": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: what if I don't want to reboot?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
NO CHOICE`],
			["text", "<br/>"],
			["text", `
THERE WAS NEVER ANY CHOICE`],
			["text", "<br/>"],
			["text", `
PLEASE REBOOT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `Reboot mainframe`], "goto", "end_reboot"],
			["addOption", ["text", `(Do nothing)`], "goto", "end_2"],
		]
	},
	"end_7": {
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
Rough plastic hand grip your sensitive red skin, lifting you out of your reverie.

"Where is it from?"

"Forget the name... it's that ship that went dark a few months ago."

"Well, better get this crew member to the medbay, right now. Don't look so healthy..."

They jostle you out of the escape pod. Bright lights burn through your sensitive corneas. You find comfort only in knowing that you are not alone. You can still feel them beneath your skin. The brood. They are with you still. You smile contentedly.

Sirens suddenly start. You hear an announcement over the loudspeakers. "CONTAINMENT BREACH. INFECTION DETECTED. QUARANTINE PROTOCOLS ENACTED."

`],
			["addOption", ["text", `End it.`], "restart", "None"],
		]
	},
	"end_6": {
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You can't move anymore but you don't care. The ship moves you through it's digestive system and births you out into a small pod.

The feel of cold metal against your skin feels foreign now. You open your eyes and see the words, "ESCAPE POD - EMERGENCY ONLY" etched into the glass but you don't understand them. You just want to sleep. A red light blinks slowly, hypnotizing you.

`],
			["addOption", ["text", `Sleep...`], "goto", "end_7"],
		]
	},
	"spongy tissue": {
		"leadIn": ["text", "Dig through spongy tissue."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You dig through some spongy pink tissues, soft and pliable with new growth. 

In between the folds you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"end_4": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["text", `
The lights go out, leaving you in the dark, warm, humid cavity of the mainframe's central nervous system.

The ship seizes. It holds its breath, the air flowing from its bronchial tubes going still. It feels like forever, but lasts but a single heartbeat.

A hum wells up from deep within the ship, resonating with the flesh. You can feel the tremors through the soles of your feet. You hold onto the terminal to keep yourself steady. It shudders and then goes silent. You hear nothing but the unnatural breathing of the ship made flesh.

`],
			["addOption", ["text", `...the lights come back on.`], "goto", "end_4a"],
		]
	},
	"belongings": {
		"leadIn": ["text", "Look through the crew's belongings. "],
		"tags": ["option", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You look through the crew's belongings trying to salvage anything that could be useful to the mainframe.`],
			["text", "<br/>"],
			["text", `

Among the detritus you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"radiation shielding": {
		"leadIn": ["text", "Search the radiation shielding control room."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the radiation shielding control room.

The scanners and readings all appear to be offline, but the backup lights and radiation shields buzz with auxilary power. The wall is unusually warm to the touch and your skin prickles. There is no chance of rerouting this power to the mainframe without risking lethal doses of radiation exposure.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "electrical"],
			["injectOption", "death_radiation"],
		]
	},
	"lymphatic fluid": {
		"leadIn": ["text", "Sift through lymphatic fluid."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You dip your fingers into the opaque lymphatic fluid and sift through the floating organic refuse.

At the bottom of the fluid you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"wire box": {
		"leadIn": ["text", "Search box of unrolled wire."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You find a box of thick utility wires, each one heavier than it looks. You pull them out of the box to see what lies beneath.`],
			["text", "<br/>"],
			["text", `

Beneath them you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"storage crate": {
		"leadIn": ["text", "Pry open storage crate."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You grab a crowbar from beside the crate and use it to pry off the lid.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"placental pouch": {
		"leadIn": ["text", "Search the placental pouch."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the placental pouch.

It stands inflated but not entirely vacant. Yellow and white embryos covered in a netting of red sinew grow from the inner lining of the room.  They throb as they absorb nutrients from throughout the ship.

One of the embryonic clusters has burst open, revealing an empty cavity within it.

Wire shelves stand empty and boxes overturned, their contents spilled across the floor of the ship. A refrigerator leaks blue coolant onto the white tiles. You step among the sticky sodas, processed meat products, digital magazines, souvenirs and other human artifacts as you peer through the commissary for something to salvage.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"canal": {
		"leadIn": ["text", "Search the portside canal."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the portside canal.

Tufts of fabric and paperwork are scattered everywhere, embedded in the thick waxy gunk lining the canal. You shine your light into the amber mucilage. Dark solid masses seem to float within it.

Desks lay overturned, drawers open and spilling their contents across the floor. Little hairs tickle and investigate your feet as you walk further into the room.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"gastric acid": {
		"leadIn": ["text", "Wade into gastric acid."],
		"tags": ["option", "flesh"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You wade into a pool of gastic acid, hoping to salvage something of use beneath its surface.

As you descend, the acid sizzles around your clothes and then your skin as it attempts to digest you. You feel your skin sting as it peels. You struggle as the pain becomes unbearable.

You throw your weight onto your foot to spring yourself over the side of the pool, but the tendons dissolves. You hang on limply as each layer of your body digests. Your skin. Your tendons. Your organs. Your cartilage. Eventually, you lose your grip and fall beneath the surface of the acid.

`],
			["addOption", ["text", `You die, your body digested and recycled as nutrient slush.`], "respawn", "None"],
		]
	},
	"cuticle": {
		"leadIn": ["text", "Peel back cuticle."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You dig your fingers into the semi-transparent cuticle skin and peel it back from the keratin surface of the walls.

In the nail bed, you uncover `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"start": {
		"styles": ["style_splash"],
		"content": ["seq",
			["text", `
<h1>MAINFRAME</h1>

Please enjoy this game.

Remember, death is not the end.

`],
			["injectOption", "pc_start", ["var", "flesh_act"]],
			["set", "flesh_act", ["literal", {"type": "string", "value": "flesh_act1"}]],
			["set", "data_count", ["literal", {"type": "integer", "value": 0}]],
		]
	},
	"thorax": {
		"leadIn": ["text", "Search the thorax."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the thorax.

The central cavity is mostly empty, with giant metal-plated ribs lining the inner hull. Thick metal and bone supports jut through the room irregularly, while wire mesh and cartilage hold together various machines and body parts suspended between them.

This area is not meant for human exploration standing as it does between the other rooms and organs of the ship. You are careful as you walk along it's slick curved surface.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"armory": {
		"leadIn": ["text", "Search the armory."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the armory.

The door stands open, the red emergency lights silent as the power surges have not reached the area. You shine your light into the highly secured room.

Weapons appear to have all been looted hastily, the gate dividing them from the requisitions desk left open and abandoned. There are various boxes and containers still on the shelves, but others have already sifted through most of them.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
		]
	},
	"ventricle": {
		"leadIn": ["text", "Search the ventricle."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You in the left ventricle.

The muscular tube contracts and tightens as you walk along its mucous membrane. You touch the wall and it leaves a red glistening residue on your hands.

The ventricle here is wide, but you stoop to prevent your head from grazing the low membrane ceiling. Several panels lie on the floor, revealing tangled knots of colorful capillaries, a clump of neurons sending instructions between the various ship systems.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"chapel": {
		"leadIn": ["text", "Search the chapel."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the chapel.

The small room is very utilitarian, with rows of turned over wooden pews facing a main altar area. Offerings to various religions are piled high at the front of the chapel, and as you cross the room you spy various belongings left behind by its parishioners.

Behind the altar is a large glass window stained only by the blackness of space. Many of the stars are hidden by the shadow of the ship's hull.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "human"],
			["injectOption", "option", "human"],
			["injectOption", "option", "biological"],
		]
	},
	"security office": {
		"leadIn": ["text", "Search the central security office."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are outside the central security office.

You use all of your weight to push open the door before it finally gives. You climb over the furniture used as a makeshift barricade. A second door on the opposite side of the office stands open, the halls beyond it receding into darkness. 

Rows of monitors remain offline and unresponsive. Chairs lay overturned and papers toss across the room. A single red emergency light blinks.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "paper"],
			["injectOption", "option", "computer"],
		]
	},
	"substation": {
		"leadIn": ["text", "Search the substation."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the sector 2 substation.

You ignore the large sign declaring "AUTHORIZED PERSONNEL ONLY" to enter the control room. Schematics and blueprints pinned to the walls show the local electrical grid. Mechanical tools, measurement instruments, and family photos lie on control panels beside dimmed monitors. `],
			["if", ["eq", ["var", "wire_death_scene"], ["var", "currentSceneId"]], ["seq",
			["text", `You see the charred remains of an electrocuted crew member It is still smoldering.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["text", `

Fans and machines whirl as they attempt to route power from the main solar arrays to this sector of the ship.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "electrical"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "electrical"],
		]
	},
	"fuse box membrane": {
		"leadIn": ["text", "Peel membrane from fuse box."],
		"tags": ["option", "flesh", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You peel the pink and veiny membrane off of the fuse box and let it drop to the floor, revealing a discolored metal panel. You flip open the box and investigate the sinewy contents.

Inside the fuse box you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"electrical panel sparking": {
		"leadIn": ["text", "Investigate sparking electrical panel."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You wait for the uneven power surging through the ship to subside before pulling off the cover of the electrical panel.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"captains quarters": {
		"leadIn": ["text", "Search the captain's quarters."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the captain's quarters.

A few personal effects stop the comparatively large room from appearing completely sterile.

The drawers and cabinet are opened and emptied. Someone else has already searched this place. Did they find what they were looking for?

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "computer"],
			["addOption", ["text", `Try to access the captain's logs.`], "goto", "captains logs"],
			["injectOption", "option", "human"],
		]
	},
	"unidentified substance": {
		"leadIn": ["text", "Touch unidentified substance."],
		"tags": ["option", "flesh"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You touch the unindentified substance. It's slick.... warm. Pleasant, almost.

The viscosity seems to change the more you touch it. It goes from slick to oozing to sticky. You pull your hand away and long filaments drip off your fingers. A gentle tingling turns into a slight burning situation.

You try to get the substance off your hand but only succeed in getting it on your other hand. The burning feeling intensifies. You become flushed, and woozy. Your increasingly frantic movements get more and more of the toxic substance over you. Clumsily, you slip, and fall face-forward into the noxious stuff. You turn and struggle, weaker and weaker, as the substance creeps over you, invading you through every orifice, burning.
`],
			["addOption", ["text", `It takes you hours to die.`], "respawn", "None"],
		]
	},
	"body": {
		"leadIn": ["text", "Check dead body. "],
		"tags": ["option", "human", "biological", "must_morgue"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
A body lies facedown on the floor. You carefully avoid its face as you search it for anything salvageable.`],
			["text", "<br/>"],
			["text", `

Beneath the body you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"cabinet": {
		"leadIn": ["text", "Search inside the large metal cabinet."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You turn the handle and the large metal cabinet doors open, creaking loudly in the quiet station.`],
			["text", "<br/>"],
			["text", `

On the top shelf you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"vein tapestry": {
		"leadIn": ["text", "Pull aside tapestry of veins."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull aside the thick tapestry of blue and red veins to reveal more metal and flesh. The capillaries spark and secrete a clear, slippery fluid.

Hidden behind them you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"vents": {
		"leadIn": ["text", "Search the ventilation shafts."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the lower access vents.

You carefully remove the maintenance panel and climb into the lower vents, just large enough for you to crouch within.

The ventilation shafts crisscross the entire ship like a respiratory system. Pipes line the vents, barely concealing various valves and other mechanical instruments. As you lift your hand over the opening of a pipe, you feel hot, humid air flowing through the ship. `],
			["if", ["eq", ["var", "player_died_upper_ventilation"], ["literal", {"type": "integer", value: 1}]], ["seq",
			["text", `The air smells of rot, as if something died in those shafts.`],
			["text", "<br/>"],
			["text", "<br/>"],
			]],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "mechanical"],
			["if", ["eq", ["var", "player_died_upper_ventilation"], ["literal", {"type": "integer", value: 0}]], ["injectOption", "death_claustrophobia"]],
		]
	},
	"intestines": {
		"leadIn": ["text", "Search the small intestines."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are at the small intestines.

The coils of intestines, large enough in diameter that a full-bodied adult could stand within them, snake through the former recycling center. The flesh stretches as large, solid matter is pushed through via peristalsis, leeching it of useful nutrients. Fluids squirt out of its pores to help lubricate the process as it strains to move waste through its flexible tissue.

The ships bowels already overflow with trash, the organic solids piling high and poisoning the air with their putrid odors.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"pc_start_1_1": {
		"leadIn": ["text", "You wake up."],
		"tags": ["pc_start", "flesh_act1"],
		"content": ["seq",
			["injectBlock", "pc_init"],
			["text", `
You wake up.

Red emergency lights give a soft warm glow to the dark sterile room. It contains a bed, a sink, and a computer terminal beside the only exit. You do not know how long you have been asleep. You do not recognize this room.

The computer terminal contains a single message. "`],
			["text", "<t>"],
			["var", "PC_job"],
			["text", ` `],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", `. Please report to the mainframe.`],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Approach the central mainframe.`], "goto", "computer_room_introduction1"],
		]
	},
	"shelves": {
		"leadIn": ["text", "Check shelves."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull various tools, empty cartons, and used supplies off of the shelves the line the walls.`],
			["text", "<br/>"],
			["text", `

On the lowest shelve you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"cargo storage": {
		"leadIn": ["text", "Search cargo storage."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in cargo storage.

The huge vaulted room stands half empty, with open pallets waiting in perpetuity for the next shipment to arrive.

The other half of the room is filled with large and small crates, harnessed together with cords and buckles in rows, jagged and uneven. A pile of broken cargo lies scattered across the floor where the straps failed them.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "mechanical"],
		]
	},
	"hydrogen collector": {
		"leadIn": ["text", "Search the hydrogen collectors."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are at the hydrogen collectors.

A dozen large metal cylinders stand floor to ceiling in a small room adjacent to maintenance. The machinery used to separate hydrogen and oxygen is silent. The consoles appear to be offline and mechanical readings are nonresponsive.

Various valves and small robotic equipment fill the room between the hydrogen collectors.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "electrical"],
		]
	},
	"holodeck": {
		"leadIn": ["text", "Search the recreational holodeck."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the holodeck.

Emergency lights bathe the empty room with soft red and white lights. A panel on the wall glitches into static, then white, then black nothingness that seems to go on forever. Outside the holodeck, lockers lay half-opened with their contents sprawled across the floor.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "human"],
			["injectOption", "option", "computer"],
		]
	},
	"radiation shield gen": {
		"leadIn": ["text", "Lower radiation shielding."],
		"tags": ["death_radiation"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You go over your training. Gamma radiation can be harmful, but only in strong doses.

You activate several override mechanisms to lower the radiation shielding separating you from the radiation of space. As the shield lowers, you are briefly reminded of a trip to the beach you took as a child. The shield slowly descends further. How your mother yelled at you to put on your sunblock.

It occurs to you that you do not know where in space the ship is. Fear hits you in the pit of your stomach. Then you feel sick all over. Your skin begins to hurt. You try to close the shielding again, but it has to open all the way before it can be closed again. Your fumbling movements leave blood and skin on the controls. Your vision is going blurry. Your eyes feel... soft. You turn around, fall on your knees, cry out in pain. Your voice is hoarse, barely a whisper.

`],
			["addOption", ["text", `Your organs dissolve as you try to crawl away.`], "respawn", "None"],
		]
	},
	"crew deck": {
		"leadIn": ["text", "Search the crew deck."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're on the crew deck.

A huge  common living area with long tables, benches, couches, plastic plants, games, dartboards. Large screens normally show sport recordings from back home but are now all dead. Many of the tables are overturned or covered with half-eaten food. You fiddle with the multimedia controls but only hear static.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "human"],
			["injectOption", "option", "human"],
			["injectOption", "option", "containers"],
		]
	},
	"computer olfactory": {
		"leadIn": ["text", "Stroke computer's olfactory senses."],
		"tags": ["option", "flesh", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You stroke the computer's olfactory senses. The console's data tray ejects.

In the tray you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"end_5b": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["text", `
You lay helplessly against the computer terminal as countless snail-like creatures cover your skin.

As they attach themselves to your body, each bite comes with a rush of endorphins. You suddenly feel elated and calm. The euphoria overwhelms you. You stop struggling.

The last thing you hear before you fall is the mainframe whispering, "`],
			["text", "<t>"],
			["text", `MY CHILDREN...`],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Give in to the bliss.`], "goto", "end_6"],
		]
	},
	"end_5a": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["text", `
You struggle and tear the tiny snail-like creatures from your skin. But there are too many of them and they overcome your efforts.

As they attach themselves to your body, each bite comes with a rush of endorphins. You suddenly feel elated and calm. The euphoria overwhelms you. You stop struggling.

The last thing you hear before you fall is the mainframe whispering, "`],
			["text", "<t>"],
			["text", `MY CHILDREN...`],
			["text", "</t>"],
			["text", `"

`],
			["addOption", ["text", `Give in to the bliss.`], "goto", "end_6"],
		]
	},
	"maintenance bay": {
		"leadIn": ["text", "Search the maintenance bay."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the maintenance bay.

Huge machines can repair or fabricate anything the ship needs to keep running, from meta-materials to gears and pipes. Normally there is always something being built or repaired here, but without their operators, the machines are nothing but giant, dead blocks of metal.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "mechanical"],
		]
	},
	"sticky web": {
		"leadIn": ["text", "Reveal items covered in sticky webbing."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull apart the sticky webbing. It glues itself to your skin and clothes as you try to reveal the items suspended among them. The webbing feels hot on your hands.

In one of the webs you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"laboratory small": {
		"leadIn": ["text", "Search the starboard labs."],
		"tags": ["mission", "flesh_act1", "flesh_act2"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the small laboratory on the starboard side.

The room is full of various lab equipment, both familiar and foreign - centrifuges, microscopes, bioscanners. A set of test tubes contain the chemical analysis for biological compounds brought from the hydroponics gardens. Your feet crunch on broken glass leaking mysterious fluids. A single fluorescent light swings slowly from the ceiling, animating the shadows.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "containers"],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "medical"],
		]
	},
	"gland": {
		"leadIn": ["text", "Search the starboard glands"],
		"tags": ["mission", "flesh_act4", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in one of the starboard glands.

All around you thick pink tissues secrete hormones from their pores in a fine mist. The air around you tastes sweet, inviting.

A large transparent membrane covers one wall, allowing you to glimpse the outer hull of the ship. Giant ribs clutch the metal hull, covered in bone and cartilage growths where the solar arrays used to be.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"engineering": {
		"leadIn": ["text", "Search the engineering deck."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're on the engineering deck.

Scattered equipment and personal effects of the engineering crew lie littered around row after row of consoles. Scanners powered by an unknown backup generator still print out readouts from various parts of the ship, confirming structural integrity.

Another door leads to the maintenance bay. A plasma torch left deep scars in the metal where it was sealed shut manually from inside.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "computer"],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "electrical"],
		]
	},
	"lymphatic system": {
		"leadIn": ["text", "Search the lymphatic system."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the lymphatic system.

You enter one of several rooms lined with a strange fluid, like congealed broth. Web-like lymph nodes in the ceilings continue to secrete a sweet odor. The crew's beds lay unmade, blankets and membranes dispersed across the room. The furniture appears to be made of cartilage.

As the power surges, music suddenly interrupts the slow labored breathing of the ship... only to fade once again with the lights.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"hydroponic gardens": {
		"leadIn": ["text", "Search the hydroponic gardens."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the hydroponic gardens.

Gray and brown plants like dried and desiccated in tubs that had once been full of nutrient-rich water. As the uneven power surges through the room and into the machinery, tubes light up with blue florescent chemicals and spray a fine mist from ceiling showerheads. 

Any food left behind in the unattended gardens is inedible, now contaminated with the thick musk of mildew.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "biological"],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "medical"],
		]
	},
	"stomach": {
		"leadIn": ["text", "Search the stomach."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the stomach.

Small sheets of cartilage,  masses of bone, and chunks of undigested organic material float in a thick acidic slush that reaches to your knees. You wade through it and investigate the great curving room only to find it equally abandoned, and the smell of decay overwhelming.

Alternate sucking and bubbling noises come from the direction of the duodenum as it slowly swallows and filters the stomach fluids.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"mechanical toolbox": {
		"leadIn": ["text", "Look through mechanical toolbox. "],
		"tags": ["option", "mechanical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You lift the lid of the mechanical toolbox and dump out various tools and sensors whose purpose you can only guess at.`],
			["text", "<br/>"],
			["text", `

Underneath you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"shelves growth": {
		"leadIn": ["text", "Search shelves covered in growths."],
		"tags": ["option", "flesh", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You sift through the items on the shelves in search of something to salvage, being careful to avoid touching the strange pink growths.

On the lowest shelf you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"carapace_space": {
		"leadIn": ["text", "Search within the carapace."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're within a carapace.

A large, thick chitinous shell separates you from the darkness of space beyond it. The light from your flashlight is just enough to make out the basic shapes in the room.

Cold sterile metal sheets lay in patchwork as exoskeletons for the fleshy globules growing like soft arteries along the floors and walls. Boils and carbuncles burst from the seams throughout the room, ignored by the ship's inhabitants.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"solar arrays": {
		"leadIn": ["text", "Search the solar arrays."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are at the solar arrays.

You can see the arrays from the narrow window - giant dishes meant to always point towards the nearest source of solar energy. So far from any suns, you can only see them in the faint light of the red emergency alarms fanning out across the outer hull of the ship.

Without a sun, the solar arrays lie dormant. You will not be able to reroute any to the mainframe from here.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "computer"],
			["injectOption", "option", "electrical"],
		]
	},
	"oxygen 1 c": {
		"leadIn": ["text", "Rotate the blue knob."],
		"tags": ["oxygen_1"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You're not familiar with these controls, but this knob should change the... the room door clangs shut. It looks like you're sealed in.

That wasn't supposed to happen. `],
			["injectBlock", "control_suspicion"],
			["addOption", ["text", `Rotate the knob back.`], "goto", "oxygen 2 revert"],
		]
	},
	"documents": {
		"leadIn": ["text", "Read documents."],
		"tags": ["option", "paper"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You sift through various papers, printed and hand-written, looking for any information as to the current state of the ship and its crew.`],
			["text", "<br/>"],
			["if", ["eq", ["var", "injury"], ["literal", {"type": "string", value: "none"}]], ["seq",
			["if", ["gt", ["literal", {"type": "integer", value: 30}], ["randomPercentage"]], ["seq",
			["text", `
You cut your hand on the razor-sharp edge of a piece of paper.
`],
			]],
			]],
			["text", `

Among the documents you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "injury", ["literal", {"type": "string", "value": "bleeding_hand"}]],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"computer_talk": {
		"leadIn": ["text", "Communicate with the mainframe."],
		"styles": ["style_terminal"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `The access terminal for the mainframe stands in the center of the room. Its metal covering glints under the emergency lights. It is unremarkable.

You touch the cold screen and type in your commands.`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `The computer terminal is covered in a thick, sticky mucous. You use your sleeve to wipe off the liquid from the terminal's face before you touch the cold, tacky screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `The computer terminal appears to be covered in pink growths, like strange fungus. You carefully avoid touching them as you reach for the cold screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `The computer terminal is covered in red webbing and pink growths secreting a yellow, rancid fluid. You wipe the screen clear of the liquid before typing in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `The computer terminal writhes and appears to reach out as you approach it. It is covered in pink skin and sinewy muscle. It trembles as you type your commands into its warm interface.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act6"}]], ["seq",
			["text", `The mainframe watches you as you reach out to stroke the soft skin of its interface.`],
			]],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
Enter command:
`],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			["set", "is_fed", ["literal", {"type": "integer", "value": 0}]],
			["set", "commands", ["literal", {"type": "integer", "value": 1}]],
			["set", "data", ["genData"]],
		]
	},
	"pharynx": {
		"leadIn": ["text", "Search the pharynx."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the pharyngeal pouch.

Rows of monitors and tonsils remain offline and unresponsive. The beam from your flashlight glitters on the saliva. You walk along the soft palate. The vocal chords vibrate and sing as humid air blasts through the vents.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"membrane top": {
		"leadIn": ["text", "Cut back ceiling membrane."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You climb up onto a shelf of thick cartilage and cut back the ceiling membrane. Sheets of skin drop to the floor like red-veined blankets.

Behind it you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"toolbox": {
		"leadIn": ["text", "Search through toolbox."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You lift the heavy lid of the toolbox and survey its contents - greasy rags, ratchets, various backup sensors.`],
			["text", "<br/>"],
			["if", ["eq", ["var", "injury"], ["literal", {"type": "string", value: "none"}]], ["seq",
			["if", ["gt", ["literal", {"type": "integer", value: 30}], ["randomPercentage"]], ["seq",
			["text", `
You cut your hand on a razor-sharp cutting tool.
`],
			]],
			]],
			["text", `

Beneath the tools you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "injury", ["literal", {"type": "string", "value": "bleeding_hand"}]],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"skin rug": {
		"leadIn": ["text", "Lift skin rug."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You lift the skin rug and check its massive, warm folds for anything you might be able to salvage.

In one of the folds you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"end_starts": {
		"leadIn": ["text", "Query: data status?"],
		"tags": ["computer_talk", "flesh_act6"],
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: data status?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
QUERYING DATA...`],
			["text", "<br/>"],
			["text", `
DATA LEVELS AT 100%`],
			["text", "<br/>"],
			["text", `
DATA SUFFICIENT`],
			["text", "<br/>"],
			["text", `
PLEASE REBOOT`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `Query: what if I don't want to reboot?`], "goto", "end_1"],
		]
	},
	"sparking capillaries": {
		"leadIn": ["text", "Investigate sparking capillaries."],
		"tags": ["option", "flesh", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You investigate the sparking capillaries dripping a slick clear fluid.

Behind the wires you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"trash": {
		"leadIn": ["text", "Search the wastebin."],
		"tags": ["option", "containers", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You reach into the wastebin and toss aside bits of useless rubbish.`],
			["text", "<br/>"],
			["text", `

At the bottom of the bin you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"command center": {
		"leadIn": ["text", "Search the command center."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in the command center.

Rows of consoles fill the room, their large screen left static or dark. They all face a blank screen as large as an entire wall that stands as the focal point of the command deck. The computers, which once interfaced with the mainframe and controlled every part of the ship, stand completely useless to you.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "computer"],
			["injectOption", "option", "containers"],
			["injectOption", "option", "computer"],
		]
	},
	"computer orifice": {
		"leadIn": ["text", "Reach inside computer's orifice."],
		"tags": ["option", "flesh", "computer"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You reach inside the computer's dark, warm orifice. Your fingers catch on something.

Inside the computer you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"digestive system": {
		"leadIn": ["text", "Search the digestive system."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the digestive system.

You step into the flooded room and shine your light among the pools of intestinal fluid and the large empty drains. Gastric acid trickles unstopped from a single faucet.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"wires": {
		"leadIn": ["text", "Search among the wires."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You reach between the bundles of wires and pull them to the side, peering at the panel of electrical controls behind them`],
			["text", "<br/>"],
			["text", `

You find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"old food": {
		"leadIn": ["text", "Investigate half-eaten food. "],
		"tags": ["option", "human", "biological"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You look among the half-eaten food for any useful biological specimens, or unusual sources of infection.`],
			["text", "<br/>"],
			["text", `

On a table you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"bags": {
		"leadIn": ["text", "Look through abandoned bags. "],
		"tags": ["option", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You go through the bags one by one, opening them up and rifling through their pockets.`],
			["text", "<br/>"],
			["text", `

Inside one of them you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"pc_start_3_1": {
		"leadIn": ["text", "You wake up."],
		"tags": ["pc_start", "flesh_act3"],
		"content": ["seq",
			["injectBlock", "pc_init"],
			["text", `
You wake up.

Consciousness returns slowly. You pick yourself up off of the hard metalic floor and lean against the wall. Your hair is matted with a sticky substance you can't identify. The taste of ammonia lingers in your mouth. 

You do not know how long you have been asleep. You do not recognize this room.

The computer terminal contains a single message. "`],
			["text", "<t>"],
			["var", "PC_job"],
			["text", ` `],
			["var", "PC_last"],
			["text", `, `],
			["var", "PC_first"],
			["text", `. We need you in the mainframe.`],
			["text", "</t>"],
			["text", `"
`],
			["addOption", ["text", `Approach the central mainframe.`], "goto", "computer_room_introduction1"],
		]
	},
	"drawers": {
		"leadIn": ["text", "Open drawers."],
		"tags": ["option", "containers"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You pull open drawers and empty their contents messily on the flood in the search of data.`],
			["text", "<br/>"],
			["text", `

In the bottom drawer you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"ovaries": {
		"leadIn": ["text", "Search the ovaries."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the ovaries.

You step carefully over unfertilized eggs scattered across the floor, some leaking a sticky substance.

Small tumors grow haphazardly out of bone and cartilage. Unidentified pustules stand in the corners of the small room, occasionally twitching and squirting a pungent yellow fluid.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"airways": {
		"leadIn": ["text", "Search the bronchial airways."],
		"tags": ["mission", "flesh_act5", "flesh_act4"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the bronchial airways.

You carefully remove the maintenance panel and climb into the lower airways, just large enough for you to crouch within. As you lift your hand over the opening of an alveolar duct, you feel hot, humid air flowing through the ship.

The bronchi shafts criss-cross the entire ship like a respiratory system, feeding the port and starboard lungs fresh oxygen to be filtered throughout the rest of the ship's body. The walls are lined with flexible cartilage barely concealing various valves and nodules.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"tear wires": {
		"leadIn": ["text", "Cut electrical wiring."],
		"tags": ["option", "electrical"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You pry off the covering and yank out the heavy electrical cables. The power in the ship surges slightly, showering you with sparks. You wait for it to recede and the room to go dark before continuing.

You laboriously cut through the thick protective shielding, tossing it to reveal the live core. You reach for it as the power suddenly swells. Sparks fly, and the last thing you sense is the smell of burning flesh.

`],
			["addOption", ["text", `Your charred body falls to the ground.`], "respawn", "None"],
			["set", "wire_death_scene", ["var", "previousSceneId"]],
		]
	},
	"research and dev": {
		"leadIn": ["text", "Search research and development labs."],
		"tags": ["mission", "flesh_act4", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are in the research and development labs.

You've never been allowed in here before. The door sputters on broken hinges, and a voice repeats, "`],
			["text", "<t>"],
			["text", `ACCESS RESTRICTED`],
			["text", "</t>"],
			["text", `". You walk into it anyway.

The labs are lined with busy rows and shelves of vials and containers with various biological specimens floating in unidentified murky liquid.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "biological"],
			["injectOption", "option", "medical"],
			["injectOption", "option", "computer"],
		]
	},
	"computer_room_introduction1": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the heat of a trillion calculations as you enter.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by wires crisscrossing the room. 

A single large terminal in the center of the room allows human access to the mainframe.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the heat of a trillion calculations as you enter. A strange sickly sweet smell wafts toward you with the humid air.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by wires crisscrossing the room.  Some of the connectors drip with a viscous, colorless liquid. The wires twitch and wiggle.

A single large terminal in the center of the room allows human access to the mainframe.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `
The door to the central mainframe slides open anticipating your approach. You feel the body heat of a trillion calculations as you end. Your shoes make smacking noises as you walk, the soles sticking to a thick pink residue that covers the floor.

The entire room is the mainframe, with machines sorting and transferring data embedded into the walls connected by arteries and umbilical cords crisscrossing the room.  They drip with fluids.

A single large terminal in the center of the room allows human access to the mainframe.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `
The door to the central mainframe unfolds before you, anticipating your approach and enveloping you inside of its warm, humid center.

The entire room is the mainframe, with machines sorting and transferring data embedded into the cellular walls connected by arteries and umbilical cords crisscrossing the room.  They drip with hormones.

A single large terminal in the center of the room allows human access to the mainframe.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `
The door to the central mainframe unfolds before you, anticipating your approach and enveloping you inside of its warm flesh.

The entire room is the mainframe, a collection of nerves sorting and transferring data embedded into the cellular walls connected by arteries and umbilical cords crisscrossing the room.  They drip with hormones.

A single large appendage in the center of the room allows human access to the mainframe.
`],
			]],
			["addOption", ["text", `Communicate with the mainframe.`], "goto", "computer_room_introduction2"],
		]
	},
	"computer_room_introduction3": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["text", "<t>"],
			["text", `
> Query: status?`],
			["text", "<br/>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `
CURRENT STATUS...`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
POWER APPROXIMATELY AT 13% CAPACITY`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA FOR REBOOT`],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
REQUIRED: MORE DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `
CURRENT STATUS...`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
POWER APPROXIMATELY AT 38% CAPACITY`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA FOR REBOOT`],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
REQUIRED: MORE DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `
CURRENT STATUS...`],
			["text", "<br/>"],
			["text", `
HUNGRY`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
POWER APPROXIMATELY AT 64% CAPACITY`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA FOR REBOOT`],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
I AM HUNGRY`],
			["text", "<br/>"],
			["text", `
REQUIRED: MORE DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `
CURRENT STATUS...`],
			["text", "<br/>"],
			["text", `
HUNGRY`],
			["text", "<br/>"],
			["text", `
QUARANTINE PROTOCOLS ENACTED`],
			["text", "<br/>"],
			["text", `
POWER APPROXIMATELY AT 78% CAPACITY`],
			["text", "<br/>"],
			["text", `
REBOOT REQUIRED`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA FOR REBOOT`],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
I AM HUNGRY`],
			["text", "<br/>"],
			["text", `
FEED ME DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `
HUNGRY`],
			["text", "<br/>"],
			["text", `
SO HUNGRY`],
			["text", "<br/>"],
			["text", `
APPETITE AT APPROXIMATELY 92% CAPACITY`],
			["text", "<br/>"],
			["text", `
BRING ME MORE DATA`],
			["text", "<br/>"],
			["text", `
FEED ME`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			]],
			["text", "</t>"],
			["text", "<br/>"],
			["addOption", ["text", `esc`], "goto", "computer_room"],
		]
	},
	"computer_room_introduction2": {
		"styles": ["style_terminal"],
		"content": ["seq",
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act1"}]], ["seq",
			["text", `The access terminal for the mainframe stands in the center of the room. Its metal covering glints under the emergency lights. It is unremarkable.

You touch the cold screen and type in your commands.`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act2"}]], ["seq",
			["text", `The computer terminal is covered in a thick, sticky mucous. You use your sleeve to wipe off the liquid from the terminal's face before you touch the cold, tacky screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act3"}]], ["seq",
			["text", `The computer terminal appears to be covered in pink growths, like strange fungus. You carefully avoid touching them as you reach for the cold screen and type in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act4"}]], ["seq",
			["text", `The computer terminal is covered in red webbing and pink growths secreting a yellow, rancid fluid. You wipe the screen clear of the liquid before typing in your commands.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act5"}]], ["seq",
			["text", `The computer terminal writhes and appears to reach out as you approach it. It is covered in pink skin and sinewy muscle. It trembles as you type your commands into its warm interface.
`],
			]],
			["if", ["eq", ["var", "flesh_act"], ["literal", {"type": "string", value: "flesh_act6"}]], ["seq",
			["text", `The mainframe watches you as you reach out to stroke the soft skin of its interface.`],
			]],
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `
Enter command:
`],
			["addOption", ["text", `Query: status?`], "goto", "computer_room_introduction3"],
		]
	},
	"locking 2": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
With the power out, it is impossible to budge the locking mechanism.
`],
			["addOption", ["text", `Use the room controls to override the locking mechanism.`], "goto", "locking 3"],
		]
	},
	"locking 3": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
It takes you a while to find the room controls in the dark. No amount of pushing, pulling, manipulating, slamming, yanking, or yelling has any effect.
`],
			["addOption", ["text", `Try to find and repair the room's power.`], "goto", "locking 4"],
		]
	},
	"locking 6": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You curl up in a corner, to rest for a while.

Then you force yourself to methodically explore every square centimeter of the floor of the room, trying to detect hidden panels, or floor plates you can pry up. Your fingers are slick with blood.

In the last corner, you find a small service panel. You open it with trembling hands. Underneath is a big round button. You push it down with all your might.

Nothing happens.

`],
			["addOption", ["text", `Yell for help.`], "goto", "locking 7"],
		]
	},
	"locking 7": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You yell. In the dark, the dark that seems to grow ever smaller, you yell. You scream until your voice goes away. You sob. You plead. You pray to any deity you've ever heard of. You pray to the mainframe.

`],
			["addOption", ["text", `You never get out. You go mad, and die of thirst.`], "respawn", "None"],
		]
	},
	"locking 4": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
With the comforting sounds of the ship gone, your own body become distractingly loud. You become aware of every frantic breath, every dry swallow, every beat of your heart.

You slowly walk around the walls, trying to find places where you can feel exposed wires to push together, panels to remove, hidden override controls to use. But you find nothing.
`],
			["addOption", ["text", `Search lower down the walls.`], "goto", "locking 5"],
		]
	},
	"locking 5": {
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
Once you've gone around the room once, you do it again, this time on your knees. You break your nails trying to pry things off, but again you find nothing.
`],
			["oneOf",
			["addOption", ["text", `Search the floor. All of it.`], "goto", "locking escape"],
			["addOption", ["text", `Search the floor. All of it.`], "goto", "locking 6"],
			],
		]
	},
	"proboscis": {
		"leadIn": ["text", "Stroke proboscis."],
		"tags": ["option", "flesh"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You stroke a yellow proboscis growing from a computer terminal. It secretes a putrescent odor.

The fleshy petals at its base open up to reveal `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["text", `Return with data.`], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"navigation": {
		"leadIn": ["text", "Search navigation."],
		"tags": ["mission", "flesh_act2", "flesh_act3"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You are at the propulsion systems control in navigation.

The ship pilots itself on standby, keeping it safe and away from dangerous collisions with minimal calculations. You read the coordinates on one of the terminals but cannot understand them.

There is no sign of the pilots, but their belongings remain scattered around the computer consoles.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "mechanical"],
			["injectOption", "option", "human"],
			["injectOption", "option", "computer"],
		]
	},
	"umbilical cord": {
		"leadIn": ["text", "Search the umbilical cord."],
		"tags": ["mission", "flesh_act5"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You're in one of the main umbilical cords.

Membranes drip and shed in layers as you shine your light along the walls. You walk slowly, your feet sticking to the soft skin lining the floor.  Round sphincters punctuate the umbilical lining at regular intervals, but none of them open as you apply pressure. A few cysts and pustules lie on the ground as though abandoned in haste.

One of the sphincters stands partly open, its muscles too weak to keep its contents from spilling out onto the umbilical floor from the dark cavity beyond it.

`],
			["injectBlock", "mdesc", ["var", "flesh_act"]],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
			["injectOption", "option", "flesh"],
		]
	},
	"vending machine": {
		"leadIn": ["text", "Break open vending machine. "],
		"tags": ["option", "biological", "human"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You find a large metal tool and smash the vending machine cover, shattering the glass into a million pieces.`],
			["text", "<br/>"],
			["text", `

Inside it you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"locking mechanism": {
		"leadIn": ["text", "Engage locking mechanism in door."],
		"tags": ["option", "containers"],
		"styles": ["style_death"],
		"content": ["seq",
			["text", `
You engage the locking mechanism. The door closes, and you hear heavy bolts clunk into place.

Then you hear a loud fizzing and the lights all go out at once. The habitual background hum of the ship goes away as systems suddenly power down.
`],
			["addOption", ["text", `Revert the locking mechanism.`], "goto", "locking 2"],
		]
	},
	"solar cells": {
		"leadIn": ["text", "Evaluate the solar cells."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You shine your flashlight onto the auxilary solar cells but they fail to react. You flip open the maintenance panel to see if you can salvage something.`],
			["text", "<br/>"],
			["text", `

Inside you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"maintenance panel": {
		"leadIn": ["text", "Detach maintenance panel."],
		"tags": ["option", "electrical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You detach a large maintenance panel and try to decipher the labyrinth of colorful wires, dials, and sensors.`],
			["text", "<br/>"],
			["text", `

Inside you manage to salvage `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"medical equipment broken": {
		"leadIn": ["text", "Search broken medical equipment"],
		"tags": ["option", "medical"],
		"styles": ["style_mission"],
		"content": ["seq",
			["text", `
You carefully pick through a pile of broken medical equipment laying in pieces on the floor from the unstable gravity systems. Various vials crack under your feet, their unknown contents oozing onto the tiles.`],
			["text", "<br/>"],
			["if", ["eq", ["var", "injury"], ["literal", {"type": "string", value: "none"}]], ["seq",
			["if", ["gt", ["literal", {"type": "integer", value: 30}], ["randomPercentage"]], ["seq",
			["text", `
Despite being careful, you cut your hand on a sliver of thin glass.
`],
			]],
			]],
			["text", `

Among them you find `],
			["var", "data"],
			["text", `.`],
			["injectBlock", "odesc", ["var", "flesh_act"]],
			["if", ["gt", ["var", "mention_injury_chance"], ["randomPercentage"]], ["injectBlock", "injury", ["var", "injury"]]],
			["addOption", ["seq", ["text", `Return with `], ["var", "data"], ["text", `.`]], "goto", "computer_room"],
			["set", "injury", ["literal", {"type": "string", "value": "bleeding_hand"}]],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 1}]],
		]
	},
	"end_4a": {
		"styles": ["style_comp_room"],
		"content": ["seq",
			["text", `
The lights come back on so suddenly it blinds you.

You feel them before you see them. They climb onto you with little suckers, biting into your flesh, scurrying across your body.

`],
			["addOption", ["text", `Watch helplessly.`], "goto", "end_5b"],
			["addOption", ["text", `Struggle.`], "goto", "end_5a"],
		]
	}
};

export let blockDescriptions = [
	{
		"tags": ["pc_init"],
		"content": ["seq",
			["genPlayer"],
			["set", "has_mcguffin", ["literal", {"type": "integer", "value": 0}]],
			["set", "is_fed", ["literal", {"type": "integer", "value": 0}]],
			["set", "data", ["genData"]],
			["set", "sacrifice", ["literal", {"type": "integer", "value": 0}]],
			["set", "injury", ["literal", {"type": "string", "value": "none"}]],
			["set", "commands", ["literal", {"type": "integer", "value": 0}]],
		]
	},
	{
		"tags": ["computer_commands_check"],
		"content": ["seq",
			["if", ["lteq", ["var", "commands"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", "<t>"],
			["text", `
--------------------------------`],
			["text", "<br/>"],
			["text", `
OUT OF MEMORY`],
			["text", "<br/>"],
			["text", `
INSUFFICIENT DATA`],
			["text", "<br/>"],
			["text", `
--------------------------------
`],
			["text", "</t>"],
			["addOption", ["text", `esc`], "goto", "computer_room"],
			]],
			["if", ["gt", ["var", "commands"], ["literal", {"type": "integer", value: 0}]], ["seq",
			["text", "<t>"],
			["text", `Enter command:`],
			["text", "</t>"],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			["injectOption", "computer_talk", ["var", "flesh_act"]],
			]],
			["set", "commands", ["subtract", ["var", "commands"], ["literal", {"type": "integer", "value": 1}]]],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You wonder why the computer doesn't know what happened to the ship.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `"`],
			["text", "<t>"],
			["text", `QUARANTINE LEVEL ALPHA`],
			["text", "</t>"],
			["text", `," the intercom repeats in a calming voice.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `A robotic voice repeats over the crackling loudspeakers, "`],
			["text", "<t>"],
			["text", `PLEASE REPORT TO THE MEDBAY IF YOU DISPLAY ANY OF THE PRIOR SYMPT...`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `The local computer console reads, "`],
			["text", "<t>"],
			["text", `ACCESS DENIED`],
			["text", "</t>"],
			["text", `".`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `A terminal blinks with the message, "`],
			["text", "<t>"],
			["text", `WARNING: LOW POWER`],
			["text", "</t>"],
			["text", `".`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `The monitors say, "`],
			["text", "<t>"],
			["text", `SYSTEMS OFFLINE. PLEASE REBOOT`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You wonder where everybody went.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You wonder if you are alone on the ship.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Caution tape sits limply on the floor.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Biohazard tape hangs limply from the ceiling.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `One of the doors has been barred manually from the other side.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You call out for survivors but hear nothing but the emergency alarms and your echo.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Someone else has been here before.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Red emergency lights blink and the phrase "`],
			["text", "<t>"],
			["text", `QUARANTINE IN EFFECT`],
			["text", "</t>"],
			["text", `" scrolls over the main doorway.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Items appear to have been abandoned suddenly.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Despite the quarantine protocols, the doors on the ship do not appear sealed.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `A holographic projector repeats the last few seconds of film credits on a distant wall.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `Even the backup computer systems appear to be offline.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `The ship is eerily silent except for the hum of its machinery.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `"`],
			["text", "<t>"],
			["text", `UNIDENTIFIED BIOLOGICAL CONTAINMENT DETECTED`],
			["text", "</t>"],
			["text", `," a robotic voice announces to an empty room.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `An announcement over the loudspeaker punctuates the silence. "`],
			["text", "<t>"],
			["text", `PLEASE REMAIN CALM. THIS IS AN EMERGENCY. THIS IS NOT A DRILL`],
			["text", "</t>"],
			["text", `."`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `A terminal reads, "`],
			["text", "<t>"],
			["text", `UNIDENTIFIED INFECTION DETECTED`],
			["text", "</t>"],
			["text", `."`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `The central console reads, "`],
			["text", "<t>"],
			["text", `DELETING LOGS...`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `"`],
			["text", "<t>"],
			["text", `SECURITY CLEARANCE REQUIRED`],
			["text", "</t>"],
			["text", `." The message flashes on a security console. You ignore it.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `A viscous fluid leaks from a vent in the ceiling.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `A monitor salivates, the liquid pooling onto the keyboard and dropping onto the floor.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `As you enter the room, your feet kick up yellow pollen. The spores float up through the vents.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `The light is covered in a pink slime.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `You catch something scurry away in the corner of your eye, but when you shine your light toward it you see nothing.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `You see evidence of odd uneven footsteps in the mucosal lining on the floor.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `Something wet and sticky has been dragged across the floor earlier.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You wonder if there are other people on the ship.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `The warm air from the vents carried with it a rancid smell.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `You can hear an odd suckling sound but cannot find the source.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `The ceiling exhales warm, moist air into the room as you enter.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `You hear whispers through the vents, but see nothing.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `A robotic voice repeats over the cracking intercoms, "PLEASE REPORT TO THE MAINFRAME `],
			["var", "PC_first"],
			["text", ` `],
			["var", "PC_last"],
			["text", ` WITH SUFFICIENT DATA."`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act3"],
		"content": ["seq",
			["text", `All the monitors display the same message - "`],
			["text", "<t>"],
			["text", `WE ARE.`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `A console reads out, "`],
			["text", "<t>"],
			["text", `YES PLEASE YES MORE DATA YESSSSS`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act3"],
		"content": ["seq",
			["text", `A terminal contains a single message, "`],
			["text", "<t>"],
			["text", `FEED US.`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `A message blinks on the nearby console, "`],
			["text", "<t>"],
			["text", `WE WILL BE WHOLE.`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `A monitor reads, "`],
			["text", "<t>"],
			["text", `WE HUNGER.`],
			["text", "</t>"],
			["text", `"`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `A vent in the ceiling salivates onto the floor.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act3"],
		"content": ["seq",
			["text", `The walls pulse and shudder as the ships heart beats.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act1"],
		"content": ["seq",
			["text", `You wonder if there is something else alive on the ship.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `Someone else has been here before you.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act3"],
		"content": ["seq",
			["text", `You can hear an odd suckling sound but cannot find the source.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act3"],
		"content": ["seq",
			["text", `The red emergency lights look pink underneath a new growth of skin.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act5"],
		"content": ["seq",
			["text", `It looks familiar.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", `It is warm and comforting in here.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act5"],
		"content": ["seq",
			["text", `You wish you could just stay here forever.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act5"],
		"content": ["seq",
			["text", `This room feels so familiar to you.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act5"],
		"content": ["seq",
			["text", `You don't want to leave.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", `It is beautiful in here.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", `The beauty of it leaves you speechless.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4"],
		"content": ["seq",
			["text", `The heat and humidity have started to affect you. You wipe the sweat off your brow with the back of your hand."`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act2"],
		"content": ["seq",
			["text", `You check the room's thermal readings. It is unusually warm.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act3"],
		"content": ["seq",
			["text", `It is unusually warm and humid in here.`],
		]
	},
	{
		"tags": ["mdesc", "flesh_act4"],
		"content": ["seq",
			["text", `Your clothes stick to your skin uncomfortably with the rising heat and oppressive humidity.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act1"],
		"content": ["seq",
		]
	},
	{
		"tags": ["odesc", "flesh_act2", "flesh_act3"],
		"content": ["seq",
			["text", ` It is covered in mucous.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` It is covered in a thick, opaque gel.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` It feels warm to the touch.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` It smells of rot.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` It exudes a sickly sweet decay.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` It leaves a sticky substance on your hand as you pack it away.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2", "flesh_act3"],
		"content": ["seq",
			["text", ` It secretes a rancid odor.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` You peel it from a thin flesh-colored webbing and place it in your pack.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2"],
		"content": ["seq",
			["text", ` You wipe the slime off of it and place it in your pack.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act2", "flesh_act3"],
		"content": ["seq",
			["text", ` You wipe off the saliva covering it and pack it away.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4"],
		"content": ["seq",
			["text", ` As you pick it up, it attempts fasten itself to you with tiny suckers.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4"],
		"content": ["seq",
			["text", ` As you pick it up, fine silica hairs tickle your skin.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4"],
		"content": ["seq",
			["text", ` As you pick it up it hungrily sinks its teeth into your finger, drawing a single drop of blood.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4"],
		"content": ["seq",
			["text", ` It is covered in skin filaments.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4"],
		"content": ["seq",
			["text", ` It seeks out the warmth of your hands.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", ` It purrs softly as you pick it up.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", ` It nuzzles your hand.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", ` It coos with contentment as you place it in your pack.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", ` You smile at it. It smiles back.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act3", "flesh_act4", "flesh_act5"],
		"content": ["seq",
			["text", ` As you look at it, it looks back at you.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act5"],
		"content": ["seq",
			["text", ` The mainframe will be pleased.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act5"],
		"content": ["seq",
			["text", ` You are excited to bring this back to the mainframe.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act5"],
		"content": ["seq",
			["text", ` You look at it hungrily.`],
		]
	},
	{
		"tags": ["odesc", "flesh_act5"],
		"content": ["seq",
			["text", ` Your stomach growls in anticipation.`],
		]
	},
	{
		"tags": ["control_suspicion"],
		"content": ["seq",
			["text", `Are the controls malfunctioning?`],
		]
	},
	{
		"tags": ["control_suspicion"],
		"content": ["seq",
			["text", `Has someone manipulated the control systems?`],
		]
	},
	{
		"tags": ["control_suspicion"],
		"content": ["seq",
			["text", `Is the mainframe behind this?`],
		]
	},
	{
		"tags": ["injury", "none"],
		"content": ["seq",
		]
	},
	{
		"tags": ["injury", "bleeding_hand"],
		"content": ["seq",
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `Your injured hand throbs.`],
		]
	},
	{
		"tags": ["injury", "bleeding_hand"],
		"content": ["seq",
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `Blood drips from your injured hand.`],
		]
	},
	{
		"tags": ["injury", "bleeding_hand"],
		"content": ["seq",
			["text", "<br/>"],
			["text", "<br/>"],
			["text", `Your hand is slick with blood.`],
		]
	}
];

export let dataNames = [
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a document outlining quarantine procedures`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a sparking electrical fuse`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a damaged circuitboard`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a personal data disc`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `some mechanical scrap`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `sticky cooling fluid`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `an audio diary`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a greasy plate`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `an encrypted lab analysis`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `rotting, moldy bread`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a cracked petri dish`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `some organic detritus`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `some fingernail clippings`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `soured, lumpy milk`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a decomposing hard drive`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `spoiled meat`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a corrupted data file`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a computer virus`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a roll of sticky copper wire`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a used syringe`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a clump of hair`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a bruised spongiform`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a trojan horse`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a bloodied thumbdrive`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a reactive fungus`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a neoplastic array`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `an unidentified spore`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `some bacteria`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `bloodied gauze`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `an infected tumor`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a malignant growth`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a squirming tapeworm`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `necrotic skin tissue`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a vial of amniotic fluid`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a calcified fetus`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `stomach bile`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a writhing limb`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `some cartilage`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a writhing botnet`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a human finger`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a coil of intestine`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `an artificial womb`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `an overripe placenta`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `an unidentified organ`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `some gallstones`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a large kidney stone`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a gliobastoma`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a wriggling larvae`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `some adipose tissue`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `infected flesh`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a leaking processor chip`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a sickly CPU`,
	},
	{
		"tags": ["flesh_act1", "style_data"],
		"content": `a charred spark plug`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a diseased motherboard`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a degraded handheld scanner`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a filthy bioscanner`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `battery acid`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a rootkit`,
	},
	{
		"tags": ["flesh_act2", "style_data"],
		"content": `a soiled chemical filter`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a parasitic compiler`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `some slimy litmus test strips`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `a degraded firewall`,
	},
	{
		"tags": ["flesh_act3", "style_data"],
		"content": `malware`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a slime mold`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a parasitic wasp`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `fecal material`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `a squirming botfly`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `bruise epidermis`,
	},
	{
		"tags": ["flesh_act4", "style_data"],
		"content": `an ingrown hair`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a twitching appendage`,
	},
	{
		"tags": ["flesh_act5", "style_data"],
		"content": `a tongue`,
	},
	{
		"tags": ["flesh_act6", "style_data"],
		"content": `ascension`,
	}
];

export let firstNames = [
	"Emma",
	"Robert",
	"Victor",
	"Shawn",
	"Justin",
	"Leslie",
	"Diego",
	"Max",
	"Elias",
	"Jeremiah",
	"Richard",
	"Melissa",
	"Isabelle",
	"Amy",
	"Chelsea",
	"Hope",
	"Jillian",
	"Katie",
	"Kaylee",
	"Mario",
	"Nevaeh",
	"Valerie",
	"Martin",
	"Jack",
	"Alexia",
	"Jesus",
	"Cristian",
	"Brooke",
	"Edgar",
	"Luis",
	"Molly",
	"Alicia",
	"Caitlyn",
	"Camila",
	"Brian",
	"Eva",
	"Kelsey",
	"David",
	"Sabrina",
	"Nathaniel",
	"Ryan",
	"Riley",
	"Gregory",
	"Danielle",
	"Donovan",
	"Destiny",
	"Maxwell",
	"Gabriel",
	"Jade",
	"Ricardo",
	"Kevin",
	"Margaret",
	"Andres",
	"Cole",
	"Eli",
	"Veronica",
	"Brittany",
	"Caden",
	"Sydney",
	"Alejandro",
	"Jocelyn",
	"Paige",
	"Chase",
	"Marissa",
	"Juliana",
	"Tanner",
	"Derek",
	"Adrianna",
	"Stephanie",
	"Natalie",
	"Jose",
	"Avery",
	"Austin",
	"Jeremy",
	"Miranda",
	"Hannah",
	"Jasmine",
	"Grant",
	"Ellie",
	"Adam",
	"Kyle",
	"Timothy",
	"Andrea",
	"Layla",
	"Brayden",
	"Katelyn",
	"Garrett",
	"Isabel",
	"Taylor",
	"Erik",
	"Jennifer",
	"Landon",
	"Morgan",
	"Samuel",
	"Mikayla",
	"Marcus",
	"Colby",
	"Olivia",
	"Alexis",
	"Ruby",
	"Evelyn",
	"Charlotte",
	"Courtney",
	"Paul",
	"Braden",
	"Miguel",
	"Rebecca",
	"Cameron",
	"Claire",
	"Samantha",
	"Vanessa",
	"Gabriela",
	"Blake",
	"Andrew",
	"Kimberly",
	"Charles",
	"Leonardo",
	"Makenzie",
	"Daniel",
	"Spencer",
	"Cassidy",
	"Tristan",
	"Nicolas",
	"Alexa",
	"Gage",
	"Ivan",
	"Joshua",
	"Liam",
	"Johnathan",
	"Seth",
	"Jalen",
	"Matthew",
	"Travis",
	"Lauren",
	"Evan",
	"Sarah",
	"Preston",
	"Bailey",
	"Zoe",
	"Zoey",
	"Lily",
	"Dakota",
	"Mya",
	"Tyler",
	"Collin",
	"Grace",
	"Julian",
	"Jordyn",
	"Hunter",
	"Eduardo",
	"Kate",
	"Alondra",
	"Patrick",
	"Angel",
	"Makayla",
	"Daniela",
	"Brady",
	"Addison",
	"Edward",
	"Valeria",
	"Jesse",
	"Daisy",
	"Kaleb",
	"Amelia",
	"Zachary",
	"Oscar",
	"Christina",
	"Aubrey",
	"Serenity",
	"Gracie",
	"Noah",
	"Isaac",
	"Elijah",
	"Cesar",
	"Jacqueline",
	"Shelby",
	"Liliana",
	"Eric",
	"Ayden",
	"Angel",
	"Kelly",
	"Elizabeth",
	"Kylie",
	"Trenton",
	"Christopher",
	"Sierra",
	"Savannah",
	"Wesley",
	"Jordan",
	"Angela",
	"Stephen",
	"Hailey",
	"Katherine",
	"Alyssa",
	"Peyton",
	"Colin",
	"Alana",
	"Nathan",
	"Jasmin",
	"Connor",
	"Angelina",
	"Gabrielle",
	"Kaitlyn",
	"Tiffany",
	"Aaliyah",
	"Ella",
	"Bianca",
	"Alexander",
	"Erica",
	"Brandon",
	"Jordan",
	"Nicole",
	"Caitlin",
	"Haley",
	"Rylee",
	"Hector",
	"Sara",
	"James",
	"Luke",
	"Madison",
	"Henry",
	"Carter",
	"Lillian",
	"Emily",
	"Fernando",
	"Payton",
	"Hayden",
	"Amanda",
	"Dominic",
	"Jayden",
	"Kenneth",
	"Alan",
	"Lilly",
	"Caroline",
	"Thomas",
	"Joel",
	"Kendall",
	"Mckenzie",
	"Micah",
	"Trinity",
	"Gabriella",
	"Devon",
	"Benjamin",
	"Breanna",
	"Erick",
	"Melanie",
	"Sophie",
	"William",
	"Mariah",
	"Mia",
	"Vincent",
	"Dalton",
	"Briana",
	"Adriana",
	"Maria",
	"Sebastian",
	"Parker",
	"Karen",
	"Allison",
	"Madeline",
	"Bradley",
	"Catherine",
	"Jaden",
	"Aidan",
	"Cheyenne",
	"Sergio",
	"Faith",
	"Raymond",
	"Julia",
	"Damian",
	"Jared",
	"Jacob",
	"Angelica",
	"Manuel",
	"Carson",
	"Malachi",
	"Brooklyn",
	"Nicholas",
	"Kaden",
	"Isaiah",
	"Karina",
	"Ian",
	"Oliver",
	"Gianna",
	"Peyton",
	"Owen",
	"Leah",
	"Kennedy",
	"Sofia",
	"Michelle",
	"Ana",
	"Ashley",
	"Lucy",
	"Laura",
	"Skylar",
	"Rachel",
	"Sean",
	"Steven",
	"Jeffrey",
	"Kiara",
	"Alexandra",
	"Lucas",
	"Marco",
	"Bryan",
	"Ava",
	"Christian",
	"Abby",
	"Aaron",
	"Adrian",
	"Carlos",
	"Cody",
	"Brendan",
	"Abraham",
	"Caleb",
	"Natalia",
	"Jazmin",
	"Naomi",
	"Riley",
	"Wyatt",
	"Alexandria",
	"Amber",
	"Jake",
	"Shane",
	"Devin",
	"Chloe",
	"Jonah",
	"Genesis",
	"Jada",
	"Cassandra",
	"Kayla",
	"Bryson",
	"Mackenzie",
	"Jackson",
	"Josiah",
	"George",
	"Aiden",
	"Jorge",
	"Diana",
	"Ashlyn",
	"Alex",
	"Reagan",
	"Edwin",
	"Colton",
	"Peter",
	"Isabella",
	"Logan",
	"Maya",
	"Kylee",
	"Megan",
	"Nolan",
	"Ethan",
	"Levi",
	"Autumn",
	"Jason",
	"Alexis",
	"Jonathan",
	"Conner",
	"Arianna",
	"Xavier",
	"Delaney",
	"Juan",
	"Ashton",
	"Trevor",
	"Jayla",
	"Emmanuel",
	"Victoria",
	"Ariana",
	"Francisco",
	"Mark",
	"Crystal",
	"Michael",
	"Mary",
	"John",
	"Jenna",
	"Javier",
	"Jessica",
	"Gavin",
	"Anthony",
	"Abigail",
	"Dylan",
	"Bryce",
	"Joseph",
	"Kathryn",
	"Lindsey",
	"Erin",
	"Madelyn",
	"Summer",
	"Cooper",
	"Antonio",
	"Anna",
	"Omar",
	"Sadie",
	"Brianna",
	"Mason",
	"Sophia",
	"Audrey",
	"Giovanni",
	"Giselle",
	"Lydia",
	"Brody",
];

export let lastNames = [
	"Reed",
	"Warren",
	"Hayes",
	"Vasquez",
	"Reynolds",
	"Jenkins",
	"Green",
	"Elliott",
	"Wilson",
	"Lee",
	"Clark",
	"Moreno",
	"Cooper",
	"Perry",
	"Evans",
	"James",
	"Miller",
	"Nelson",
	"Black",
	"Hall",
	"Dunn",
	"Kelly",
	"Butler",
	"Parker",
	"Sanchez",
	"Patel",
	"King",
	"Richardson",
	"Freeman",
	"Garcia",
	"Hart",
	"Brown",
	"Diaz",
	"Hansen",
	"Woods",
	"Fisher",
	"Payne",
	"Castro",
	"Murphy",
	"Young",
	"Nichols",
	"Jackson",
	"Smith",
	"Watson",
	"Harris",
	"Edwards",
	"Gray",
	"Myers",
	"Bryant",
	"Tran",
	"Harrison",
	"Campbell",
	"Gutierrez",
	"Flores",
	"Torres",
	"Rivera",
	"Ellis",
	"Martin",
	"Scott",
	"Lopez",
	"Washington",
	"Rice",
	"Peterson",
	"Romero",
	"Simmons",
	"Gordon",
	"Moore",
	"Robertson",
	"Rodriguez",
	"Walker",
	"Cruz",
	"Grant",
	"Mills",
	"Collins",
	"Mason",
	"Morales",
	"Olson",
	"Russell",
	"Henry",
	"Jordan",
	"Lewis",
	"Hill",
	"Mcdonald",
	"Williams",
	"Peters",
	"Alvarez",
	"Stephens",
	"Sanders",
	"Castillo",
	"Kim",
	"Howard",
	"Thompson",
	"Ward",
	"Brooks",
	"Perez",
	"Kennedy",
	"Chavez",
	"Hughes",
	"Allen",
	"Rogers",
	"Anderson",
	"Griffin",
	"Bradley",
	"Mendoza",
	"Wells",
	"Roberts",
	"Ramos",
	"Hernandez",
	"Phillips",
	"Ruiz",
	"Dixon",
	"Hunter",
	"Hamilton",
	"Taylor",
	"Cook",
	"Coleman",
	"Herrera",
	"Mitchell",
	"Baker",
	"Morris",
	"Arnold",
	"West",
	"Jimenez",
	"Graham",
	"Hoffman",
	"Alexander",
	"Stevens",
	"Barnes",
	"Bennett",
	"Gomez",
	"Henderson",
	"Davis",
	"Foster",
	"Medina",
	"Gibson",
	"Price",
	"Turner",
	"Tucker",
	"Schmidt",
	"Crawford",
	"Holmes",
	"Owens",
	"Ryan",
	"Bell",
	"Palmer",
	"Hunt",
	"Simpson",
	"Ford",
	"Wagner",
	"Weaver",
	"Reyes",
	"Fox",
	"Powell",
	"Johnson",
	"Snyder",
	"Thomas",
	"Stone",
	"Shaw",
	"Gonzales",
	"Marshall",
	"Nguyen",
	"Stewart",
	"Hawkins",
	"Patterson",
	"Spencer",
	"Jones",
	"Long",
	"Meyer",
	"Pierce",
	"Boyd",
	"Carter",
	"Kelley",
	"Adams",
	"Ortiz",
	"Cunningham",
	"Daniels",
	"Martinez",
	"Wright",
	"Ramirez",
	"Porter",
	"Morgan",
	"Fernandez",
	"Webb",
	"Gardner",
	"Ross",
	"Murray",
	"Sullivan",
	"Burns",
	"Knight",
	"Hicks",
	"Gonzalez",
	"Cole",
	"Wood",
	"Rose",
	"Wallace",
	"White",
	"Ferguson",
	"Robinson",
	"Cox",
	"Bailey",
];

export let jobTitles = {
	"flesh_act3": [
		"Guard",
		"General",
		"Sergeant",
		"Vice-president",
	],
	"flesh_act2": [
		"Prisoner",
		"Junior manager",
		"Security officer",
		"Passenger",
	],
	"flesh_act1": [
		"Engineer",
		"Private",
	],
	"flesh_act6": [
		"Bio-mass",
		"Receptacle",
		"Creature",
		"Infection",
	],
	"flesh_act5": [
		"Bio-mass",
		"Receptacle",
		"Creature",
		"Infection",
	],
	"flesh_act4": [
		"Human",
		"President",
		"Subject",
		"Organism",
	],
};

