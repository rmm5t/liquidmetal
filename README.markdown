# LiquidMetal

A mimetic poly-alloy of the Quicksilver scoring algorithm, essentially
LiquidMetal. `</Schwarzenegger Voice>`

Flex matching short abbreviations against longer strings is a boon in
productivity for typists.  Applications like
[Quicksilver](http://www.qsapp.com/), [Alfred](http://www.alfredapp.com/),
[LaunchBar](http://www.obdev.at/products/launchbar/index.html), and
[Launchy](http://www.launchy.net/) have made this method of keyboard entry a
popular one.  It's time to bring this same functionality to web controls.
LiquidMetal makes scoring long strings against abbreviations easy.

## Usage

Include the library:

    <script src="liquidmetal.js" type="text/javascript"></script>

Score any string against an abbreviation:

    LiquidMetal.score("FooBar",  "foo")   //=> 0.950
    LiquidMetal.score("FooBar",  "fb")    //=> 0.917
    LiquidMetal.score("Foo Bar", "fb")    //=> 0.929
    LiquidMetal.score("Foo Bar", "baz")   //=> 0.0
    LiquidMetal.score("Foo Bar", "")      //=> 0.8

All scores fall between a range of 0.0 (no match) to 1.0 (perfect match).

## Inspired By

* [Quicksilver](http://code.google.com/p/blacktree-alchemy/) and its [scoreForAbbreviation algorithm](http://code.google.com/p/blacktree-alchemy/source/browse/trunk/Crucible/Code/NSString_BLTRExtensions.m#61) by Alcor
* [Quicksilver.js](http://rails-oceania.googlecode.com/svn/lachiecox/qs_score/trunk/qs_score.js) by [Lachie Cox](http://smartbomb.com.au/2008/02/11/quicksilver-javascript)

## Why?

* To satisfy my own requirements for the
  [jquery.flexselect](http://rmm5t.github.com/jquery-flexselect) plugin
* The Quicksilver algorithm doesn't give proper weight to abbreviations that
  match the first character of the scored string.
* The Quicksilver algorithm is extremely slow for certain length
  string/abbreviation combinations because of its use of recursion.  While
  slightly slower for shorter length string/abbreviation combinations,
  LiquidMetal outperforms the Quicksilver algorithm by orders of magnitude under
  other conditions.
* The javascript version of the Quicksilver algorithm (Quicksilver.js) is case
  sensitive and doesn't give added weight to camel case strings; whereas,
  LiquidMetal is case insensitive and does give added weight to uppercase
  letters in camel case strings.

## Todo

* More tests
* Consider tweaking the scores for "trailing" characters
* Improve implementation of highest score matching (LiquidMetal
  currently returns the highest scoring match for an abbreviation,
  but is inefficient)
* See if it's possible to tune the performance further

## Author

[Ryan McGeary](http://ryan.mcgeary.org) ([@rmm5t](http://twitter.com/rmm5t))

## Other

[MIT License](http://www.opensource.org/licenses/mit-license.php)

Copyright (c) 2009, Ryan McGeary (ryanonjavascript -[at]- mcgeary [*dot*] org)
