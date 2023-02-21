let img;

let density = "NDS324R24°“ë“Çë“Çë}ëø—“Ç“Çë“îë“ëÇ“32A/./:÷÷÷…∞∞ÏπƒÙÒ∂ƒîÒƒ€êÙƒπ∂µƒµÒ∂ƒÙÏ@êê"
function preload(){
  fox = loadImage('f-w.jpeg')
}

function setup(){
  createCanvas(800, 800)
}

function draw(){
  background(50)
  image(img, 0, 0, 500, 300)

  let w = width / img.width;
  let h = height / img.height;

  // img.loadPixels();

  // for (let x = 0; x < img.width; x++){
  //   for(let y=0; y < img.height; y++){
  //     const pixelPos = (x * y * img.width)* 4;
  //     const r = img.pixels[pixelPos + 0];
  //     const g = img.pixels[pixelPos + 1];
  //     const b = img.pixels[pixelPos + 2];
  //     const avg_brigthness = (r+g+b) / 3;

  //     fill(255)

  //     const density_charIndex = floor(map(avg_brigthness, 0, 255, density.length, 0));

  //     text(density.charAt(density_charIndex), x * w + w * 0.5, y * h + y * h * 0.5)
  //   }
  // }
}