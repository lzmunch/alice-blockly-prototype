# Alice Blockly Prototype v0.1

This is the first iteration of the a prototype of the Alice editor built on [Blockly](https://developers.google.com/blockly). 

Try the prototype a https://lzmunch.github.io/alice-blockly-prototype/src/index.html

These were the key features from Alice expressed in the prototype:
* Custom blocks with custom types
* Different tabs with their own workspace, scope, and set of available blocks
    * Starting Tabs:
        * Scene - doesn't include a workspace or toolbox (should have its own set of non-block based UI)
        * initializeEventListeners - includes an Event Listeners category
        * myFirstMethod - default method for users to start with.
    * Create a new procedure: this creates a duplicate of the myFirstMethod tab, with an added option to add parameters
* Ability to create and use functions. Parameters can be created and scoped to the procedure tab it was created in, but I didn't implement the actual functionality required to access them outside the procedure tab.
* Event listener blocks (e.g. do something on a key press)

Notes:
* It was difficult to determine when to extend existing Blockly capabilities and when to rebuild them, since it can be difficult to access specific properties of default Blockly blocks and there is less freedom to visually structure blocks and functionalities to be similar to Alice. An example of this is the existing Alice function block. This prototype uses my own basic implementation of a function(aka procedure), to support associating them with tabs.
