"use strict";
//To do list:
//need to figure out how to get an item to move across an image
//need to figure out how to get this to work within the code in conjunction with the yards traveled
//get it so an image of a referee holding their arms up flashes each time there is a score
//incorporate a safety scoring mechanism for when yardsToTouchdown > 100
//rework the extra point scoring because it is bad
//create and integrate a function which chooses the number of possessions randomly
//need to work on ensuring the scoring is relatively good
//create a hail mary option that has high reward but low success rate at approximately 25% TD rate
//BONUS: Figure out how to get Missouri to generate the rush, pass, and field goal mechanisms randomly rather than just generating a score randomly
//Try to clean up the code if it is possible


function rollDice(sides){
    let diceRoll = Math.floor(Math.random() * sides) + 1;
    return diceRoll;
}

function playKansasOffense(){
    let missouriPossessionsLeft = parseInt(document.getElementById("missouriPossessionCounter").innerHTML);
    let kansasPossessionsLeft = parseInt(document.getElementById("kansasPossessionCounter").innerHTML);
    let downCount = parseInt(document.getElementById("downCounter").innerHTML);
    document.getElementById("downCounter").innerHTML = downCount + 1;
    let downCountUpdate = parseInt(document.getElementById("downCounter").innerHTML);
    let yardsToFirstDown = parseInt(document.getElementById("yardsToFirstDown").innerHTML);
    let yardsToTouchdown = parseInt(document.getElementById("yardsToTouchdown").innerHTML);
    let firstDownDistance = 10;
    if(missouriPossessionsLeft > 0 || kansasPossessionsLeft >= 0){
        if(yardsToTouchdown < 1){
            document.getElementById("extraPointButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            console.log("need to kick the extra point");
            let touchdown = 6;
            document.getElementById("messageDisplay").innerHTML = "TOUCHDOWN! Click Extra Point";
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
            document.getElementById("kansasScore").innerHTML = kansasScore + touchdown;
        }
        else if(downCountUpdate < 5 && yardsToFirstDown <=0 && yardsToTouchdown <= 10 && yardsToTouchdown > 0){
            console.log("first and goal");
            document.getElementById("rushButton").disabled = false;
            document.getElementById("passButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("downCounter").innerHTML = 1;
            document.getElementById("messageDisplay").innerHTML = "FIRST AND GOAL! Choose Rush or Pass";
            document.getElementById("yardsToFirstDown").innerHTML = yardsToTouchdown;
        }
        else if(downCountUpdate <= 5 && yardsToFirstDown <= 0){
            console.log("converted the first down");
            document.getElementById("rushButton").disabled = false;
            document.getElementById("passButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("downCounter").innerHTML = 1;
            document.getElementById("messageDisplay").innerHTML = "FIRST DOWN! Choose Rush or Pass.";
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
            console.log("should be a first down");
        }
        else if(downCountUpdate == 4 && yardsToTouchdown <= 45){
            console.log("field goal option");
            document.getElementById("rushButton").disabled = false;
            document.getElementById("passButton").disabled = false;
            document.getElementById("fieldGoalButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("messageDisplay").innerHTML = "Choose to attempt the Field Goal or Rush or Pass";
        }
        else if(downCountUpdate < 5){
            console.log("less than four downs");
            document.getElementById("rushButton").disabled = false;
            document.getElementById("passButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("messageDisplay").innerHTML = "Choose Rush or Pass";
        }
        else if(downCountUpdate > 4){
            console.log("failed to convert the first down");
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("missouriButton").disabled = false;
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("downCounter").innerHTML = 0;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            document.getElementById("messageDisplay").innerHTML = "Kansas failed to convert the fourth down.  Click Missouri Possession.";
        }
    }
}

function resetGame(){
    document.getElementById("missouriScore").innerHTML = 0;
    document.getElementById("kansasScore").innerHTML = 0;
    document.getElementById("downCounter").innerHTML = 0;
    document.getElementById("yardsToFirstDown").innerHTML = 10;
    document.getElementById("yardsToTouchdown").innerHTML = 100;
    document.getElementById("missouriPossessionCounter").innerHTML = 12;
    document.getElementById("kansasPossessionCounter").innerHTML = 12;
    document.getElementById("messageDisplay").innerHTML = "Click Missouri Possession to Start!";
    document.getElementById("possessionArrow").innerHTML = ">>>";
    document.getElementById("missouriButton").disabled = false;
    document.getElementById("kickoffButton").disabled = true;
    document.getElementById("extraPointButton").disabled = true;
    document.getElementById("fieldGoalButton").disabled = true;
    document.getElementById("choosePlayButton").disabled = true;
    document.getElementById("rushButton").disabled = true;
    document.getElementById("passButton").disabled = true;
}

function missouriTurn(){
    let missouriPossessionsRemaining = parseInt(document.getElementById("missouriPossessionCounter").innerHTML);
    let kansasPossessionsRemaining = parseInt(document.getElementById("kansasPossessionCounter").innerHTML);
    let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
    let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
    if(missouriPossessionsRemaining < 0){
        console.log("missouri possession zero or less than 0")
        document.getElementById("missouriButton").disabled = true;
        if(kansasPossessionsRemaining <= 0){
            document.getElementById("kickoffButton").disabled = true;
            if(kansasScore > missouriScore){
                alert("KANSAS WINS! Click ok to play again.");
                resetGame();
            }
            else if(missouriScore > kansasScore){
                alert("BOOO! MISSOURI WINS! Click ok to play again.")
                resetGame();
            }
            else{
                alert("TIE GAME! Click ok to play again.")
                resetGame();
            }
        }
    }
    else if(missouriPossessionsRemaining == 0 && kansasPossessionsRemaining == 0){
        console.log("game over");
        document.getElementById("missouriButton").disabled = true;
        document.getElementById("kickoffButton").disabled = true;
        if(kansasScore > missouriScore){
            alert("KANSAS WINS! Click ok to play again.");
            resetGame();
        }
        else if(missouriScore > kansasScore){
            alert("BOOO! MISSOURI WINS! Click ok to play again.")
            resetGame();
        }
        else{
            alert("TIE GAME! Click ok to play again.")
            resetGame();
        }
    }
    else{
        document.getElementById("kickoffButton").disabled = false;
        document.getElementById("extraPointButton").disabled = true;
        document.getElementById("fieldGoalButton").disabled = true;
        document.getElementById("choosePlayButton").disabled = true;
        document.getElementById("rushButton").disabled = true;
        document.getElementById("passButton").disabled = true;
        document.getElementById("missouriButton").disabled = true;
        document.getElementById("missouriPossessionCounter").innerHTML = missouriPossessionsRemaining - 1;
        let opponentOutcome = rollDice(8);
        if(opponentOutcome == 1 || opponentOutcome == 2 || opponentOutcome == 3){
            console.log("they didn't score");
            let score = 0;
            document.getElementById("messageDisplay").innerHTML = "Missouri didn't score. Click Kickoff.";
            let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
            document.getElementById("missouriScore").innerHTML = missouriScore + score;
        }
        else if(opponentOutcome == 4 || opponentOutcome == 5){
            console.log("they scored a field goal");
            let score = 3;
            document.getElementById("messageDisplay").innerHTML = "Missouri kicked a field goal! Click Kickoff.";
            let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
            document.getElementById("missouriScore").innerHTML = missouriScore + score;
        }
        else if(opponentOutcome == 6){
            console.log("they scored a TD but missed the XP");
            let score = 6;
            document.getElementById("messageDisplay").innerHTML = "Missouri scored a Touchdown but missed the extra point! Click Kickoff.";
            let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
            document.getElementById("missouriScore").innerHTML = missouriScore + score;
        }
        else if(opponentOutcome == 7){
            console.log("they scored a TD and made the XP");
            let score = 7;
            document.getElementById("messageDisplay").innerHTML = "Missouri scored a Touchdown and the extra point! Click Kickoff.";
            let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
            document.getElementById("missouriScore").innerHTML = missouriScore + score;
        }
        else{
            console.log("they scored a TD and a two point conversion");
            let score = 8;
            document.getElementById("messageDisplay").innerHTML = "Missouri scored a Touchdown and the two-point conversion! Click Kickoff.";
            let missouriScore = parseInt(document.getElementById("missouriScore").innerHTML);
            document.getElementById("missouriScore").innerHTML = missouriScore + score;
        }
        document.getElementById("kickoffButton").disabled = false;
    }
    document.getElementById("possessionArrow").innerHTML = "<<<";
}


function kickoff(){
    let yardsToTouchdown = document.getElementById("yardsToTouchdown").innerHTML;
    let firstDownDistance = 10;
    let kansasPossessionsLeft = parseInt(document.getElementById("kansasPossessionCounter").innerHTML);
    let missouriPossessionsLeft = parseInt(document.getElementById("missouriPossessionCounter").innerHTML);
    if(kansasPossessionsLeft <= missouriPossessionsLeft){
        document.getElementById("messageDisplay").innerHTML = "Missouri must go first. Click Missouri Possession";
        document.getElementById("kickoffButton").disabled = true;
        document.getElementById("choosePlayButton").disabled = true;
        document.getElementById("rushButton").disabled = true;
        document.getElementById("passButton").disabled = true;
        document.getElementById("extraPointButton").disabled = true;
        document.getElementById("fieldGoalButton").disabled = true;
    }
    else if(kansasPossessionsLeft - 1 >= 0){
        document.getElementById("kansasPossessionCounter").innerHTML = kansasPossessionsLeft - 1;
        document.getElementById("choosePlayButton").disabled = false;
        document.getElementById("kickoffButton").disabled = true;
        let kickoffOutcome = rollDice(10);
        if(kickoffOutcome == 1){
            let kickoff = 10;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 10 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 2){
            let kickoff = 20;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 20 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 3){
            let kickoff = 30;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 30 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 4){
            let kickoff = 40;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 40 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 5){
            let kickoff = 50;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 50 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 6){
            let kickoff = 60;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 60 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 7){
            let kickoff = 70;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 70 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 8){
            let kickoff = 80;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 80 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else if(kickoffOutcome == 9){
            let kickoff = 90;
            document.getElementById("messageDisplay").innerHTML = "Kansas returned the kick for 90 yards! Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - kickoff;
            document.getElementById("yardsToFirstDown").innerHTML = firstDownDistance;
        }
        else{
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("extraPointButton").disabled = false;
            let touchdown = 6;
            document.getElementById("messageDisplay").innerHTML = "KANSAS RETURNED THE KICK FOR A TOUCHDOWN! Attempt the extra point!";
            document.getElementById("yardsToTouchdown").innerHTML = 0;
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
            document.getElementById("kansasScore").innerHTML = kansasScore + touchdown;
            return kickoff;
        }
    }
    else{
        document.getElementById("kickoffButton").disabled = true;
        if(missouriPossessionsLeft > kansasPossessionsLeft){
            document.getElementById("messageDisplay").innerHTML = "Too many Kansas Possessions used. Finish all Missouri possessions to complete the game."
        }
    }
}

function chooseRun(){
    let yardsToTouchdown = parseInt(document.getElementById("yardsToTouchdown").innerHTML);
    let downCount = parseInt(document.getElementById("downCounter").innerHTML);
    let yardsToFirstDown = parseInt(document.getElementById("yardsToFirstDown").innerHTML);
    let rushOutcome = rollDice(10);
    if(downCount < 5 && yardsToTouchdown > 0){
        console.log("play is happening");
        document.getElementById("choosePlayButton").disabled = false;
        document.getElementById("rushButton").disabled = true;
        document.getElementById("passButton").disabled = true;
        document.getElementById("fieldGoalButton").disabled = true;
        if(rushOutcome == 1 || rushOutcome == 2){
            let negativeRun = rollDice(6);
            console.log(negativeRun * -1);
            document.getElementById("messageDisplay").innerHTML = "Kansas lost " + negativeRun + " yards. Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown + negativeRun;
            document.getElementById("yardsToFirstDown").innerHTML = yardsToFirstDown + negativeRun;
            //need to generate the ability to move the player this many yards backwards
        }
        else if(rushOutcome == 3 || rushOutcome == 4){
            document.getElementById("messageDisplay").innerHTML = "Kansas runs for no gain. Click Next Play";
        }
        else if(rushOutcome == 5 || rushOutcome == 6 || rushOutcome == 7 || rushOutcome == 8 || rushOutcome == 9){
            let positiveRun = rollDice(12);
            document.getElementById("messageDisplay").innerHTML = "Kansas rushed for " + positiveRun + " yards. Click Next Play";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - positiveRun;
            document.getElementById("yardsToFirstDown").innerHTML = yardsToFirstDown - positiveRun;
            //need to generate the ability to move the player this many yards forwards
        }
        else{
            document.getElementById("missouriButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("messageDisplay").innerHTML = "KANSAS FUMBLES! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("downCounter").innerHTML = 0;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            let possessionCount = document.getElementById("kansasPossessionCounter").innerHTML;
            document.getElementById("kansasPossessionCounter").innerHTMl = possessionCount - 1;
        }
    }
    else{
        console.log("play isn't happening");
        document.getElementById("downCounter").innerHTML = 0;
        document.getElementById("yardsToTouchdown").innerHTML = 100;
        document.getElementById("yardsToFirstDown").innerHTML = 10;
        document.getElementById("possessionArrow").innerHTML = ">>>";
    }
}

function choosePass(){
    let yardsToTouchdown = parseInt(document.getElementById("yardsToTouchdown").innerHTML);
    let downCount = parseInt(document.getElementById("downCounter").innerHTML);
    let yardsToFirstDown = parseInt(document.getElementById("yardsToFirstDown").innerHTML);
    let passOutcome = rollDice(8);
    if(downCount < 5 && yardsToTouchdown > 0){
        console.log("play is happening");
        document.getElementById("choosePlayButton").disabled = false;
        document.getElementById("rushButton").disabled = true;
        document.getElementById("passButton").disabled = true;
        document.getElementById("fieldGoalButton").disabled = true;
        if(passOutcome == 1){
            let interception = 0;
            document.getElementById("missouriButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            document.getElementById("messageDisplay").innerHTML = "KANSAS THROWS AN INTERCEPTION! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            let possessionCount = document.getElementById("kansasPossessionCounter").innerHTML;
            document.getElementById("kansasPossessionCounter").innerHTMl = possessionCount - 1;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("downCounter").innerHTML = 0;
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            return interception;
        }
        else if(passOutcome == 2){
            let sack = rollDice(6) * -1;
            document.getElementById("messageDisplay").innerHTML = "Kansas was sacked for " + sack + " yards. Click Next Play.";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - sack;
            document.getElementById("yardsToFirstDown").innerHTML = yardsToFirstDown - sack;
            return sack;
            //need to generate the ability to reset the down here and move
        }
        else if(passOutcome == 3 || passOutcome == 4){
            document.getElementById("messageDisplay").innerHTML = "Kansas' pass is incomplete.  Click Next Play.";
            //need to generate the ability to reset the down here
        }
        else if(passOutcome == 5 || passOutcome == 6){
            let shortPass = rollDice(10);
            document.getElementById("messageDisplay").innerHTML = "Kansas completed a pass for " + shortPass + " yards. Click Next Play.";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - shortPass;
            document.getElementById("yardsToFirstDown").innerHTML = yardsToFirstDown - shortPass;
            return shortPass;
            //need to generate the ability to move the player forward this amount of yards
        }
        else if(passOutcome == 7){
            let longPass = rollDice(20);
            document.getElementById("messageDisplay").innerHTML = "Kansas completed a pass for " + longPass + " yards. Click Next Play.";
            document.getElementById("yardsToTouchdown").innerHTML = yardsToTouchdown - longPass;
            document.getElementById("yardsToFirstDown").innerHTML = yardsToFirstDown - longPass;
            return longPass;
            //need to generate the ability to move the player forward this amount of yards
        }
        else{
            document.getElementById("extraPointButton").disabled = false;
            document.getElementById("choosePlayButton").disabled = true;
            let touchdown = 6;
            document.getElementById("messageDisplay").innerHTML = "KANSAS PASSES FOR A TOUCHDOWN! Attempt the extra point!";
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
            document.getElementById("kansasScore").innerHTML = kansasScore + touchdown;
            document.getElementById("yardsToTouchdown").innerHTML = 0;
            document.getElementById("yardsToFirstDown").innerHTML = 0;
            return touchdown;
            //need the ability to force it to move to the extra point mechanism
        }
    }
    else{
        console.log("play isn't happening");
        document.getElementById("downCounter").innerHTML = 0;
        document.getElementById("yardsToTouchdown").innerHTML = 100;
        document.getElementById("possessionArrow").innerHTML = ">>>";
    }
}

function extraPoint(){
    let xpOutcome = rollDice(4);
    document.getElementById("missouriButton").disabled = false;
    document.getElementById("extraPointButton").disabled = true;
    if(xpOutcome == 1){
        let xp = 0;
        document.getElementById("messageDisplay").innerHTML = "Kansas missed the extra point! Click Missouri Possession";
        document.getElementById("possessionArrow").innerHTML = ">>>";
        document.getElementById("yardsToFirstDown").innerHTML = 10;
        document.getElementById("yardsToTouchdown").innerHTML = 100;
        document.getElementById("downCounter").innerHTML = 0;
        let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
        document.getElementById("kansasScore").innerHTML = kansasScore + xp;
        return xp;
    }
    else if(xpOutcome == 2 || xpOutcome == 3){
        let xp = 1;
        document.getElementById("messageDisplay").innerHTML = "Extra point good! Click Missouri Possession";
        document.getElementById("possessionArrow").innerHTML = ">>>";
        document.getElementById("yardsToFirstDown").innerHTML = 10;
        document.getElementById("yardsToTouchdown").innerHTML = 100;
        document.getElementById("downCounter").innerHTML = 0;
        let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
        document.getElementById("kansasScore").innerHTML = kansasScore + xp;
        return xp;
    }
    else{
        let twoPoint = 2;
        document.getElementById("messageDisplay").innerHTML = "Kansas went for the two point conversion and converted! Click Missouri Possession";
        document.getElementById("possessionArrow").innerHTML = ">>>";
        document.getElementById("yardsToFirstDown").innerHTML = 10;
        document.getElementById("yardsToTouchdown").innerHTML = 100;
        document.getElementById("downCounter").innerHTML = 0;
        let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
        document.getElementById("kansasScore").innerHTML = kansasScore + twoPoint;
        return twoPoint;
    }
}

function fieldGoal(){
    let yardsToTouchdown = parseInt(document.getElementById("yardsToTouchdown").innerHTML);
    document.getElementById("missouriButton").disabled = false;
    document.getElementById("fieldGoalButton").disabled = true;
    document.getElementById("rushButton").disabled = true;
    document.getElementById("passButton").disabled = true;
    if(yardsToTouchdown <= 45 && yardsToTouchdown > 25){
        document.getElementById("choosePlayButton").disabled = true;
        document.getElementById("rushButton").disabled = true;
        document.getElementById("passButton").disabled = true;
        document.getElementById("fieldGoalButton").disabled = true;
        document.getElementById("missouriButton").disable = false;
        let longFgOutcome = rollDice(4);
        if(longFgOutcome == 1){
            document.getElementById("messageDisplay").innerHTML = "Kansas missed the Field Goal! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("downCounter").innerHTML = 0;
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
        }
        else{
            let fg = 3;
            document.getElementById("messageDisplay").innerHTML = "Field goal good! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("downCounter").innerHTML = 0;
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
            document.getElementById("kansasScore").innerHTML = kansasScore + fg;
        }
    }
    else if(yardsToTouchdown <= 25){
        let shortFgOutcome = rollDice(10);
        if(shortFgOutcome == 1){
            document.getElementById("messageDisplay").innerHTML = "Kansas missed the Field Goal! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("downCounter").innerHTML = 0;
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
        }
        else{
            let fg = 3;
            document.getElementById("messageDisplay").innerHTML = "Field goal good! Click Missouri Possession";
            document.getElementById("possessionArrow").innerHTML = ">>>";
            document.getElementById("yardsToFirstDown").innerHTML = 10;
            document.getElementById("yardsToTouchdown").innerHTML = 100;
            document.getElementById("downCounter").innerHTML = 0;
            let kansasScore = parseInt(document.getElementById("kansasScore").innerHTML);
            document.getElementById("kansasScore").innerHTML = kansasScore + fg;
        }
    }
}


