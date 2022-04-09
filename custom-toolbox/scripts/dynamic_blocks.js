// add parameter button

// value type (dropdown)
// name (string)

// add block to parameters category

// create new block w/ function

// automatically saved? push save button


var userBlockJsonTemplate = {
	'message0': '',
	"args0": [],
	'previousStatment': null,
	'nextStatement': null,
};

// // create block for myFirstMethod
Blockly.Blocks['my_first_method'] = {
	init: function() {
			let blockJson = userBlockJsonTemplate;
			blockJson['message0'] = 'myFirstMethod';
			console.log(blockJson);

	    this.jsonInit(blockJson);
	    this.setPreviousStatement(true);
		},
	tabID: '#myFirstMethodTab'
};
Blockly.JavaScript['my_first_method'] = function(block) {
  return 'console.log("No code to execute");';
}
