# GUÍA COMPLETA Y DOCUMENTACIÓN DE ENTREGA - EVIDENCIA EA2
## Proyecto: Tienda de Equipos Eficientes frente a El Niño 2026
**Nombre de la Tienda:** Voltaica (Soluciones Energéticas Inteligentes)  
**Modalidad de Trabajo:** Individual  
**Estudiante:** Alexandra Gómez

---

## 1. Integrante y Declaración de Trabajo Individual (Requisito 1 y 2)
- **Estudiante:** **Alexandra Gómez**
- **Modalidad:** Proyecto realizado y sustentado de forma individual.
- **Rol Integral:** Arquitecta Web Fullstack, Diseñadora UI/UX y Desarrolladora Frontend.
- **Aportes y Responsabilidades Desarrolladas:**
  1. **Diseño y Estructura Semántica:** Creación de las 4 páginas completas (`index.html`, `catalogo.html`, `nosotros.html`, `contacto.html`) con HTML5 estricto, accesibilidad y navegación fluida sin enlaces rotos.
  2. **Arquitectura Sass y CSS:** Configuración del parcial modular `scss/_variables.scss`, mixin `@mixin tarjeta-sombra`, personalización de componentes Bootstrap (`.navbar`, `.btn-primary`, `.btn-success`) y responsividad fluida mediante media queries.
  3. **Lógica Algorítmica en JavaScript:** Creación del arreglo de 10 objetos con especificaciones técnicas, motor dinámico de renderizado con template strings en el DOM, filtros reactivos por categoría y buscador predictivo por evento `input`.
  4. **Lógica Financiera y Energética:** Modelado de las fórmulas de ahorro mensual en kWh/mes, dinero ahorrado ($ COP) y tiempo de amortización de la inversión frente a la crisis tarifaria de El Niño 2026.
  5. **Control de Calidad (QA):** Validación W3C de HTML y CSS, depuración de consola en navegador y control de versiones en GitHub con la etiqueta `ea2`.

---

## 2. Portada e Impacto del Fenómeno de El Niño 2026 (Requisito 2)
En `index.html` se fundamenta la tienda con datos reales y justificación técnica:
- **Dato Real 1 (Alza Tarifaria):** Incremento del **38.5%** en el costo del kilovatio-hora residencial en Colombia durante el ciclo crítico de El Niño 2026, pasando de $758 COP a superar los $1,050 COP por kWh (Fuente oficial: CREG y XM).
- **Dato Real 2 (Nivel de Embalses):** Descenso del volumen útil agregado de los embalses hidroeléctricos del país al **29.8%**, situación que forzó al Sistema Interconectado Nacional a recurrir a generación termoeléctrica basada en gas y carbón a costos elevados.
- **Justificación de Inversión:** Un hogar con electrodomésticos tradicionales consume en promedio 340 kWh/mes ($357,000 COP), mientras que con tecnología eficiente (Inverter y solar) reduce su consumo a 145 kWh/mes ($152,250 COP), ahorrando **$204,750 COP mensuales** (más de $2.4 millones al año), lo que permite pagar los equipos en menos de dos años.

---

## 3. Las Tres Formas de Integrar CSS y Justificación Técnica (Requisito 3)

### A. CSS en Línea (Inline CSS)
Se aplica directamente sobre un elemento específico utilizando el atributo `style` de HTML.
- **Ejemplo:**
  ```html
  <p style="color: #107c41; font-size: 16px; font-weight: bold;">Ahorro energético garantizado</p>
  ```
- **Inconveniente:** Dificulta el mantenimiento, ensucia el marcado HTML y no permite la reutilización de reglas en múltiples elementos.

### B. CSS Interno (Internal / Embedded CSS)
Se coloca dentro del bloque `<style>` en el `<head>` del documento HTML.
- **Ejemplo:**
  ```html
  <head>
    <style>
      .alerta-nino {
        background-color: #fff3cd;
        border-left: 5px solid #ef4444;
        padding: 1rem;
      }
    </style>
  </head>
  ```
- **Inconveniente:** Solo afecta al documento actual. Si la tienda tiene 4 páginas, las reglas tendrían que duplicarse en cada archivo.

### C. CSS Externo (External CSS)
Se escribe en un archivo independiente con extensión `.css` (como `css/estilos.css`) y se vincula en el `<head>` de cada página mediante la etiqueta `<link>`.
- **Ejemplo:**
  ```html
  <link rel="stylesheet" href="css/estilos.css">
  ```

