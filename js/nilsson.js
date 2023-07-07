// Generated by CoffeeScript 2.5.1
var assert, bg, bsort, circle, compare, fc, fixColor, getParameters, merp, nilsson_version, print, range, rd, sc, sw;

nilsson_version = "1.5"; // getParameters with 0 parameters fixed 


// chai visar listinnehåll på ett bra sätt. 
// _.isEqual(a,b) fungerar också men det blir sämre listutskrifter
assert = function(a, b, msg = 'Assert failure') {
  return chai.assert.deepEqual(a, b, msg);
};

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

assert(getParameters('http:\\christernilsson.github.io\Shortcut\www'), {});

assert(getParameters('http:\\christernilsson.github.io\Shortcut\www?'), {});

assert(getParameters('http:\\christernilsson.github.io\Shortcut\www?a=0&b=1'), {
  'a': '0',
  'b': '1'
});

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

assert(compare(12, 13), 1);

assert(compare(12, 12), 0);

assert(compare(13, 12), -1);

assert(compare([1, 11], [1, 2]), -1);

assert(compare([1, 11], [1, 11]), 0);

assert(compare([1, 2], [1, 11]), 1);

assert(compare([1, '11'], [1, '2']), 1);

assert(compare([1, '11'], [1, '11']), 0);

assert(compare([1, '2'], [1, '11']), -1);

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

assert(bsort([1, 8, 2], compare), [1, 2, 8]);

assert(bsort([1, 8, 2], compare), [1, 2, 8]);

assert(bsort([[1], [8], [2]], compare), [[1], [2], [8]]);

assert(bsort([[2, 1], [2, 8], [2, 2]], compare), [[2, 1], [2, 2], [2, 8]]);

assert(bsort([[1, 8], [1, 7], [1, 9]], compare), [[1, 7], [1, 8], [1, 9]]);

