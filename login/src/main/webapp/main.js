/**
 * 
 */

var token;
var currentPageSize = 0;
var nextPageSize = 25;

$('documnet').ready(function(){
	console.log("ok");
	if(getCookie()){
		verifyToken()
	}else{
		$('#usertable').hide();
	}
});

function setCookie(value) {
    document.cookie = value
}
function getCookie() {
	if(document.cookie){
		return document.cookie;
	}else{
		return null;
	}
}
function eraseCookie(){
	document.cookie= '=;Max-Age=-99999999;';
}
function register(){
	let userName = $( "input[name=registername]" ).val();
	let password = $( "input[name=registerpassword]" ).val();
	let gender = $("#gender option:selected").val();
	let requestData = {
			userName : userName,
			password : password,
			gender : gender
	};
	console.log("requestData: "+JSON.stringify(requestData));
	let requestUrl = 'https://api.prontoitlabs.com/api/v1/user';

	$.ajax({
		type : 'POST',
		url : requestUrl,
		data : JSON.stringify(requestData),
		dataType : "text",
		contentType : 'application/json; charset=utf-8',
		timeout : 10000,
		success : function(response) {
			let responseData = jQuery.parseJSON(response);
			console.log("responseData: "+JSON.stringify(responseData));
			if(responseData.status){
				$('#registerMsg').text("Registred Successfully.");
			}else{
				$('#registerMsg').text("Registration Failed.");
			}
		},
		error : function(xhr, status, error) {
			$('#registerMsg').text("Registration Failed. Try again");
		},
		async : true
	});
}

function submit(){
	let userName = $( "input[name=username]" ).val();
	let password = $( "input[name=password]" ).val();
	let requestData = {
			userName : userName,
			password : password
	};
	console.log("requestData: "+JSON.stringify(requestData));
	let requestUrl = 'https://api.prontoitlabs.com/api/v1/user/login';

	$.ajax({
		type : 'POST',
		url : requestUrl,
		data : JSON.stringify(requestData),
		dataType : "text",
		contentType : 'application/json; charset=utf-8',
		timeout : 10000,
		success : function(response) {
			let responseData = jQuery.parseJSON(response);
			console.log("responseData: "+JSON.stringify(responseData));
			var userName = JSON.stringify(responseData.data['user']['userName']);
			if(responseData.status){
//				setCookie('userName', userName);
				let data = responseData.data;
				token = (data != undefined && data != null)? data.token: '';
				createTableHead();
				getUsers();
			}else{
				$('#loginMsg').text("Wrong login credentials!!");
			}
		},
		error : function(xhr, status, error) {
			$('#loginMsg').text("Wrong login credentials!!");
		},
		async : true
	});
}

function verifyToken(){
	let requestUrl = 'https://api.prontoitlabs.com/api/v1/user/verify-token';
	var getToken = getCookie()
	$.ajax({
		type : 'POST',
		url : requestUrl,
		headers: { 'X-Auth-Token': getToken},
		dataType : "text",
		contentType : 'application/json; charset=utf-8',
		timeout : 10000,
		success : function(response) {
			let responseData = jQuery.parseJSON(response);
			console.log("Verify Token Ressponse", JSON.stringify(responseData))
			if(responseData.status){
				createTableHead();
				getUsers()
				$('#userregister').hide();
				$('#userlogin').hide();
				$('#usertable').show();
			}
		},
		error : function(xhr, status, error) {
			alert('Server Error')
		},
		async : true
	});
}

function getUsers(){
	let requestUrl = 'https://api.prontoitlabs.com/api/v1/user?page='+currentPageSize+'&size='+nextPageSize+'';
	if(token){
		setCookie(token)
	}
	var getToken = getCookie()
	
	$.ajax({
		type : 'GET',
		url : requestUrl,
		headers: { 'X-Auth-Token': getToken},
		dataType : "text",
		contentType : 'application/json; charset=utf-8',
		timeout : 10000,
		success : function(response) {
			let responseData = jQuery.parseJSON(response);
			console.log("responseData: "+JSON.stringify(responseData));
			if(responseData.status){
				let data = responseData.data;
				let currentPage = data.currentPage;
				currentPageSize = data.currentPageSize;
				let totalPages = data.totalPages;
				if(nextPageSize < totalPages){
					nextPageSize += 25;
				}else{
					$('#nextbtn').hide();
				}
				let content = data.content;
				$('#userregister').hide();
				$('#userlogin').hide();
				$('#usertable').show();
				showTable(content);
			}
		},
		error : function(xhr, status, error) {
			alert("server error");
		},
		async : true
	});
}

var tableHead;
function createTableHead() {
	tableHeadArray = [ 'ID', 'User Name', 'Password', 'Gender'];
	let table = document.createElement('table');
	table.setAttribute('id', 'table');
	let header = table.createTHead();
	let tableRow = header.insertRow(0);
	for (let head = 0; head < tableHeadArray.length; head++) {
		let tableHead = document.createElement('th');
		tableHead.innerHTML = tableHeadArray[head];
		$(tableHead).css({
			"text-align" : "center"
		});
		tableRow.appendChild(tableHead);
	}
	let div = document.getElementById('tableForm');
	div.appendChild(table);
}

function showTable(content) {
	let contentLength = content.length;
	let table = document.getElementById('table');
	let tbody = table.createTBody();
	tbody.setAttribute('id', 'tableHead');
	for (let row = 0; row < contentLength; row++) {
		let tableRow = tbody.insertRow(row); // TABLE ROW.
		let id = content[row].id;
		let userName = content[row].userName;
		let password = content[row].password;
		let gender = content[row].gender;
		let contentData = [ id, userName, password, gender];
		for (let cell = 0; cell < tableHeadArray.length; cell++) {
			let tableData = document.createElement('td'); // TABLE DEFINITION.
			tableData = tableRow.insertCell(cell);
			if (cell == 3) {
				let selectTag = $('<select id="genderDiv'
						+ row
						+ '" style="width: 90px;"> <option value="MALE">M</option><option value="FEMALE">F</option>');
				selectTag.appendTo(tableData);
				$('#genderDiv' + row).val(contentData[cell]);
			} else {
				// CREATE AND ADD TEXTBOX IN EACH CELL.
				let inputText = document.createElement('input');
				inputText.setAttribute('type', 'text');
				inputText.setAttribute('placeholder', 'Enter '
						+ tableHeadArray[cell]);
				inputText.setAttribute('class', tableHeadArray[cell].split(' ')
						.slice(0, 1));
				inputText.setAttribute('value', contentData[cell]);
				inputText.setAttribute('title', tableHeadArray[cell]);
				tableData.appendChild(inputText);
			}
		}
	}
}

function logout() {
	eraseCookie()
	$('#userregister').show();
	$('#userlogin').show();
	$('#usertable').hide();
}
