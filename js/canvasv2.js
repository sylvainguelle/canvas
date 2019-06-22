	const canvas = document.createElement("canvas");
	canvas.height = 150;
	canvas.width = 200;
	canvas.style.border = "1px solid black";
	canvas.style.backgroundColor = "white";
	const ctx = canvas.getContext("2d");
	//insertion du canvas sur la page et du bouton validation canvas
	document.getElementById("canvas").appendChild(canvas);
	const canvasButton = document.createElement('button');
	canvasButton.classList.add("btn","btn-success");
	canvasButton.textContent = "Valider la signature";
  document.getElementById("canvas").appendChild(document.createElement("br"));
  document.getElementById("canvas").appendChild(canvasButton);

/*	//validation de la signature au clic
	canvasButton.addEventListener("click", function () {
		document.getElementById("canvas").removeChild(canvas);
		document.getElementById("canvas").removeChild(canvasButton);
    addReservation();
	});*/

	//variable tracking position souris et etat dessin
	let drawing = false;
	let mousePos = {x:0,y:0};
	let lastPos = mousePos;

	//evenement souris
	canvas.addEventListener("mousedown", function (e) {
		drawing = true;
		lastPos = getMousePos(canvas, e);
	},false);

	canvas.addEventListener("mouseup", function (e) {
		drawing = false;
	},false);

	canvas.addEventListener("mousemove", function (e) {
		mousePos = getMousePos(canvas, e);
	},false);

	//obtenir la position de la souris par rapport au canvas
	function getMousePos (canvasDom, mouseEvent) {
		const rect = canvasDom.getBoundingClientRect();
		return {
			x: mouseEvent.clientX - rect.left ,
			y: mouseEvent.clientY - rect.top
		};
	};

	// Get a regular interval for drawing to the screen
	window.requestAnimFrame = (function (callback) {
	        return window.requestAnimationFrame ||
	           window.webkitRequestAnimationFrame ||
	           window.mozRequestAnimationFrame ||
	           window.oRequestAnimationFrame ||
	           window.msRequestAnimaitonFrame ||
	           function (callback) {
	        window.setTimeout(callback, 1000/60);
	           };
	})();

	// dessiner sur le canvas
	function renderCanvas() {
	  if (drawing) {
	    ctx.moveTo(lastPos.x, lastPos.y);
	    ctx.lineTo(mousePos.x, mousePos.y);
	    ctx.stroke();
	    lastPos = mousePos;
	  }
	}

	// Allow for animation
	(function drawLoop () {
	  requestAnimFrame(drawLoop);
	  renderCanvas();
	})();
