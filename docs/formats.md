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

Tags are indicated in the <meta> tag, like so:

    <meta tags="mission"/>

Tags are separated by commas. Leading and trailing white space is stripped. Currently there are no checks for empty or duplicate tags.

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

Other action types right now are:

* 'computer-room'. Go to the computer room, which has special logic.
* 'mission'. Go to a scene tagged with 'mission'.
* 'found-data'. Go to the scene where the player found some data.

I am not happy with this way of implementing things, but it was the fastest way to test the architecture. But expect the action types to change.

## Conditions

You can make options appear or not by adding a condition to the tag, like so:

    <option action="computer-room" cond="amount_of_data lt 3">...</option>

Conditions can contain the following operators:

* 'not': logical not, to test if a flag is False.
* 'is', 'eq', '==': equals, as in a counter equals 3.
* 'neq', '!=' not equals.
* 'gt': greater than.
* 'lt': less than.
* 'gteq': greater than or equal.
* 'lteq': less than or equal.

We cannot use the < and > signs because that would be cumbersome in XML.

If you want to test if a value is true, just write the value without any operators:

    <option action="computer-room" cond="has_mcguffin">...</option>

The not operator is the only operator that only takes one parameter: all the other ones must be used with the form

    parameter1 operator parameter2

Parameters are evaluated as follows:

* First we try to find a variable with the same name as the parameter in the persistent game state. So if the game state tracks a variable called 'has_mcguffin', a parameter 'has_mcguffin' will equal the value of that variable. This is what you will usually want to do.
* Then we see if the parameter is 'true' or 'false'.
* Finally we see if the parameter is a number.
* If none of that works, we report an error and use the value 0.

## Injected options

Injected options allow you to tell the system to inject an option matching a given tag. This markup:

    <injectOption tags="spooky"/>

will search for a scene with a 'spooky' tag, and generate a goto option with the lead-in text from that scene (see above under lead-ins) that takes the player to that scene.
