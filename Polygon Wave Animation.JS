const canvas = document.getElementById('polygonCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;


        let polygons = [];
        const maxPolygons = 100;


        class Polygon {
            constructor(x, y, sides, radius, color) {
                this.x = x;
                this.y = y;
                this.sides = sides;
                this.radius = radius;
                this.growthRate = 1 + Math.random() * 2;
                this.alpha = 1;
                this.color = color;
            }


            draw() {
                ctx.save();
                ctx.beginPath();
                ctx.translate(this.x, this.y);
                ctx.globalAlpha = this.alpha;
                ctx.moveTo(this.radius, 0);
                for (let i = 1; i < this.sides; i++) {
                    const angle = (i * 2 * Math.PI) / this.sides;
                    ctx.lineTo(this.radius * Math.cos(angle), this.radius * Math.sin(angle));
                }
                ctx.closePath();
                ctx.strokeStyle = this.color;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            }


            update() {
                this.radius += this.growthRate;
                this.alpha -= 0.005;
                this.draw();
            }


            isDead() {
                return this.alpha <= 0;
            }
        }


        function addPolygon() {
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            const sides = Math.floor(Math.random() * 3) + 3;
            const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
            polygons.push(new Polygon(x, y, sides, 10, color));
            if (polygons.length > maxPolygons) {
                polygons.shift();
            }
        }


        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            polygons.forEach((polygon, index) => {
                polygon.update();
                if (polygon.isDead()) {
                    polygons.splice(index, 1);
                }
            });
            requestAnimationFrame(animate);
        }


        setInterval(addPolygon, 200);
        animate();


        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });