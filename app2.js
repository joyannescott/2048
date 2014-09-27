//2048 game

var block00 = 'block00';
var block01 = 'block01';
var block02 = 'block02';
var block03 = 'block03';
var block10 = 'block10';
var block11 = 'block11';
var block12 = 'block12';
var block13 = 'block13';
var block20 = 'block20';
var block21 = 'block21';
var block22 = 'block22';
var block23 = 'block23';
var block30 = 'block30';
var block31 = 'block31';
var block32 = 'block32';
var block33 = 'block33';

var content0 = 'content0';
var content1 = 'content1';
var content2 = 'content2';
var content3 = 'content3';
var content4 = 'content4';
var content5 = 'content5';
var content6 = 'content6';
var content7 = 'content7';
var content8 = 'content8';
var content9 = 'content9';
var content10 = 'content10';
var content11 = 'content11';
var content12 = 'content12';
var content13 = 'content13';
var content14 = 'content14';
var content15 = 'content15';

var blocks;
var content;
var gameArray;
var waiting;

function createDiv(className){
	return "<div class='" + className + "'></div>";
}
function createSpan(className){
	return "<span class='" + className + "'></span>";
}
function createElem(str){
	return $(str);
}

function isAnimationComplete(){
    for(i=0; i<4; i++){
 	  	for(j=0; j<4; j++){
 	  		if(waiting[i][j]){
 	  			return false;
 	  		}
 	  	}	
 	 }
 	 return true;
}
function addNewBlock(){
	var zeros = 0;
    for(i=0; i<4; i++){
 	  	for(j=0; j<4; j++){
 	  		zeros++;
 	  	}
 	}

 	if(zeros){
 		for(trys=0; trys<10000; trys++){

 		    var i=Math.floor(Math.random()*4);
            var j=Math.floor(Math.random()*4);
			if(!gameArray[i][j]){
 		        $(".game ." + blocks[i][j]).children().first().remove();
 		        if(Math.floor(Math.random()*10) < 8){
   					addBlock(blocks[i][j], contents[1]);
 				gameArray[i][j] = 1;
   				} else{
    				addBlock(blocks[i][j], contents[2]);  					
 				gameArray[i][j] = 2;
   				}
  				return;
 			}	
 		}
 	}
 }
function slideBlockRight(row,column,move,merge){
	var block = ".game ." + blocks[row][column];
	//calculate pixel move;
	var shiftsize = move*97;
	waiting[row][column] = 1;

	 		//update the array
	gameArray[row][column+move] = gameArray[row][column] + merge;
    gameArray[row][column] = 0;

    $(".game ." + blocks[row][column]).css("z-index", 1000);
    if(merge)
    {

     	var slide = 2;
    	var grow = 5;
        console.log(" merge = " + merge + " grow " + grow);
    } else {
 
    	var slide = 0;
    	var grow = 0;
        console.log("no merge = " + merge + " grow " + grow);
    }
	//move block 5sec call moveBlock which done
	$(block).animate({
    		left: "+=" + shiftsize,
     	}, 
     	200, 
     	function() {
     		console.log("grow merge = " + merge + " grow " + grow);
           $(block).animate({ 
 	           		top: "-=" + slide,
	           		left: "-=" + slide,
	    			width:  "+=" + grow,
	    			height: "+=" + grow,
	     	}, 
     		100, 
     		function() {
     		    console.log("shrink merge = " + merge + " grow " + grow);
  	            $(block).animate({
 	           		top: "+=" + slide,
	           		left: "+=" + slide,
    				width:  "-=" + grow,
    				height: "-=" + grow,
	     		}, 
     			50, 
     			function() {
		      		moveBlock(row,column,row,column+move,merge);
		     		$(".game ." + blocks[row][column]).css("left","-=" + shiftsize);  
		     		$(".game ." + blocks[row][column]).css("z-index", 100);   		
		            waiting[row][column] = 0;
		            if(isAnimationComplete()){
		            	addNewBlock();
		            }
		        })
 	        })
     	}
  	);
 
}

