// create text (prompt) element by connecting to id from .html
const textElement = document.getElementById('text')
// create button (options) element by connectint to id from .html
const optionButtonsElement = document.getElementById('option-buttons')

// create state of game
let state = {}

// create a function to begin the game showing text id:1
function startGame() {
    state = {}
    showTextNode(1)
}

// create a function for the prompt 
function showTextNode(textNodeIndex) 
{
    // Create variable for current prompt from the textNode object
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    // Display the current prompt on the screen
    textElement.innerText = textNode.text
    // While the prompt has its 4 placeholder options
    while (optionButtonsElement.firstChild) 
    {
        // remove the placeholder options
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }
    // object objects
    textNode.options.forEach(option => 
        {
            // use the options provided by the object
            if (showOption(option)) 
                {
                    // create a variable for a new button
                    const button = document.createElement('button')
                    // display the object option text within the button
                    button.innerText = option.text
                    // add the new button
                    button.classList.add('btn')
                    // when the button is clicked 
                    button.addEventListener('click', () => selectOption(option))
                    // add the button
                    optionButtonsElement.appendChild(button)
                }
        })
}

// create a function for true/false options
function showOption(option) {
    // check to see if there is a required state
    return option.requiredState == null || option.requiredState(state)
}

// create a function to select an option button
function selectOption(option) 
{
    // create a variable to move to the desired nextText from the object
    const nextTextNodeId = option.nextText
    // if the next text is -1
    if (nextTextNodeId <= 0) 
    {
        // restart the game back to the first prompt
        return startGame()
    }
    // state is assigned by the object options
    state = Object.assign(state, option.setState)
    // show next desired prompt
    showTextNode(nextTextNodeId)
}

