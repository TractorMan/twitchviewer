var twitch = {
	
	streamers: [{name: "ESL_SC2csc", icon:"https://static-cdn.jtvnw.net/jtv_user_pictures/esl_sc2-profile_image-d6db9488cec97125-300x300.jpeg"}, {name:"dreadheaded", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/dreadheaded-profile_image-2ae9ecc62128cb11-300x300.png"}, {name: "OgamingSC2", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/ogamingsc2-profile_image-9021dccf9399929e-300x300.jpeg"} , {name: "cretetion", icon:"https://static-cdn.jtvnw.net/jtv_user_pictures/cretetion-profile_image-12bae34d9765f222-300x300.jpeg" },{name: "freecodecamp", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png"}, {name: "storbeck", icon:"https://static-cdn.jtvnw.net/jtv_user_pictures/storbeck-profile_image-7ab13c2f781b601d-300x300.jpeg"},{name: "habathcx", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/habathcx-profile_image-d75385dbe4f42a66-300x300.jpeg"},{name: "RobotCaleb", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/robotcaleb-profile_image-9422645f2f0f093c-300x300.png"}, {name: "noobs2ninjas", icon: "https://static-cdn.jtvnw.net/jtv_user_pictures/noobs2ninjas-profile_image-34707f847a73d934-300x300.png"}]
	
	
	
}



var menuClick = function(){
	
	$(".menu-item").click(function(){
		
		$(this).toggleClass("closed")
	
		$(this).siblings().addClass("closed")
	
		
	})
	
	showAll();
	showOnline();
	showOffline();
}


var showOnline = function(){
	
	$(".on").click(function(){
		$(".offline").hide();
		$(".online").show();
	})
}

var showOffline = function(){
	
	$(".off").click(function(){
		$(".online").hide();
		$(".offline").show();
	})
}

var showAll = function(){
	
	$(".all").click(function(){
		$(".offline").show();
		$(".online").show();
	})
}



var main = function(){
	
	menuClick();
	helperFunction();

	
}


var helperFunction= function(){
	
	
	for(var i=0; i<9;i++){
		
		getStream(i);
		
	}
	
}


var getStream= function(i){

	var name = twitch.streamers[i].name;
		
	$.ajax({
		
		url:"https://api.twitch.tv/kraken/streams/"+name, 
		success: function(json){	
		twitch.streamers[i].status = json.stream;
		populateResults(i);
	}, 
	
	error: function(){
		
		twitch.streamers[i].status = "no"
		populateResults(i);
	}
	
});
		

	

	
	
}


var populateResults = function(i){
	
	
		
		var name = twitch.streamers[i].name;
		var icon = twitch.streamers[i].icon;
		var status = twitch.streamers[i].status;
		var online;
		
		switch(status){
			
		case "no": 
			online="offline";
			status ="no account found";
			break;
		case null: online="offline";
			status = "offline"
			break;
		default: 
			online= "online";
			status = twitch.streamers[i].status.game
			
		}
		
		$(".results").append("<div class='item "+ online + "'><img class='icon' src='"+icon+"' alt='fcc'><a target='none' class='name' href='https://www.twitch.tv/"+name+"'>"+name+"</a><div class='stream'>"+status+"</div></div>")
	
	
	
}



$(document).ready(main)