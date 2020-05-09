/*---------------------------------------------------|
|                                                    |
|                 Bulk Netname Lookup                |
|               An IGSteven Project                  |
|       github.com/IGSteven/Bulk-Netname-lookup      |
|                                                    |
|---------------------------------------------------*/

// Requirements
const fs = require('fs');
const readline = require('readline');
const whois = require('whois')
const chalk = require('chalk');

// Load File
const file = "./ips.txt";

// Split lines into arrays
var lineReader = readline.createInterface({
  input: fs.createReadStream(file)
});

// Functions

function getValueByKey(text, key){
    var regex = new RegExp("^" + key + ":(.*)$", "m");
    var match = regex.exec(text.toLowerCase());
    if(match)
        return match[1];
    else
        return null;
}

// Code
i = 0;
lineReader.on('line', function (line) {
	setTimeout(() => {
		whois.lookup(line.trim(' '), function(err, data) {
			if (data == null){
				return console.log(line + " \: ERROR - No whois data" );
			}
			let check1 = getValueByKey(data, "netname");
			if (check1){
				console.log(line + " \: " + check1.trim(' ').toUpperCase());
			}
			else {
				let check2 = getValueByKey(data, "network:netname");
				if (check2){
					console.log(line + " \: " + check2.trim(' ').toUpperCase());
				}
				else
				{
					let check3 = getValueByKey(data, "network:NetName");
					if (check3){
						console.log(line + " \: " + check3.trim(' ').toUpperCase());
					}
					else
					{
						(line + " \: ERROR" );
						console.log(line + " \: ERROR - No route info found" );
					}
				}
			}
		})
	}, i*100); 
	i = i + 1;
});
setTimeout(() => {
	setTimeout(() => {
		console.log(chalk.yellow(" \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \n \- \- Made for UK Dedicated Servers \- \- \- \n \- \- Website\: https\:\/\/UKServers\.com\/ \- \- \n \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \n \- \- \- \- \- Code by\: Steven Smith \- \- \- \- \n \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \- \-"))
	}, i*100+200);
}, 50);