### ¿Por qué Voltaica utiliza CSS Externo?
1. **Separación de Responsabilidades:** Separa por completo el contenido y la semántica (HTML) de la capa visual y de presentación (CSS).
2. **Reutilización y Consistencia:** Las 4 páginas del sitio comparten exactamente la misma identidad corporativa sin redundancia de código.
3. **Caché y Rendimiento Web:** El navegador descarga la hoja de estilos una única vez y la almacena en memoria caché local, acelerando drásticamente el cambio de página.
4. **Integración con Preprocesadores:** Permite un flujo de trabajo moderno y profesional mediante Sass (`scss/estilos.scss`), compilando variables, mixins y anidamientos automáticamente a `css/estilos.css`.

---

## 4. Tabla de Selectores y Propiedades CSS Utilizados (Requisito 3)

| Tipo de Selector / Propiedad | Selector en el Código | Archivo y Ubicación | Función y Explicación |
| :--- | :--- | :--- | :--- |
| **Selector de Etiqueta** | `body`, `h1, h2...` | `scss/estilos.scss` (L30) | Define tipografía base, color de fondo general y suavizado de fuentes. |
| **Selector de Clase** | `.seccion-hero`, `.card-producto` | `scss/estilos.scss` (L108, L193) | Estructura las tarjetas del catálogo y el banner principal. |
| **Selector de ID** | `#buscador-input`, `#total-carrito` | `scss/estilos.scss` (L129, L147) | Estiliza la barra reactiva de búsqueda y el totalizador del carrito. |
| **Selector Descendiente** | `.catalogo-grid .card-producto` | `scss/estilos.scss` (L193) | Aplica estilos a las tarjetas contenidas dentro del contenedor Grid. |
| **Selector Hijo Directo (>)**| `.contenedor-filtros > button` | `scss/estilos.scss` (L166) | Aplica estilos exclusivos a los botones que son hijos directos de los filtros. |
| **Selector de Atributo** | `[data-theme="light"]` | `scss/estilos.scss` (L6) | Configura las variables nativas del tema claro. |
| **Selectores Agrupados** | `h1, h2, h3, h4, h5, h6` | `scss/estilos.scss` (L215) | Estandariza peso, color y espaciado de todos los encabezados. |
| **Pseudoclase :hover** | `.navbar-brand:hover`, `.btn-primary:hover` | `scss/estilos.scss` (L60, L88) | Crea efectos de elevación interactiva al pasar el puntero. |
| **Pseudoclase :focus** | `#buscador-input:focus`, `.btn:focus` | `scss/estilos.scss` (L96, L140) | Resalta el campo activo para accesibilidad de teclado. |
| **Pseudoclase :nth-child()** | `.lista-estadisticas li:nth-child(even)` | `scss/estilos.scss` (L222) | Alterna el color de fondo en listas de especificaciones técnicas. |
| **Pseudoclase Adicional** | `button:disabled` | `scss/estilos.scss` (L230) | Deshabilita el cursor y atenúa botones inactivos. |
| **Variables CSS (:root)** | `--color-primario`, `--color-secundario`... | `scss/estilos.scss` (L6-L19) | Paleta de diseño centralizada con más de 6 colores en variables. |
| **Modelo de Caja** | `margin`, `padding`, `border`, `border-radius`, `box-shadow` | Múltiples clases | Define espaciados internos, márgenes, bordes redondeados y sombras suaves. |
| **Flexbox** | `.menu-navegacion`, `.contenedor-filtros` | `scss/estilos.scss` (L154, L163) | Distribuye el menú de navegación y los botones de filtro. |
| **CSS Grid** | `.catalogo-grid` | `scss/estilos.scss` (L186) | Maqueta el catálogo en rejilla responsiva autoajustable. |
| **Transiciones** | `transition: all 0.25s ease...` | `scss/estilos.scss` (L51, L84) | Brinda animaciones fluidas en botones y tarjetas. |

---

## 5. Tabla de Conceptos de JavaScript Utilizados (Requisito 6 y 7)

