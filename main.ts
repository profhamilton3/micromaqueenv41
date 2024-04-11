radio.onReceivedNumber(function (receivedNumber) {
    basic.showNumber(receivedNumber)
    if (0 == receivedNumber) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerDown), music.PlaybackMode.InBackground)
        maqueen.motorStop(maqueen.Motors.All)
    } else if (1 == receivedNumber) {
        music._playDefaultBackground(music.builtInPlayableMelody(Melodies.PowerUp), music.PlaybackMode.InBackground)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CW, 80)
    } else if (2 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 20)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 80)
    } else if (3 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 20)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, 80)
    } else if (4 == receivedNumber) {
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 80)
    } else {
        maqueen.motorStop(maqueen.Motors.All)
    }
})
input.onLogoEvent(TouchButtonEvent.Pressed, function () {
    basic.showNumber(group_id)
    music.play(music.builtinPlayableSoundEffect(soundExpression.hello), music.PlaybackMode.UntilDone)
})
let dist = 0
let group_id = 0
group_id = 1
radio.setGroup(group_id)
radio.setFrequencyBand(31)
basic.showNumber(group_id)
maqueen.motorStop(maqueen.Motors.All)
basic.forever(function () {
    dist = maqueen.Ultrasonic(PingUnit.Centimeters)
    if (dist < 5) {
        maqueen.motorStop(maqueen.Motors.All)
        basic.showIcon(IconNames.Ghost)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.All, maqueen.Dir.CCW, 25)
        basic.showIcon(IconNames.Chessboard)
        basic.pause(1000)
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CCW, 25)
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, 25)
        basic.showIcon(IconNames.Snake)
        basic.pause(1250)
    } else {
        basic.pause(200)
    }
})
