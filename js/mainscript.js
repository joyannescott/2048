// JavaScript Document

function navMouseOver(elm, imgNum){
    elm.src=base_url + 'images/index_' + imgNum + '_hover.jpg';
	elm.style.width='108px';
	elm.style.height='40px'
};
function navMouseOverWidth(elm, imgNum, width){
	elm.src=base_url + 'images/index_' + imgNum + '_hover.jpg';
	elm.style.width= width; 
	elm.style.height='40px';
};

function navMouseOut(elm, imgNum){
	elm.src='/images/index_' + imgNum + '.jpg';
	elm.style.width='108px'; 
	elm.style.height='23px';
};

function navMouseOutWidth(elm, imgNum, width){
	elm.src=base_url + 'images/index_' + imgNum + '.jpg';
	elm.style.width=width; 
	elm.style.height='23px';
};



//change your event date event here.      
var eventdate = new Date("June 17, 2014 02:00:00 GMT");
function toSt(n)
{s=""
if(n<10) s+="0"; 
return s+n.toString();
}
function countdown() 
{cl=document.clock;
d=new Date(); 
count=Math.floor((eventdate.getTime()-d.getTime())/1000);
if(count<=0)
{cl.days.value="";
cl.hours.value="";
cl.mins.value="";
cl.secs.value="";
alert("Grand Assembly 2014"); // Message which appears when time is out
return;
}
cl.secs.value=toSt(count%60);
count=Math.floor(count/60);
cl.mins.value=toSt(count%60);
count=Math.floor(count/60);
cl.hours.value=toSt(count%24);
count=Math.floor(count/24);
cl.days.value=count;
setTimeout("countdown()",500);
}

$("#uploadTrigger").click(function(){
   $("#uploadFile").click();
});

window.pressed = function(){
    var a = document.getElementById('uploadFile');
    if(a.value == "")
    {
        fileLabel.innerHTML = "File:";
    }
    else
    {
        var theSplit = a.value.split('\\');
        fileLabel.innerHTML = "File: " + theSplit[theSplit.length-1];
    }
};