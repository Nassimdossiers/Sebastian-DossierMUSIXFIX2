let player = null;
let ready = false;

/* music per tab */
const tracks = {
profile:"SPbLzp_1U9I",
gallery:"tCvvQIvvy88",
telemetry:"Qy_suNUuA-M",
lore:"oP19W2fJ-pw",
network:"SPbLzp_1U9I"
};

/* create youtube player */
function onYouTubeIframeAPIReady(){
    player = new YT.Player('player',{
        height:'0',
        width:'0',
        videoId:tracks.profile,
        events:{
            onReady:()=>{}
        }
    });
}

/* unlock audio after first tap */
document.addEventListener("click",unlock,{once:true});
document.addEventListener("touchstart",unlock,{once:true});

function unlock(){
    if(!player) return;
    try{
        player.playVideo();
        player.pauseVideo();
        ready = true;
    }catch{}
}

/* ---------- TAB SYSTEM (never crashes now) ---------- */

function openTab(evt,name){

    /* switch content FIRST — always works */
    document.querySelectorAll(".tabcontent").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));

    const tab = document.getElementById(name);
    if(tab) tab.classList.add("active");
    evt.currentTarget.classList.add("active");

    /* music SECOND — optional */
    changeMusic(name);
}

/* ---------- MUSIC (protected) ---------- */

function changeMusic(name){
    if(!player || !ready) return;

    fadeTo(0,()=>{
        try{
            player.loadVideoById(tracks[name]);
            setTimeout(()=>fadeTo(40),300);
        }catch{}
    });
}

function fadeTo(target,callback){
    if(!player) return;

    let v;
    try{ v = player.getVolume(); }
    catch{ return; }

    let step = target>v?2:-2;

    let i=setInterval(()=>{
        try{
            v+=step;
            player.setVolume(v);
        }catch{
            clearInterval(i);
            return;
        }

        if((step>0&&v>=target)||(step<0&&v<=target)){
            clearInterval(i);
            if(callback)callback();
        }
    },40);
}
function toggleLog(button) {
const log = button.nextElementSibling;
log.style.display = log.style.display === "block" ? "none" : "block";
}   
function animateTelemetry() {
document.querySelectorAll('.statCard').forEach(card => {
    const value = card.getAttribute('data-value');
    const circle = card.querySelector('.circle');
    circle.style.background = `conic-gradient(red ${value}%, #111 ${value}%)`;
    circle.innerHTML = value + "%";
});
}

document.addEventListener("DOMContentLoaded", animateTelemetry);