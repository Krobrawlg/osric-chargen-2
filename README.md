# osric-chargen-2

A character generator based on the fantasy tabletop role-playing game OSRIC.

![osric-demo-gif](https://user-images.githubusercontent.com/31605814/153881004-9acc7067-f50f-4304-bd1c-2e7a90cbf5b0.gif)

![osric-gif-2](https://user-images.githubusercontent.com/31605814/153888063-e3b2971d-a942-4837-9260-e3dc4b20be15.gif)


## Built With:
- React
- Express.js
- MongoDB Atlas

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

### 3d6:

"Roll three six-sided dice."

This is the hardcore setting, resulting in regular joes with more "average" attributes.

### 4d6 Drop Lowest:

"Roll four six-sided dice, remove the lowest roll."

Generate 4 numbers from 1 to 6, take away the lowest number, and add the remaining 3 numbers together.
This method results in stronger-than-average characters.

Stat Distribution
--------------------------------------------------------------

### Down the line:

Stats are generated in order STR, DEX, CON, INT, WIS, CHA, and cannot be swapped around.
This method compels you to create a character based on the stats you roll.

### Customize:

Once the stats are rolled in order, you can click on two stats to switch their values.
This allows you to make the kind of character you want to play.

Race, Class, and Inventory
--------------------------------------------------------------
Next, choose your character's race, class, and purchase equipment for your character.
The data for these options is stored on a MongoDB Atlas NoSQL database. The app fetches this data through expressJS routing.

## Inventory:

Your character has a certain number of "Gold Pieces" (GP) to purchase items with randomly determined based on their character class. 
Fantasy currency has three denominations:

- Gold Pieces (GP) ... Value in GP 1:1
- Silver Pieces (SP) ... Value in GP 1:10
- Copper Pieces (CP) ... Value in GP 1:100

The app keeps track of your character's remaining GP as well as the total weight of their equipment.

### General Store:

Purchase equipment and tools to help your character survive in the wilderness or overcome a dungeon's perils.
     
### Armourer:
Sells armor.
     
### Weaponsmith:
Sells close-quarters weapons.
     
### Bowyer:
Sells ranged weapons.

Once you have picked at least one piece of equipment, a **Finalize Character** button will appear. Click this to access your character's Character Sheet.

### Character Sheet:
Here you can review your character's information then click **save character** to save your character to the Mongo DB database.

#### Exit:
Resets the application. If you saved your character, you can now see them on the list of characters by clicking the **Saved Characters** button.


License Information:
--------------------------------------------------------------

This project uses rules from the OSRIC™ System (Oldschool System Reference and Index Compilation™). The OSRIC™ system text may be found at http://www.knights-n-knaves.com/osric. The OSRIC™ text is copyright of Stuart Marshall. "OSRIC™" and "Oldschool System Reference and Index Compilation™" are trademarks of Stuart Marshall and Matthew Finch and may be used only in accordance with the OSRIC™ license.

COPYRIGHT NOTICE Open Game License v 1.0 Copyright 2000, Wizards of the Coast, Inc. System Reference Document Copyright 2000, Wizards of the Coast, Inc; Authors Jonathan Tweet, Monte Cook, Skip Williams, based on original material by E. Gary Gygax and Dave Arneson.

Images:

Hangami Danjo-no-jo Arakage killing a giant salamander in the Tontagawa River in the Province of Izumo; Utagawa Kuniyoshi

Akugenda Yoshihira, returning as a ghost, executes vengeance with a thunderbolt on his slayer, Namba Jiro; Utagawa Kuniyoshi

Takeuchi-no-sukune looking over the side of his ship, being offered two magic jewels, senju and manju, by the Dragon King; Utagawa Kuniyoshi

Honcho musha kagami Kintaro seizing Raijin the thundergod; Utagawa Kuniyoshi

Honcho musha kagami (Mirror of Warriors of Our Country) Iga Jutaro, his knee on a statue's head, reading a scroll; the witch Takiyashi-hime, holding a sword; Utagawa Kuniyoshi

Tawara Toda Hidesato escorted through the waves on the back of a giant turtle by the Dragon King's fishy retainers, having received the Three Gifts; Utagawa Kuniyoshi

Descriptions taken from monsterbrains.blogspot.com
