// Generated by CoffeeScript 2.5.1
var bg, bsort, circle, compare, fc, fixColor, getParameters, merp, nilsson_version, print, range, rd, sc, sw;

nilsson_version = "1.5"; // getParameters with 0 parameters fixed 


// chai visar listinnehåll på ett bra sätt. 
// _.isEqual(a,b) fungerar också men det blir sämre listutskrifter
// assert = (a, b, msg='Assert failure') -> chai.assert.deepEqual a, b, msg
fixColor = function(args) {
  var a, b, g, n, r;
  n = args.length;
  a = 1;
  if (n === 1) {
    [r, g, b] = [args[0], args[0], args[0]];
  }
  if (n === 2) {
    [r, g, b, a] = [args[0], args[0], args[0], args[1]];
  }
  if (n === 3) {
    [r, g, b] = args;
  }
  if (n === 4) {
    [r, g, b, a] = args;
  }
  return color(255 * r, 255 * g, 255 * b, 255 * a);
};

fc = function() {
  if (arguments.length === 0) {
    return noFill();
  } else {
    return fill(fixColor(arguments));
  }
};

sc = function() {
  if (arguments.length === 0) {
    return noStroke();
  } else {
    return stroke(fixColor(arguments));
  }
};

bg = function() {
  return background(fixColor(arguments));
};

sw = function(n) {
  return strokeWeight(n);
};

circle = function(x, y, r) {
  return ellipse(x, y, 2 * r, 2 * r);
};

rd = function(degrees) {
  return rotate(radians(degrees));
};

print = console.log;

range = _.range; // from underscore.coffee

merp = function(y1, y2, i, x1 = 0, x2 = 1) {
  return map(i, x1, x2, y1, y2);
};

getParameters = function(h = window.location.href) {
  var arr, f, s;
  h = decodeURI(h);
  arr = h.split('?');
  if (arr.length !== 2) {
    return {};
  }
  s = arr[1];
  if (s === '') {
    return {};
  }
  return _.object((function() {
    var k, len, ref, results;
    ref = s.split('&');
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      f = ref[k];
      results.push(f.split('='));
    }
    return results;
  })());
};

// assert getParameters('http:\\christernilsson.github.io\Shortcut\www'), {}
// assert getParameters('http:\\christernilsson.github.io\Shortcut\www?'), {}
// assert getParameters('http:\\christernilsson.github.io\Shortcut\www?a=0&b=1'), {'a':'0', 'b':'1'}
compare = function(a, b) {
  var c, i, k, len, ref;
  if (typeof a === "object" && typeof b === "object") {
    ref = range(Math.min(a.length, b.length));
    for (k = 0, len = ref.length; k < len; k++) {
      i = ref[k];
      c = compare(a[i], b[i]);
      if (c !== 0) {
        return c;
      }
    }
  } else {
    return (a > b ? -1 : (a < b ? 1 : 0));
  }
  return 0;
};

// assert compare(12,13), 1
// assert compare(12,12), 0
// assert compare(13,12), -1
// assert compare([1,11],[1,2]), -1
// assert compare([1,11],[1,11]), 0
// assert compare([1,2],[1,11]), 1
// assert compare([1,'11'],[1,'2']), 1
// assert compare([1,'11'],[1,'11']), 0
// assert compare([1,'2'],[1,'11']), -1
bsort = function(list, cmp = compare) {
  var i, j, k, l, len, len1, ref, ref1;
  ref = range(list.length);
  for (k = 0, len = ref.length; k < len; k++) {
    i = ref[k];
    ref1 = range(list.length - 1);
    for (l = 0, len1 = ref1.length; l < len1; l++) {
      j = ref1[l];
      if (cmp(list[j], list[j + 1]) < 0) {
        [list[j], list[j + 1]] = [list[j + 1], list[j]];
      }
    }
  }
  return list;
};

