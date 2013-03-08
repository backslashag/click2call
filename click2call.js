// click2call, activates phone number on smartphones

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
		if(phonenumber.defaults['regexp']!=''){
			phonenumber.defaults['auto']=false;
			}
		if(phonenumber.defaults['countryDefinitions']!=''){
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
		if(phonenumber.defaults.linktitle!="" ){
			phonenumber._linkstring += "title='"+phonenumber.defaults.linktitle+"'";
			}
		if(phonenumber.defaults.linkclass!=""){
			phonenumber._linkstring += "class='"+phonenumber.defaults.linkclass+"'";
			}
		return this;
	},
	
	countryDefinitions : {
		'ch' : {'regex': [/(\+[0-9]{2}(\s|-|'|\+|\/))?(\(?0\)?)?[1-9]{2}(\s|-|'|\+|\/)?[0-9]{3}(\s|-|'|\+|\/)?[0-9]{2}(\s|-|'|\+|\/)?[0-9]{2}/g, /(\+[0-9]{2}(\s|-|'|\+|\/))?(\(?0\)?)?8[0-9]{2}(\s|-|'|\+|\/)?[0-9]{3}(\s|-|'|\+|\/)?[0-9]{3}/g ],
		'landwahl': '+41'
		}
	},
	_replaceNumbers : function (text, result, landvorwahl) {
		var vorwahllength =landvorwahl.length;
		for(var i = 0; i < result.length; i++){
			var str = result[i];
			if ( phonenumber.defaults.excluderaw.indexOf(str) < 0 ){
				// delete whitespaces
				var phoneNumber = str.replace(/\(0\)/g,'');
				//replace all instead of 
				phoneNumber = phoneNumber.replace(/[^0-9\+]/g, '');
											
				if(phoneNumber.substr(0,1) == "0"){
					phoneNumber = landvorwahl + phoneNumber.substr(1, phoneNumber.length);
					}
											
				// if there are calling codes
				if(vorwahllength){
					// if there isn't a "plus"
					if(phoneNumber.substr(0, 1) != "+"){
						phoneNumber = landvorwahl + phoneNumber;
						}
					}
										
				if ( phonenumber.defaults.excludeint.indexOf(phoneNumber) < 0 ){
					//creating a tag
					text = text.replace(new RegExp(str, 'g'), "<a href='tel:"+phoneNumber+"'"+phonenumber._linkstring+" >"+str+"</a>");
					}
				}
			}
		return text;
		},
	
	activate : function (){

		var element = document.getElementsByTagName("body")[0];
		var text = element.innerHTML;
		console.log(phonenumber.defaults['auto']);
		if(!phonenumber.defaults['auto']){
			//simple method with just a user defined regex
			var test = phonenumber.defaults['regexp'];
			var result = text.match(test);
			if(result){
				
				var landvorwahl = phonenumber.countryDefinitions['landwahl'];
				//loop result;
				text = phonenumber._replaceNumbers(text, result, landvorwahl);
						
				}
			}
		else{
			//complex method: use a structure with country-defintions
			for(var c=0; c<phonenumber.defaults['country'].length; c++){
				if( typeof phonenumber.countryDefinitions[phonenumber.defaults.country[c]] != 'undefined' ){
					for(var r=0; r<phonenumber.countryDefinitions[phonenumber.defaults.country[c]].regex.length; r++){
						var test = phonenumber.countryDefinitions[phonenumber.defaults.country[c]].regex[r];
						var result = text.match(test);
						if(result){
							// length calling code
							var landvorwahl = phonenumber.countryDefinitions[phonenumber.defaults.country[c]].landwahl;
							//loop result;
							text = phonenumber._replaceNumbers(text, result, landvorwahl);
							}
							
						}
					}
				}
			
			}
			// write back
			element.innerHTML = text;
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
