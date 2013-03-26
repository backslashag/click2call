# click2call
----------------------------

## Informations

click2call is a plugin for highlighting phone-numbers for mobile-devices. So you can simply click on a number to start a call. 
It is searching several numbers on a page and it will mark the numbers. in special cases it would not find all numbers, because there are to much
different spellings of numbers.

the plugin is created as a configuration, so you don't have to overwrite the defaults-values directly in script.


###the default-values look like this:

	defaults : 
		{
			'country': "ch",
			'landwahl': "+41",
			'linktitle': "",
			'linkclass': "",
			'regexp': "",
			'excluderaw': "",
			'excludeint': "",
			'countryDefinitions' : ""	
		}
	
<b> declaration: </b>

	<p>country: self-explanatory</p>
	<p>landwahl: area code</p>
	<p>linktitle: is the title-tag of the replaced number - link</p>
	<p>linkclass: is the class-tag of the replaced number - link</p>
	<p>regexp: is the regular expression</p>
	<p>excluderaw:</p>
	<p>excludeint:</p>
	<p>countrydefinition: are the definitions of the specifig country</p>


###overwriting default-values

you can simply overwrite the default-values:

	var xyz = phonenumber.init( {'country' : 'de', 'landwahl': '+31', .. and so on ..} );
	xyz.activate();

### demo
Please visit the demo / test cases:
* [Swiss](http://htmlpreview.github.com/?https://raw.github.com/backslashag/click2call/master/exampleCountryNumbers/click2call_CH.html)
* [German](http://htmlpreview.github.com/?https://raw.github.com/backslashag/click2call/master/exampleCountryNumbers/click2call_DE.html)
* [US](http://htmlpreview.github.com/?https://raw.github.com/backslashag/click2call/master/exampleCountryNumbers/click2call_USA.html)

###important

you can specify the "regex" and then the script is searching numbers with this specified regex. 
the other option is that you will specify the country and the area code to search the numbers. you can't do both.