function slideBlockLeft(row,column,move,merge){
	//calculate pixel move;
	var shiftsize = move*97;
	waiting[row][column] = 1;
     $(".game ." + blocks[row][column]).css("z-index", 1000);
	//move block 5sec call moveBlock which done
	$(".game ." + blocks[row][column]).animate({
    		left: "-=" + shiftsize,
     	}, 
     	200, 
     	function() {
     		moveBlock(row,column,row,column-move,merge);
     		$(".game ." + blocks[row][column]).css("left","+=" + shiftsize);  
     		$(".game ." + blocks[row][column]).css("z-index", 100);   		
            waiting[row][column] = 0;
            if(isAnimationComplete()){
            	addNewBlock();
            }

     	}
  	);
  		//update the array
	gameArray[row][column-move] = gameArray[row][column]+merge;
    gameArray[row][column] = 0;

}
function slideBlockDown(row,column,move,merge){
	//calculate pixel move;
	var shiftsize = move*97;
	waiting[row][column] = 1;
    $(".game ." + blocks[row][column]).css("z-index", 1000);
	//move block 5sec call moveBlock which done
	$(".game ." + blocks[row][column]).animate({
    		top: "+=" + shiftsize,
     	}, 
     	200, 
     	function() {
     		moveBlock(row,column,row+move,column,merge);
     		$(".game ." + blocks[row][column]).css("top","-=" + shiftsize);  
     		$(".game ." + blocks[row][column]).css("z-index", 100);   		
            waiting[row][column] = 0;
            if(isAnimationComplete()){
            	addNewBlock();
            }

     	}
  	);
  		//update the array
	gameArray[row+move][column] = gameArray[row][column] + merge;
    gameArray[row][column] = 0;

}
function slideBlockUp(row,column,move,merge){
	//calculate pixel move;
	var shiftsize = move*97;
	waiting[row][column] = 1;
     $(".game ." + blocks[row][column]).css("z-index", 1000);
	//move block 5sec call moveBlock which done
	$(".game ." + blocks[row][column]).animate({
    		top: "-=" + shiftsize,
     	}, 
     	200, 
     	function() {
     		moveBlock(row,column,row-move,column,merge);
     		$(".game ." + blocks[row][column]).css("top","+=" + shiftsize);  
     		$(".game ." + blocks[row][column]).css("z-index", 100);   		
            waiting[row][column] = 0;
            if(isAnimationComplete()){
            	addNewBlock();
            }

     	}
  	);
  		//update the array
	gameArray[row-move][column] = gameArray[row][column]+merge;
    gameArray[row][column] = 0;

}

function addBlock(block,content){
  //Add content to the block
  $(".game ." + block).append($(createSpan(content)));
}


function delBlock(row,column){
	//remove content from the block
	$(".game ." + blocks[row][column]).children().first().remove();
}

function moveBlock(row,column,nextRow,nextColumn,merge){
	console.log("Move block row " + row + " column " + column + " nextRow " + nextRow + " nextColumn " + nextColumn );
	var content = contents[gameArray[nextRow][nextColumn]];
    //Delete old blocks
 	delBlock(row,column);
	delBlock(nextRow,nextColumn);
	//move the block
	addBlock(blocks[row][column],content0);
	addBlock(blocks[nextRow][nextColumn],content);
 }


$(function(){
	//Initialize arrays
 	waiting   = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
 	gameArray = [[0,1,2,2],[0,2,2,1],[0,0,0,0],[0,0,0,0]];
 	blocks    = [[block00,block01,block02,block03],
    	         [block10,block11,block12,block13],
            	 [block20,block21,block22,block23],
              	 [block30,block31,block32,block33]];
 	contents  = [content0,content1, content2,  content3,  content4, content5,  content6,  content7,
              	 content8,content9, content10, content11, content12,content13, content14, content15];

 for(i=0; i<4; i++){
 	for(j=0; j<4; j++){
 		//Add all the blocks
 		$(".game").append(createElem(createDiv(blocks[i][j])));
 		//Add initial content
 		addBlock(blocks[i][j], contents[gameArray[i][j]]);
  	}
 }
 addNewBlock();
});

function handleRight(){
	waiting   = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
	for(row=0; row<4; row++) {
			var locks = [0,0,0,0];
		for(column=2; column>=0; column--){
			//Start at the second to last column, look for a block
			if(gameArray[row][column]){
				var move=0;
		        //Block exists, look to the right for empty blocks
		        for(nextColumn=column+1; nextColumn<4; nextColumn++){
		        	//Is the block empty?
				 	if(!gameArray[row][nextColumn]){
	                	move++;
				  	} else {
				  		if(gameArray[row][nextColumn] == gameArray[row][column] && !locks[nextColumn]){
				  			move++;
				 		 	slideBlockRight(row,column,move,1);   
                    		locks[column+move]=1;  
                    		break;         	
				  		}
				  	}
				  	//Can't move any farther if the block is occupied, or the last column
				  	if(gameArray[row][nextColumn] || nextColumn==3){
				  		//If move is not zero, move the block
				  		if(move){
				  		    slideBlockRight(row,column,move,0);				  		}
				  	    break;
				  	}
				}
			}
		}
    }
}


