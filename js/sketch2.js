// Generated by CoffeeScript 2.5.1
var BEARINGLIST, DISTLIST, SCALE, VERSION, cx, cy, data, draw, gpsCounter, img, index, initSounds, locationId, locationUpdate, locationUpdateFail, mapName, message, names, pLat, pLon, preload, released, setup, speaker, start, startX, startY, state, timer, touchEnded, touchMoved, touchStarted, voice;

VERSION = 105;

BEARINGLIST = '01 02 03 04 05 06 07 08 09 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 26 27 28 29 30 31 32 33 34 35 36';

DISTLIST = '2 4 6 8 10 12 14 16 18 20 30 40 50 60 70 80 90 100 120 140 160 180 200 300 400 500 600 700 800 900 1000 1200 1400 1600 1800 2000 3000 4000 5000 6000 7000 8000 9000 10000';

released = true;

mapName = ""; // t ex skarpnäck

start = new Date();

state = 0; // 0=uninitialized 1=normal 2=info

data = null;

img = null;

startX = 0;

startY = 0;

message = "";

index = 0;

voice = null;

speaker = null;

timer = null;

[cx, cy] = [
  0,
  0 // center (image coordinates)
];

SCALE = 1;

pLat = 0;

pLon = 0;

gpsCounter = 0;

locationId = 0;

locationUpdateFail = function(error) {
  if (error.code === error.PERMISSION_DENIED) {
    return message = 'Check location permissions';
  }
};

locationUpdate = function(p) {
  pLat = p.coords.latitude.toFixed(6);
  pLon = p.coords.longitude.toFixed(6);
  return gpsCounter++;
};

initSounds = function() {
  var bearing, bearingSounds, distance, distanceSounds, i, j, len, len1, ref, ref1, sound, soundDown, soundUp;
  bearingSounds = {};
  ref = BEARINGLIST.split(' ');
  for (i = 0, len = ref.length; i < len; i++) {
    bearing = ref[i];
    sound = loadSound(`sounds/bearing/male/${bearing}.mp3`);
    if (sound) {
      console.log(`sounds/bearing/male/${bearing}.mp3`);
    }
    sound.setVolume(0.1);
    bearingSounds[bearing] = sound;
  }
  distanceSounds = {};
  ref1 = DISTLIST.split(' ');
  for (j = 0, len1 = ref1.length; j < len1; j++) {
    distance = ref1[j];
    sound = loadSound(`sounds/distance/female/${distance}.mp3`);
    if (sound) {
      console.log(`sounds/distance/female/${distance}.mp3`);
    }
    sound.setVolume(0.1);
    distanceSounds[distance] = sound;
  }
  soundUp = loadSound('sounds/soundUp.wav');
  soundDown = loadSound('sounds/soundDown.wav');
  soundUp.setVolume(0.1);
  return soundDown.setVolume(0.1);
};

preload = function() {
  initSounds();
  mapName = "2023-SommarS";
  return loadJSON(`data/${mapName}.json`, function(json) {
    var control, key, ref;
    data = json;
    ref = data.controls;
    for (key in ref) {
      control = ref[key];
      control.push("");
      control.push(0);
      control.push(0);
    }
    return img = loadImage("data/" + data.map);
  });
};

window.onload = function() {
  if (navigator.geolocation) {
    if (locationId !== 0) {
      navigator.geolocation.clearWatch(locationId);
    }
    locationId = navigator.geolocation.watchPosition(locationUpdate, locationUpdateFail, {
      enableHighAccuracy: true,
      maximumAge: 30000,
      timeout: 27000
    });
    return message = locationId;
  } else {
    return message = 'No location support';
  }
};

setup = function() {
  var canvas;
  rectMode(CENTER);
  console.log("setup");
  canvas = createCanvas(innerWidth - 0.0, innerHeight); //-0.5
  return canvas.position(0, 0); // hides text field used for clipboard copy.
};

// frameRate 30
draw = function() {
  var x, y;
  background(0, 255, 0);
  if (state === 0) {
    textSize(100);
    textAlign(CENTER, CENTER);
    x = width / 2;
    y = height / 2;
    text(mapName, x, y - 100);
    text('Version: ' + VERSION, x, y - 0);
    text("Click to continue!", x, y + 100);
    return;
  }
  if (state === 1) {
    textSize(40);
    text(pLat, width / 2, 100);
    text(pLon, width / 2, 200);
    start = new Date();
    push();
    translate(width / 2, height / 2);
    scale(SCALE);
    image(img, round(-cx), round(-cy));
    pop();
    // messages.push round frameRate()
    // for i in range messages.length
    // 	if i < messages.length - 50 then continue
    text(round(frameRate()), 200, 100); //50,20 + 20*(i % 50)
    text(gpsCounter, 200, 200);
    return text(message, 300, 200);
  }
};

