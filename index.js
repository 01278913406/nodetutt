
const minimist = require('./node_modules/minimist');
const platform = require('./node_modules/platform');
const nightmare = require('./node_modules/nightmare');

let args = minimist(process.argv.slice(2), {
	alias: {
		ur : 'url',
		px : 'proxy',
		pt : 'port',
		us : 'user',
		ps : 'pass',
		ws : 'windows',
		te : 'time',
		re : 'referrals'
	},
	default: {
		url : 'http://google.com/', // Url to navigate
		proxy : '', // Proxy address 1.127.0.1, localhost or example.com
		port : '', // Proxy port
		user: '', // Proxy username
		pass: '', // Proxy pass
		windows: '1', // Total of windows to be opened
		time : '3', // Total time of the section in minutes
		referrals : 'no'
	}
});

// console.log('args:', args);

const venenoTrafficBot = async id => {
	'use strict';

	Array.prototype.randomElement = function () {
		return this[Math.floor(Math.random() * this.length)];
	}
	function getRandomArbitrary(min, max) {
		return Math.floor(
			Math.random() * (max - min + 1) + min
		  )
	  }
	function randomTimeFromInterval(min, max) { // min and max included 
		return (Math.floor(Math.random() * (max - min + 1) + min) * 6000) / 6;
	}

	function randomNumber(min, max) {  
		return Math.floor(
		  Math.random() * (max - min) + min
		)
	  }

	let url = args.url, screenArray;
	let proxy = args.proxy ? args.proxy + ':' + args.port : '';
	let user = args.user;
	let pass = args.pass;
	let miliseconds = (args.time == 'random') ? randomTimeFromInterval(60, 300) : (args.time * 6000) / 6;
	
	//let userAgentObj = require("./useragent/most-common.json");
	//let userAgentObj = require("./useragent/android-browser.json");
	let userAgentObj = require("./useragent/useragents.json");
	let obj = JSON.parse(JSON.stringify(userAgentObj));
	let ua = obj.randomElement().ua;
	let info = platform.parse(ua); // Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7.2; en; rv:2.0) Gecko/20100101 Firefox/4.0 Opera 11.52
	let osFamily = info.os.family; // Android, IOS, Linux, etc..
	//let blacklist = ['https://www.facebook.com/ppplayermusic','https://instagram.com/ppplayermusic', 'http://google.com/public/search','http://google.com/search','http://google.com/login','http://google.com/register'];
	let blacklist = ['https://progamerage.com','https://www.profitablegatetocontent.com','https://one.exnesstrack.com','//','https://wsecurely.com','https://financeritual.com','http://foodblog.click/profile/tran-thanh-tu','http://foodblog.click/register', 'http://foodblog.click/contact','https://www.facebook.com','https://twitter.com','http://www.linkedin.com','https://api.whatsapp.com','http://pinterest.com','http://www.tumblr.com','http://foodblog.click/forgot-password','javascript'];
	//let keywordlist =['Good tips in the kitchen','Cake recipe','Cooking recipe','Learn To Cook Soup','Learn to Cook Salads','Learn to Cook Steamed Food','Learn to Cook bun','Learn to braised dishes','Learn to Cook Hot Pot','Learn to Cook Stir-fry','Learn To Cook Tea','Learn to Cook Snacks'];
	let keywordlist =['foodblog.click Học Nấu Món Chè','foodblog.click Học Nấu Món Xào','foodblog.click Học Nấu Món Lẩu','foodblog.click Học Nấu Món Gỏi','foodblog.click Học Nấu Món Mứt'];
	let keywword = keywordlist[Math.floor(Math.random() * keywordlist.length)];
	

	
	// ERRORS
	if (url == '') {
		console.log('-----------------------------------------------------');
		console.log('Oops! Please enter a url.');
		console.log('-----------------------------------------------------');
		process.exit(1);
	} else if (user == '' && pass != '') {
		console.log('-----------------------------------------------------');
		console.log('Oops! Please enter a username of the proxy server.');
		console.log('-----------------------------------------------------');
		process.exit(1);
	} else if (user != '' && pass == '') {
		console.log('-----------------------------------------------------');
		console.log('Oops! Please enter a password of the proxy server.');
		console.log('-----------------------------------------------------');
		process.exit(1);
	}

	
	if(osFamily == 'Android'){
		screenArray = [[240,320],[320,480],[480,800], [600,1024], [720,1280], [800,1280]];
	} else if (osFamily == 'IOS'){
		screenArray = [[375,812],[414,736],[375,667], [414,736], [320,568], [1024,1366]];
	} else {
		screenArray = [[640,480],[800,600], [1024,768], [1152,864], [1280,1024], [1366,768],[1600,1200]];
	}
	
	let randomScreenElement = screenArray.randomElement();
	
	const proxyNightmare = nightmare({
		executionTimeout: 1000000, // in ms
		waitTimeout: 1000000, // in ms		
		switches: {
			'proxy-server': proxy, // set the proxy server here ...	
			'ignore-certificate-errors': true	
		},
		width: randomScreenElement[0],
		height: randomScreenElement[1],
		show: true
	});

	console.log(`Now checking ${id}`);
	console.log("OS: " + osFamily);
	console.log("Proxy: ", proxy);
	console.log("Browser: ", ua);
	console.log('Url: ', url);
	console.log("Width: ", randomScreenElement[0]);
	console.log("Height: ", randomScreenElement[1]);
	console.log("Miliseconds per page: "+ miliseconds);
	console.log("Layout: " + info.layout);

	// first_name
	let first_name_Obj = require("./data/first_name.json");
	let obj_first_name = JSON.parse(JSON.stringify(first_name_Obj));
	let first_name = obj_first_name.randomElement().firstname;

	// last_name
	let last_name_Obj = require("./data/last_name.json");
	let Obj_last_name = JSON.parse(JSON.stringify(last_name_Obj));
	let last_name = Obj_last_name.randomElement().lastname;
	
	// username gmail
	let usernamegmail = first_name+'.'+last_name+getRandomArbitrary(40000,40000000);

	// last_name
	let email_recovery_Obj = require("./data/email_recovery.json");
	let Obj_email_recovery = JSON.parse(JSON.stringify(email_recovery_Obj));
	let email_recovery = Obj_email_recovery.randomElement().email_recovery;

	// tạo mật khẩu
	const crypto = require('crypto');
	function generatePassword(length) {
		const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
		const charsLength = chars.length;
		let password = '';
		for (let i = 0; i < length; i++) {
			const randomIndex = crypto.randomInt(charsLength);
			password += chars.charAt(randomIndex);
		}
		return password;
	}
	var randompassword = generatePassword(12);

	//lưu thông tin tài khoản khi đăng ký thành công
	const fs = require('fs');
	let raaandomNumber= randomNumber(100,600);
	// specify the file path and content
	const filePath = './data/gmailaccount.txt';
	const fileContent = usernamegmail+"@gmail.com | " +randompassword + " | " + email_recovery;

	// write the file
	fs.appendFile(filePath, fileContent+'\n', function (err) {
		if (err) {
		console.error(err);
		} else {
		console.log(`File saved to ${filePath}`);
		}
	});
  
	//Math.random().toString(36).slice(-12);
	// GO
	try {
		await proxyNightmare
		.authentication(user,pass)
		.useragent(ua)
		.goto(url)
		// .goto('https://accounts.google.com/signup/v2/webcreateaccount?flowName=GlifWebSignIn&service=mail&flowEntry=SignUp')
        // .type('#firstName', first_name)
        // .type('#lastName', last_name)
		// .type('#username', usernamegmail)
		// .type('#passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', randompassword)
		// .type('#confirm-passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', randompassword)
		// .click('#accountDetailsNext > div > button')
        ////// outlook
		// .goto('https://signup.live.com/signup?mkt=vi-VN&lic=1')
	    // .type('#MemberName', usernamegmail)
		// .click('#iSignupAction')
		// .type('#PasswordInput', randompassword)
		// .wait(300)
		// .click('#iSignupAction')
        .scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(938394737834948)
		.evaluate((miliseconds, blacklist) => {
			
			let allLinksA = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlA, indexA;

			for (indexA = 0; indexA <= blacklist.length; ++indexA) {
				allLinksA = allLinksA.filter(e => e !== blacklist[indexA]); 
			}
			
			//allLinksA = allLinksA.filter(e => e === 'http://foodblog.click/');
			randomUrlA = allLinksA[Math.floor(Math.random() * allLinksA.length)];
			//console.log(allLinksA);
			document.location.href = randomUrlA;

		}, miliseconds, blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.evaluate((blacklist) => {

			let allLinksB = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlB, indexB;

			for (indexB = 0; indexB <= blacklist.length; ++indexB) {
				allLinksB = allLinksB.filter(e => e !== blacklist[indexB]); 	
				// console.log(blacklist[indexB]);
			}
			
			randomUrlB = allLinksB[Math.floor(Math.random() * allLinksB.length)];
			//console.log(randomUrlB);
			document.location.href = randomUrlB;

		},blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.evaluate((blacklist) => {

			let allLinksC = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlC, indexC;

			for (indexC = 0; indexC <= blacklist.length; ++indexC) {
				allLinksC = allLinksC.filter(e => e !== blacklist[indexC]); 
			}

			randomUrlC = allLinksC[Math.floor(Math.random() * allLinksC.length)];
			//console.log(randomUrlC);
			document.location.href = randomUrlC;

		},blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.evaluate((blacklist) => {

			let allLinksD = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlD, indexD;

			for (indexD = 0; indexD <= blacklist.length; ++indexD) {
				allLinksD = allLinksD.filter(e => e !== blacklist[indexD]); 
			}

			randomUrlD = allLinksD[Math.floor(Math.random() * allLinksD.length)];
			//console.log(randomUrlD);
			document.location.href = randomUrlD;

		},blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.evaluate((blacklist) => {

			let allLinksE = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlE, indexE;

			for (indexE = 0; indexE <= blacklist.length; ++indexE) {
				allLinksE = allLinksE.filter(e => e !== blacklist[indexE]); 
			}

			randomUrlE = allLinksE[Math.floor(Math.random() * allLinksE.length)];
			//console.log(randomUrlE);
			document.location.href = randomUrlE;

		},blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.evaluate((blacklist) => {

			let allLinksE = Array.from(document.querySelectorAll("a")).map(a=>a.href), randomUrlE, indexE;

			for (indexE = 0; indexE <= blacklist.length; ++indexE) {
				allLinksE = allLinksE.filter(e => e !== blacklist[indexE]); 
			}

			randomUrlE = allLinksE[Math.floor(Math.random() * allLinksE.length)];
			//console.log(randomUrlE);
			document.location.href = randomUrlE;

		},blacklist)
		.scrollTo(randomNumber(100,600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(700,900),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(100,1200),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
		.scrollTo(randomNumber(1300,1600),randomNumber(10,1200))
        .wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(1700,3000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(3300,6000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(5, 15))
        .scrollTo(randomNumber(6300,9000), randomNumber(10,1200))
		.wait(randomTimeFromInterval(50, 250))
		.end()
		.then(function (result) {
			console.log("result: " + result);
		})
		.catch(function (error) {
			console.error('Error:', error);
		});

	} catch(e) {
		console.error("Error: ", e);
	}
}

for (var i = 0; i < args.windows; i++) {
	venenoTrafficBot(i).then(a => console.dir(a)).catch(e => console.error(e));
}