function handleLeft(){
	var shifts = 0;
 	waiting   = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

	for(row=0; row<4; row++) {
		var locks = [0,0,0,0];
 		for(column=1; column<4; column++){

			//Start at the second to last column, look for a block
			if(gameArray[row][column]){
				var move=0;
		        //Block exists, look to the right for empty blocks
		        for(nextColumn=column-1; nextColumn>=0; nextColumn--){
                    			        	//Is the block empty?
				 	if(!gameArray[row][nextColumn]){
	                	move++;
				  	} else { 
				  		if(gameArray[row][nextColumn] == gameArray[row][column] && !locks[nextColumn]){
				  				                	move++;
				  		slideBlockLeft(row,column,move,1);
				 		//mergeBlocks(row,column,row,column-move);   
                    	//lock column
                    	locks[column-move]=1; 
                    	shifts++;     
                    	break;         	
				  		}
				  	}
				  	//Can't move any farther if the block is occupied, or the last column
				  	if(gameArray[row][nextColumn] || nextColumn==0){
				  		//If move is not zero, move the block
				  		if(move){
				  		    slideBlockLeft(row,column,move,0);
	                	    shifts++;
				  		}
				  	    break;
				  	}
				}
			}
		}
    }
}

function handleDown(){
	for(column=0; column<4; column++) {
			var locks = [0,0,0,0];
		for(row=2; row>=0; row--){
			//Start at the second to last column, look for a block
			if(gameArray[row][column]){
				var move=0;
		        //Block exists, look to the right for empty blocks
		        for(nextRow=row+1; nextRow<4; nextRow++){
		        	//Is the block empty?
				 	if(!gameArray[nextRow][column]){
	                	move++;
				  	} else {
				  		if(gameArray[nextRow][column] == gameArray[row][column] && !locks[nextColumn]){
				  				                	move++;
				  		slideBlockDown(row,column,move,1);
                   		locks[row+move]=1;  
                    	break;         	
				  		}
				  	}
				  	//Can't move any farther if the block is occupied, or the last column
				  	if(gameArray[nextRow][column] || nextRow==3){
				  		//If move is not zero, move the block
				  		if(move){
				  		    slideBlockDown(row,column,move,0);

				  		}
				  	    break;
				  	}
				}
			}
		}
    }
}


function handleUp(){
	var shifts = 0;

	for(column=0; column<4; column++) {
		var locks = [0,0,0,0];
 		for(row=1; row<4; row++){

			//Start at the second to last column, look for a block
			if(gameArray[row][column]){
				var move=0;
		        //Block exists, look to the right for empty blocks
		        for(nextRow=row-1; nextRow>=0; nextRow--){
                   			        	//Is the block empty?
				 	if(!gameArray[nextRow][column]){
	                	move++;
				  	} else { 
				  		if(gameArray[nextRow][column] == gameArray[row][column] && !locks[nextRow]){
				  				                	move++;
				 		 //mergeBlocks(row,column,row-move,column);   
 				  	    slideBlockUp(row,column,move,1);                    	//lock row
                    	locks[row-move]=1; 
                    	shifts++;     
                    	break;         	
				  		}
				  	}
				  	//Can't move any farther if the block is occupied, or the last column
				  	if(gameArray[nextRow][column] || nextRow==0){
				  		//If move is not zero, move the block
				  		if(move){
				  		    slideBlockUp(row,column,move,0);
	                	    shifts++;

				  		}
				  	    break;
				  	}
				}
			}
		}
    }
}

$("body").keydown(function(event){

   if(event.keyCode == 37){
   	   	handleLeft();
   }
   if(event.keyCode == 38){
   	    handleUp();
     }
   if(event.keyCode == 39){
       	handleRight();
    }
   if(event.keyCode == 40){
   	    handleDown();
    }
});

$("body").on('swipeleft',function(e){
	handleLeft();
});
$("body").on('swiperight',function(e){
	handleRight();
});
$("body").on('swipeup',function(e){
	handleUp();
});
$("body").on('swipedown',function(e){
	handleDown();
});
