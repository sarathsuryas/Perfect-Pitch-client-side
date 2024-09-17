 var video = (function(){
  $('.wrap-video').hover(hoverVideo, hideVideo)
}) (video||{}) 
  

    function hoverVideo(e) {  
        $('video', this).get(0).play(); 
    }

    function hideVideo(e) {
        $('video', this).get(0).pause(); 
    }