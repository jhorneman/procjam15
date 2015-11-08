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

## Scene types

Scenes come in types. This allows us to have special behavior for certain types, typically involving some form of procedural generation.

(However, there is a difference between scenes as a data structure inside the game, and scene _descriptions_ as something you can write. Right now, you can only write scene descriptions for one type: the Standard scene. This will change.)

The Standard scene type is like a passage in Twine. It has some text and a number of options.

If you don't specify a type, a scene is assumed to have the Standard type.

When you do want to specify the scene type, use the <meta> tag anywhere inside the scene description, like so:

    <meta type="someType"/>

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

### Conditional text

Adding a text element like this:

    <text cond="">
    </text>

means the text inside the element will only be shown if the condition is true. See below for how conditions work.

Everything else inside the text element will be ignored.

### Injected text

By adding this element:

    <injectText tags="" />

you can inject text that has the desired tags.

(Right now that works except there is no system to write tagged texts yet. Before you ask: no, you cannot put injected text inside a text element. Ask me if you _really_ need that.)

## Lead-ins

Lead-ins are choices that lead in to the current scene. The choice leading to a dynamically selected scene, depends on that scene and not on the scene where the choice is.

So if you want a choice to go to a spooky scene - that is, a scene tagged as 'spooky' - you want to write a number of spooky scenes ('Graveyard', 'Morgue') _and_ the choices leading there ('Go to the graveyard', 'Enter the morgue').

Because otherwise you end up having to write super-generic choices ('Go to a spooky place.')

To solve this, scenes can define lead-ins, which contain the text to be used for the choice leading into the scene:

    <leadin>Let's visit the graveyard!</leadin>

Lead-ins are combined with injected options, explained further down.

# Options

Scenes have options: things the player can do. In principle every scene has at least one option.

Each option has, at the very least, some text and an action. The text may be generated somehow. The action may require additional parameters.

The most common action is 'goto', and it requires a nextScene parameter, which contains the ID of the scene the game will go to when the player selects this option.

The goto action is so common, it is assumed to be an option's action if you don't specify anything else. So this:

    <option nextScene="forest">Go to the forest.</option>

is the shortest way to write a goto action.

There are no other action types right now.

## Conditions

You can make options appear or not by adding a condition to the tag, like so:

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

If you want to test if a value is true, just write the value without any operators:

    <option action="computer-room" cond="$has_mcguffin">...</option>

The not operator is the only operator that only takes one parameter: all the other ones must be used with the form

    parameter1 operator parameter2

Parameters are evaluated as follows:

* If the parameter starts with a $, we try to find a variable with the same name in the persistent game state. So if the game state tracks a variable called 'has_mcguffin', a parameter '$has_mcguffin' will equal the value of that variable. This is what you will usually want to use.
* Then we see if the parameter is 'random', and if so generate a random number between 0 and 100.
* Then we see if the parameter is 'true' or 'false'.
* Finally we treat the parameter as a number or a string.

## Injected options

Injected options allow you to tell the system to inject an option matching a given tag. This markup:

    <injectOption tags="spooky"/>

will search for a scene with a 'spooky' tag, and generate a goto option with the lead-in text from that scene (see above under lead-ins) that takes the player to that scene.

Instead of literal tags ("spooky, outside") you can also refer to state variables like this:

    <injectOption tags="spooky, $current_act"/>

# Text substitution

In scene and option texts, the engine can substitute certain tags for the current value of variables from the persistent game state.

Use {value} to do this. (You can also write {$value}, for consistency with references to variables in other places.)

Use {^value} to automatically capitalize the value.
