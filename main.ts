function power_adjust (num: number) {
    if (num < 25) {
        MPWR = 25
    } else if (num > 250) {
        MPWR = 250
    }
}
makerbit.onUltrasonicObjectDetected(20, DistanceUnit.CM, function () {
    datalogger.log(
    datalogger.createCV("UsDx", makerbit.getUltrasonicDistance(DistanceUnit.CM)),
    datalogger.createCV("mtrpwr", MPWR)
    )
})
radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (0 == receivedNumber) {
        maqueen.motorStop(maqueen.Motors.All)
    } else if (1 == receivedNumber) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, MPWR)
    } else if (2 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, MPWR / 5)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MPWR)
    } else if (3 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MPWR / 5)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, MPWR)
    } else if (4 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, MPWR)
        music.play(music.builtinPlayableSoundEffect(soundExpression.yawn), music.PlaybackMode.InBackground)
    } else if (5 == receivedNumber) {
    	
    } else if (6 == receivedNumber) {
        MPWR += MPWR / 2
    } else if (7 == receivedNumber) {
        MPWR += 0 - MPWR / 4
    } else if (8 == receivedNumber) {
        MPWR += MPWR * 0.75
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
    power_adjust(MPWR)
})
datalogger.onLogFull(function () {
    datalogger.deleteLog(datalogger.DeleteType.Fast)
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    datalogger.deleteLog(datalogger.DeleteType.Full)
    basic.showNumber(group_id)
    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
})
let MPWR = 0
let group_id = 0
makerbit.connectUltrasonicDistanceSensor(DigitalPin.P1, DigitalPin.P2)
group_id = 1
radio.setGroup(group_id)
radio.setFrequencyBand(31)
basic.showNumber(group_id)
maqueen.motorStop(maqueen.Motors.All)
MPWR = 100
music.setVolume(50)
datalogger.includeTimestamp(FlashLogTimeStampFormat.Milliseconds)
datalogger.setColumnTitles(
"UsDx",
"mtrpwr"
)
loops.everyInterval(500, function () {
    datalogger.log(
    datalogger.createCV("UsDx", makerbit.getUltrasonicDistance(DistanceUnit.CM)),
    datalogger.createCV("mtrpwr", MPWR)
    )
    if (makerbit.isUltrasonicDistanceLessThan(5, DistanceUnit.CM)) {
        maqueen.motorStop(maqueen.Motors.All)
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        basic.showIcon(IconNames.Ghost)
        basic.pause(500)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, MPWR)
        basic.showIcon(IconNames.Chessboard)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, MPWR)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, MPWR)
        basic.showIcon(IconNames.Snake)
        basic.pause(500)
        maqueen.motorStop(maqueen.Motors.All)
    }
})
