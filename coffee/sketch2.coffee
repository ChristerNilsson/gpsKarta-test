VERSION = 101

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

pLat = 0
pLon = 0

gpsCounter = 0 

locationUpdateFail = (error) ->	if error.code == error.PERMISSION_DENIED then messages = ['','','','','','Check location permissions']

locationUpdate = (p) ->
	pLat = p.coords.latitude.toFixed 6
	pLon = p.coords.longitude.toFixed 6
	gpsCounter++
	# if storage.trail.length == 0
	# 	gpsLat = pLat
	# 	gpsLon = pLon
	# messages[5] = gpsCount++
	# decreaseQueue()
	# increaseQueue p # meters
	# uppdatera pLat, pLon

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

	# frameRate 30

	navigator.geolocation.watchPosition locationUpdate, locationUpdateFail,
		enableHighAccuracy: true
		maximumAge: 30000
		timeout: 27000

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
		text pLat, width/2,100
		text pLon, width/2,200

		start = new Date()
		push()
		translate width/2, height/2
		scale SCALE
		image img, round(-cx),round(-cy)
		pop()
		textSize 20
		# messages.push round frameRate()
		# for i in range messages.length
		# 	if i < messages.length - 50 then continue
		text round(frameRate()), 200,200 #50,20 + 20*(i % 50)
		text gpsCounter,200,300

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

