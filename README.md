# click2call
----------------------------

## Informations

click2call is a plugin for highlighting phone-numbers for mobile-devices. So you can simply click on a number to start a call. 
It is searching several numbers on a page and it will mark the numbers. in special cases it would not find all numbers, because there are to much
different spellings of numbers.

the plugin is created as a configuration, so you don't have to overwrite the defaults-values directly in script.


###the default-values look like this:
{
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
}
<b> declaration: </b>

country: self-explanatory
landwahl: area code
linktitle: is the title-tag of the replaced number - link
linkclass: is the class-tag of the replaced number - link
regexp: is the regular expression
excluderaw:
excludeint:
countrydefinition: are the definitions of the specifig country


###overwriting default-values

you can simply overwrite the default-values:

var xyz = phonenumber.init( {'country' : 'de', 'landwahl': '+31', .. and so on ..} );


###important

you can specify the "regex" and then the script is searching numbers with this specified regex. 
the other option is that you will specify the country and the area code to search the numbers. you can't do both.

