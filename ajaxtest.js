var ajaxTestObject = Class.create({
	logbox: new Element('div', {id: 'logbox'}),
	initialize: function() {
		/* 	Some helper vars	 */
		this.isOpera = (typeof(opera) != 'undefined');
		
		/* Abstract out Opera's special console logging method */
		if (this.isOpera && typeof(opera.postError) != 'undefined')	{
			window.console = (window.console || {});
			console.log = opera.postError;
		}
		
		/* 	Beginning Tests	 */
		this.log('Starting testing...');
		
		/* 	Get XML file	 */
		this.log('test.xml');
		this.request({path: 'test.xml'});

		/* 	Get HTML file	 */
		this.log('test.html');
		this.request({path: 'test.html'});
		
		/* 	Get JSON file	 */
		this.log('test.json');
		this.request({path: 'test.json'});
		
		Element.observe(window, 'load', function() { ajaxTest.dumpLogs(); });
	},
	dumpLogs: function() {
		document.body.appendChild(ajaxTest.logbox);
	},
	log: function(message) {
		var d = new Date;
		message = d + ': ' + message;
		console.log(message);
		this.logbox.insert({bottom: new Element('p').update(message)});
	},
	request: function(params) {
		params.onSuccess = (params.onSuccess || this.onSuccess);
		params.onFailure = (params.onFailure || this.onFailure);
		params.isAsync = (params.isAsync || true);
		new Ajax.Request(params.path, {
			asynchronous: params.isAsync,
			onSuccess: params.onSuccess,
			onFailure: params.onFailure
		});
	},
	onSuccess: function(transport) {
		ajaxTest.log(transport.request.url + ' AJAX request succeeded. Status code: ' + transport.status);
		ajaxTest.log(transport.request.url + ' headers exist: ' + (transport.getAllHeaders() ? true : false));
		ajaxTest.log(transport.request.url + ' responseXML exists: ' + (transport.responseXML ? true : false));
		ajaxTest.log(transport.request.url + ' responseText exists: ' + (transport.responseText ? true : false));
		ajaxTest.log(transport.request.url + ' responseText length: ' + transport.responseText.length);
		ajaxTest.log(transport.request.url + ' headerJSON exists: ' + (transport.headerJSON ? true : false));
	},
	onFailure: function(transport) {
		ajaxTest.log('AJAX request failed. Status code: ' + transport.status);
	}
});

var ajaxTest = new ajaxTestObject();