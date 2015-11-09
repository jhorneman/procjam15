# Scenes

Scene descriptions are stored in text files (ending with.txt.) inside data/scenes.

Each file can contain one or more scenes.

If a file contains more than one scene, each scene must be put inside a scene XML element:

```
<scene>
...
</scene>
<scene
...
</scene>
```

etc. When a file only contains one scene, you can leave out the <scene>.

## Scene ID

Each scene must have an ID. An ID consists of letters, underscores, hyphens, spaces, and numbers. (I don't know if accented characters work: they may not, because scene IDs are used in URLs.)

When you put one scene in a file, the scene ID is extracted from the filename. So mess_hall.txt gives the ID 'mess_hall'. This is (like many of these things) for convenience.

When you put multiple scenes inside one file, use the <meta> tag to indicate the ID:

    <meta id="launch-center"/>

## Scene tags

Scenes can have tags. These are used to select one of a given number of scenes.

Tags are indicated in the <meta> element, like so:

    <meta tags="mission"/>

Tags are separated by commas. Leading and trailing white space is stripped. Currently there are no checks for empty or duplicate tags.

## Scene text

The main scene text is constructed from all the text inside the <scene> tag, as well as special text blocks, as described below.

### Injected text

By adding this element:

    <injectText tags="scream" />

you can inject text that has the desired tags.

Everything else inside the text element will be ignored.

(Right now this works except there is no system to write tagged texts yet.)

See below for more information about tags.

## Lead-ins

Lead-ins are choices that lead in to the current scene. The choice leading to a dynamically selected scene, depends on that scene and not on the scene where the choice is.

So if you want a choice to go to a spooky scene - that is, a scene tagged as 'spooky' - you want to write a number of spooky scenes ('Graveyard', 'Morgue') _and_ the choices leading there ('Go to the graveyard', 'Enter the morgue').

Because otherwise you end up having to write super-generic choices ('Go to a spooky place.')

To solve this, scenes can define lead-ins, which contain the text to be used for the choice leading into the scene:

    <leadin>Let's visit the graveyard!</leadin>

Lead-ins are combined with injected options, explained further down.

## Options

Scenes have options: things the player can do. In principle every scene has at least one option.

Each option has some text and a nextScene parameter, which contains the ID of the scene the game will go to when the player selects this option.

## Injected options

Injected options allow you to tell the system to inject an option matching a given tag. This markup:

    <injectOption tags="spooky"/>

will search for a scene with a 'spooky' tag, and generate a goto option with the lead-in text from that scene (see above under lead-ins) that takes the player to that scene.

See below for more information about tags.

# Conditions

The following elements can be made conditional by adding a 'cond' attribute to their tag:

* option.
* action.
* injectText.
* injectOption.
* leadin.
* if.
 
If has no other reason for being than wrapping things in a condition. You can nest ifs.

Elements with a condition are only shown or otherwise processed when the condition is true.

Here is an example of an optional option:

    <option action="computer-room" cond="$amount_of_data lt 3">...</option>

Conditions can contain the following operators:

* 'not': logical not, to test if a flag is False.
* 'is', 'eq', '==': equals, as in a counter equals 3.
* 'neq', '!=' not equals.
* 'gt': greater than.
* 'lt': less than.
* 'gteq': greater than or equal.
* 'lteq': less than or equal.

(We cannot use the < and > signs because that is cumbersome in XML.)

If you want to test if a value is true, just write the variable name without any operator:

    <option action="computer-room" cond="$has_mcguffin">...</option>

The not operator is the only operator that only takes one parameter: all the other ones must be used with the form

    parameter1 operator parameter2

Parameters on the _left_ of the operator - this includes no operator or the not operator - _must_ refer to a variable from the persistent game state. The parameter has to start with a $. So if the game state tracks a variable called 'has_mcguffin', a parameter '$has_mcguffin' will equal the value of that variable.

Parameters on the _right_ of the operator are evaluated as follows:

* If the parameter starts with a $, we try to find a variable with the same name in the persistent game state.
* If the parameter is 'random', and we generate a random number between 0 and 100.
* If the parameter is a number, it's treated as such.
* Finally we treat it as a string.

WARNING: That last line means that if you forget the $ sign on a parameter on the right of the operator, the condition will not behave as you intend, and you won't get a warning!

# Tags

When you ask for tags (in injectText or injectOption), you can ask for the current value of variable from the persistent game state by preceding it with a $ sign.

So this:

    <injectOption tags="spooky, $current_act"/>

looks for a scene that has the tag 'spooky' as well as a tag equal to the current value of current_act.

# Text substitution

In scene and option texts, the engine can substitute certain tags for the current value of variables from the persistent game state.

Use {value} to do this. (You can also write {$value}, for consistency with references to variables in other places.)

Use {^value} to automatically capitalize the value.

# Actions

You can affect the game state with the action element:

    <action act="..."/>

The following actions are possible:

* 'kill'. Kill the player.
* 'inc $varname'. Increase a variable named 'varname'.
* 'dec $varname'. Decrease a variable named 'varname'.
* 'set $varname value'. Set a variable named 'varname' to 'value'.

The $ in front of the variable name is important.
