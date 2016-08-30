$( document ).ready(function() {

//***********************************************************
//****************Time Functions ****************************
//**********************************************************
var startAt=10;
var time = startAt;

function displayNumber(){
    console.log(time);
    $('#clock').html('<h2>' + time + '</h2>');
}

function run(){
    counter = setInterval(decrement, 1000);
}

function reset() {
    time=startAt;
    displayNumber();
}

// The decremeent function.
function decrement(){
    // Decrease number by one.
    time--;
    // Show the number in the #show-number tag.
    displayNumber();
    // Once number hits zero...
    if (time === 0){
        // ...run the stop function.
        stop();
        showAnsPic();
        // Alert the user that time is up.
        //alert('Time Up!');
    }
}
        // The stop function
function stop(){
    clearInterval(counter);
}
//*************************time functions*****************


//Question object
function questionObj(question,answerLs,posOfRightAnswer,pic){
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
    this.picture=pic;
  // console.log(this);
};


var anslist=[];
var questionList=[];
anslist[1]=["Dom Perignon","Monte Cassino","Cluny Abbey","erheh"];
questionList.push(new questionObj("Who was the legendary Benedictine monk who invented champagne?",anslist[1],0,"images/dom_perignon.gif"));
anslist[2]=["Lake Erie","Great Salt Lake","Lake St.Clair","Lake Superior"];
questionList.push(new questionObj("Name the largest freshwater lake in the world?",anslist[2],3,"images/lake_superior.gif"));
// console.log(questionList);


//Gobal Variable
var selectedQuestion;
var wins = 0;
var losses = 0;
var questionNum = 0;

function newGame(){
selectedQuestion=[];
wins = 0;
losses = 0;
questionNum =0;
time = startAt;
//hide the last page
//make the question visible 
};

function displayQusAndAns(){
    //displays the question on the screen
    $(".question").empty();
    $(".question").html(selectedQuestion.question);

         //display answers on the screen
    for(var j=0; j < selectedQuestion.answerList.length; j++){
        var ansbutton = "#optionsRadios"+j;
        $(ansbutton).attr("data-num",selectedQuestion.answerList[j].isAns);
        $(ansbutton)[0].nextSibling.textContent = selectedQuestion.answerList[j].ans;
         //$(ansbutton).after(selectedQuestion.answerList[j].ans);
        }
}; //closing display function


//Select a question not a timer fuction
function selectAQuestion(){
    for( ;questionNum<questionList.length;questionNum++){
        selectedQuestion = questionList[questionNum];
        console.log(selectedQuestion);
    $('#answerDiv').show();
    $('#pictureDiv').hide();

        return;
    }
};

function showAnsPic(){
    $('#answerDiv').hide();
    $('#pictureDiv').show();
    var pichold=$('#ansPic');
    console.log(selectedQuestion.picture);
    pichold.attr('src',selectedQuestion.picture);
}

newGame();
selectAQuestion();
displayQusAndAns();
run();


}); //closing on Document ready




	
// 	//make the lastPage hidden
// 	//to be done 

// 	//loop through the question-list
// 	for(var i =0 ; i < questionList.length; i++){
//         //reset clock
// 	//for each question
// 		//assign the value to selected question
// 		selectedQuestion = questionList[i];
		
//         //call display function
//         displayQusAndAns();

//         //wait for timer or click and call display image and answer 
        

// 		//start clock
		 
// }//for loop end
// 		//if answer clicked or clockends
// 			//check if right answer add to wins
// 			// else add to losses
// 			//display those on the screen
// 	// if the trivia ends or end game button is clicked 
// 		//Display new page with wins and losses

// 	//if startover button is clicked restart startGame

// } //start Game
// startGame();
// }); //closing on Document ready