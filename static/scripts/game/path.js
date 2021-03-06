function Path(points, width) {
	this.points = points;
	
	this.stepLengths = [];
	this.totalLength = 0;

	this.width = width;
	this.setBoundary();

	this.setStepProperties();
}

//Returns the coordinates given a distance traveled on the path
Path.prototype.pointOnPath = function(dist) {
	var counter = 0;
	var totalDistance = 0;
	while(dist > totalDistance + this.stepLengths[counter]) {
		totalDistance += this.stepLengths[counter];
		counter++;
	}
	
	return this.pointOnStep(counter, this.points[counter+1], dist-totalDistance);
	
}

//Returns the coordinates given a distance traveled on a point
Path.prototype.pointOnStep = function(num, point, dist) {
	return {
        x: this.points[num].x + (point.x-this.points[num].x)*(dist/this.stepLengths[num]), 
        y: this.points[num].y + (point.y-this.points[num].y)*(dist/this.stepLengths[num])
    };
}

//Calculates thelengths and starting points for all points
Path.prototype.setStepProperties = function() {
	for (i=1 ; i< this.points.length ; i++) {
        var length = Math.hypot(this.points[i].x-this.points[i-1].x, this.points[i].y-this.points[i-1].y);
		
		this.stepLengths.push(length);
		this.totalLength += length;
	}
}

//Draws the path (currently not used)
Path.prototype.draw = function(context, color, lineWidth) {
	context.lineWidth = lineWidth.toString();
	context.strokeStyle = color;
	context.beginPath();
	
	context.moveTo(this.points[0].x, this.points[0].y);
	for (i=1 ; i< this.points.length ; i++) {
		context.lineTo(this.points[i].x, this.points[i].y);
	}
	
	context.stroke();
}

//Draws the Starting points for each point (currently not used)
function drawCriticalPoints(context, color, radius) {
	context.strokeStyle = color;
	context.fillStyle = color;
	for (i=0 ; i< this.points.length ; i++) {
		context.beginPath();
		context.arc(this.points[i].x, this.points[i].y, radius, 0, 2*Math.PI);
		context.fill();
	}
}

Path.prototype.setBoundary = function() {
    var poly = new Polygon([]);

    var angles = [];
    for (var i = 1; i<this.points.length; i++) {
    	angles.push(Math.atan2(this.points[i].y-this.points[i-1].y, this.points[i].x-this.points[i-1].x));
 	}

    if(this.points[0].x == MAP_X || this.points[0].x == MAP_WIDTH) {
    	poly.addPoint(
    		this.points[0].x, 
    		this.points[0].y - (1/Math.cos(angles[0])) * this.width/2
    	);
    	poly.addPoint(
    		this.points[0].x, 
    		this.points[0].y + (1/Math.cos(angles[0])) * this.width/2
    	)
    } else if(this.points[0].y == MAP_Y || this.points[0].y == MAP_HEIGHT) {
    	poly.addPoint(
    		this.points[0].x - (1/Math.sin(angles[0])) * this.width/2,
    		this.points[0].y 
    	);
    	poly.addPoint(
    		this.points[0].x + (1/Math.sin(angles[0])) * this.width/2,
    		this.points[0].y 
    	)
    }

    for(var i = 1; i<this.points.length-1; i++) {
    	var angle = (angles[i]+angles[i-1])/2 + Math.PI/2;
    	var mag = (1/Math.sin(angle - angles[i-1])) * this.width/2;
    	poly.addPoint(
    		this.points[i].x + mag*Math.cos(angle),
    		this.points[i].y + mag*Math.sin(angle)
    	);
    }

    var end = this.points[this.points.length - 1];
    var lastAngle = angles[angles.length - 1];

    if(end.x == MAP_X || end.x == MAP_WIDTH) {
    	poly.addPoint(
    		end.x, 
    		end.y + (1/Math.cos(lastAngle)) * this.width/2
    	);
    	poly.addPoint(
    		end.x, 
    		end.y - (1/Math.cos(lastAngle)) * this.width/2
    	)
    } else if(end.y == MAP_Y || end.y == MAP_HEIGHT) {
    	poly.addPoint(
    		end.x + (1/Math.sin(lastAngle)) * this.width/2, 
    		end.y
    	);
    	poly.addPoint(
    		end.x - (1/Math.sin(lastAngle)) * this.width/2, 
    		end.y
    	)
    }

    for(var i = this.points.length-2; i>=1; i--) {
    	var angle = (angles[i]+angles[i-1])/2 + Math.PI/2;
    	var mag = (1/Math.sin(angle - angles[i-1])) * this.width/2;
    	poly.addPoint(
    		this.points[i].x - mag*Math.cos(angle),
    		this.points[i].y - mag*Math.sin(angle)
    	);
    }

    this.boundary = poly;
}

Path.prototype.drawBoundary = function(context, color, lineWidth, fillOpacity) {
	this.boundary.draw(context, color, lineWidth, fillOpacity);
}

// var defaultPath = new Path(
// 	[
//         {x : 0, y  : 360},
// 		{x : 320, y : 360},
// 		{x : 480, y : 90},
// 		{x : 720,y : 180},
// 		{x : 240, y : 540},
// 		{x : 480, y : 630},
// 		{x : 640, y : 360},
// 		{x : 960, y : 360},
// 	],
// 	45
// );

var defaultPath = new Path(
	[
        {x : 960, y  : 560},
		{x : 488, y : 564},
		{x : 193, y : 581},
		{x : 135, y : 603},
		{x : 122, y : 637},
		{x : 195, y : 688},
		{x : 295, y : 698},
		{x : 425, y : 673},
		{x : 490, y : 567},
		{x : 568, y : 265},
		{x : 627, y : 153},
		{x : 734, y : 124},
		{x : 890, y : 139},
		{x : 929, y : 175},
		{x : 898, y : 258},
		{x : 823, y : 285},
		{x : 674, y : 287},
		{x : 226, y : 153},
		{x : 149, y : 163},
		{x : 73, y : 253},
		{x : 62, y : 360},
		{x : 42, y : 411},
		{x : 0, y : 421},
	],
	30
);