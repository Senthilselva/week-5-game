$( document ).ready(function() {

// Our stopwatch object
var stopwatch = {
    time:0,

    reset: function(){
        stopwatch.time = 30;
        // DONE: Change the "display" div to "00:00."
        $('#clock').html('30:00');
    },
    start: function(){
        // DONE: Use setInterval to start the count here.
        counter = setInterval(stopwatch.count, 1000);
    },
    stop: function(){
        // DONE: Use clearInterval to stop the count here.

        clearInterval(counter);
       // stopwatch.reset();
        //alert("inside stop");
    },
    count: function(){
        // DONE: increment time by 1, remember we cant use "this" here.
        stopwatch.time--;
        // DONE: Get the current time, pass that into the stopwatch.timeConverter function, 
        //       and save the result in a variable.
        var converted = stopwatch.timeConverter(stopwatch.time);
        // DONE: Use the variable you just created to show the converted time in the "display" div.
        if(stopwatch.time <= 0){
            //alert(stopwatch.time);
            stopwatch.stop();
        }
        $('#clock').html(converted);
        
    },
    timeConverter: function(t){
        var minutes = Math.floor(t/60);
        var seconds = t - (minutes * 60);
        if (seconds < 10){
            seconds = "0" + seconds;
        }
        if (minutes === 0){
            minutes = "00";
        } else if (minutes < 10){
            minutes = "0" + minutes;
        }
        return minutes + ":" + seconds;
    }
}; // closing the stopwatch object

// stopwatch.reset();
// stopwatch.start();

//Question object
function questionObj(question,answerLs,posOfRightAnswer){
	this.question=question;
	this.answerList = [];
	for(var i=0; i<4; i++){
		if( i == posOfRightAnswer ){
			this.answerList.push({ans:answerLs[i],isAns:true});
		}
		else{
			this.answerList.push({ans:answerLs[i],isAns:false});
		}
	}
	// console.log(this);
};

var anslist=[];
var questionList=[];
anslist[1]=["Dom Perignon","Monte Cassino","Cluny Abbey","erheh"];
questionList.push(new questionObj("Who was the legendary Benedictine monk who invented champagne?",anslist[1],0));
anslist[2]=["Lake Erie","Great Salt Lake","Lake St.Clair","Lake Superior"];
questionList.push(new questionObj("Name the largest freshwater lake in the world?",anslist[2],3));

//console.log(questionList);
//Gobal Variable
var selectedQuestion;
var wins=0;
var losses=0;

function displayQusAndAns(){
    //displays the question on the screen
    $(".question").empty();
    $(".question").html(selectedQuestion.question);

        //display answers on the screen
    for(var j=0; j < selectedQuestion.answerList.length; j++){
        var ansdiv = "#optionsRadios"+j;
        $(ansdiv).attr("data-num",selectedQuestion.answerList[j].isAns);
        $(ansdiv)[0].nextSibling.textContent = selectedQuestion.answerList[j].ans;
        //$(ansdiv).after(selectedQuestion.answerList[j].ans);
        }
}//closing display function
    stopwatch.reset();

stopwatch.start();
function startGame(){
	
	//make the lastPage hidden
	//to be done 

	//loop through the question-list
	for(var i =0 ; i < questionList.length; i++){
        //reset clock
	//for each question
		//assign the value to selected question
		selectedQuestion = questionList[i];
		
        //call display function
        displayQusAndAns();

        //wait for timer or click and call display image and answer 
        

		//start clock
		 
}//for loop end
		//if answer clicked or clockends
			//check if right answer add to wins
			// else add to losses
			//display those on the screen
	// if the trivia ends or end game button is clicked 
		//Display new page with wins and losses

	//if startover button is clicked restart startGame

} //start Game
startGame();
}); //closing on Document ready