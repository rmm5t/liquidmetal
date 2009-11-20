(function() {

  JSLitmus.test('Short', function() {
    LiquidMetal.score("FooBar",  "foo")   //=> 0.950
    LiquidMetal.score("FooBar",  "fb")    //=> 0.917
    LiquidMetal.score("Foo Bar", "fb")    //=> 0.929
    LiquidMetal.score("Foo Bar", "baz")   //=> 0.0
    LiquidMetal.score("Foo Bar", "")      //=> 0.8
    return;
  });


})();