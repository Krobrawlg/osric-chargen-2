# osric-chargen-2

A character generator based on the fantasy tabletop role-playing game OSRIC.

## Built With
*React
*Express.js
*MongoDB Atlas

Using the Generator:
--------------------------------------------------------------

First, select your desired character generation settings.
The terms 3d6 and 4d6 are taken from tabletop roleplaying to refer to dice rolls.
The first number refers to the number of dice to be rolled, the "d" is for "dice", and the second number refers to the number of sides on each die.
For example, 3d6 means "roll three six-sided dice".
This generates a random number between 3 and 18 with an uneven probability curve.
3d6 results in 216 possible combinations, only one of which [6, 6, 6] results in an 18. 
Thus, the odds of generating an 18 are 1/216, wheras the odds of rolling a 10 or 11 are 27/216.

In OSRIC, such dice rolls are used to generate a characters "Stats" - their attributes.
Strength (STR), Dexterity (DEX), Constitution (CON), Intelligence (INT), Wisdom (WIS), Charisma (CHA)
A higher number means a character is more endowed with a particular attribute.

In this program, there are two "dice roll" settings to choose from.

3d6:

This is the hardcore setting, resulting in regular joes with more "average" attributes.

4d6 Drop Lowest:

Generate 4 numbers from 1 to 6, take away the lowest number, and add the remaining 3 numbers together.
This method results in stronger-than-average characters.

Stat Distribution
--------------------------------------------------------------

Down the line:

Stats are generated in order STR, DEX, CON, INT, WIS, CHA, and cannot be swapped around.
This method compels you to create a character based on the stats you roll.

Customize:

Once the stats are rolled in order, you can click on two stats to switch their values.
This allows you to make the kind of character you want to play.

License Information:
--------------------------------------------------------------

This project uses rules from the OSRIC™ System (Oldschool System Reference and Index Compilation™). The OSRIC™ system text may be found at http://www.knights-n-knaves.com/osric. The OSRIC™ text is copyright of Stuart Marshall. "OSRIC™" and "Oldschool System Reference and Index Compilation™" are trademarks of Stuart Marshall and Matthew Finch and may be used only in accordance with the OSRIC™ license.

COPYRIGHT NOTICE Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc. System Reference Document Copyright 2000, Wizards of the Coast, Inc; Authors Jonathan Tweet, Monte Cook, Skip Williams, based on original material by E. Gary Gygax and Dave Arneson.