assert(bsort([3, 2, 4, 1], compare), [1, 2, 3, 4]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmlsc3Nvbi5qcyIsInNvdXJjZVJvb3QiOiIuLiIsInNvdXJjZXMiOlsiY29mZmVlXFxuaWxzc29uLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBQSxNQUFBLEVBQUEsRUFBQSxFQUFBLEtBQUEsRUFBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLEVBQUEsRUFBQSxRQUFBLEVBQUEsYUFBQSxFQUFBLElBQUEsRUFBQSxlQUFBLEVBQUEsS0FBQSxFQUFBLEtBQUEsRUFBQSxFQUFBLEVBQUEsRUFBQSxFQUFBOztBQUFBLGVBQUEsR0FBa0IsTUFBbEI7Ozs7O0FBSUEsTUFBQSxHQUFTLFFBQUEsQ0FBQyxDQUFELEVBQUksQ0FBSixFQUFPLE1BQUksZ0JBQVgsQ0FBQTtTQUFnQyxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVosQ0FBc0IsQ0FBdEIsRUFBeUIsQ0FBekIsRUFBNEIsR0FBNUI7QUFBaEM7O0FBRVQsUUFBQSxHQUFXLFFBQUEsQ0FBQyxJQUFELENBQUE7QUFDWCxNQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQTtFQUFDLENBQUEsR0FBSSxJQUFJLENBQUM7RUFDVCxDQUFBLEdBQUk7RUFDSixJQUF1QyxDQUFBLEtBQUssQ0FBNUM7SUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFBLEdBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVMsSUFBSSxDQUFDLENBQUQsQ0FBYixFQUFpQixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUFWOztFQUNBLElBQWlELENBQUEsS0FBSyxDQUF0RDtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFBLEdBQVksQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVMsSUFBSSxDQUFDLENBQUQsQ0FBYixFQUFpQixJQUFJLENBQUMsQ0FBRCxDQUFyQixFQUF5QixJQUFJLENBQUMsQ0FBRCxDQUE3QixFQUFaOztFQUNBLElBQWtCLENBQUEsS0FBSyxDQUF2QjtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQUEsR0FBVSxLQUFWOztFQUNBLElBQW9CLENBQUEsS0FBSyxDQUF6QjtJQUFBLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFBLEdBQVksS0FBWjs7QUFDQSxTQUFPLEtBQUEsQ0FBTSxHQUFBLEdBQU0sQ0FBWixFQUFlLEdBQUEsR0FBTSxDQUFyQixFQUF3QixHQUFBLEdBQU0sQ0FBOUIsRUFBaUMsR0FBQSxHQUFNLENBQXZDO0FBUEc7O0FBU1gsRUFBQSxHQUFLLFFBQUEsQ0FBQSxDQUFBO0VBQUcsSUFBRyxTQUFTLENBQUMsTUFBVixLQUFvQixDQUF2QjtXQUE4QixNQUFBLENBQUEsRUFBOUI7R0FBQSxNQUFBO1dBQTRDLElBQUEsQ0FBSyxRQUFBLENBQVMsU0FBVCxDQUFMLEVBQTVDOztBQUFIOztBQUNMLEVBQUEsR0FBSyxRQUFBLENBQUEsQ0FBQTtFQUFHLElBQUcsU0FBUyxDQUFDLE1BQVYsS0FBb0IsQ0FBdkI7V0FBOEIsUUFBQSxDQUFBLEVBQTlCO0dBQUEsTUFBQTtXQUE4QyxNQUFBLENBQU8sUUFBQSxDQUFTLFNBQVQsQ0FBUCxFQUE5Qzs7QUFBSDs7QUFDTCxFQUFBLEdBQUssUUFBQSxDQUFBLENBQUE7U0FBRyxVQUFBLENBQVcsUUFBQSxDQUFTLFNBQVQsQ0FBWDtBQUFIOztBQUNMLEVBQUEsR0FBSyxRQUFBLENBQUMsQ0FBRCxDQUFBO1NBQU8sWUFBQSxDQUFhLENBQWI7QUFBUDs7QUFDTCxNQUFBLEdBQVMsUUFBQSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFBO1NBQVcsT0FBQSxDQUFRLENBQVIsRUFBVSxDQUFWLEVBQVksQ0FBQSxHQUFFLENBQWQsRUFBZ0IsQ0FBQSxHQUFFLENBQWxCO0FBQVg7O0FBQ1QsRUFBQSxHQUFLLFFBQUEsQ0FBQyxPQUFELENBQUE7U0FBYSxNQUFBLENBQU8sT0FBQSxDQUFRLE9BQVIsQ0FBUDtBQUFiOztBQUNMLEtBQUEsR0FBUSxPQUFPLENBQUM7O0FBQ2hCLEtBQUEsR0FBUSxDQUFDLENBQUMsTUF0QlY7O0FBdUJBLElBQUEsR0FBTyxRQUFBLENBQUMsRUFBRCxFQUFJLEVBQUosRUFBTyxDQUFQLEVBQVMsS0FBRyxDQUFaLEVBQWMsS0FBRyxDQUFqQixDQUFBO1NBQXVCLEdBQUEsQ0FBSSxDQUFKLEVBQU0sRUFBTixFQUFTLEVBQVQsRUFBWSxFQUFaLEVBQWUsRUFBZjtBQUF2Qjs7QUFFUCxhQUFBLEdBQWdCLFFBQUEsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBckIsQ0FBQTtBQUNoQixNQUFBLEdBQUEsRUFBQSxDQUFBLEVBQUE7RUFBQyxDQUFBLEdBQUksU0FBQSxDQUFVLENBQVY7RUFDSixHQUFBLEdBQU0sQ0FBQyxDQUFDLEtBQUYsQ0FBUSxHQUFSO0VBQ04sSUFBRyxHQUFHLENBQUMsTUFBSixLQUFjLENBQWpCO0FBQXdCLFdBQU8sQ0FBQSxFQUEvQjs7RUFDQSxDQUFBLEdBQUksR0FBRyxDQUFDLENBQUQ7RUFDUCxJQUFHLENBQUEsS0FBRyxFQUFOO0FBQWMsV0FBTyxDQUFBLEVBQXJCOztTQUNBLENBQUMsQ0FBQyxNQUFGOztBQUFTO0FBQUE7SUFBQSxLQUFBLHFDQUFBOzttQkFBQSxDQUFDLENBQUMsS0FBRixDQUFRLEdBQVI7SUFBQSxDQUFBOztNQUFUO0FBTmU7O0FBT2hCLE1BQUEsQ0FBTyxhQUFBLENBQWMsK0NBQWQsQ0FBUCxFQUF1RSxDQUFBLENBQXZFOztBQUNBLE1BQUEsQ0FBTyxhQUFBLENBQWMsZ0RBQWQsQ0FBUCxFQUF3RSxDQUFBLENBQXhFOztBQUNBLE1BQUEsQ0FBTyxhQUFBLENBQWMsdURBQWQsQ0FBUCxFQUErRTtFQUFDLEdBQUEsRUFBSSxHQUFMO0VBQVUsR0FBQSxFQUFJO0FBQWQsQ0FBL0U7O0FBRUEsT0FBQSxHQUFVLFFBQUEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFBO0FBQ1YsTUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxHQUFBLEVBQUE7RUFBQyxJQUFHLE9BQU8sQ0FBUCxLQUFZLFFBQVosSUFBeUIsT0FBTyxDQUFQLEtBQVksUUFBeEM7QUFDQztJQUFBLEtBQUEscUNBQUE7O01BQ0MsQ0FBQSxHQUFJLE9BQUEsQ0FBUSxDQUFDLENBQUMsQ0FBRCxDQUFULEVBQWEsQ0FBQyxDQUFDLENBQUQsQ0FBZDtNQUNKLElBQUcsQ0FBQSxLQUFLLENBQVI7QUFBZSxlQUFPLEVBQXRCOztJQUZELENBREQ7R0FBQSxNQUFBO0FBS0MsV0FBTyxDQUFJLENBQUEsR0FBSSxDQUFQLEdBQWMsQ0FBQyxDQUFmLEdBQXNCLENBQUksQ0FBQSxHQUFJLENBQVAsR0FBYyxDQUFkLEdBQXFCLENBQXRCLENBQXZCLEVBTFI7O1NBTUE7QUFQUzs7QUFRVixNQUFBLENBQU8sT0FBQSxDQUFRLEVBQVIsRUFBVyxFQUFYLENBQVAsRUFBdUIsQ0FBdkI7O0FBQ0EsTUFBQSxDQUFPLE9BQUEsQ0FBUSxFQUFSLEVBQVcsRUFBWCxDQUFQLEVBQXVCLENBQXZCOztBQUNBLE1BQUEsQ0FBTyxPQUFBLENBQVEsRUFBUixFQUFXLEVBQVgsQ0FBUCxFQUF1QixDQUFDLENBQXhCOztBQUNBLE1BQUEsQ0FBTyxPQUFBLENBQVEsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFSLEVBQWUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFmLENBQVAsRUFBOEIsQ0FBQyxDQUEvQjs7QUFDQSxNQUFBLENBQU8sT0FBQSxDQUFRLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBUixFQUFlLENBQUMsQ0FBRCxFQUFHLEVBQUgsQ0FBZixDQUFQLEVBQStCLENBQS9COztBQUNBLE1BQUEsQ0FBTyxPQUFBLENBQVEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFSLEVBQWMsQ0FBQyxDQUFELEVBQUcsRUFBSCxDQUFkLENBQVAsRUFBOEIsQ0FBOUI7O0FBQ0EsTUFBQSxDQUFPLE9BQUEsQ0FBUSxDQUFDLENBQUQsRUFBRyxJQUFILENBQVIsRUFBaUIsQ0FBQyxDQUFELEVBQUcsR0FBSCxDQUFqQixDQUFQLEVBQWtDLENBQWxDOztBQUNBLE1BQUEsQ0FBTyxPQUFBLENBQVEsQ0FBQyxDQUFELEVBQUcsSUFBSCxDQUFSLEVBQWlCLENBQUMsQ0FBRCxFQUFHLElBQUgsQ0FBakIsQ0FBUCxFQUFtQyxDQUFuQzs7QUFDQSxNQUFBLENBQU8sT0FBQSxDQUFRLENBQUMsQ0FBRCxFQUFHLEdBQUgsQ0FBUixFQUFnQixDQUFDLENBQUQsRUFBRyxJQUFILENBQWhCLENBQVAsRUFBa0MsQ0FBQyxDQUFuQzs7QUFFQSxLQUFBLEdBQVEsUUFBQSxDQUFDLElBQUQsRUFBTSxNQUFJLE9BQVYsQ0FBQTtBQUNSLE1BQUEsQ0FBQSxFQUFBLENBQUEsRUFBQSxDQUFBLEVBQUEsQ0FBQSxFQUFBLEdBQUEsRUFBQSxJQUFBLEVBQUEsR0FBQSxFQUFBO0FBQUM7RUFBQSxLQUFBLHFDQUFBOztBQUNDO0lBQUEsS0FBQSx3Q0FBQTs7TUFDQyxJQUErQyxHQUFBLENBQUksSUFBSSxDQUFDLENBQUQsQ0FBUixFQUFhLElBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFqQixDQUFBLEdBQTBCLENBQXpFO1FBQUEsQ0FBQyxJQUFJLENBQUMsQ0FBRCxDQUFMLEVBQVUsSUFBSSxDQUFDLENBQUEsR0FBRSxDQUFILENBQWQsQ0FBQSxHQUF1QixDQUFDLElBQUksQ0FBQyxDQUFBLEdBQUUsQ0FBSCxDQUFMLEVBQVksSUFBSSxDQUFDLENBQUQsQ0FBaEIsRUFBdkI7O0lBREQ7RUFERDtTQUdBO0FBSk87O0FBS1IsTUFBQSxDQUFPLEtBQUEsQ0FBTSxDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUFOLEVBQWMsT0FBZCxDQUFQLEVBQStCLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLENBQS9COztBQUNBLE1BQUEsQ0FBTyxLQUFBLENBQU0sQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsQ0FBTixFQUFjLE9BQWQsQ0FBUCxFQUErQixDQUFDLENBQUQsRUFBRyxDQUFILEVBQUssQ0FBTCxDQUEvQjs7QUFDQSxNQUFBLENBQU8sS0FBQSxDQUFNLENBQUMsQ0FBQyxDQUFELENBQUQsRUFBSyxDQUFDLENBQUQsQ0FBTCxFQUFTLENBQUMsQ0FBRCxDQUFULENBQU4sRUFBb0IsT0FBcEIsQ0FBUCxFQUFxQyxDQUFDLENBQUMsQ0FBRCxDQUFELEVBQUssQ0FBQyxDQUFELENBQUwsRUFBUyxDQUFDLENBQUQsQ0FBVCxDQUFyQzs7QUFDQSxNQUFBLENBQU8sS0FBQSxDQUFNLENBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFELEVBQU8sQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFQLEVBQWEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFiLENBQU4sRUFBMEIsT0FBMUIsQ0FBUCxFQUEyQyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFPLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBUCxFQUFhLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBYixDQUEzQzs7QUFDQSxNQUFBLENBQU8sS0FBQSxDQUFNLENBQUMsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFELEVBQVEsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFSLEVBQWUsQ0FBQyxDQUFELEVBQUcsQ0FBSCxDQUFmLENBQU4sRUFBNEIsT0FBNUIsQ0FBUCxFQUE2QyxDQUFDLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBRCxFQUFRLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBUixFQUFlLENBQUMsQ0FBRCxFQUFHLENBQUgsQ0FBZixDQUE3Qzs7QUFDQSxNQUFBLENBQU8sS0FBQSxDQUFNLENBQUMsQ0FBRCxFQUFHLENBQUgsRUFBSyxDQUFMLEVBQU8sQ0FBUCxDQUFOLEVBQWlCLE9BQWpCLENBQVAsRUFBa0MsQ0FBQyxDQUFELEVBQUcsQ0FBSCxFQUFLLENBQUwsRUFBTyxDQUFQLENBQWxDIiwic291cmNlc0NvbnRlbnQiOlsibmlsc3Nvbl92ZXJzaW9uID0gXCIxLjVcIiAjIGdldFBhcmFtZXRlcnMgd2l0aCAwIHBhcmFtZXRlcnMgZml4ZWQgXG5cbiMgY2hhaSB2aXNhciBsaXN0aW5uZWjDpWxsIHDDpSBldHQgYnJhIHPDpHR0LiBcbiMgXy5pc0VxdWFsKGEsYikgZnVuZ2VyYXIgb2Nrc8OlIG1lbiBkZXQgYmxpciBzw6RtcmUgbGlzdHV0c2tyaWZ0ZXJcbmFzc2VydCA9IChhLCBiLCBtc2c9J0Fzc2VydCBmYWlsdXJlJykgLT4gY2hhaS5hc3NlcnQuZGVlcEVxdWFsIGEsIGIsIG1zZ1xuXG5maXhDb2xvciA9IChhcmdzKSAtPlxuXHRuID0gYXJncy5sZW5ndGhcblx0YSA9IDFcblx0W3IsZyxiXSA9IFthcmdzWzBdLGFyZ3NbMF0sYXJnc1swXV0gaWYgbiA9PSAxXG5cdFtyLGcsYixhXSA9IFthcmdzWzBdLGFyZ3NbMF0sYXJnc1swXSxhcmdzWzFdXSBpZiBuID09IDIgXG5cdFtyLGcsYl0gPSBhcmdzIGlmIG4gPT0gM1xuXHRbcixnLGIsYV0gPSBhcmdzIGlmIG4gPT0gNFxuXHRyZXR1cm4gY29sb3IgMjU1ICogciwgMjU1ICogZywgMjU1ICogYiwgMjU1ICogYVxuXG5mYyA9IC0+IGlmIGFyZ3VtZW50cy5sZW5ndGggPT0gMCB0aGVuIG5vRmlsbCgpIGVsc2UgZmlsbCBmaXhDb2xvciBhcmd1bWVudHNcbnNjID0gLT4gaWYgYXJndW1lbnRzLmxlbmd0aCA9PSAwIHRoZW4gbm9TdHJva2UoKSBlbHNlIHN0cm9rZSBmaXhDb2xvciBhcmd1bWVudHNcbmJnID0gLT4gYmFja2dyb3VuZCBmaXhDb2xvciBhcmd1bWVudHNcbnN3ID0gKG4pIC0+IHN0cm9rZVdlaWdodCBuXG5jaXJjbGUgPSAoeCx5LHIpIC0+IGVsbGlwc2UgeCx5LDIqciwyKnJcbnJkID0gKGRlZ3JlZXMpIC0+IHJvdGF0ZSByYWRpYW5zIGRlZ3JlZXNcbnByaW50ID0gY29uc29sZS5sb2dcbnJhbmdlID0gXy5yYW5nZSAjIGZyb20gdW5kZXJzY29yZS5jb2ZmZWVcbm1lcnAgPSAoeTEseTIsaSx4MT0wLHgyPTEpIC0+IG1hcCBpLHgxLHgyLHkxLHkyXG5cbmdldFBhcmFtZXRlcnMgPSAoaCA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmKSAtPiBcblx0aCA9IGRlY29kZVVSSSBoXG5cdGFyciA9IGguc3BsaXQoJz8nKVxuXHRpZiBhcnIubGVuZ3RoICE9IDIgdGhlbiByZXR1cm4ge31cblx0cyA9IGFyclsxXVxuXHRpZiBzPT0nJyB0aGVuIHJldHVybiB7fVxuXHRfLm9iamVjdChmLnNwbGl0ICc9JyBmb3IgZiBpbiBzLnNwbGl0KCcmJykpXG5hc3NlcnQgZ2V0UGFyYW1ldGVycygnaHR0cDpcXFxcY2hyaXN0ZXJuaWxzc29uLmdpdGh1Yi5pb1xcU2hvcnRjdXRcXHd3dycpLCB7fVxuYXNzZXJ0IGdldFBhcmFtZXRlcnMoJ2h0dHA6XFxcXGNocmlzdGVybmlsc3Nvbi5naXRodWIuaW9cXFNob3J0Y3V0XFx3d3c/JyksIHt9XG5hc3NlcnQgZ2V0UGFyYW1ldGVycygnaHR0cDpcXFxcY2hyaXN0ZXJuaWxzc29uLmdpdGh1Yi5pb1xcU2hvcnRjdXRcXHd3dz9hPTAmYj0xJyksIHsnYSc6JzAnLCAnYic6JzEnfVxuXG5jb21wYXJlID0gKGEsYikgLT5cblx0aWYgdHlwZW9mIGEgPT0gXCJvYmplY3RcIiBhbmQgdHlwZW9mIGIgPT0gXCJvYmplY3RcIlxuXHRcdGZvciBpIGluIHJhbmdlIE1hdGgubWluIGEubGVuZ3RoLGIubGVuZ3RoXG5cdFx0XHRjID0gY29tcGFyZSBhW2ldLGJbaV1cblx0XHRcdGlmIGMgIT0gMCB0aGVuIHJldHVybiBjXG5cdGVsc2Vcblx0XHRyZXR1cm4gKGlmIGEgPiBiIHRoZW4gLTEgZWxzZSAoaWYgYSA8IGIgdGhlbiAxIGVsc2UgMCkpXG5cdDBcbmFzc2VydCBjb21wYXJlKDEyLDEzKSwgMVxuYXNzZXJ0IGNvbXBhcmUoMTIsMTIpLCAwXG5hc3NlcnQgY29tcGFyZSgxMywxMiksIC0xXG5hc3NlcnQgY29tcGFyZShbMSwxMV0sWzEsMl0pLCAtMVxuYXNzZXJ0IGNvbXBhcmUoWzEsMTFdLFsxLDExXSksIDBcbmFzc2VydCBjb21wYXJlKFsxLDJdLFsxLDExXSksIDFcbmFzc2VydCBjb21wYXJlKFsxLCcxMSddLFsxLCcyJ10pLCAxXG5hc3NlcnQgY29tcGFyZShbMSwnMTEnXSxbMSwnMTEnXSksIDBcbmFzc2VydCBjb21wYXJlKFsxLCcyJ10sWzEsJzExJ10pLCAtMVxuXG5ic29ydCA9IChsaXN0LGNtcD1jb21wYXJlKSAtPlxuXHRmb3IgaSBpbiByYW5nZSBsaXN0Lmxlbmd0aFxuXHRcdGZvciBqIGluIHJhbmdlIGxpc3QubGVuZ3RoLTFcblx0XHRcdFtsaXN0W2pdLCBsaXN0W2orMV1dID0gW2xpc3RbaisxXSwgbGlzdFtqXV0gaWYgY21wKGxpc3Rbal0sIGxpc3RbaisxXSkgPCAwXG5cdGxpc3RcbmFzc2VydCBic29ydChbMSw4LDJdLGNvbXBhcmUpLCBbMSwyLDhdXG5hc3NlcnQgYnNvcnQoWzEsOCwyXSxjb21wYXJlKSwgWzEsMiw4XVxuYXNzZXJ0IGJzb3J0KFtbMV0sWzhdLFsyXV0sY29tcGFyZSksIFtbMV0sWzJdLFs4XV1cbmFzc2VydCBic29ydChbWzIsMV0sWzIsOF0sWzIsMl1dLGNvbXBhcmUpLCBbWzIsMV0sWzIsMl0sWzIsOF1dXG5hc3NlcnQgYnNvcnQoW1sxLDhdLCBbMSw3XSwgWzEsOV1dLGNvbXBhcmUpLCBbWzEsN10sIFsxLDhdLCBbMSw5XV1cbmFzc2VydCBic29ydChbMywyLDQsMV0sIGNvbXBhcmUpLCBbMSwyLDMsNF1cblxuIl19
//# sourceURL=c:\github\gpsKarta-test\coffee\nilsson.coffee