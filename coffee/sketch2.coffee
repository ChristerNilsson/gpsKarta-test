VERSION = 107

BEARINGLIST ='01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36'
DISTLIST = '2 4 6 8 10 12 14 16 18 20 30 40 50 60 70 80 90 100 120 140 160 180 200 300 400 500 600 700 800 900 1000 1200 1400 1600 1800 2000 3000 4000 5000 6000 7000 8000 9000 10000'

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

initSounds = ->

	bearingSounds = {}
	for bearing in BEARINGLIST.split ' '
		sound = loadSound "sounds/bearing/male/#{bearing}.mp3"
		if sound
			console.log "sounds/bearing/male/#{bearing}.mp3"
		sound.setVolume 0.1
		bearingSounds[bearing] = sound

	distanceSounds = {}
	for distance in DISTLIST.split ' '
		sound = loadSound "sounds/distance/female/#{distance}.mp3"
		if sound
			console.log "sounds/distance/female/#{distance}.mp3"
		sound.setVolume 0.1
		distanceSounds[distance] = sound

	soundUp = loadSound 'sounds/soundUp.wav'
	soundDown = loadSound 'sounds/soundDown.wav'
	soundUp.setVolume 0.1
	soundDown.setVolume 0.1


preload = ->

	initSounds()

	mapName = "2023-SommarS"
	loadJSON "data/#{mapName}.json", (json) ->
		data = json
		for key,control of data.controls
			control.push ""
			control.push 0
			control.push 0
		img = loadImage "data/" + data.map


setup = ->
	rectMode CENTER
	console.log "setup"
	canvas = createCanvas innerWidth-0.0, innerHeight #-0.5
	canvas.position 0,0 # hides text field used for clipboard copy.

	frameRate 6

	#SCALE = data.scale

	#[cx,cy] = [img.width/2,img.height/2]


draw = ->

	background 0,255,0
	if state == 0 
		textSize 100
		textAlign CENTER,CENTER
		x = width/2
		y = height/2 
		text mapName, x,y-100
		text 'Version: '+VERSION, x,y-0
		text "Click to continue!", x,y+100
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
	xdraw()
	false

touchEnded = (event) ->
	#if state==0 then initSounds()

	event.preventDefault()
	#say index
	#index++
	if released then return

	#initSounds() 

	released = true
	if state in [0,2]
		state = 1
		return false
	false

names = (v,s) =>
	for name in s.split ' '
		if -1 != v.name.indexOf name then return true
	false

