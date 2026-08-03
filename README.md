# fit-qa-demo-sut

Aplicacion de banca minima que sirve como **SUT** en las demostraciones del QA Agentico de
Factor IT. No es un producto ni codigo de referencia: es el conejillo de indias.

## Que es un SUT

**SUT** = *System Under Test*, en espanol **sistema bajo prueba**. Es el termino estandar de
ingenieria de software para nombrar **la aplicacion que se esta probando**, para distinguirla con
claridad de las herramientas que la prueban.

La distincion importa porque en una demostracion hay siempre dos programas corriendo y es facil
confundirlos:

| | Quien es | Que hace |
|---|---|---|
| **El SUT** | Este repositorio | Es la aplicacion probada. Tiene los defectos. No sabe que la estan probando |
| **El agente de QA** | `fit-qa-agent-lg` | Explora el SUT, escribe los casos, los ejecuta, evalua los fallos y reporta los defectos |
| **La plataforma** | `fit-qa-agentic-platform` | Lanza al agente, observa la corrida y muestra los resultados |

Un buen SUT de demostracion tiene que cumplir tres cosas: ser **pequeno** (para que la corrida sea
rapida y barata), tener **defectos conocidos de antemano** (para poder verificar si el agente los
encontro o no) y ser **realista** en su forma (una app web con rutas, formularios y datos), para
que el ejercicio se parezca a un caso de verdad.

## Como levantarla

No tiene dependencias: solo Node.

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
encontrar y reportar.

> [!WARNING]
> **No corregir estos defectos.** Si se arreglan, la demostracion deja de tener hallazgos y el
> ejercicio pierde sentido. Este repositorio existe para estar roto.

1. **El total de deudas esta mal calculado.** `/deudas` muestra como total solo el monto de la
   primera deuda e ignora el resto (`totalDeudas()` en `server.mjs`). Con dos deudas de $150.000 y
   $50.000, el total deberia ser $200.000 y muestra $150.000.
2. **El boton "Pagar todo" rompe la aplicacion.** El formulario de `/deudas` apunta a `/pagar`, que
   responde 500 en lugar de procesar el pago o devolver una confirmacion.

## Que encontro el agente

En la corrida del 2026-08-03 el agente genero 24 casos, ejecuto todos, detecto 6 defectos reales y
abrio una issue por cada uno **sin intervencion humana**. Encontro los dos defectos plantados y,
ademas, cuatro problemas que no estaban plantados.

Las issues de este repositorio son esas: no fueron escritas por una persona. En varias identifica
la causa raiz con archivo y linea; por ejemplo, sobre el total mal sumado:

> *"Root cause verified in source: `server.mjs:15-17` defines
> `function totalDeudas() { return DEUDAS[0].monto; }`, returning only the first element's amount."*
