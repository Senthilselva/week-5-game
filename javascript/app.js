$( document ).ready(function() {

//***********************************************************
//****************Time Functions ****************************
//**********************************************************
var startAt=10;
var time = startAt;
var counter;
function displayNumber(){
   // console.log(time);
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
}
        // The stop function 

//*************************time functions End*****************
//Changing start function
$('.startgame').on('click',function(){
  $('.firstPage').hide();
  $('#gamePage').show(); 
newGame();
reset();
run();
playgame();
});

//Question object
function questionObj(question,answerLs,posOfRightAnswer,pic){
    this.question=question;
    this.answerList = [];
    for(var i=0; i<4; i++){
        if( i == posOfRightAnswer ){
          this.answerList.push({ans:answerLs[i],isAns:1});
        }
        else{
          this.answerList.push({ans:answerLs[i],isAns:0});
        }
    }
    this.picture=pic;
    //this is added as a quick fix instead of going through the data-num route
    this.rightAnswer = answerLs[posOfRightAnswer];
  console.log(this);
};


var anslist=[];
var questionList=[];
anslist[0]=["Dom Perignon","Monte Cassino","Cluny Abbey","erheh"];
questionList.push(new questionObj("Who was the legendary Benedictine monk who invented champagne?",anslist[0],0,"images/dom_perignon.jpg"));
anslist[1]=["Lake Erie","Great Salt Lake","Lake St.Clair","Lake Superior"];
questionList.push(new questionObj("Name the largest freshwater lake in the world?",anslist[1],3,"images/lake_superior.jpg"));
anslist[2]=["Asia","Europe","Moon","Mars"];
questionList.push(new questionObj("Where would you find the Sea of Tranquility?",anslist[2],2,"images/moon.png"));
anslist[3]=["Kite","Dictionary","Unicon","Water"];
questionList.push(new questionObj("What is another word for lexicon?", anslist[3],1,"images/dictionary.jpg"));
// console.log(questionList);


//Gobal Variable
var selectedQuestion;
var wins = 0;
var losses = 0;
var questionNum = 0;
var feedback="";
var picWindowTimeOut;
var ansWindowTimeOut;
var isWaiting = false;

function newGame(){
    isWaiting = false;
    selectedQuestion=[];
    wins = 0;
    losses = 0;
    questionNum =0;
    time = startAt;
    $("#winDiv").html(wins);
    $("#lossDiv").html(losses);
    $('#gamePage').show();
   $('#lastPage').hide();
};

function stop(){
    // if(isWaiting){
    //     return;
    // }
    feedback = "Time is Up";
    losses++
    $("#lossDiv").html(losses);
    showAnsPic();
};


function displayQusAndAns(){
    //displays the question on the screen
    $('#clock').show()
    clearTimeout(picWindowTimeOut);
    $(".question").empty();
    $(".question").html(selectedQuestion.question);
         //display answers on the screen
    for(var j=0; j < selectedQuestion.answerList.length; j++){
        var ansbutton = "#optionsRadios"+j;
        $('ansbutton').attr('data-num');
        console.log("before assignment" + $(ansbutton).data('num'));
        $(ansbutton).data('num',selectedQuestion.answerList[j].isAns);
        $(ansbutton)[0].nextSibling.textContent = selectedQuestion.answerList[j].ans;
        console.log($(ansbutton)[0].nextSibling.textContent+" "+selectedQuestion.answerList[j].isAns+"  "+ $(ansbutton).data('num'));
         //$(ansbutton).after(selectedQuestion.answerList[j].ans);
    }
    //return;  
}; //closing display function


//Select a next question fuction
function selectAQuestion(){
    if(questionNum<questionList.length){
        selectedQuestion = questionList[questionNum];
        $('#answerDiv').show();
    $('#pictureDiv').hide();
        questionNum++

    return;
    }
    isWaiting = true;
    endGame();
   
};

function showAnsPic(){

    //When showing the picture Answer Window time out is cancelled
    clearTimeout(ansWindowTimeOut);


//there is a bug need to be fixed later ***************************************
//******************************************************************************
    //get the text behind the right answer using data-num   
   // $('input[data-num = "true"]'). 
    // var rightAnsId = '#' + $('input[data-num = 1]').attr('id');
    // console.log("rightAnsId"+ rightAnsId);
    // var rightAnswer = $(rightAnsId)[0].nextSibling.textContent;

//************************quick fix**************************************8

var rightAnswer =  selectedQuestion.rightAnswer;

    feedback = feedback + "<br>" + "The right Answer is " + rightAnswer;
    //display the right answer in questin div
    $('.question').html(feedback);
    
    $('#answerDiv').hide();
    $('#pictureDiv').show();
    var pichold=$('#ansPic');
  
    pichold.attr('src',selectedQuestion.picture);
    startAt = 3;
    reset();
    $("#clock").hide();
    picWindowTimeOut = setTimeout(playgame, 3000);
    

};

function playgame(){
    selectAQuestion();
    displayQusAndAns();
    startAt = 7;
    reset();
    ansWindowTimeOut=setTimeout(stop,7000);
};

function endGame(){
    $('#gamePage').hide();
    $('#lastPage').show();
    $('.finalWin').html(wins);
    $('.finalloss').html(losses);
    window.clearTimeout(ansWindowTimeOut);
    clearInterval(counter);
    console.log("clear");
};



//If the Start Over button is pressed any time
$('.startOver').on('click', function(){
    newGame();
    reset();
    playgame();  
});


//if the radio button is clicked 
    $('input').on('click',function(){
        //debugger;

        //check to see if data num value which is set to true or false depending on the txt behind it
        console.log(this);
        //console.log("nextsibiling" + $(this)[0].nextSibling.textContent);
        //console.log("data num" + $(this).data('num'));
//*****************************************************************************
//Wrote this to understand data-num but failed looks like I am missing some thing 
//Should come back and fix this
//*****************************************************************


        var check = $(this).data('num'); 
        if(check == true) {
            //feedback = $('input[data-num = "true"]').val();
           feedback = "Awesome! You are right!";
           wins++;
           $("#winDiv").html(wins);
        } else {
            feedback = "Nope! You are wrong";
            losses++
            $("#lossDiv").html(losses);
        } 
        clearTimeout(picWindowTimeOut); 
        $(this).attr('checked', false);
        showAnsPic();
    });//Clicking on the radio button

$("#lastPage").hide();
$('#gamePage').hide();
}); //closing on Document ready
