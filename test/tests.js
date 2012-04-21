window.console == null && (window.console = { log: function() {} });

$(document).ready(function() {
  function shouldScore(charScores, string, abbreviation) {
    var sum = 0.0;
    for (var s in charScores) { sum += charScores[s]; }
    var expectedScore = Math.round(sum / charScores.length * 1000) / 1000;

    var score = LiquidMetal.score(string, abbreviation);
    var scoreArray = LiquidMetal.lastScoreArray;
    var roundedScore = Math.round(score*1000)/1000;

    var pass = (expectedScore == roundedScore);
    var result = (pass) ? "pass" : "fail";

    console.log(string + " ~ " + abbreviation + " : " + scoreArray);

    var blip = pass ? "✓" : "☠";
    if (!pass) {
      var message = "LiquidMetal.score('" + string + "', '" + abbreviation + "') should match " + expectedScore + " but was " + score;
      $("#errors").append($("<div></div>").addClass(result).text(message));
    }

    $("#results").append($("<span></span>").addClass(result).text(blip));
  }

  var n = 0.0;   // no match
  var m = 1.0;   // match
  var t = 0.8;   // trailing
  var s = 0.9;   // special trailing
  var b = 0.85;  // buffer

  shouldScore([t],             "",        "");
  shouldScore([n],             "",        "a");
  shouldScore([t],             "a",       "");
  shouldScore([n],             "a",       "toolong");
  shouldScore([m],             "a",       "a");
  shouldScore([n],             "a",       "b");
  shouldScore([t,t,t],         "abc",     "");
  shouldScore([m,s,s],         "abc",     "a");
  shouldScore([n,m,t],         "abc",     "b");
  shouldScore([n,n,m],         "abc",     "c");
  shouldScore([n,n,n],         "abc",     "d");
  shouldScore([m],             "A",       "a");
  shouldScore([n],             "A",       "b");
  shouldScore([t,t,t,t,t,t],   "FooBar",  "");
  shouldScore([m,m,m,s,s,s],   "FooBar",  "foo");
  shouldScore([m,b,b,m,s,s],   "FooBar",  "fb");
  shouldScore([m,n,n,m,s,s],   "foobar",  "fb");
  shouldScore([b,b,b,m,t,t],   "FooBar",  "b");
  shouldScore([n,m,m,n,m,m],   "FooBar",  "ooar");
  shouldScore([n,n,n,n,n,n],   "FooBar",  "bab");
  shouldScore([t,t,t,t,t,t,t], "Foo Bar", "");
  shouldScore([m,m,m,s,s,s,s], "Foo Bar", "foo");
  shouldScore([m,b,b,m,m,s,s], "Foo Bar", "fb");
  shouldScore([m,b,b,m,m,s,s], "Foo-Bar", "fb");
  shouldScore([m,b,b,m,m,s,s], "Foo_Bar", "fb");
  shouldScore([b,b,b,m,m,t,t], "Foo Bar", "b");
  shouldScore([n,m,m,n,n,m,m], "Foo Bar", "ooar");
  shouldScore([n,n,n,n,n,n,n], "Foo Bar", "bab");
  shouldScore([b,b,b,b,b,m,m,b,b,m,m,t,t,t],  "gnu's Not Unix",  "nu");
});
