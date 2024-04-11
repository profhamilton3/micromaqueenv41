radio.onReceivedNumber(function (receivedNumber) {
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
radio.setGroup(1)
radio.setFrequencyBand(31)
basic.showNumber(1)
maqueen.motorStop(maqueen.Motors.All)
basic.forever(function () {
	
})