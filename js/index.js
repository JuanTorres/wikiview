
function searchArticle(query){
   $.getJSON("https://en.wikipedia.org/w/api.php?action=query&format=json&generator=search&grnnamespace=0&prop=extracts&exlimit=max&explaintext&exintro&gsrsearch=" + query + "&callback=?", function(result) {
      // button Choose For Me ready to be clicked again
      $("#search-button").attr("disabled", false);
      // hiding intro (empty state) before displaying the result from API
      cleanIntro();
      if (result.hasOwnProperty("query")) {
         $.each(result.query.pages, function(key, page){
            var extract = page.extract.length > 464 ? page.extract.substring(0,464) + "..." : page.extract;
            $("#article-list").append('<li><h2><a target="_blank" href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a></h2>' + '<p>' + extract + '</p>' + '</li>');
         });
      } else {
         hintChange(true);
      }
      arrowBack();
   });
}

function randomArticle() {
   $.getJSON("https://en.wikipedia.org/w/api.php?action=query&prop=extracts&format=json&generator=random&grnnamespace=0&callback=?", function(result)  {
      // button Choose For Me ready to be clicked again
      $("#random").attr("disabled", false);
      // hiding intro (empty state) before displaying the response from API
      cleanIntro();
      $.each(result.query.pages, function(key, page){
         $("#random-result-title").html('<a href="http://en.wikipedia.org/?curid=' + page.pageid + '">' + page.title + '</a>');
         $("#random-result").html(page.extract);
         return false; //to display 1st element and finish the loop
      });
      $(".random-result").slideDown(function () {
         arrowBack();
      });
   });
}

function cleanIntro (){
   $(".intro").hide();
}

function hintChange (turnOn) {
   if (turnOn) {
     $("#no-query").removeClass("hidden");
     $("#random").addClass("look");
   } else {
     $("#no-query").addClass("hidden");
     $("#random").removeClass("look");
   }
}

// back-to-top link visibility set
function arrowBack (){
   if (!$(".intro").is(":visible") && $("body").height() - $("footer").height() > $(window).height()){
      $("#back-to-top").removeClass("hidden");
   } else {
      $("#back-to-top").addClass("hidden");
   }
}

$(document).ready(function() {
   $("#random").on("click", function(e) {
      // random button unfocusing
      $(this).blur();
      // disable the button before getting the response from API
      $(this).attr("disabled", true);
      // hiding article-list
      $("#article-list").hide();
      // hiding no-query help text and removing yellow look background of random after random being chosen
      hintChange(false);
      randomArticle();
      e.preventDefault();
   });
   $("#search-button").on("click", function(e) {
      // cleaning after previous search
      $("#article-list").html(""); 
      // making article-list visible again
      $("#article-list").show();
      // cleaning random result if displayed
      $(".random-result").slideUp(function (){
         // when content slided up calling arrowBack() when query is empty back-to-top section
         arrowBack();
      });
      if ($("#query").val() === "") {
         // if input is empty let's display empty state help and clean intro image
         cleanIntro();
         hintChange(true);
         // if random hovered over #no-query span class removed else visible
         $("#random").hover(function() {
               $("#no-query span").removeClass("accent-hint");
            }, function() {
               $("#no-query span").addClass("accent-hint");
            });
      } else {
         // disable the button before getting the response from API
         $(this).attr("disabled", true);
         // passing input text
         searchArticle($("#query").val()); 
         hintChange(false);
      }
      e.preventDefault();
   });
   // back-to-top focus 
   $("#arrow-top").on("click", function() {
      $("#query").focus().select();
   });
});

$('.button--bubble').each(function() {
  var $circlesTopLeft = $(this).parent().find('.circle.top-left');
  var $circlesBottomRight = $(this).parent().find('.circle.bottom-right');

  var tl = new TimelineLite();
  var tl2 = new TimelineLite();

  var btTl = new TimelineLite({ paused: true });

  tl.to($circlesTopLeft, 1.2, { x: -25, y: -25, scaleY: 2, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl.to($circlesTopLeft.eq(0), 0.1, { scale: 0.2, x: '+=6', y: '-=2' });
  tl.to($circlesTopLeft.eq(1), 0.1, { scaleX: 1, scaleY: 0.8, x: '-=10', y: '-=7' }, '-=0.1');
  tl.to($circlesTopLeft.eq(2), 0.1, { scale: 0.2, x: '-=15', y: '+=6' }, '-=0.1');
  tl.to($circlesTopLeft.eq(0), 1, { scale: 0, x: '-=5', y: '-=15', opacity: 0 });
  tl.to($circlesTopLeft.eq(1), 1, { scaleX: 0.4, scaleY: 0.4, x: '-=10', y: '-=10', opacity: 0 }, '-=1');
  tl.to($circlesTopLeft.eq(2), 1, { scale: 0, x: '-=15', y: '+=5', opacity: 0 }, '-=1');

  var tlBt1 = new TimelineLite();
  var tlBt2 = new TimelineLite();
  
  tlBt1.set($circlesTopLeft, { x: 0, y: 0, rotation: -45 });
  tlBt1.add(tl);

  tl2.set($circlesBottomRight, { x: 0, y: 0 });
  tl2.to($circlesBottomRight, 1.1, { x: 30, y: 30, ease: SlowMo.ease.config(0.1, 0.7, false) });
  tl2.to($circlesBottomRight.eq(0), 0.1, { scale: 0.2, x: '-=6', y: '+=3' });
  tl2.to($circlesBottomRight.eq(1), 0.1, { scale: 0.8, x: '+=7', y: '+=3' }, '-=0.1');
  tl2.to($circlesBottomRight.eq(2), 0.1, { scale: 0.2, x: '+=15', y: '-=6' }, '-=0.2');
  tl2.to($circlesBottomRight.eq(0), 1, { scale: 0, x: '+=5', y: '+=15', opacity: 0 });
  tl2.to($circlesBottomRight.eq(1), 1, { scale: 0.4, x: '+=7', y: '+=7', opacity: 0 }, '-=1');
  tl2.to($circlesBottomRight.eq(2), 1, { scale: 0, x: '+=15', y: '-=5', opacity: 0 }, '-=1');
  
  tlBt2.set($circlesBottomRight, { x: 0, y: 0, rotation: 45 });
  tlBt2.add(tl2);

  btTl.add(tlBt1);
  btTl.to($(this).parent().find('.button.effect-button'), 0.8, { scaleY: 1.1 }, 0.1);
  btTl.add(tlBt2, 0.2);
  btTl.to($(this).parent().find('.button.effect-button'), 1.8, { scale: 1, ease: Elastic.easeOut.config(1.2, 0.4) }, 1.2);

  btTl.timeScale(2.6);

  $(this).on('mouseover', function() {
    btTl.restart();
  });
});