| Concepto JavaScript | Ejemplo en Código | Archivo y Ubicación | Explicación Técnica |
| :--- | :--- | :--- | :--- |
| **Variables (`const` / `let`)** | `const PRECIO_KWH_COLOMBIA = 1050;`<br>`let carrito = [];` | `js/tienda.js` (L19, L97) | Uso de `const` para constantes inmutables y `let` para el carrito; sin uso de `var`. |
| **Arreglo de Objetos** | `const productos = [{ id: 1, nombre: "...", ... }]` | `js/tienda.js` (L22-L94) | Colección de 10 productos con 4 categorías y potencias comparativas en Watts. |
| **Funciones Propias (mínimo 4)** | 1. `calcularAhorroKWhMes()`<br>2. `calcularAhorroDineroMes()`<br>3. `formatearMoneda()`<br>4. `obtenerNombreCategoria()`<br>5. `calcularMesesRetorno()` | `js/tienda.js` (L108-L148) | Algoritmos de cálculo de consumo, conversión monetaria y tiempo de amortización. |
| **Condicionales** | `if (itemExistente) { ... } else { ... }`<br>`if (ahorroMensualTotal <= 0) return "N/A";` | `js/tienda.js` (L144, L221) | Control de flujo para validar productos en carrito y filtros. |
| **Bucles** | `for (let i = 0; i < productosFiltrados.length; i++)` | `js/tienda.js` (L182, L263) | Itera sobre los productos para generar tarjetas y calcular totales. |
| **Manipulación del DOM** | `document.getElementById("catalogo-productos").innerHTML = htmlTarjetas;` | `js/tienda.js` (L208, L298) | Renderizado dinámico de tarjetas y carrito mediante *template strings*. |
| **Eventos (`click` e `input`)** | `contenedorFiltros.addEventListener("click", ...)`<br>`inputBuscador.addEventListener("input", ...)` | `js/tienda.js` (L314, L327) | Filtrado reactivo en tiempo real al tipear y al pulsar categorías. |

---

## 6. Procedimiento para GitHub y Etiqueta `ea2` (Requisito 9)

```bash
# 1. Asegurar configuración de autoría con tu nombre
git config user.name "Alexandra Gómez"
git config user.email "alexandra.gomez@correo.com"

# 2. Guardar y registrar cambios (mínimo 3 commits requeridos)
git add .
git commit -m "feat: maquetacion semantica HTML5, portada con datos de El Niño y sobre mi"

git add .
git commit -m "style: arquitectura modular Sass, mixin de sombras y personalizacion de Bootstrap"

git add .
git commit -m "feat: motor dinamico en JavaScript, filtros, buscador reactivo y calculo de retorno"

# 3. Vincular con tu repositorio público en GitHub
# (Crea tu repositorio en github.com con el nombre ecotienda-alexandragomez o ecotienda-equipo1)
git remote add origin https://github.com/TU_USUARIO_GITHUB/ecotienda-equipo1.git
git branch -M main
git push -u origin main

# 4. Crear la etiqueta obligatoria de entrega y subirla
git tag ea2
git push origin ea2
```

---

## 7. Estructura Recomendada para el Video de Sustentación (Máximo 5 Minutos)

- **Minuto 0:00 - 0:45:** Presentación personal (**Alexandra Gómez**), mención de la modalidad individual y muestra de la portada (`index.html`) con los 2 datos reales de El Niño 2026.
- **Minuto 0:45 - 2:15:** Muestra del catálogo y carrito en `catalogo.html`: filtrar por categorías, buscar en tiempo real con el buscador, añadir 2 productos al carrito y señalar cómo se calculan automáticamente los meses de retorno de inversión.
- **Minuto 2:15 - 3:15:** Activar las herramientas de desarrollador (F12) en modo celular para mostrar la responsividad: menú apilado, 1 tarjeta por fila y carrito debajo. Mostrar brevemente `nosotros.html` y el formulario de `contacto.html`.
- **Minuto 3:15 - 4:30:** Explicación técnica del código:
  - Mostrar en VS Code el archivo `scss/estilos.scss` y `scss/_variables.scss` (explicar el `@use` y el mixin `@mixin tarjeta-sombra`).
  - Explicar una función de JavaScript en `js/tienda.js` (por ejemplo, `calcularAhorroKWhMes` o `calcularMesesRetorno`).
- **Minuto 4:30 - 5:00:** Muestra del repositorio en GitHub con los commits y la etiqueta `ea2`. Despedida y cierre.
