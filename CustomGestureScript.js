//@input Component.ObjectTracking thumb0
//@input Component.ObjectTracking index0
//@input Component.ObjectTracking center
//@input Component.Text myText 
//@input Component.Text timerText
var screenText = script.myText;
var countdownText = script.timerText;
var thumb0 = script.thumb0;
var index0 = script.index0;
var centerJoint = script.center;
var countdown = 5;
var interval = 20;
var isGUILTY = Boolean;
var isINNOCENT = Boolean;
var timer = script.createEvent("UpdateEvent");
function updateCountdown() {
        interval -= 1;
    if (interval == 0 ) {
        countdown -=1;
        interval = 20;
        if (countdown <= 0) {
            if (isGUILTY == true && isINNOCENT == false) {
                screenText.text = "GUILTY";
                
            }
            if(isINNOCENT == true && isGUILTY == false){
                screenText.text = "INNOCENT";
            }
            countdown = 5;
        }
        else{
            screenText.text = " ";
        }
        
    } 
    else{
        countdownText.text = countdown.toString();
    } 
    
    
}
function getDistanceBetweenObjects(joint1, joint2) {
    var position1 = joint1.getSceneObject().getTransform().getLocalPosition();
    var position2 = joint2.getSceneObject().getTransform().getLocalPosition();
    var distance = Math.sqrt(
        Math.pow(position2.x - position1.x, 2) +
        Math.pow(position2.y - position1.y, 2) +
        Math.pow(position2.z - position1.z, 2)
    );
    return distance;
}
function getRotationData(fingerJoint) {
    var fingerJointRotation = fingerJoint.getSceneObject().getTransform().getLocalRotation().z;
    if (thumb0.isTracking()){
   
        var indexToCenterDistance = getDistanceBetweenObjects(index0, centerJoint);
        if (indexToCenterDistance < 2.0){
            if (fingerJointRotation > 0.70 || fingerJointRotation < -0.75) {
            isGUILTY = false;
            isINNOCENT =true;
            timer.bind(updateCountdown);
            timer.enabled = true;    
            }
        
            else if (fingerJointRotation < 0.65 && fingerJointRotation > 0.45) {
                isINNOCENT = false;
                isGUILTY = true;            
                timer.bind(updateCountdown);
                timer.enabled = true;   
            }
            else if(fingerJointRotation > -0.60){
                isINNOCENT = false;
                isGUILTY = true;
                timer.bind(updateCountdown);
                timer.enabled = true;
            }
            else{
            screenText.text = " ";
            countdownText.text = " ";
            countdown = 5;
            timer.enabled = false;
            } 
        }
        else{
            screenText.text = " ";
            countdownText.text = " ";
            countdown = 5;
            timer.enabled = false;
            } 
    }
    else{
        screenText.text = "Show your hand";
        countdownText.text = " "
        timer.enabled = false;
    }

    return fingerJointRotation;
}

function onUpdate(eventData) {
    print(getRotationData(thumb0));
    }   
script.createEvent("UpdateEvent").bind(onUpdate);



