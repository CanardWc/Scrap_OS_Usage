const axios = require('axios');
const cheerio = require('cheerio');

var sites = 'https://gs.statcounter.com/os-market-share/mobile/worldwide';
var data = []; 
var fs = require('fs');

function getdata(sites, data, fs) {
	axios.get(sites)
		.then(response => {
			let getData = html => {
				v= -1;
				const $ = cheerio.load(html);
				$('.col .col-span-2').each((a, elem) => {
					data.push({
						OS : $(elem).find('th').text(),
						Percent :  $(elem).find('.count').text(),
					});
				});
				fs.writeFile('firstdata.json', JSON.stringify(data), (err) => {
					if (err) throw err
					console.log('The file has been saved!')
				});

				console.log(data.length);
				console.log(data);
			}
			getData(response.data);
		})
		.catch(error => {console.log(error);i})
}

getdata(sites, data, fs);