touchStarted = function(event) {
  event.preventDefault();
  if (!released) {
    return;
  }
  //speed = 1
  released = false;
  startX = mouseX;
  startY = mouseY;
  return false;
};

touchMoved = function(event) {
  event.preventDefault();
  if (state === 1) {
    cx += (startX - mouseX) / SCALE;
    cy += (startY - mouseY) / SCALE;
    startX = mouseX;
    startY = mouseY;
  }
  return false;
};

touchEnded = function(event) {
  //if state==0 then initSounds()
  event.preventDefault();
  //say index
  //index++
  if (released) {
    return;
  }
  //initSounds() 
  released = true;
  if (state === 0 || state === 2) {
    state = 1;
    return false;
  }
  return false;
};

names = (v, s) => {
  var i, len, name, ref;
  ref = s.split(' ');
  for (i = 0, len = ref.length; i < len; i++) {
    name = ref[i];
    if (-1 !== v.name.indexOf(name)) {
      return true;
    }
  }
  return false;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2tldGNoMi5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxza2V0Y2gyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSxXQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxJQUFBLEVBQUEsSUFBQSxFQUFBLFVBQUEsRUFBQSxHQUFBLEVBQUEsS0FBQSxFQUFBLFVBQUEsRUFBQSxVQUFBLEVBQUEsY0FBQSxFQUFBLGtCQUFBLEVBQUEsT0FBQSxFQUFBLE9BQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxFQUFBLElBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxFQUFBLEtBQUEsRUFBQSxPQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsVUFBQSxFQUFBLFlBQUEsRUFBQTs7QUFBQSxPQUFBLEdBQVU7O0FBRVYsV0FBQSxHQUFhOztBQUNiLFFBQUEsR0FBVzs7QUFFWCxRQUFBLEdBQVc7O0FBQ1gsT0FBQSxHQUFVLEdBTlY7O0FBUUEsS0FBQSxHQUFRLElBQUksSUFBSixDQUFBOztBQUVSLEtBQUEsR0FBUSxFQVZSOztBQVlBLElBQUEsR0FBTzs7QUFFUCxHQUFBLEdBQU07O0FBRU4sTUFBQSxHQUFTOztBQUNULE1BQUEsR0FBUzs7QUFFVCxPQUFBLEdBQVU7O0FBQ1YsS0FBQSxHQUFROztBQUVSLEtBQUEsR0FBUTs7QUFFUixPQUFBLEdBQVU7O0FBQ1YsS0FBQSxHQUFROztBQUVSLENBQUMsRUFBRCxFQUFJLEVBQUosQ0FBQSxHQUFVO0VBQUMsQ0FBRDtFQUFHLENBQUg7OztBQUNWLEtBQUEsR0FBUTs7QUFFUixJQUFBLEdBQU87O0FBQ1AsSUFBQSxHQUFPOztBQUVQLFVBQUEsR0FBYTs7QUFDYixVQUFBLEdBQVk7O0FBRVosa0JBQUEsR0FBcUIsUUFBQSxDQUFDLEtBQUQsQ0FBQTtF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QUEsR0FBQSxFQUFBLElBQUEsRUFBQTtBQUFDO0VBQUEsS0FBQSxxQ0FBQTs7SUFDQyxJQUFHLENBQUMsQ0FBRCxLQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBUCxDQUFlLElBQWYsQ0FBVDtBQUFrQyxhQUFPLEtBQXpDOztFQUREO1NBRUE7QUFITyIsInNvdXJjZXNDb250ZW50IjpbIlZFUlNJT04gPSAxMDVcclxuXHJcbkJFQVJJTkdMSVNUID0nMDEgMDIgMDMgMDQgMDUgMDYgMDcgMDggMDkgMTAgMTEgMTIgMTMgMTQgMTUgMTYgMTcgMTggMTkgMjAgMjEgMjIgMjMgMjQgMjUgMjYgMjcgMjggMjkgMzAgMzEgMzIgMzMgMzQgMzUgMzYnXHJcbkRJU1RMSVNUID0gJzIgNCA2IDggMTAgMTIgMTQgMTYgMTggMjAgMzAgNDAgNTAgNjAgNzAgODAgOTAgMTAwIDEyMCAxNDAgMTYwIDE4MCAyMDAgMzAwIDQwMCA1MDAgNjAwIDcwMCA4MDAgOTAwIDEwMDAgMTIwMCAxNDAwIDE2MDAgMTgwMCAyMDAwIDMwMDAgNDAwMCA1MDAwIDYwMDAgNzAwMCA4MDAwIDkwMDAgMTAwMDAnXHJcblxyXG5yZWxlYXNlZCA9IHRydWVcclxubWFwTmFtZSA9IFwiXCIgIyB0IGV4IHNrYXJwbsOkY2tcclxuXHJcbnN0YXJ0ID0gbmV3IERhdGUoKVxyXG5cclxuc3RhdGUgPSAwICMgMD11bmluaXRpYWxpemVkIDE9bm9ybWFsIDI9aW5mb1xyXG5cclxuZGF0YSA9IG51bGxcclxuXHJcbmltZyA9IG51bGxcclxuXHJcbnN0YXJ0WCA9IDBcclxuc3RhcnRZID0gMFxyXG5cclxubWVzc2FnZSA9IFwiXCJcclxuaW5kZXggPSAwXHJcblxyXG52b2ljZSA9IG51bGxcclxuXHJcbnNwZWFrZXIgPSBudWxsXHJcbnRpbWVyID0gbnVsbFxyXG5cclxuW2N4LGN5XSA9IFswLDBdICMgY2VudGVyIChpbWFnZSBjb29yZGluYXRlcylcclxuU0NBTEUgPSAxXHJcblxyXG5wTGF0ID0gMFxyXG5wTG9uID0gMFxyXG5cclxuZ3BzQ291bnRlciA9IDBcclxubG9jYXRpb25JZD0gMFxyXG5cclxubG9jYXRpb25VcGRhdGVGYWlsID0gKGVycm9yKSAtPlx0aWYgZXJyb3IuY29kZSA9PSBlcnJvci5QRVJNSVNTSU9OX0RFTklFRCB0aGVuIG1lc3NhZ2UgPSAnQ2hlY2sgbG9jYXRpb24gcGVybWlzc2lvbnMnXHJcblxyXG5sb2NhdGlvblVwZGF0ZSA9IChwKSAtPlxyXG5cdHBMYXQgPSBwLmNvb3Jkcy5sYXRpdHVkZS50b0ZpeGVkIDZcclxuXHRwTG9uID0gcC5jb29yZHMubG9uZ2l0dWRlLnRvRml4ZWQgNlxyXG5cdGdwc0NvdW50ZXIrK1xyXG5cclxuaW5pdFNvdW5kcyA9IC0+XHJcblxyXG5cdGJlYXJpbmdTb3VuZHMgPSB7fVxyXG5cdGZvciBiZWFyaW5nIGluIEJFQVJJTkdMSVNULnNwbGl0ICcgJ1xyXG5cdFx0c291bmQgPSBsb2FkU291bmQgXCJzb3VuZHMvYmVhcmluZy9tYWxlLyN7YmVhcmluZ30ubXAzXCJcclxuXHRcdGlmIHNvdW5kXHJcblx0XHRcdGNvbnNvbGUubG9nIFwic291bmRzL2JlYXJpbmcvbWFsZS8je2JlYXJpbmd9Lm1wM1wiXHJcblx0XHRzb3VuZC5zZXRWb2x1bWUgMC4xXHJcblx0XHRiZWFyaW5nU291bmRzW2JlYXJpbmddID0gc291bmRcclxuXHJcblx0ZGlzdGFuY2VTb3VuZHMgPSB7fVxyXG5cdGZvciBkaXN0YW5jZSBpbiBESVNUTElTVC5zcGxpdCAnICdcclxuXHRcdHNvdW5kID0gbG9hZFNvdW5kIFwic291bmRzL2Rpc3RhbmNlL2ZlbWFsZS8je2Rpc3RhbmNlfS5tcDNcIlxyXG5cdFx0aWYgc291bmRcclxuXHRcdFx0Y29uc29sZS5sb2cgXCJzb3VuZHMvZGlzdGFuY2UvZmVtYWxlLyN7ZGlzdGFuY2V9Lm1wM1wiXHJcblx0XHRzb3VuZC5zZXRWb2x1bWUgMC4xXHJcblx0XHRkaXN0YW5jZVNvdW5kc1tkaXN0YW5jZV0gPSBzb3VuZFxyXG5cclxuXHRzb3VuZFVwID0gbG9hZFNvdW5kICdzb3VuZHMvc291bmRVcC53YXYnXHJcblx0c291bmREb3duID0gbG9hZFNvdW5kICdzb3VuZHMvc291bmREb3duLndhdidcclxuXHRzb3VuZFVwLnNldFZvbHVtZSAwLjFcclxuXHRzb3VuZERvd24uc2V0Vm9sdW1lIDAuMVxyXG5cclxuXHJcbnByZWxvYWQgPSAtPlxyXG5cdGluaXRTb3VuZHMoKVxyXG5cdG1hcE5hbWUgPSBcIjIwMjMtU29tbWFyU1wiXHJcblx0bG9hZEpTT04gXCJkYXRhLyN7bWFwTmFtZX0uanNvblwiLCAoanNvbikgLT5cclxuXHRcdGRhdGEgPSBqc29uXHJcblx0XHRmb3Iga2V5LGNvbnRyb2wgb2YgZGF0YS5jb250cm9sc1xyXG5cdFx0XHRjb250cm9sLnB1c2ggXCJcIlxyXG5cdFx0XHRjb250cm9sLnB1c2ggMFxyXG5cdFx0XHRjb250cm9sLnB1c2ggMFxyXG5cdFx0aW1nID0gbG9hZEltYWdlIFwiZGF0YS9cIiArIGRhdGEubWFwXHJcblxyXG53aW5kb3cub25sb2FkID0gLT5cclxuXHRpZiBuYXZpZ2F0b3IuZ2VvbG9jYXRpb25cclxuXHRcdGlmIGxvY2F0aW9uSWQgIT0gMFxyXG5cdFx0XHRuYXZpZ2F0b3IuZ2VvbG9jYXRpb24uY2xlYXJXYXRjaCBsb2NhdGlvbklkXHJcblxyXG5cdFx0bG9jYXRpb25JZCA9IG5hdmlnYXRvci5nZW9sb2NhdGlvbi53YXRjaFBvc2l0aW9uIGxvY2F0aW9uVXBkYXRlLCBsb2NhdGlvblVwZGF0ZUZhaWwsXHJcblx0XHRcdGVuYWJsZUhpZ2hBY2N1cmFjeTogdHJ1ZVxyXG5cdFx0XHRtYXhpbXVtQWdlOiAzMDAwMFxyXG5cdFx0XHR0aW1lb3V0OiAyNzAwMFxyXG5cdFx0bWVzc2FnZSA9IGxvY2F0aW9uSWRcclxuXHRlbHNlIFxyXG5cdFx0bWVzc2FnZSA9ICdObyBsb2NhdGlvbiBzdXBwb3J0J1xyXG5cclxuc2V0dXAgPSAtPlxyXG5cdHJlY3RNb2RlIENFTlRFUlxyXG5cdGNvbnNvbGUubG9nIFwic2V0dXBcIlxyXG5cdGNhbnZhcyA9IGNyZWF0ZUNhbnZhcyBpbm5lcldpZHRoLTAuMCwgaW5uZXJIZWlnaHQgIy0wLjVcclxuXHRjYW52YXMucG9zaXRpb24gMCwwICMgaGlkZXMgdGV4dCBmaWVsZCB1c2VkIGZvciBjbGlwYm9hcmQgY29weS5cclxuXHQjIGZyYW1lUmF0ZSAzMFxyXG5cclxuZHJhdyA9IC0+XHJcblxyXG5cdGJhY2tncm91bmQgMCwyNTUsMFxyXG5cdGlmIHN0YXRlID09IDAgXHJcblx0XHR0ZXh0U2l6ZSAxMDBcclxuXHRcdHRleHRBbGlnbiBDRU5URVIsQ0VOVEVSXHJcblx0XHR4ID0gd2lkdGgvMlxyXG5cdFx0eSA9IGhlaWdodC8yIFxyXG5cdFx0dGV4dCBtYXBOYW1lLCB4LHktMTAwXHJcblx0XHR0ZXh0ICdWZXJzaW9uOiAnK1ZFUlNJT04sIHgseS0wXHJcblx0XHR0ZXh0IFwiQ2xpY2sgdG8gY29udGludWUhXCIsIHgseSsxMDBcclxuXHRcdHJldHVyblxyXG5cclxuXHRpZiBzdGF0ZSA9PSAxXHJcblx0XHR0ZXh0U2l6ZSA0MFxyXG5cdFx0dGV4dCBwTGF0LCB3aWR0aC8yLDEwMFxyXG5cdFx0dGV4dCBwTG9uLCB3aWR0aC8yLDIwMFxyXG5cclxuXHRcdHN0YXJ0ID0gbmV3IERhdGUoKVxyXG5cdFx0cHVzaCgpXHJcblx0XHR0cmFuc2xhdGUgd2lkdGgvMiwgaGVpZ2h0LzJcclxuXHRcdHNjYWxlIFNDQUxFXHJcblx0XHRpbWFnZSBpbWcsIHJvdW5kKC1jeCkscm91bmQoLWN5KVxyXG5cdFx0cG9wKClcclxuXHRcdCMgbWVzc2FnZXMucHVzaCByb3VuZCBmcmFtZVJhdGUoKVxyXG5cdFx0IyBmb3IgaSBpbiByYW5nZSBtZXNzYWdlcy5sZW5ndGhcclxuXHRcdCMgXHRpZiBpIDwgbWVzc2FnZXMubGVuZ3RoIC0gNTAgdGhlbiBjb250aW51ZVxyXG5cdFx0dGV4dCByb3VuZChmcmFtZVJhdGUoKSksIDIwMCwxMDAgIzUwLDIwICsgMjAqKGkgJSA1MClcclxuXHRcdHRleHQgZ3BzQ291bnRlciwyMDAsMjAwXHJcblx0XHR0ZXh0IG1lc3NhZ2UsMzAwLDIwMFxyXG5cclxudG91Y2hTdGFydGVkID0gKGV2ZW50KSAtPlxyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHRpZiBub3QgcmVsZWFzZWQgdGhlbiByZXR1cm5cclxuXHQjc3BlZWQgPSAxXHJcblx0cmVsZWFzZWQgPSBmYWxzZVxyXG5cdHN0YXJ0WCA9IG1vdXNlWFxyXG5cdHN0YXJ0WSA9IG1vdXNlWVxyXG5cdGZhbHNlXHJcblxyXG50b3VjaE1vdmVkID0gKGV2ZW50KSAtPlxyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHRpZiBzdGF0ZSA9PSAxXHJcblx0XHRjeCArPSAoc3RhcnRYIC0gbW91c2VYKS9TQ0FMRVxyXG5cdFx0Y3kgKz0gKHN0YXJ0WSAtIG1vdXNlWSkvU0NBTEVcclxuXHRcdHN0YXJ0WCA9IG1vdXNlWFxyXG5cdFx0c3RhcnRZID0gbW91c2VZXHJcblx0ZmFsc2VcclxuXHJcbnRvdWNoRW5kZWQgPSAoZXZlbnQpIC0+XHJcblx0I2lmIHN0YXRlPT0wIHRoZW4gaW5pdFNvdW5kcygpXHJcblxyXG5cdGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuXHQjc2F5IGluZGV4XHJcblx0I2luZGV4KytcclxuXHRpZiByZWxlYXNlZCB0aGVuIHJldHVyblxyXG5cclxuXHQjaW5pdFNvdW5kcygpIFxyXG5cclxuXHRyZWxlYXNlZCA9IHRydWVcclxuXHRpZiBzdGF0ZSBpbiBbMCwyXVxyXG5cdFx0c3RhdGUgPSAxXHJcblx0XHRyZXR1cm4gZmFsc2VcclxuXHRmYWxzZVxyXG5cclxubmFtZXMgPSAodixzKSA9PlxyXG5cdGZvciBuYW1lIGluIHMuc3BsaXQgJyAnXHJcblx0XHRpZiAtMSAhPSB2Lm5hbWUuaW5kZXhPZiBuYW1lIHRoZW4gcmV0dXJuIHRydWVcclxuXHRmYWxzZVxyXG5cclxuIl19
//# sourceURL=c:\github\gpsKarta-test\coffee\sketch2.coffee