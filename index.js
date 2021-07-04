const WebSocket = require('ws');
var osc = require('osc');

const wss = new WebSocket.Server({port: 8080});
const ms = 200;

const acceptedBlendShapeValues = [
    'Neutral',
    'A',
    'I',
    'U',
    'E',
    'O',
    'Blink',
    'Joy',
    'Angry',
    'Sorrow',
    'Fun',
    'LookUp',
    'LookDown',
    'LookLeft',
    'LookRight',
    'Blink_L',
    'Blink_R',
    'EYEBROW_ANGRY',
    'EYEBROW_SORROW',
    'TONGUE_OUT',
    'MouthSmileLeft',
    'MouthSmileRight',
    'CheekPuff',
    'TongueOut',
    'MouthPucker',
    'MouthRight',
    'MouthLeft',
    'MouthLowerDownLeft',
    'MouthLowerDownRight',
    'MouthPressLeft',
    'MouthPressRight',
    'MouthFunnel',
    'MouthDimpleLeft',
    'MouthDimpleRight',
    'MouthClose',
    'JawForward',
    'JawLeft',
    'JawRight',
    'JawOpen',
    'MouthRollLower',
    'MouthRollUpper',
    'MouthFrownLeft',
    'MouthFrownRight',
    'BrowDownRight',
    'BrowDownLeft',
    'BrowInnerUp',
    'BrowOuterUpLeft',
    'BrowOuterUpRight',
    'EyeWideLeft',
    'EyeWideRight',
    'EyeBlinkLeft',
    'EyeBlinkRight',
    'EyeSquintLeft',
    'EyeSquintRight',
    'EyeLookDownLeft',
    'EyeLookDownRight',
    'EyeLookInLeft',
    'EyeLookInRight',
    'EyeLookUpLeft',
    'EyeLookUpRight',
    'EyeLookOutLeft',
    'EyeLookOutRight',
    'MouthStretchLeft',
    'MouthStretchRight',
    'MouthShrugUpper',
    'MouthShrugLower',
    'MouthLowerDownLeft',
    'MouthLowerDownRight',


];
const acceptedBoneVals = [
    'LeftEye',
    'RightEye',
    'Head'
];

const acceptedTrackerVals = [

];

function logOSC (oscMsg) {
    let values = "";
    for (const val in oscMsg.args) {
        if (val != 0) {
            values = values + oscMsg.args[val].value + "\n";
        }
    }

    let messageLines = [
        "-----------------",
        "ADDRESS: " + oscMsg.address,
        "NAME: " + oscMsg.args[0].value,
        "VALUES: " + values.toString()
    ];
    return messageLines[0] + "\n" + messageLines[1] + "\n" + messageLines[2] + "\n" + messageLines[3];
}

function formatPos (x, y, z) {
    return '[' + x + ';' + y + ';' + z + ']';
}

function formatRot (x, y, z, w) {
    return '[' + x + ';' + y * -1 + ';' + z + ';' + w + ']';
}

wss.on('connection', function connection(ws) {
    var udpPort = new osc.UDPPort({
        localAddress: '127.0.0.1',
        localPort: 39539,
        metadata: true
    });
    udpPort.on('message', function (oscMsg, timeTag, info) {
        //console.log("[VMC MESSAGE]");
        //console.log(address);
        //console.log(logOSC(oscMsg));
        let args = oscMsg.args;
        let address = oscMsg.address;
        let valueName = args[0].value;
        /*if (address == "/VMC/Ext/Bone/Pos") {
            console.log(oscMsg);
        }*/
        //console.log(oscMsg);
        if(acceptedBlendShapeValues.includes(valueName) & address == "/VMC/Ext/Blend/Val") {
            // BLENDSHAPES
            let value = args[1].value.toFixed(2);

            let message = "f1_" + valueName + " " + value;

            setTimeout(function() {
                //console.log("BLENDSHAPE [" + valueName + "] : " + value);
                ws.send(message);
            }, ms);
            
        } else if (acceptedBoneVals.includes(valueName) & address == "/VMC/Ext/Bone/Pos") {
            // BONES
            let f3 = formatPos(args[1].value, args[2].value, args[3].value);
            let fq = formatRot(args[4].value, args[5].value, args[6].value, args[7].value)

            let rotation = "fq_" + valueName + " " + fq;
            let position = "f3_ " + valueName + " " + f3;

            setTimeout(function() {
                //console.log("BONE [" + valueName + "] :\nPOSITION : " + position + "\nROTATION : " + rotation);
                ws.send(position);
                ws.send(rotation);
            }, ms);

        } else if (accepteTrackerVals.includes(valueName) & address == "/VMC/Ext/Tra/Pos") {
            // TRACKERS
            setTimeout(function() {
                //console.log("TRACKER [" + valueName + "] :\nPOSITION : " + position + "\nROTATION : " + rotation);

            }, ms);
        }
        //address == '/VMC/Ext/Blend/Val' 
        /*if (address == '/VMC/Ext/Bone/Pos') {
            console.log(logOSC(oscMsg));
        }*/
            
    });
    
    udpPort.on('error', function (error) {

    })

    udpPort.open();
    console.log("UDP OPENED");
});
