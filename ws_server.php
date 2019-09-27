#!/php -q
<?php  
// Run from command prompt > php -q ws_server.php
include "phpwebsocket.php";

$server_ip="172.217.168.180";  //what is the IP of your server

// Extended basic WebSocket as ws_server
class ws_server extends phpWebSocket{


  //Overridden process function from websocket.class.php
  function process($user,$msg){
    $c=0;
  	$this->say("(user: ".$user->id.") msg> ".$msg);
    //$this->say("< ".$msg);
	
  foreach($this->users as $u) { $this->send($u->socket, $msg);}   
    
  }
  
 function getTemp()
  {
	$jsonurl = "http://api.openweathermap.org/data/2.5/weather?q=New_York,us";
	$json = file_get_contents($jsonurl);
	$weather = json_decode($json);
	$temp = $weather->main->temp;

 if ( !is_numeric($temp) ) 
	{ 
	return false; 
	}
	else
	{
    $temp_f=round((($temp - 273.15) * 1.8) + 32);
	$temp_celcius=round(($temp - 273.15));
	return $temp_f."f";
	}
 }  //end get Temp

  
}  //end class

$master = new ws_server($server_ip,4444);




