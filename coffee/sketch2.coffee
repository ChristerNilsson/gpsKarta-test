VERSION = 106

released = true
mapName = "" # t ex skarpnäck

start = new Date()

state = 0 # 0=uninitialized 1=normal 2=info

data = null

img = null

startX = 0
startY = 0

messages = []
index = 0

voice = null

speaker = null
timer = null

[cx,cy] = [0,0] # center (image coordinates)
SCALE = 1

preload = ->
	mapName = "2023-SommarS"
	loadJSON "data/#{mapName}.json", (json) ->
		data = json
		for key,control of data.controls
			control.push ""
			control.push 0
			control.push 0
		img = loadImage "data/" + data.map

window.speechSynthesis.onvoiceschanged = -> 
	console.log "voices changed"
	initSpeaker()

setup = ->
	canvas = createCanvas innerWidth-0.0, innerHeight #-0.5
	canvas.position 0,0 # hides text field used for clipboard copy.

	SCALE = data.scale

	[cx,cy] = [img.width/2,img.height/2]

	initSpeaker()

draw = ->

	background 0,255,0
	if state == 0 
		textSize 100
		textAlign CENTER,CENTER
		x = width/2
		y = height/2 
		text mapName, x,y-100
		text 'Version: '+VERSION, x,y
		text "Click to continue!", x,y+200
		return

	if state == 1
		start = new Date()
		push()
		translate width/2, height/2
		scale SCALE
		image img, round(-cx),round(-cy)
		pop()
		textSize 20
		messages.push round frameRate()
		#if messages.length > 50 then messages.shift()
		for i in range messages.length
			if i < messages.length - 50 then continue
			text messages[i], 50,20 + 20*(i % 50)

touchStarted = (event) ->
	event.preventDefault()
	if not released then return
	#speed = 1
	released = false
	startX = mouseX
	startY = mouseY
	false

touchMoved = (event) ->
	event.preventDefault()
	if state == 1
		cx += (startX - mouseX)/SCALE
		cy += (startY - mouseY)/SCALE
		startX = mouseX
		startY = mouseY
	false

touchEnded = (event) ->
	event.preventDefault()
	#say index
	#index++
	if released then return
	#initSpeaker() 
	released = true
	if state in [0,2]
		state = 1
		return false
	false

names = (v,s) =>
	for name in s.split ' '
		if -1 != v.name.indexOf name then return true
	false

initSpeaker = ->
	speaker = new SpeechSynthesisUtterance()
	speaker.voiceURI = "native"
	speaker.volume = 1
	speaker.rate = 1.0
	speaker.pitch = 0
	speaker.text = ''
	speaker.lang = 'en-GB'

	voices = speechSynthesis.getVoices()
	for v in voices
		#if names v, 'George Daniel' then voice = v
		if names v, 'Susan Karen' then voice = v
	document.title = 'nothing'
	if voice then document.title = voice.name

	say ""
	f()

f = () =>
	say index
	console.log index
	index += 1
	setTimeout f,1000

#setTimer = (ms) -> setTimeout f,ms

say = (m) ->
	if speaker == null then return
	speechSynthesis.cancel()
	speaker.text = m
	speaker.voice = if voice then voice else voices[0]
	speechSynthesis.speak speaker
