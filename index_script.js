window.onload = () => {
    
	// const innerWidth = 300;
	// const innerHeight = 600;
	const canvas = document.querySelector('canvas'); 
	const c = canvas.getContext('2d'); 
	canvas.width = innerWidth; 
	canvas.height = innerHeight; 
	addEventListener('resize', () => { 
		canvas.width = innerWidth; 
		canvas.height = innerHeight; });
	
	const gui = new dat.GUI();
	const controls = {
		dx: 0,
		dy: 0,
		count: 15,
		tail: -4,
	};
	
	
	// gui.add(controls, 'dx', -10, 10);
	// gui.add(controls, 'dy', -10, 10);
	gui.add(controls, 'count', 0, 20);
	gui.add(controls, 'tail', -10, 0);
	
	
	const drops = [];
	const droplets = [];
	let timer = 0;
	//const drop = new Drop(100, 100, 5, 'rgb(80,160,253)', 1);
	
	
	function Droplet(x, y, dx, dy, size, color) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.size = size;
		this.color = color;
		this.gravity = 0.2;
		
		this.draw=()=>{
			c.beginPath();
			c.fillStyle = this.color;
			c.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
			c.closePath();
			c.fill();
		};
		
		this.update=()=>{
			this.dy -= this.gravity;
			this.x += this.dx;
			this.y -= this.dy;
			this.draw();
		};
	}
	
	function Drop (x,y,size,color,speed) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.color = color;
		this.speed = speed;
		this.gravity = 0.3;
		
		this.draw =()=>{
			c.strokeStyle = this.color;
			c.beginPath();
			c.moveTo(this.x, this.y);
			c.lineTo(this.x, this.y + 5);
			c.closePath();
			c.stroke();
		};
		
		this.update=()=>{
			this.speed += this.gravity;
			this.y += this.speed;
			if (this.y > canvas.height - 5 || this.y < 0)
				this.gravity *= -1;
			this.draw();
		};
		
		this.splash=()=>{
		  for (let i = 0; i < 5; ++i) {
			const dx = Math.round(Math.random() * 7) - 3;
			const dy = Math.round(Math.random() * 4) + 1;
			droplets.push(new Droplet(this.x, this.y, dx, dy, 1, this.color));
		  }  
		};
	}
	
	const randomColor=()=>{
		let R = Math.floor(Math.random() * 256);
		let G = Math.floor(Math.random() * 256);
		let B = Math.floor(Math.random() * 256);
		return `rgb(${R}, ${G}, ${B})`;
	};
	
	const animate =()=> {
		timer++;
		let count = controls.count === 0 ? 0 : Math.floor(Math.random() * (controls.count + 5) + controls.count);
		if (timer % count === 0) {
			const x = Math.floor(Math.random() * canvas.width);
			const y = -5;
			const size = Math.floor(Math.random() * 6) + 2;
			const shade =  Math.random();
			drops.push(new Drop(x,y,size,`rgba(80,160,253,${shade})`,2));
		}
		requestAnimationFrame(animate);
		c.fillStyle = `rgba(33,33,33,${-controls.tail / 10})`;
		c.fillRect(0,0,canvas.width, canvas.height);
		
		drops.forEach((drop,index) => {
			drop.update();
			if(drop.y >= (canvas.height-10)) {
				drop.splash();
				drops.splice(index,1);
			}
		});
		
		droplets.forEach((droplet, index) => {
		droplet.update();
		if (droplet.y >= canvas.height)
			droplets.splice(index, 1);
	  });
	};
	
	
	animate();
	
	};