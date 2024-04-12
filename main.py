def power_adjust(num: number):
    global MPWR
    if num < 0:
        MPWR = 0
    elif num > 250:
        MPWR = 250

def on_received_number(receivedNumber):
    global MPWR
    basic.show_number(receivedNumber)
    if 0 == receivedNumber:
        maqueen.motor_stop(maqueen.Motors.ALL)
    elif 1 == receivedNumber:
        music._play_default_background(music.built_in_playable_melody(Melodies.POWER_UP),
            music.PlaybackMode.IN_BACKGROUND)
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CW, MPWR)
    elif 2 == receivedNumber:
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, MPWR / 2)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, MPWR)
    elif 3 == receivedNumber:
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, MPWR / 2)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CW, MPWR)
    elif 4 == receivedNumber:
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, MPWR)
        music.play(music.builtin_playable_sound_effect(soundExpression.yawn),
            music.PlaybackMode.IN_BACKGROUND)
    elif 5 == receivedNumber:
        pass
    elif 6 == receivedNumber:
        MPWR += MPWR / 2
    elif 7 == receivedNumber:
        MPWR += 0 - MPWR
    elif 8 == receivedNumber:
        pass
    else:
        maqueen.motor_stop(maqueen.Motors.ALL)
        power_adjust(MPWR)
radio.on_received_number(on_received_number)

def on_logo_pressed():
    basic.show_number(group_id)
    music.play(music.builtin_playable_sound_effect(soundExpression.hello),
        music.PlaybackMode.UNTIL_DONE)
input.on_logo_event(TouchButtonEvent.PRESSED, on_logo_pressed)

MPWR = 0
group_id = 0
makerbit.connect_ultrasonic_distance_sensor(DigitalPin.P1, DigitalPin.P2)
group_id = 1
radio.set_group(group_id)
radio.set_frequency_band(31)
basic.show_number(group_id)
maqueen.motor_stop(maqueen.Motors.ALL)
MPWR = 100

def on_every_interval():
    if makerbit.is_ultrasonic_distance_less_than(1, DistanceUnit.INCH):
        maqueen.motor_stop(maqueen.Motors.ALL)
        music._play_default_background(music.built_in_playable_melody(Melodies.POWER_DOWN),
            music.PlaybackMode.IN_BACKGROUND)
        basic.show_icon(IconNames.GHOST)
        basic.pause(500)
        maqueen.motor_run(maqueen.Motors.ALL, maqueen.Dir.CCW, MPWR)
        basic.show_icon(IconNames.CHESSBOARD)
        basic.pause(1000)
        maqueen.motor_run(maqueen.Motors.M1, maqueen.Dir.CCW, MPWR)
        maqueen.motor_run(maqueen.Motors.M2, maqueen.Dir.CW, MPWR)
        basic.show_icon(IconNames.SNAKE)
        basic.pause(500)
        maqueen.motor_stop(maqueen.Motors.ALL)
loops.every_interval(500, on_every_interval)
