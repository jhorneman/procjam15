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

    <meta type='someType'/>

## Scene ID

Each scene must have an ID. An ID consists of letters, underscores, hyphens, and numbers. (I don't know if accented characters work: they may not, because scene IDs are used in URLs.)

When you put one scene in a file, the scene ID is extracted from the filename. So mess_hall.txt gives the ID 'mess_hall'. This is (like many of these things) for convenience.

When you put multiple scenes inside one file, use the <meta> tag to indicate the ID:

    <meta id='launch-center'/>

## Scene tags

Scenes can have tags. These are used to select one of a given number of scenes.

Tags are indicated in the <meta> tag, like so:

    <meta tags='quest'/>

Tags are separated by commas. Leading and trailing white space is stripped. Currently there are no checks for empty or duplicate tags.

# Options

Scenes have options: things the player can do. In principle every scene has at least one option.

Each option has, at the very least, some text and an action. The text may be generated somehow. The action may require additional parameters.

The most common action is 'go-to', and it requires a nextScene parameter, which contains the ID of the scene the game will go to when the player selects this option.

The go-to action is so common, it is assumed to be an option's action if you don't specify anything else. So this:

    <option nextScene='forest'>Go to the forest.</option>

is the shortest way to write a go-to action.

Other action types right now are:

* 'computer-room'. Go to the computer room, which has special logic.
* 'quest'. Go to a scene tagged with 'quest'.
* 'found-data'. Go to the scene where the player found some data.

I am not happy with this way of implementing things, but it was the fastest way to test the architecture. But expect the action types to change.
