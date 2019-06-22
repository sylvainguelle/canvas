	const canvas = document.createElement("canvas");
	canvas.height = 200;
	canvas.width = 300;
	canvas.style.border = "1px solid black";
	canvas.style.backgroundColor = "white";
	//definition contexte 2d canvas
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

	let mousePos = {x:0,y:0};
	let lastPos = {x:0,y:0};
	let drawing = false;

	//evenement au mouvement de la souris pour avoir la position du curseur
	canvas.addEventListener("mousemove", function(e) {
		mousePos.x = e.clientX;
		mousePos.y = e.clientY;
		drawLine();
		lastPos.x = e.clientX;
		lastPos.y = e.clientY;
	});

	//evenement tactile au mouvement pour avoir la position du doigt
	canvas.addEventListener("touchmove",function(e) {
		mousePos.x = e.touches[0].clientX;
		mousePos.y = e.touches[0].clientY;
		drawLine();
		lastPos.x = e.touches[0].clientX;
		lastPos.y = e.touches[0].clientY;
		e.preventDefault;
	});

	canvas.addEventListener("mousedown", function() {
		drawing = true;
	});

	canvas.addEventListener("touchstart", function(e) {
		lastPos.x = e.touches[0].clientX;
		lastPos.y = e.touches[0].clientY;
		drawing = true;
		e.preventDefault;
	});

	canvas.addEventListener("mouseup", function() {
		drawing = false;
	});

	canvas.addEventListener("touchend", function(e) {
		drawing = false;
		e.preventDefault;
	});

function drawLine() {
	console.log("mx="+mousePos.x+" my="+mousePos.y+" lx="+lastPos.x+" ly="+lastPos.y+drawing);
if (drawing===true) {
		ctx.moveTo(lastPos.x,lastPos.y);
		ctx.lineTo(mousePos.x,mousePos.y);
		ctx.stroke();
	};
}
