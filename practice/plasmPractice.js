var domain = DOMAIN([[0, 2*PI],[0, 2*PI]])([36, 72]); //come secondo termine della divisione usare il numero doppio rispetto al primo termine

var torus = function (R, r) {
	return function (v) {
		var a = v[0];
		var b = v[1];
	
		var u = (r*COS(a) + R)  * COS(b);
		var v = (r*COS(a) + R)  * SIN(b);
		var w = (r * SIN(a));

		return [u,v,w];
	};
};

var mappingTorus = torus(3,1);

var tire = COLOR(1,1,1)(MAP(mappingTorus)(domain));
DRAW(tire);