// Prompts with desired options
const textNodes = 
[
    {
        id: 1,
        text: 'Choose your character ability',
        options:
        [
            {
                text: 'Strength',
                setState: { strength: true },
                nextText: 2
            },
            {
                text: 'Dexterity',
                setState: { dexterity: true },
                nextText: 2
            },
            {
                text: 'Charisma',
                setState: { charisma: true },
                nextText: 2
            },
            {
                text: 'Luck',
                setState: { luck: true },
                nextText: 2,
            }
        ]
    },
    {
    id: 2,
    text: 'You wake up in the back of a wagon. You have agreed to be part of a traveling show led by the eccentric Viktor Lazlo. You see three mysyerious strangers in the wagon who have also join Lazlo\'s circus.',
    options: 
        [
            {
                text: 'Make conversation',
                nextText: 3
            },
            {
                text: 'Pretend to go back to sleep',
                nextText: 3
            },
            {
                text: 'Make friends (Charisma)',
                requiredState: (currentState) => currentState.charisma,
                setState: { charisma: true, ally: true},
                nextText: 3
            }
        ]
    },
    {
    id: 3,
    text: 'As the group is introducing themselves, the wagon comes to a sudden halt.',
    options: 
        [
            {
                text: 'Go back to sleep',
                // requiredState: (currentState) => currentState.blueGoo,
                // setState: { blueGoo: false, sword: true },
                nextText: 5
            },
            {
                text: 'Go outside and investigate',
                // requiredState: (currentState) => currentState.blueGoo,
                // setState: { blueGoo: false, shield: true },
                nextText: 4
            },
        ]
    },
    {
    id: 4,
    text: 'In front of the wagon stand two young children. They cry and beg you to save their baby brother who is trapped in their home.',
    options: 
        [
            {
                text: 'Decline to help',
                nextText: 5
            },
            {
                text: 'Agree to help',
                nextText: 6
            },
        ]
    },
    {
    id: 5,
    text: 'Wolves surround you baring their teeth. You are alone in this fight.',
    options: 
        [
            {
                text: 'Fight to the death',
                nextText: -1
            }
        ]
    },
    {
    id: 6,
    text: 'The children, Rose and Thorn Durst, take you and Viktor\'s band of strangers to a decrepit house. Although they are too scared to go in with you, they implore you to rescue baby Walter.',
    options:  
        [
            {
                text: 'Enter the house',
                nextText: 7
            },
            {
                text: 'Wait outside',
                nextText: 5
            }
        ]
    },
    {
    id: 7,
    text: 'Despite it\'s outward appearance, the inside of the house seems to be immaculate. The rooms are clean and brightly lit by a warm fire.',
    options: 
        [
            {
                text: 'Proceed to the main hall',
                nextText: 8
            }
        ]
    },
    {
    id: 8,
    text: 'The main hall connects to many rooms within the house. You decide where to go next.',
    options: 
        [
            {
                text: 'Dining room',
                nextText: 9
            },
            {
                text: 'Library',
                nextText: 11
            },
            {
                text: 'Conservatory',
                nextText: 17
            },
            {
                text: 'Upstairs',
                nextText: 20
            }
        ]
    },
    {
    id: 9,
    text: 'While the chairs are empty, the dining table itself is covered delicately displaying a massive feast',
    options: 
        [
            {
                text: 'Eat something delicious',
                nextText: 10
            },
            {
                text: 'Drink something delicious',
                nextText: 10
            },
            {
                text: 'Leave the room',
                nextText: 8
            }
        ]
    },
    {
    id: 10,
    text: 'You have been poisoned to death.',
    options: 
        [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
    id: 11,
    text: 'An exquisite mahogany desk and a matching high back chair face the entrance, above which hangs a framed picture of a windmill. Floor-to-ceiling bookshelves line the south wall. ',
    options: 
        [
            {
                text: 'Check the desk',
                nextText: 12
            },
            {
                text: 'Check the bookshelf',
                nextText: 14
            },
            {
                text: 'Leave the room',
                nextText: 8
            }
        ]
    },
    {
    id: 12,
    text: 'The desk drawer is locked.',
    options: 
        [
            {
                text: 'Use lockpick (Dexterity)',
                requiredState: (currentState) => currentState.dexterity,
                nextText: 13
            },
            {
                text: 'Move on',
                nextText: 11
            }
        ]
    },
    {
    id: 13,
    text: 'Inside the desk drawer, you find a key',
    options: 
        [
            {
                text: 'Pocket the key',
                setState: { key: true},
                nextText: 11
            }
        ]
    },
    {
    id: 14,
    text: 'One of the books looks like a lever',
    options: 
        [
            {
                text: 'Pull the lever',
                nextText: 15
            },
            {
                text: 'Ignore the lever',
                nextText: 11
            }
        ]
    },
    {
    id: 15,
    text: 'An old dart trap appears to have killed a man in this secret room a long time ago. Cluthed in his hand is a letter.',
    options: 
        [
            {
                text: 'Read the letter',
                nextText: 16
            }
        ]
    },
    {
    id: 16,
    text: '\" My most loyal servant, \n \I am not a messiah sent to you by the Dark Powers of this land. I have not come to lead you on a path to immortality. However many souls you have bled on your hidden alter; however many visitors you have tortured in your dungeon, know that you are not the ones that have brought me to this beautiful land. You are but worms writhing in my earth. \n You say that you are cursed, your fortunes spent. You abandoned love for madness, took solace in the bosom of another woman, and sired a basard son. Cursed by darkness? I think not. I much prefer you as you are. \n Your dread lord and master, \n Strahd von Zarovich\"',
    options: 
        [
            {
                text: 'Move on',
                nextText: 11
            }
        ]
    },
    {
    id: 17,
    text: 'An elegantly appointed hall with brass chandelier hanging from the ceiling. There is a piano in the center of the room and a chest against the wall',
    options: 
        [
            {
                text: 'Check the piano',
                nextText: 18
            },
            {
                text: 'Check the chest',
                nextText: 19
            },
            {
                text: 'Leave the room',
                nextText: 8
            }
        ]
    },
    {
    id: 18,
    text: 'Hiding behind the piano is a whimpering little dog. His tag bears the name \"Lancelot\"',
    options: 
        [
            {
                text: 'Gently invite the puppy into your party',
                setState: { dog: true},
                nextText: 17
            }
        ]
    },
    {
    id: 19,
    text: 'Inside the chest you find a small collection of weapons',
    options:
        [
            {
                text: 'Take Longsword (Strength)',
                requiredState: (currentState) => currentState.strength,
                setState: { strength: true, longsword: true },
                nextText: 17
            },
            {
                text: 'Take Shortsword (Dexterity)',
                requiredState: (currentState) => currentState.dexterity,
                setState: { dexterity: true, shortsword: true},
                nextText: 17
            },
            {
                text: 'Take Mighty Pen (Charisma)',
                requiredState: (currentState) => currentState.charisma,
                setState: { charisma: true, pen: true},
                nextText: 17
            },
            {
                text: 'Take Paddle Ball (Luck)',
                requiredState: (currentState) => currentState.luck,
                setState: { luck: true, paddle: true},
                nextText: 17
            }
        ]
    },
    {
    id: 20,
    text: 'A gorgeous staircase spirals up to a second floor balcony',
    options: 
        [
            {
                text: 'Continue',
                nextText: 21
            }
        ]
    },
    {
    id: 21,
    text: 'The balcony hosts a suit of armor and some more doors. You decide where to go next.',
    options:
        [
            {
                text: 'Investigate suit of armor',
                nextText: 22
            },
            {
                text: 'Master Suite',
                nextText: 25
            },
            {
                text: 'Children\'s Room',
                nextText: 27
            },
            {
                text: 'Return Downstairs',
                nextText: 8
            }
        ]
    },
    {
    id: 22,
    text: 'The suit of armor suddenly animates and attacks',
    options:
        [
            {
                text: 'Try to run away',
                nextText: 24
            },
            {
                text: 'Attack with longsword (Strength)',
                requiredState: (currentState) => currentState.longsword,
                nextText: 23
            },
            {
                text: 'Attack with swortsword (Dexterity)',
                requiredState: (currentState) => currentState.shortsword,
                nextText: 23
            },
            {
                text: 'Attack with Might Pen (Charisma)',
                requiredState: (currentState) => currentState.pen,
                nextText: 24
            },
            {
                text: 'Attack with Ally (Charisma)',
                requiredState: (currentState) => currentState.ally,
                nextText: 23
            },
            {
                text: 'Attack with PaddleBall (Luck)',
                requiredState: (currentState) => currentState.paddle,
                nextText: 23
            }
        ]
    },
    {
    id: 23,
    text: 'You successfully defend yourself from the armor.',
    options: 
        [
            {
                text: 'Continue',
                nextText: 21
            }
        ]
    },
    {
    id: 24,
    text: 'The armor tears off your arm and beats you to death with it',
    options:
        [
            {
                text: 'Restart',
                nextText: -1,
            }
        ]
    },
    {
    id: 25,
    text: 'A bedroom with a large painted portrait of a family on it. The name reads \"Durst\"',
    options:
        [
            {
                text: 'Check desk',
                nextText: 26
            },
            {
                text: 'Leave room',
                nextText: 21
            },
            {
                text: 'Investigate Wall',
                requiredState: (currentState) => currentState.secret,
                nextText: 34
            }
        ]
    },
    {
    id: 26,
    text: 'A bloody note reads \n \"I have disgraced our family. I have had an affair with our nursemaid. As much as I love baby Walter, my wife cannot stand the sight of him. She believes that he is our only hope for salvation. I should have never let her take him to the basement. I just cannot bare it anymore.\"',
    options: 
        [
            {
                text: 'Pocket the note',
                nextText: 25
            }
        ]
    },
    {
    id: 27,
    text: 'This room is locked',
    options:
        [
            {
                text: 'Unlock door (Use Key)',
                requiredState: (currentState) => currentState.key,
                nextText: 31
            },
            {
                text: 'Use lockpick (Dexterity)',
                requiredState: (currentState) => currentState.dexterity,
                nextText: 28
            },
            {
                text: 'Knock down the door (Strength)',
                requiredState: (currentState) => currentState.strength,
                nextText: 29,
            },
            {
                text: 'Jiggle the handle (Luck)',
                requiredState: (currentState) => currentState.luck,
                nextText: 30
            },
            {
                text: 'Leave',
                nextText: 21
            },
            {
                text: 'Have an ally try to knock down the door (Charisma)',
                requiredState: (currentState) => currentState.ally,
                nextText: 31
            }
        ]
    },
    {
    id:28, 
    text: 'The lockpick breaks',
    options: 
        [
            {
                text: 'Move on',
                nextText: 21
            }
        ]
    },
    {
    id: 29,
    text: 'You smash through the door',
    options:
        [
            {
                text: 'Continue',
                nextText: 31
            }
        ]
    },
    {
    id: 30,
    text: 'The door unlocks',
    options: 
        [
            {
                text: 'Continue',
                nextText: 31
            }
        ]
    },
    {
    id: 31,
    text: 'A dark room with a bricked-up window flanked by two dusty, wood framed beds. There are two small skeletons embracing each other on the floor by a dollhouse',
    options: 
        [
            {
                text: 'Inspect dollhouse',
                nextText: 32
            },
            {
                text: 'Take bones',
                nextText: 33
            },
            {
                text: 'Leave room',
                nextText: 21
            }
        ]
    },
    {
    id: 32,
    text: 'The dollhouse is an exact replica of Durst Manor. There is a secret door in the Master Suite',
    options:
        [
            {
                text: 'Continue',
                nextText: 31,
                setState: { secret: true},
            }
        ]
    },
    {
    id: 33,
    text: 'The bones remind you of the children Rose and Thorn.',
    options:
        [
            {
                text: 'Continue',
                nextText: 31,
                setState: { bones: true}
            }
        ]
    },
    {
    id: 34,
    text: 'The wall slides open to reveal a staircase descending into the dark.',
    options:
        [
            {
                text: 'Continue',
                nextText: 35
            }
        ]
    },
    {
    id: 35,
    text: 'The stairs descend deeper and deeper...',
    options: 
        [
            {
                text: 'Continue',
                nextText: 36
            }
        ]
    },
    {
    id: 36,
    text: 'You finally reach the basement floor. Looking back, you can barely see the light from the top of the stairs.',
    options: 
        [
            {
                text: 'Continue',
                nextText: 37
            }
        ]
    },
    {
    id: 37,
    text: 'The basement landing features a statue covered in a sheet between two doorways',
    options: 
        [
            {
                text: 'Peek under the sheet',
                nextText: 38
            },
            {
                text: 'Go left',
                nextText: 39
            },
            {
                text: 'Go right',
                nextText: 42
            }
        ]
    },
    {
    id: 38, 
    text: 'The statue depicts a pale faced man in a robe. He is holding a crystal ball and you begin to feel like he is looking back at you even after you cover it back up.',
    options: 
        [
            {
                text: 'Continue',
                nextText: 37
            }
        ]
    },
    {
    id: 39,
    text: 'A dark hallway with two doors at the end of the hall',
    options: 
        [
            {
                text: 'Cult Leader\'s Quarters ',
                nextText: 40
            },
            {
                text: 'Reliquary',
                nextText: 41
            },
            {
                text: 'Return to the basement landing',
                nextText: 37
            }
        ]
    },
    {
    id: 40,
    text: 'Next to the bed is an open chest filled with torches and candles. Hanging from the walls are several robes',
    options: 
        [
            {
                text: 'Grab robe',
                setState: { robe: true },
                nextText: 39
            },
            {
                text: 'Move on',
                nextText: 39
            }
        ]
    },
    {
    id: 41, 
    text: 'A voice is heard chaingint over and over \"He is the Ancient. He is the Land.\"',
    options:
        [
            {
                text: 'Move on',
                nextText: 39
            }
        ]
    },
    {
    id: 42,
    text: 'A long dark passageway with empty prison cells on each side. You can hear ominous chanting down the hall. \"He is the Ancient. He is the Land.\"',
    options: 
        [
            {
                text: 'Check cells',
                nextText: 43
            },
            {
                text: 'Continue deeper into the basement',
                nextText: 44
            },
            {
                text: 'Return to basement landing',
                nextText: 37
            }
        ]
    },
    {
    id: 43,
    text: 'The cultists shackled prisoners to the back walls of alcoves here. The prisoners are long gone, but their bones litter the floor.',
    options: 
        [
            {
                text: 'Move on',
                nextText: 42
            }
        ]
    },
    {
    id: 44,
    text: 'You are startled by a loud noise right behind you. The way back to the basement landing is blocked by a rusty iron portcullis.',
    options:
        [
            {
                text: 'Move on',
                nextText: 45
            },
            {
                text: 'Force open the portcullis (Strength)',
                requiredState: (currentState) => currentState.strength,
                nextText: 42
            }
        ]
    },
    {
    id: 45, 
    text: 'A ghoul in black robes starts towards you',
    options:
        [
            {
                text: 'Attack with longsword (Strength)',
                requiredState: (currentState) => currentState.longsword,
                nextText: 46
            },
            {
                text: 'Attack with shortsword (Dexterity)',
                requiredState: (currentState) => currentState.shortsword,
                nextText: 46
            },
            {
                text: 'Attack with Mighty Pen (Charisma)',
                requiredState: (currentState) => currentState.pen,
                nextText: 47
            },
            {
                text: 'Try to run',
                nextText: 47
            },
            {
                text: 'Put on disguise (Robe)',
                nextText: 48
            }
        ]
    },
    {
    id: 46,
    text: 'You slay the ghoul cultist with your sword',
    options:
        [
            {
                text: 'Continue on',
                nextText: 49
            }
        ]
    },
    {
    id: 47,
    text: 'You are clawed to death by the ghoul cultist.',
    options: 
        [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
    id: 48,
    text: 'You sneak by in your disguise',
    options:
        [
            {
                text: 'Continue on',
                nextText: 49
            }
        ]
    },
    {
    id: 49,
    text: 'You have reached the ritual chamber. The chanting is echoeing through your skull. \"He is the Ancient. He is the Land. He is the Ancient. He is the Land.\" The chamber steps down into knee-high waters.',
    options: 
        [
            {
                text: 'This is it',
                nextText: 50
            }
        ]
    },
    {
    id: 50,
    text: 'The chanting stops as you peer into this 40 foot square room. The smooth masonry walls provide excellent acoustics. Featureless stone pillars support the ceilig, and a breach in the west wall leads to dark caved heaped with refuse. Murky waters cover most of the floor. In the middle of the room, stairs rise to form an octagonal dais that rises fromt eh water. Rusty chains with shackles dangle from the ceiling directly above a stone alter mounted on the dais. The altar is carved with hiddeous depioctions of grasping ghouls and is stained with dry blood.',
    options:
        [
            {
                text: 'Approach the altar',
                nextText: 51
            }
        ]
    },
    {
    id: 51,
    text: 'On top of the altar is a small and rusty sacrificial blade. The chants start up again, louder this time. \"One must die. One must die. One must die.\"',
    options:
        [
            {
                text: 'Sacrifice an ally',
                nextText: 52
            },
            {
                text: 'Sacrifice puppy (Offer dog)',
                requiredState: (currentState) => currentState.dog,
                nextText: 53
            },
            {
                text: 'Refuse a sacrifice',
                nextText: 55
            }
        ]
    },
    {
    id: 52,
    text: 'Your ally draws their blade to defend themselves.',
    options:
        [
            {
                text: 'Swing your longsword (Strength)',
                requiredState: (currentState) => currentState.longsword,
                nextText: 53
            },
            {
                text: 'Swing your shortsword (Dexterity)',
                requiredState: (currentState) => currentState.shortsword,
                nextText: 53
            },
            {
                text: 'The Pen is Mightier! (Charisma)',
                requiredState: (currentState) => currentState.pen,
                nextText: 54
            },
            {
                text: 'Use the Paddle Ball (Luck)',
                requiredState: (currentState) => currentState.paddle,
                nextText: 53
            },
            {
                text: 'Punch your way out',
                nextText: 54
            }
        ]
    },
    {
    id: 53,
    text: 'A satisfied voice bellows fills the room \"Your sacrifice has been accepted\"',
    options: 
        [
            {
                text: 'Leave the house',
                nextText: 58
            }
        ]
    },
    {
    id: 54,
    text: 'Your death has satisfied the cultists.',
    options:
        [ 
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
    id: 55,
    text: 'The chanting rises once more as a large monstrosity appears from the dark cave before you. \"Then you will make a fine sacrifice\"',
    options:
        [
            {
                text: 'Draw sword (Strength)',
                requiredState: (currentState) => currentState.longsword,
                nextText: 56
            },
            {
                text: 'Draw shortsword (Dexterity)',
                requiredState: (currentState) => currentState.shortsword,
                nextText: 56
            },
            {
                text: 'Draw the Mighty Pen! (Charisma)',
                requiredState: (currentState) => currentState.pen,
                nextText: 57
            },
            {
                text: 'Draw the Paddle Ball (Luck)',
                requiredState: (currentState) => currentState.paddle,
                nextText: 56
            },
            {
                text: 'Raise fists',
                nextText: 57
            }
        ]
    },
    {
    id: 56,
    text: 'The Shambling mound is struck down. His body crumbles around his beating heart - Baby Walter\'s rotting corpse.',
    options:
        [
            {
                text: 'Take the child\'s remains',
                setState: { remains: true},
                nextText: 59
            }
        ]
    },
    {
    id: 57,
    text: 'The shambling mound consumes your souls. A sacrifice satiates the beast... for now',
    options:
        [
            {
                text: 'Restart',
                nextText: -1
            }
        ]
    },
    {
    id: 58,
    text: 'The cult permits you to leave. On the way out of the manor, you can hear Rose and Thorn crying hysterically but you are otherwise left alone.'
    },
    {
    id: 59,
    text: 'You run out of the house as fast you can. The walls begin to crumble around you.',
    options: 
        [
            {
                text: 'continue',
                nextText: 60
            }
        ]
    },
    {
    id: 60,
    text: 'You make it outside of the house just in time',
    options: 
        [
            {
                text: 'Bury remains',
                requiredState: (currentState) => currentState.bones || currentState.remains,
                nextText: 61
            },
            {
                text: 'Return to wagon',
                nextText: 62
            }
        ]
    },
    {
    id: 61,
    text: 'Rose and Thorn have been properly laid to rest with their brother Walter and their collective suffering has ended.',
    options: 
        [
            {
                text: 'Return to the wagon',
                nextText: 62
            }
        ]   
    },
    {
    id: 62,
    text: 'Waiting for you in front of Lazlo\'s wagon is the biggest git basket you have ever seen. Filled with fruit and wine and card front and center.',
    options:
        [
            {
                text: 'Read card',
                nextText: 63
            }
        ]
    },
    {
    id: 63,
    text: '\"Welcome to Barovia! \n -Strahd von Zarovich\"'
    }
]   

startGame()