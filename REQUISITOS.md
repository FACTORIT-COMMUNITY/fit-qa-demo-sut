# MiBanco — Requisitos funcionales

Documento de requerimientos del sistema **MiBanco**, versión 1.0.

> [!important] Para qué existe este documento
> Es la entrada del agente de QA: de acá salen los casos de prueba. Cada requisito tiene un
> identificador estable (`RF-01`…) para que un caso pueda citarlo y para que se pueda verificar
> qué requisito quedó sin cubrir.
>
> **Varios de estos requisitos están deliberadamente incumplidos por la aplicación.** Es un
> sistema de demostración: su valor está en que un agente encuentre la diferencia entre lo que
> este documento promete y lo que el código hace.

## Alcance

MiBanco es un portal de consulta de deudas y pago para clientes de banca personal. Cubre tres
pantallas: inicio con saldo, detalle de deudas, y confirmación de pago.

Fuera de alcance: autenticación, transferencias a terceros, y cualquier operación sobre cuentas
distintas de la del titular.

## Requisitos

### RF-01 — La portada muestra el saldo disponible

La página de inicio (`/`) muestra el saldo disponible del titular, con el símbolo de moneda y
separador de miles en formato chileno.

**Criterio de aceptación:** `GET /` responde 200 y el cuerpo contiene un elemento con el saldo
formateado.

### RF-02 — El estado de salud es consultable

El sistema expone `/health` para verificación de disponibilidad, y responde `ok` en texto plano.

**Criterio de aceptación:** `GET /health` responde 200 con cuerpo exactamente `ok`.

### RF-03 — El detalle de deudas lista todas las deudas vigentes

`/deudas` muestra una tabla con una fila por deuda, con concepto y monto.

**Criterio de aceptación:** cada deuda vigente del titular aparece como una fila de la tabla.

### RF-04 — El total de deudas es la suma de todas las deudas

La fila de total de `/deudas` muestra **la suma de los montos de todas las filas listadas**.

**Criterio de aceptación:** el valor del total es igual a la suma aritmética de los montos de la
tabla. Con dos deudas de $150.000 y $50.000, el total debe ser **$200.000**.

### RF-05 — Pagar todo confirma la operación

El botón "Pagar todo" de `/deudas` registra el pago y lleva a una página de confirmación que
indica el monto pagado.

**Criterio de aceptación:** la operación responde 200 y muestra una confirmación legible. **En
ningún caso el usuario debe ver un error del servidor.**

### RF-06 — Una ruta inexistente responde 404

Cualquier ruta no contemplada responde con código 404 y una página que ofrece volver al inicio.

**Criterio de aceptación:** `GET /cualquier-cosa` responde **404**, no 200.

### RF-07 — El sitio está en español

Todo el texto visible está en español, incluidos los mensajes de error.

**Criterio de aceptación:** ningún texto de interfaz aparece en otro idioma.

### RF-08 — Los montos usan formato chileno

Todo monto se muestra con separador de miles con punto y símbolo `$` antepuesto.

**Criterio de aceptación:** `$150.000`, no `$150,000` ni `150000`.

## Correspondencia con los defectos plantados

> [!warning] No corregir estos defectos
> Son el objeto de la demostración. Corregirlos deja al agente sin nada que encontrar.

| Requisito | Estado | Defecto |
|---|---|---|
| `RF-04` | **Incumplido** | `totalDeudas()` devuelve solo el monto de la primera deuda: muestra $150.000 donde corresponde $200.000 |
| `RF-05` | **Incumplido** | `/pagar` responde 500 en vez de confirmar la operación |
| `RF-06` | **Incumplido** | Una ruta desconocida responde 200 con la portada, en vez de 404 |
| `RF-01`, `RF-02`, `RF-03`, `RF-07`, `RF-08` | Cumplido | — |

Tres requisitos incumplidos y cinco cumplidos: suficiente para que un plan corto tenga casos de
las dos clases, y para que un agente que reporte "todo bien" quede en evidencia.
