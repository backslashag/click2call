// click2call, activates phone number on smartphones
// version: 1.2.1

var phonenumber = {
	defaults : {
		'country': "ch",
		'landwahl': "+41",
		'linktitle': "",
		'linkclass': "",
		'regexp': "",
		'excluderaw': "",
		'excludeint': "",
		'countryDefinitions' : ""
	},
		init : function (config) {
			var prop;
			if (config) {
				for (prop in config) {
					phonenumber.defaults[prop] = config[prop];
				}
			}
			phonenumber.defaults['auto'] = true;
			if(phonenumber.defaults['regexp']!==''){
				phonenumber.defaults['auto']=false;
				}
			if(phonenumber.defaults['countryDefinitions']!==''){
				var cd;
				if (phonenumber.defaults['countryDefinitions']) {
					for (cd in phonenumber.defaults['countryDefinitions']) {
						phonenumber.countryDefinitions[cd] = phonenumber.defaults['countryDefinitions'][cd];
				}
			}
				}
			phonenumber.defaults['excluderaw'] = phonenumber.defaults['excluderaw'].split(',');
			phonenumber.defaults['excludeint'] = phonenumber.defaults['excludeint'].split(',');
			phonenumber.defaults['country'] = phonenumber.defaults['country'].split(',');

			phonenumber._linkstring = "";
			if(phonenumber.defaults.linktitle!=="" ){
				phonenumber._linkstring += "title='"+phonenumber.defaults.linktitle+"'";
				}
			if(phonenumber.defaults.linkclass!==""){
				phonenumber._linkstring += "class='"+phonenumber.defaults.linkclass+"'";
				}
			return this;
		},

		countryDefinitions : {
			'ch' : {
				'regex': [
					/([0][1-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])|(([0][0]|\+)[1-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9][0-9](\s|)[0-9][0-9](\s|)[0-9][0-9])/g
				],
				'landwahl': '+41'
			}
		},

		_insertAnchor: function(textnode, target, href, text) {
			var txt = textnode.node.nodeValue;
			var start = txt.indexOf(target);
			var end = start + target.length;
			
			// reduce textnode text
			textnode.node.nodeValue = txt.substring(0, start);
			
			// insert anchor
			var anchor = document.createElement("a");
			anchor.innerHTML = text;
			anchor.href = href;
			anchor.title = phonenumber.defaults.linktitle;
			anchor.className = phonenumber.defaults.linkclass;
			textnode.parent.insertBefore(anchor, textnode.node.nextSibling);
			
			// insert new text node with remaining text
			var txt2 = document.createTextNode(txt.substring(end));
			textnode.parent.insertBefore(txt2, anchor.nextSibling);
			textnode.node = txt2;
		},
		
		_processNode: function(textnode, hits, landvorwahl) {
			for (var i = 0; i < hits.length; i++)
				var str = hits[i];
				if (str && phonenumber.defaults.excluderaw.indexOf(str) < 0 ){
					// delete whitespaces
					var phoneNumber = str.replace(/\(0\)/g,'');
					//replace all instead of
					phoneNumber = phoneNumber.replace(/[^0-9\+]/g, '');

					if(phoneNumber.substr(0,1) == "0"){
						phoneNumber = landvorwahl + phoneNumber.substr(1, phoneNumber.length);
					}

					// if there are calling codes
					if(landvorwahl.length){
						// if there isn't a "plus"
						if(phoneNumber.substr(0, 1) != "+"){
							phoneNumber = landvorwahl + phoneNumber;
						}
					}

					if ( phonenumber.defaults.excludeint.indexOf(phoneNumber) < 0 ){
						phonenumber._insertAnchor(textnode, str, "tel:"+phoneNumber, str);
					}
				}
		},
		
		_getChildTextNodes: function(node) {
			var nodes = [];
			for (var i = 0; i < node.childNodes.length; i++) {
				var child = node.childNodes[i];
				if (child.nodeName.toLowerCase() === "script") {
					continue;
				} else if (child.nodeType === 3) {
					nodes.push({node: child, parent: node});
				} else if (child.nodeType === 1) {
					nodes = nodes.concat(phonenumber._getChildTextNodes(child));
				}
			}
			return nodes;
		},

		activate : function (){
			var textnodes = phonenumber._getChildTextNodes(document.body);
			for (var i = 0; i < textnodes.length; i++) {
				
				var textnode = textnodes[i];
				var textValue = textnode.node.nodeValue;
                if (textValue){
					if(!phonenumber.defaults['auto']){
						//simple method with just a user defined regex
						var test = phonenumber.defaults['regexp'];
						var result = textValue.match(test);
						if(result){
			
							var landvorwahl = phonenumber.countryDefinitions['landwahl'];

							phonenumber._processNode(textnode, result, landvorwahl);
			
						}
					} else{
						//complex method: use a structure with country-defintions
						for(var c=0; c<phonenumber.defaults['country'].length; c++){
							if( typeof phonenumber.countryDefinitions[phonenumber.defaults.country[c]] != 'undefined' ){
								for(var r=0; r<phonenumber.countryDefinitions[phonenumber.defaults.country[c]].regex.length; r++){
									var test = phonenumber.countryDefinitions[phonenumber.defaults.country[c]].regex[r];
									var result = textValue.match(test);
									if(result){
										// length calling code
										var landvorwahl = phonenumber.countryDefinitions[phonenumber.defaults.country[c]].landwahl;

										phonenumber._processNode(textnode, result, landvorwahl);
										}
			
									}
								}
						}
					}
				}
			}
		}
	};

	if (!Array.prototype.indexOf) {
	Array.prototype.indexOf = function (obj, fromIndex) {
		if (fromIndex == null) {
			fromIndex = 0;
		} else if (fromIndex < 0) {
			fromIndex = Math.max(0, this.length + fromIndex);
		}
		for (var i = fromIndex, j = this.length; i < j; i++) {
			if (this[i] === obj)
				return i;
		}
		return -1;
	};
}
