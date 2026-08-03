// SUT de demostracion para el QA Agentico.
// Aplicacion minima de banca con defectos PLANTADOS A PROPOSITO.
// No es codigo de produccion y no debe reutilizarse como base de nada.
import { createServer } from "node:http";

const PORT = process.env.PORT || 3000;

const DEUDAS = [
  { concepto: "Tarjeta de credito", monto: 150000 },
  { concepto: "Credito de consumo", monto: 50000 },
];

// DEFECTO PLANTADO 1: el total ignora todas las deudas salvo la primera.
// Lo correcto seria sumar todos los montos.
function totalDeudas() {
  return DEUDAS[0].monto;
}

function page(title, body) {
  return `<!doctype html>
<html lang="es">
<head><meta charset="utf-8"><title>MiBanco - ${title}</title></head>
<body>
  <header><h1>MiBanco</h1></header>
  <main>${body}</main>
  <footer><small>MiBanco 2026 - demo</small></footer>
</body>
</html>`;
}

const INICIO = page(
  "Inicio",
  `
    <p id="saludo">Bienvenido. Revisa tu saldo y paga tus cuentas.</p>
    <p id="saldo">Saldo disponible: $320.000</p>
    <a id="ver-deudas" href="/deudas">Ver mis deudas</a>
  `,
);

function deudasPage() {
  const filas = DEUDAS.map(
    (d) => `<tr><td>${d.concepto}</td><td>$${d.monto.toLocaleString("es-CL")}</td></tr>`,
  ).join("");
  return page(
    "Deudas",
    `
    <table id="tabla-deudas">
      <tr><th>Concepto</th><th>Monto</th></tr>
      ${filas}
      <tr><th>Total</th><th id="total">$${totalDeudas().toLocaleString("es-CL")}</th></tr>
    </table>
    <form action="/pagar" method="post">
      <button id="pagar" type="submit">Pagar todo</button>
    </form>
  `,
  );
}

const server = createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("ok");
    return;
  }

  if (req.url === "/deudas") {
    res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
    res.end(deudasPage());
    return;
  }

  // DEFECTO PLANTADO 2: la ruta de pago revienta con 500 en vez de procesar el
  // pago o devolver una confirmacion. El boton "Pagar todo" del formulario cae aca.
  if (req.url === "/pagar") {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("Internal Server Error: pagos no implementado");
    return;
  }

  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(INICIO);
});

server.listen(PORT, () => {
  console.log(`SUT fit-qa-demo-sut escuchando en http://localhost:${PORT}`);
});
