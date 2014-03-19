var request = require('request');
var cheerio = require('cheerio');
var Q = require('q');

exports.list = function(req, res){
	var jobs = [];
	//	for(var i = 0; i < 50; i+=10){
			request('http://www.indeed.com/jobs?q=junior+web+developer&l=New+York&start=' + '0'/*i*/, function(err, response, html){
			var $ = cheerio.load(html);
			var rows = $('.row');
				$(rows).each(function(i, row){
					currentJob = {title:"",link:"",sumarry:""}
					var link = $(row).find('.jobtitle a');
					if($(link).attr('href')){
						currentJob.title = $(link).text();
						currentJob.link= 'http://www.indeed.com'+ $(link).attr('href');
						var summary = $(row).find('.summary');
						currentJob.summary = summary.text();
						jobs.push(currentJob);
					}
				});
				request('http://www.simplyhired.com/k-entry-level-developer-l-new-york-ny-jobs.html', function(err, response, html){
				var $ = cheerio.load(html);
				var rows = $('.job');
					$(rows).each(function(i, row){
						currentJob = {title:"",link:"",sumarry:""}
						var link = $(row).find('.title');
						if($(link).attr('href')){
							currentJob.title = $(link).text();
							currentJob.link= 'http://www.simplyhired.com'  + $(link).attr('href');
							var summary = $(row).find('.description');
							currentJob.summary = summary.text();
							jobs.push(currentJob);
						}
					});
					request('http://www.careerbuilder.com/Jobseeker/Jobs/JobResults.aspx?qb=1&SB%3Asbkw=junior+web+developer&SB%3As_freeloc=New+York%2C+NY+10001&SB%3Asbfr=30&sbsbmt=Find+Jobs&IPath=QHKV&excrit=freeLoc%3DNew+York%2C+NY+10001%3Bst%3Da%3Buse%3DALL%3BrawWords%3Djunior+web+deverlop%3BTID%3D0%3BCTY%3D10001%3BSID%3DNY%3BZID%3D10001%3BCID%3DUS%3BLOCCID%3DUS%3BENR%3DNO%3BDTP%3DDRNS%3BYDI%3DYES%3BIND%3DALL%3BPDQ%3DAll%3BPDQ%3DAll%3BPAYL%3D0%3BPAYH%3Dgt120%3BPOY%3DNO%3BETD%3DALL%3BRE%3DALL%3BMGT%3DDC%3BSUP%3DDC%3BFRE%3D30%3BCHL%3DAL%3BQS%3Dsid_unknown%3BSS%3DNO%3BTITL%3D0%3BOB%3D-relv%3BJQT%3DRAD%3BJDV%3DFalse%3BSITEENT%3DUSJob%3BMaxLowExp%3D-1%3BRecsPerPage%3D25&cid=US&findjob=sb', function(err, response, html){
					var $ = cheerio.load(html);
					var rows = $('.prefRow > td:nth-child(2)');
						$(rows).each(function(i, row){
							currentJob = {title:"",link:"",sumarry:""}
							var link = $(row).find('.prefTitle');
							if($(link).attr('href')){
								currentJob.title = $(link).text();
								currentJob.link= $(link).attr('href');
								var summary = $(row).find('#JL_D div');
								currentJob.summary = summary.text();
								jobs.push(currentJob);
							}
						});
					request('http://nytm.org/made-in-nyc', function(err, response, html){
							var mInNy = [];
					var $ = cheerio.load(html);
					var rows = $('li , li a');
						$(rows).each(function(i, row){
							currentJob = {title:"",link:""}
							var link = $(row).find('li a');
							if($(link).attr('href')){
								currentJob.title = $(link).text();
								currentJob.link= $(link).attr('href');
								if(currentJob.title.match(/hiring/)){
									mInNy.push(currentJob);
								}
							}
						});
						res.render('jobs', { title: "jobs", jobs: jobs, mInNy:mInNy});
					});
					});
				});
			});
	//	}
};