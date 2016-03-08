function launchFullscreen(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}

function exitFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

EdenSliderPlus = function() {
	var slider = document.getElementById("slider");

	if (slider == null) return;

	var width = $('#slider').innerWidth();
	var height = $('#slider').innerHeight();
	var screenWidth = window.screen.width;
	var screenHeight = window.screen.height;
	var fullScreenWidth = screenHeight * (width / height);

	slider.ondblclick = function() {
		launchFullscreen(slider);
		$('#slider').width(fullScreenWidth);
	}

	document.body.onkeyup = function () {
		var prev = $('.callbacks_nav.callbacks1_nav.prev')[0];
		var next = $('.callbacks_nav.callbacks1_nav.next')[0];
		
		if (event.keyCode == 13) {
			launchFullscreen(slider);
			$('#slider').width(fullScreenWidth);
		}
		else if (event.keyCode == 27) {
			exitFullscreen();
			$('#slider').width(width);
		}
		else if (event.keyCode == 37) {
			prev.click();
		}
		else if (event.keyCode == 39) {
			next.click();
		}
	}
}

EdenSliderPlus();
