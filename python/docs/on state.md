# Introduction
Handling state is a problem in games (saved games) and in web development (HTTP is a stateless protocol). And so, in a web-based game, the problem is twice as annoying.

Assumptions:

- We'd like to avoid using a database, at least initially, because it takes effort to set up. We'd have to set it up three times: once for development on OS X, once for development on Windows, once for live operations on Heroku. It's doable, but I want to avoid it right now.
- We don't want to provide the most cast-iron experience in the world. "Like an online Twine game" is good enough.
- Not being able to undo player actions is fine.
- We don't want to do any user registration or anything like that.

# Solution
All persistent game state is stored in a cookie on the user's browser.
If this becomes a problem we store the state in a database, and store a session id in a cookie.

# Consequences
It must be possible to create any scene based on the persistent game state and the current action.

The effect of the action should not depend on the scene that contained the action. The previous scene is irrelevant, except for transition text.

## Procedural content
There are some subtle issues related to procedural content.

Avoiding picking the same content more than once, or more than once in a recent time period, implies state. We don't want to track lists of everything we've generated. A nice solution is to pre-generate shuffled lists that have the desired qualities, and then index those.

Initially, given the constraints of a game jam, we just generate things and then make it more sophisticated.

Replicating the same content based on persistent game state is hard when the input data (word lists etc.) may change, again given the constraints of a game jam. Detecting that input data has signficantly(!) changed is hard. Increasing version numbers manually or giving IDs to all content is annoying.

Initially, we will just ignore this problem. It might create logical inconsistencies if we change content on the server while the game is running, which is acceptable right now.
