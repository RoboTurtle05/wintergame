//Toggle for Instructions/No Instructions when clicking the "how to play" button.
function toggle() {
    var x = document.getElementById("instructions");

    if(x.style.top == "0px"){
        x.style.top ="-1500px";
        document.getElementById("slideButton").innerHTML = "how to play";
    }
    else{
        x.style.top = "0px"
        document.getElementById("slideButton").innerHTML = "close";
    }
}

// Music
function music(){
    var mySong = document.querySelector(".mySong");

    if(mySong.paused){
        mySong.play();
        mySong.loop();
    } else {
        mySong.pause();
    }
}

// Exit from the various games back to the overworld
function exit(){
    location.assign("topdown.html")
}


