/**
 * LiquidMetal, version: 1.1 (2012-03-01)
 *
 * A mimetic poly-alloy of Quicksilver's scoring algorithm, essentially
 * LiquidMetal.
 *
 * For usage and examples, visit:
 * http://github.com/rmm5t/liquidmetal
 *
 * Licensed under the MIT:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright (c) 2009-2012, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */
var LiquidMetal = (function() {
  var SCORE_NO_MATCH = 0.0;
  var SCORE_MATCH = 1.0;
  var SCORE_TRAILING = 0.8;
  var SCORE_TRAILING_BUT_STARTED = 0.9;
  var SCORE_BUFFER = 0.85;
  var WORD_SEPARATORS = [" ", "\t", "_", "-"];

  return {
    lastScore: null,
    lastScoreArray: null,

    score: function(string, abbrev) {
      // Short circuits
      if (abbrev.length === 0) return SCORE_TRAILING;
      if (abbrev.length > string.length) return SCORE_NO_MATCH;

      var scores = this.buildScoreArray(string, abbrev);

      // complete miss:
      if (scores === false) return 0;

      // sum per-character score for overall score, normalize by string length
      // so perfect match score = 1
      var sum = 0.0;
      for (var i = 0; i < scores.length; i++) { sum += scores[i]; }
      var overall_score = sum / scores.length;

      // record overall score & score array, return overall score
      this.lastScore = overall_score;
      this.lastScoreArray = scores;
      return overall_score;
    },

    buildScoreArray: function(string, abbrev) {
      var scores = new Array(string.length);
      var search = string.toLowerCase();
      abbrev = abbrev.toLowerCase();

      var lastIndex = -1;
      var started = false;
      // score each match according to context
      for (var i = 0; i < abbrev.length; i++) {
        var c = abbrev[i];
        var index = search.indexOf(c, lastIndex+1);

        if (index === -1) return false; // signal no match
        if (index === 0) started = true; // flag abbreviation at start of string

        if (isNewWord(string, index)) {
          scores[index-1] = 1;
          fillArray(scores, SCORE_BUFFER, lastIndex+1, index-1);
        }
        else if (isUpperCase(string, index)) {
          fillArray(scores, SCORE_BUFFER, lastIndex+1, index);
        }
        else {
          fillArray(scores, SCORE_NO_MATCH, lastIndex+1, index);
        }

        scores[index] = SCORE_MATCH;
        lastIndex = index;
      }

      // score remaining string as trailing characters
      var trailingScore = started ? SCORE_TRAILING_BUT_STARTED : SCORE_TRAILING;
      fillArray(scores, trailingScore, lastIndex+1, scores.length);
      return scores;
    }
  };

  function isUpperCase(string, index) {
    var c = string.charAt(index);
    return ("A" <= c && c <= "Z");
  }

   function isNewWord(string, index) {
    var c = string.charAt(index-1);
    return (WORD_SEPARATORS.indexOf(c) != -1);
  }

  function fillArray(array, value, from, to) {
    for (var i = from; i < to; i++) { array[i] = value; }
    return array;
  }
})();
