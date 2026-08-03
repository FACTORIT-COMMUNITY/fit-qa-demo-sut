# fit-qa-demo-sut

Aplicacion de banca minima que se usa como **sistema bajo prueba** en las demostraciones del
QA Agentico. No es codigo de produccion.

## Como levantarla

```bash
npm start
# http://localhost:3000
```

## Rutas

| Ruta | Que hace |
|---|---|
| `/` | Pagina de inicio con el saldo |
| `/deudas` | Tabla de deudas con su total y el boton de pago |
| `/pagar` | Procesa el pago |
| `/health` | Sonda de salud |

## Defectos plantados a proposito

Esta aplicacion contiene dos defectos deliberados, para que el agente de QA tenga algo real que
encontrar y reportar. **No corregirlos**: si se corrigen, la demostracion deja de tener hallazgos.

1. **El total de deudas esta mal calculado.** `/deudas` muestra como total solo el monto de la
   primera deuda e ignora el resto (`totalDeudas()` en `server.mjs`). Con dos deudas de $150.000 y
   $50.000, el total deberia ser $200.000 y muestra $150.000.
2. **El boton "Pagar todo" rompe la aplicacion.** El formulario de `/deudas` apunta a `/pagar`, que
   responde 500 en lugar de procesar el pago o devolver una confirmacion.
