	var songs = {
		"playlist-1" : [
			{
				"track" : 1,
				"name":"Levels",
				"by" : "Avicii",
				"time" : 185,
				"genre" : "EDM"
			},
			{
				"track":2,
				"name":"The Days",
				"by" : "Avicii",
				"time" : 293,
				"genre" : "EDM"
			}
		],
		"playlist-2" : [
			{
				"track":1,
				"name":"Apollo",
				"by" : "Malik Bash",
				"time" : 220,
				"genre" : "EDM"
			},
			{
				"track":2,
				"name":"Levels",
				"by" : "Avicii",
				"time" : 185,
				"genre" : "EDM"
			},
			{
				"track":3,
				"name":"The Days",
				"by" : "Avicii",
				"time" : 293,
				"genre" : "EDM"
			}
		]
	};
	$(document).ready(function() {
		var playlist_id;
		var audioElement = $("#myAudio")[0];
		console.log(audioElement);
		var songs_home = "songs/";
		var playlist_len,playing=false ,paused=false,index=0;
		$(".playlist").click(function() {
			playlist_id = this.id;
			var contents="<tr><th>Song ID</th><th>Name</th><th>Genre</th><th>Time</th></tr>";
			playlist_len = songs[playlist_id].length;
			console.log(playlist_len);
			
			var i;
			for(i = 1 ; i <= playlist_len ; i++) {
				contents += "<tr><td>" + playlist_id.split('-')[1] + "." + i +"</td>" + "<td>" + songs[playlist_id][i-1]["name"] + "</td>" + "<td>" + songs[playlist_id][i-1]["genre"] + "</td>" + "<td>" + songs[playlist_id][i-1]["time"] + " seconds" + "</td></tr>"
			}
			$("#myTable").html(contents);
		});
		$("#myAudio").on("ended",function() {
			if(index < playlist_len-1){
				console.log("Ended");
				index++;
				audioElement.src = songs_home + songs[playlist_id][index]["name"] + ".mp3";
				console.log(audioElement.src);
				audioElement.play();
			} else {
				console.log("Playlist Ended");
				audioElement.pause();
			}
		});
		$("#play").on("click",function() {
			if(!playlist_id) {alert("Select a Playlist, then Click PLAY")}
			else {
				if(paused){
					playing = true;
					audioElement.play();
				} else {
					index = 0;
					audioElement.src = songs_home + songs[playlist_id][index]["name"] + ".mp3";
					audioElement.play();
					$("#myAudio").on("play",function() {
						playing = true;
					})
				}
				paused = false;
			}
		});
		$("#pause").on("click",function() {
			if(playing == true){
				paused = true;
				audioElement.pause();
			}
		});
		$("#prev_song").on("click", function() {
			if(index > 0){
				index--;
				audioElement.src = songs_home + songs[playlist_id][index]["name"] + ".mp3";
				audioElement.play();
			}
		});
		$("#next_song").on("click", function() {
			if(index < playlist_len-1){
				index++;
				audioElement.src = songs_home + songs[playlist_id][index]["name"] + ".mp3";
				audioElement.play();
			}
		});
	})
