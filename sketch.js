let irrigando = false;
let umidade = 50;
let gotas = [];
let evaporando = false;
let dica = "";
let historicoUmidade = [];
let flores = [];

function setup() {
  createCanvas(800, 500);
  textFont('Arial');
}

function draw() {
  background(135, 206, 250); // céu

  desenharDivisao();
  chuvaNatural();
  desenharCampo();
  desenharArvoresCrescendo();
  desenharFlores();
  desenharCidade();
  desenharFlorUrbana();
  desenharControles();
  mostrarDica();
  desenharGrafico();

  if (irrigando) {
    umidade = constrain(umidade + 0.1, 0, 100);
    criarGota();
  } else {
    umidade = constrain(umidade - 0.05, 0, 100);
  }

  if (umidade > 80) {
    evaporando = true;
    if (frameCount % 60 === 0) criarFlor();
  } else {
    evaporando = false;
  }

  atualizarGotas();
  atualizarFlores();
  atualizarHistorico();
}

function desenharDivisao() {
  stroke(0);
  strokeWeight(2);
  line(width / 2, 0, width / 2, height);
  noStroke();
}

function desenharCampo() {
  let corSolo;
  if (umidade < 30) corSolo = color(139, 69, 19);
  else if (umidade < 70) corSolo = color(160, 82, 45);
  else corSolo = color(100, 149, 100);

  fill(corSolo);
  rect(0, 300, width / 2, 100);

  fill(0);
  textSize(16);
  text(`Umidade do Solo Rural: ${umidade.toFixed(0)}%`, 10, 30);
}

function desenharCidade() {
  fill(180);
  rect(width / 2, 300, width / 2, 100);

  for (let i = width / 2 + 20; i < width; i += 80) {
    fill(100);
    rect(i, 200, 50, 100);
    fill(255);
    for (let j = 0; j < 3; j++) {
      rect(i + 10, 210 + j * 25, 10, 15);
      rect(i + 30, 210 + j * 25, 10, 15);
    }
  }

  fill(0);
  textSize(16);
  text(`Cidade Sustentável`, width / 2 + 10, 30);

  if (umidade >= 40 && umidade <= 70) {
    dica = "Cultura sustentável urbana: equilíbrio entre natureza e cidade!";
  }
}

function desenharFlorUrbana() {
  let x = width * 0.75;
  let y = 320;
  fill(255, 105, 180);
  ellipse(x, y, 8, 8);
  ellipse(x + 5, y - 5, 8, 8);
  ellipse(x - 5, y - 5, 8, 8);
  ellipse(x, y - 8, 8, 8);
  fill(255, 215, 0);
  ellipse(x, y, 5, 5);
}

function desenharArvoresCrescendo() {
  for (let i = 50; i < width / 2; i += 150) {
    fill(139, 69, 19);
    rect(i, 250, 20, 60);

    let escala = map(umidade, 0, 100, 20, 70);

    fill(34, 139, 34);
    ellipse(i + 10, 250, escala + 20, escala + 20);
    ellipse(i - 10, 240, escala, escala);
    ellipse(i + 30, 240, escala, escala);
    ellipse(i + 10, 230, escala - 10, escala - 10);
  }
}

function desenharFlores() {
  for (let f of flores) {
    fill(255, 105, 180);
    ellipse(f.x, f.y, 8, 8);
    ellipse(f.x + 5, f.y - 5, 8, 8);
    ellipse(f.x - 5, f.y - 5, 8, 8);
    ellipse(f.x, f.y - 8, 8, 8);
    fill(255, 215, 0);
    ellipse(f.x, f.y, 5, 5);
  }
}

function criarFlor() {
  let x = random(50, width / 2 - 50);
  let y = random(310, 390);
  flores.push({ x, y });
}

function atualizarFlores() {
  if (flores.length > 50) {
    flores.splice(0, flores.length - 50);
  }
}

function desenharControles() {
  fill(irrigando ? "lightblue" : "white");
  stroke(0);
  rect(650, 20, 120, 40, 10);
  fill(0);
  noStroke();
  textSize(14);
  textAlign(CENTER, CENTER);
  text(irrigando ? "Irrigando..." : "Ligar Irrigação", 710, 40);
}

function mousePressed() {
  if (mouseX > 650 && mouseX < 770 && mouseY > 20 && mouseY < 60) {
    irrigando = !irrigando;
    dica = irrigando
      ? "Irrigação ligada: as árvores estão crescendo bem!"
      : "Irrigação desligada para economizar água.";
  }
}

function criarGota() {
  if (frameCount % 5 === 0) {
    gotas.push({ x: random(180, 320), y: 100 });
  }
}

function atualizarGotas() {
  fill(0, 0, 255);
  for (let i = gotas.length - 1; i >= 0; i--) {
    let g = gotas[i];
    ellipse(g.x, g.y, 5, 10);
    g.y += 4;
    if (g.y > 300) gotas.splice(i, 1);
  }
}

function mostrarDica() {
  fill(0);
  textSize(14);
  textAlign(LEFT);
  text(dica, 10, height - 20);
}

function chuvaNatural() {
  if (random(1) < 0.01) {
    umidade = constrain(umidade + 1, 0, 100);
    dica = "Chuva natural está ajudando a manter a lavoura!";
  }
}

function atualizarHistorico() {
  if (frameCount % 10 === 0) {
    historicoUmidade.push(umidade);
    if (historicoUmidade.length > 100) {
      historicoUmidade.shift();
    }
  }
}

function desenharGrafico() {
  stroke(0);
  fill(255);
  rect(10, 410, 780, 80);
  noFill();
  stroke(30, 144, 255);
  beginShape();
  for (let i = 0; i < historicoUmidade.length; i++) {
    let x = map(i, 0, 100, 10, 790);
    let y = map(historicoUmidade[i], 0, 100, 490, 410);
    vertex(x, y);
  }
  endShape();
  fill(0);
  textSize(12);
  noStroke();
  text("Histórico de Umidade do Solo", 20, 420);
}