// assert bsort([1,8,2],compare), [1,2,8]
// assert bsort([1,8,2],compare), [1,2,8]
// assert bsort([[1],[8],[2]],compare), [[1],[2],[8]]
// assert bsort([[2,1],[2,8],[2,2]],compare), [[2,1],[2,2],[2,8]]
// assert bsort([[1,8], [1,7], [1,9]],compare), [[1,7], [1,8], [1,9]]
// assert bsort([3,2,4,1], compare), [1,2,3,4]

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmlsc3Nvbi5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxuaWxzc29uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSxFQUFBLEVBQUEsS0FBQSxFQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsRUFBQSxFQUFBLFFBQUEsRUFBQSxhQUFBLEVBQUEsSUFBQSxFQUFBLGVBQUEsRUFBQSxLQUFBLEVBQUEsS0FBQSxFQUFBLEVBQUEsRUFBQSxFQUFBLEVBQUE7O0FBQUEsZUFBQSxHQUFrQixNQUFsQjs7Ozs7O0FBTUEsUUFBQSxHQUFXLFFBQUEsQ0FBQyxJQUFELENBQUE7QUFDWCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtFQUFDLENBQUEsR0FBSSxJQUFJLENBQUM7RUFDVCxDQUFBLEdBQUk7RUFDSixJQUF1QyxDQUFBLEtBQUssQ0FBNUM7SUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFBLEdBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVMsSUFBSSxDQUFDLENBQUQsQ0FBYixFQUFpQixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUFWOztFQUNBLElBQWlELENBQUEsS0FBSyxDQUF0RDtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFBLEdBQVksQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVMsSUFBSSxDQUFDLENBQUQsQ0FBYixFQUFpQixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUF5QixJQUFJLENBQUMsQ0FBRCxDQUE3QixFQUFaOztFQUNBLElBQWtCLENBQUEsS0FBSyxDQUF2QjtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQUEsR0FBVSxLQUFWOztFQUNBLElBQW9CLENBQUEsS0FBSyxDQUF6QjtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FB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QTtBQVBTLEVBcENWOzs7Ozs7Ozs7OztBQXNEQSxLQUFBLEdBQVEsUUFBQSxDQUFDLElBQUQsRUFBTSxNQUFJLE9BQVYsQ0FBQTtBQUNSLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUM7RUFBQSxLQUFBLHFDQUFBOztBQUNDO0lBQUEsS0FBQSx3Q0FBQTs7TUFDQyxJQUErQyxHQUFBLENBQUksSUFBSSxDQUFDLENBQUQsQ0FBUixFQUFhLElBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFqQixDQUFBLEdBQTBCLENBQXpFO1FBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVUsSUFBSSxDQUFDLENBQUEsR0FBRSxDQUFILENBQWQsQ0FBQSxHQUF1QixDQUFDLElBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFMLEVBQVksSUFBSSxDQUFDLENBQUQsQ0FBaEIsRUFBdkI7O0lBREQ7RUFERDtTQUdBO0FBSk87O0FBdERSIiwic291cmNlc0NvbnRlbnQiOlsibmlsc3Nvbl92ZXJzaW9uID0gXCIxLjVcIiAjIGdldFBhcmFtZXRlcnMgd2l0aCAwIHBhcmFtZXRlcnMgZml4ZWQgXG5cbiMgY2hhaSB2aXNhciBsaXN0aW5uZWjDpWxsIHDDpSBldHQgYnJhIHPDpHR0LiBcbiMgXy5pc0VxdWFsKGEsYikgZnVuZ2VyYXIgb2Nrc8OlIG1lbiBkZXQgYmxpciBzw6RtcmUgbGlzdHV0c2tyaWZ0ZXJcbiMgYXNzZXJ0ID0gKGEsIGIsIG1zZz0nQXNzZXJ0IGZhaWx1cmUnKSAtPiBjaGFpLmFzc2VydC5kZWVwRXF1YWwgYSwgYiwgbXNnXG5cbmZpeENvbG9yID0gKGFyZ3MpIC0+XG5cdG4gPSBhcmdzLmxlbmd0aFxuXHRhID0gMVxuXHRbcixnLGJdID0gW2FyZ3NbMF0sYXJnc1swXSxhcmdzWzBdXSBpZiBuID09IDFcblx0W3IsZyxiLGFdID0gW2FyZ3NbMF0sYXJnc1swXSxhcmdzWzBdLGFyZ3NbMV1dIGlmIG4gPT0gMiBcblx0W3IsZyxiXSA9IGFyZ3MgaWYgbiA9PSAzXG5cdFtyLGcsYixhXSA9IGFyZ3MgaWYgbiA9PSA0XG5cdHJldHVybiBjb2xvciAyNTUgKiByLCAyNTUgKiBnLCAyNTUgKiBiLCAyNTUgKiBhXG5cbmZjID0gLT4gaWYgYXJndW1lbnRzLmxlbmd0aCA9PSAwIHRoZW4gbm9GaWxsKCkgZWxzZSBmaWxsIGZpeENvbG9yIGFyZ3VtZW50c1xuc2MgPSAtPiBpZiBhcmd1bWVudHMubGVuZ3RoID09IDAgdGhlbiBub1N0cm9rZSgpIGVsc2Ugc3Ryb2tlIGZpeENvbG9yIGFyZ3VtZW50c1xuYmcgPSAtPiBiYWNrZ3JvdW5kIGZpeENvbG9yIGFyZ3VtZW50c1xuc3cgPSAobikgLT4gc3Ryb2tlV2VpZ2h0IG5cbmNpcmNsZSA9ICh4LHkscikgLT4gZWxsaXBzZSB4LHksMipyLDIqclxucmQgPSAoZGVncmVlcykgLT4gcm90YXRlIHJhZGlhbnMgZGVncmVlc1xucHJpbnQgPSBjb25zb2xlLmxvZ1xucmFuZ2UgPSBfLnJhbmdlICMgZnJvbSB1bmRlcnNjb3JlLmNvZmZlZVxubWVycCA9ICh5MSx5MixpLHgxPTAseDI9MSkgLT4gbWFwIGkseDEseDIseTEseTJcblxuZ2V0UGFyYW1ldGVycyA9IChoID0gd2luZG93LmxvY2F0aW9uLmhyZWYpIC0+IFxuXHRoID0gZGVjb2RlVVJJIGhcblx0YXJyID0gaC5zcGxpdCgnPycpXG5cdGlmIGFyci5sZW5ndGggIT0gMiB0aGVuIHJldHVybiB7fVxuXHRzID0gYXJyWzFdXG5cdGlmIHM9PScnIHRoZW4gcmV0dXJuIHt9XG5cdF8ub2JqZWN0KGYuc3BsaXQgJz0nIGZvciBmIGluIHMuc3BsaXQoJyYnKSlcbiMgYXNzZXJ0IGdldFBhcmFtZXRlcnMoJ2h0dHA6XFxcXGNocmlzdGVybmlsc3Nvbi5naXRodWIuaW9cXFNob3J0Y3V0XFx3d3cnKSwge31cbiMgYXNzZXJ0IGdldFBhcmFtZXRlcnMoJ2h0dHA6XFxcXGNocmlzdGVybmlsc3Nvbi5naXRodWIuaW9cXFNob3J0Y3V0XFx3d3c/JyksIHt9XG4jIGFzc2VydCBnZXRQYXJhbWV0ZXJzKCdodHRwOlxcXFxjaHJpc3Rlcm5pbHNzb24uZ2l0aHViLmlvXFxTaG9ydGN1dFxcd3d3P2E9MCZiPTEnKSwgeydhJzonMCcsICdiJzonMSd9XG5cbmNvbXBhcmUgPSAoYSxiKSAtPlxuXHRpZiB0eXBlb2YgYSA9PSBcIm9iamVjdFwiIGFuZCB0eXBlb2YgYiA9PSBcIm9iamVjdFwiXG5cdFx0Zm9yIGkgaW4gcmFuZ2UgTWF0aC5taW4gYS5sZW5ndGgsYi5sZW5ndGhcblx0XHRcdGMgPSBjb21wYXJlIGFbaV0sYltpXVxuXHRcdFx0aWYgYyAhPSAwIHRoZW4gcmV0dXJuIGNcblx0ZWxzZVxuXHRcdHJldHVybiAoaWYgYSA+IGIgdGhlbiAtMSBlbHNlIChpZiBhIDwgYiB0aGVuIDEgZWxzZSAwKSlcblx0MFxuIyBhc3NlcnQgY29tcGFyZSgxMiwxMyksIDFcbiMgYXNzZXJ0IGNvbXBhcmUoMTIsMTIpLCAwXG4jIGFzc2VydCBjb21wYXJlKDEzLDEyKSwgLTFcbiMgYXNzZXJ0IGNvbXBhcmUoWzEsMTFdLFsxLDJdKSwgLTFcbiMgYXNzZXJ0IGNvbXBhcmUoWzEsMTFdLFsxLDExXSksIDBcbiMgYXNzZXJ0IGNvbXBhcmUoWzEsMl0sWzEsMTFdKSwgMVxuIyBhc3NlcnQgY29tcGFyZShbMSwnMTEnXSxbMSwnMiddKSwgMVxuIyBhc3NlcnQgY29tcGFyZShbMSwnMTEnXSxbMSwnMTEnXSksIDBcbiMgYXNzZXJ0IGNvbXBhcmUoWzEsJzInXSxbMSwnMTEnXSksIC0xXG5cbmJzb3J0ID0gKGxpc3QsY21wPWNvbXBhcmUpIC0+XG5cdGZvciBpIGluIHJhbmdlIGxpc3QubGVuZ3RoXG5cdFx0Zm9yIGogaW4gcmFuZ2UgbGlzdC5sZW5ndGgtMVxuXHRcdFx0W2xpc3Rbal0sIGxpc3RbaisxXV0gPSBbbGlzdFtqKzFdLCBsaXN0W2pdXSBpZiBjbXAobGlzdFtqXSwgbGlzdFtqKzFdKSA8IDBcblx0bGlzdFxuIyBhc3NlcnQgYnNvcnQoWzEsOCwyXSxjb21wYXJlKSwgWzEsMiw4XVxuIyBhc3NlcnQgYnNvcnQoWzEsOCwyXSxjb21wYXJlKSwgWzEsMiw4XVxuIyBhc3NlcnQgYnNvcnQoW1sxXSxbOF0sWzJdXSxjb21wYXJlKSwgW1sxXSxbMl0sWzhdXVxuIyBhc3NlcnQgYnNvcnQoW1syLDFdLFsyLDhdLFsyLDJdXSxjb21wYXJlKSwgW1syLDFdLFsyLDJdLFsyLDhdXVxuIyBhc3NlcnQgYnNvcnQoW1sxLDhdLCBbMSw3XSwgWzEsOV1dLGNvbXBhcmUpLCBbWzEsN10sIFsxLDhdLCBbMSw5XV1cbiMgYXNzZXJ0IGJzb3J0KFszLDIsNCwxXSwgY29tcGFyZSksIFsxLDIsMyw0XVxuIl19
//# sourceURL=c:\github\gpsKarta-test\coffee\nilsson.coffee