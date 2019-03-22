<html>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
<link rel="stylesheet" href="main.css">
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<script type="text/javascript" src="main.js"></script>
<body>
<div class="container table-bordered">
  <div class="row table-bordered">
      <div class="col-sm-4 table-bordered" id="userregister">
      	<span id="registerMsg"></span><br/>
        <input type="text" name="registername" placeholder="Username" required><br/>
        <input type="password" name="registerpassword" placeholder="Password" required><br/>
        <select id="gender">
  			<option value="MALE">MALE</option>
  			<option value="FEMALE">FEMALE</option>
		</select>
		<br/>
        <input onclick="register()" type="submit" value="Register">
      </div>

      <div class="col-sm-4 table-bordered" id="userlogin">
      	<span id="loginMsg"></span><br/>
        <input type="text" name="username" placeholder="Username" required><br/>
        <input type="password" name="password" placeholder="Password" required><br/>
        <input onclick="submit()" type="submit" value="Login">
      </div>
      
      <div class="col-sm-8 table-bordered" id="usertable">
      	<input id="logoutbtn" onclick="logout()" type="submit" value="Logout">
		<div id="tableForm"></div>
		<input id="nextbtn" onclick="getUsers()" type="submit" value="Next">
	  </div>
    </div>
</div>
</body>
</html>
