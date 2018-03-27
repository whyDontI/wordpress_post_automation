//require all required modules
//to read files
var fs = require('fs');

//required for selenium to run
var webdriver = require('selenium-webdriver');

//declaring vars
var data, global_data;

//create webdriver
var driver = new webdriver.Builder().forBrowser('firefox').build();

//maximize the newly opened firefox window
driver.manage().window().maximize();

//delete all cookies
driver.manage().deleteAllCookies();

//Code for wordpress admin/user login starts here

driver.get('http://yourWordpressSite.com/wp-admin').then(function(){
	return driver.findElement(webdriver.By.name("log"));
}).then(function(log){
	log.sendKeys('userName');
}).then(function(){
	return driver.findElement(webdriver.By.name("pwd"));
}).then(function(pwd){
	pwd.sendKeys('password');
}).then(function(){
	driver.findElement(webdriver.By.name("wp-submit")).click();
});

//Code for wordpress admin/user login ends here

//function call
foo();

function foo(){
	console.log("in foo");

	driver.get('https://whatever.com').then(function(){
		//find and return object for the element post_title
		return driver.findElement(webdriver.By.name("post_title"));
	}).then(function(post_title){
		//Entering post title
		post_title.sendKeys('Title of your wordpress post');
		console.log("title pasted");
	}).then(function(){
		//activate the text area for the main content
		driver.findElement(webdriver.By.id("content-html")).click();
		driver.findElement(webdriver.By.id("content")).click();

		//read a file by node js fs module and save its data to a global var global_data
		global_data = fs.readFileSync('./pathOfTheFileToRead/nameOfFile.txt', 'UTF8');

		//for the sake of terminal
		console.log("==========================================");
		console.log(global_data);

		//put the content in main content's textarea
		driver.findElement(webdriver.By.id("content")).sendKeys(global_data);
	}).then(function(content){

		// below code turns side bar radio button to ON [Optional]
		driver.findElement(webdriver.By.xpath("Xpath to the radio button")).click();
	}).then(function(){

		// click on dropdown this Xpath may change
		driver.findElement(webdriver.By.xpath("//*[@id='parent_id']")).click();
	}).then(function(){

		// select option
		driver.findElement(webdriver.By.xpath("Xpath to the correct parent option ")).click();
	}).then(function(){

		// click on public button
		driver.findElement(webdriver.By.id("publish")).click();
	}).then(function(){
		console.log("Congrats, you are done with this post, now you can go live your life");
		console.log("===========================================");
	});
}