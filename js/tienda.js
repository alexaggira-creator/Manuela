/**
 * Voltaica - Soluciones Energéticas Inteligentes
 * js/tienda.js
 * Cumple:
 * - Arreglo de 10 objetos con categorías, precios y potencias
 * - Uso estricto de const y let (sin var)
 * - Mínimo 4 funciones propias:
 *     1. calcularAhorroKWhMes(potenciaVieja, potenciaNueva, horasDia)
 *     2. calcularAhorroDineroMes(ahorroKWh, costoKWh)
 *     3. formatearMoneda(valor)
 *     4. obtenerNombreCategoria(catId)
 *     5. calcularMesesRetorno(inversion, ahorroMensual)
 * - Renderizado en DOM con bucle y template strings
 * - Filtros por botón y buscador reactivo
 * - Carrito con resumen, meses de retorno y vaciado
 */

// Constante de costo promedio energía en Colombia durante El Niño 2026 (aprox. $1,050 COP por kWh)
const PRECIO_KWH_COLOMBIA = 1050;

// Requisito 6: Arreglo de objetos literales (10 productos, 4 categorías)
const productos = [
  {
    id: 1,
    nombre: "Refrigerador Inverter No Frost 400L",
    categoria: "refrigeracion",
    precio: 2450000,
    potenciaVieja: 350, // Watts equipo convencional
    potenciaNueva: 110, // Watts equipo Inverter A+++
    horasDia: 24,       // Horas de ciclo diario
    imagen: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=600&q=80",
    descripcion: "Compresor Digital Inverter con 60% de reducción en consumo constante."
  },
  {
    id: 2,
    nombre: "Aire Acondicionado Inverter 12000 BTU",
    categoria: "climatizacion",
    precio: 1890000,
    potenciaVieja: 1400,
    potenciaNueva: 550,
    horasDia: 8,
    imagen: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80",
    descripcion: "Gas ecológico R32 y tecnología Smart Inverter para olas de calor."
  },
  {
    id: 3,
    nombre: "Lavadora Carga Frontal EcoBubble 18kg",
    categoria: "lavado",
    precio: 2199000,
    potenciaVieja: 800,
    potenciaNueva: 320,
    horasDia: 3,
    imagen: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
    descripcion: "Ciclos de agua fría con alta penetración y motor de tracción directa."
  },
  {
    id: 4,
    nombre: "Panel Solar Monocristalino 550W Tier 1",
    categoria: "solar",
    precio: 780000,
    potenciaVieja: 550, // Generación de energía limpia que sustituye red
    potenciaNueva: 0,
    horasDia: 5,
    imagen: "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=600&q=80",
    descripcion: "Células PERC de alta eficiencia incluso en días de alta radiación solar."
  },
  {
    id: 5,
    nombre: "Microinversor Solar Interconectado 800W",
    categoria: "solar",
    precio: 950000,
    potenciaVieja: 800,
    potenciaNueva: 50,
    horasDia: 6,
    imagen: "https://images.unsplash.com/photo-1559302504-64aae6ca6b6d?auto=format&fit=crop&w=600&q=80",
    descripcion: "Convierte corriente directa en alterna para autoconsumo residencial."
  },
  {
    id: 6,
    nombre: "Ventilador de Techo DC Ultrasilencioso",
    categoria: "climatizacion",
    precio: 360000,
    potenciaVieja: 85,
    potenciaNueva: 28,
    horasDia: 10,
    imagen: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?auto=format&fit=crop&w=600&q=80",
    descripcion: "Motor de corriente directa DC, 6 velocidades y consumo ultra bajo."
  },
  {
    id: 7,
    nombre: "Calentador de Agua Solar 150L Presurizado",
    categoria: "solar",
    precio: 2100000,
    potenciaVieja: 2200,
    potenciaNueva: 0,
    horasDia: 2,
    imagen: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
    descripcion: "Tubos de vacío de alta absorción, agua caliente sin gastar electricidad."
  },
  {
    id: 8,
    nombre: "Nevera Compacta para Estudio 210L",
    categoria: "refrigeracion",
    precio: 1350000,
    potenciaVieja: 220,
    potenciaNueva: 75,
    horasDia: 24,
    imagen: "https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=600&q=80",
    descripcion: "Ideal para monoambientes y oficinas, sello de eficiencia energética RETIQ A."
  },
  {
    id: 9,
    nombre: "Aire Acondicionado Portátil Dual Eco 9000 BTU",
    categoria: "climatizacion",
    precio: 1450000,
    potenciaVieja: 1200,
    potenciaNueva: 620,
    horasDia: 6,
    imagen: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=600&q=80",
    descripcion: "Movilidad total con temporizador inteligente para evitar picos tarifarios."
  },
  {
    id: 10,
    nombre: "Lavavajillas Compacto 8 Servicios A+++",
    categoria: "lavado",
    precio: 1680000,
    potenciaVieja: 1800,
    potenciaNueva: 700,
    horasDia: 1.5,
    imagen: "https://images.unsplash.com/photo-1585837575652-267c041d77d4?auto=format&fit=crop&w=600&q=80",
    descripcion: "Optimiza consumo de agua y energía frente a lavado manual o tradicional."
  }
];

// Estado global de la aplicación (let para mutaciones controladas)
let carrito = [];
let categoriaActiva = "todas";
let busquedaActiva = "";

// ==========================================================================
// FUNCIONES PROPIAS DE CÁLCULO Y UTILIDADES (Requisito 6)
// ==========================================================================

/**
 * Función 1: Calcula el ahorro mensual en Kilovatios-hora (kWh/mes)
 * Fórmula: ((Potencia Vieja - Potencia Nueva) * Horas/día * 30 días) / 1000 W por kW
 */
function calcularAhorroKWhMes(potenciaVieja, potenciaNueva, horasDia) {
  const diferenciaWatts = Math.max(0, potenciaVieja - potenciaNueva);
  const consumoKWhMes = (diferenciaWatts * horasDia * 30) / 1000;
  return Math.round(consumoKWhMes * 10) / 10; // 1 decimal
}

/**
 * Función 2: Calcula el ahorro mensual estimado en pesos colombianos ($ COP)
 */
function calcularAhorroDineroMes(ahorroKWh, costoKWh = PRECIO_KWH_COLOMBIA) {
  return Math.round(ahorroKWh * costoKWh);
}

/**
 * Función 3: Da formato de moneda colombiana a un valor numérico
 */
function formatearMoneda(valor) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(valor);
}

/**
 * Función 4: Retorna el nombre legible y presentable de una categoría
 */
function obtenerNombreCategoria(catId) {
  const categorias = {
    climatizacion: "Climatización",
    refrigeracion: "Refrigeración",
    solar: "Energía Solar",
    lavado: "Lavado Eficiente"
  };
  return categorias[catId] || "General";
}

/**
 * Función 5 (Bonus): Calcula en cuántos meses se recupera la inversión inicial
 */
function calcularMesesRetorno(inversionTotal, ahorroMensualTotal) {
  if (ahorroMensualTotal <= 0) return "N/A";
  const meses = inversionTotal / ahorroMensualTotal;
  return meses.toFixed(1);
}

// ==========================================================================
// RENDERIZADO DEL CATÁLOGO EN EL DOM (Requisito 6)
// ==========================================================================

function renderizarCatalogo() {
  const contenedor = document.getElementById("catalogo-productos");
  const contadorEl = document.getElementById("contador-productos");
  
  if (!contenedor) return;

  // Filtrado de productos por categoría y por texto de búsqueda
  const productosFiltrados = productos.filter((prod) => {
    const coincideCategoria = categoriaActiva === "todas" || prod.categoria === categoriaActiva;
    const coincideBusqueda = prod.nombre.toLowerCase().includes(busquedaActiva.toLowerCase()) ||
                             prod.descripcion.toLowerCase().includes(busquedaActiva.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  if (contadorEl) {
    contadorEl.textContent = `${productosFiltrados.length} equipos encontrados`;
  }

  // Si no hay productos que coincidan
  if (productosFiltrados.length === 0) {
    contenedor.innerHTML = `
      <div class="col-12 text-center py-5">
        <p class="text-muted fs-5">No se encontraron productos con los criterios seleccionados.</p>
        <button class="btn btn-outline-success" id="btn-limpiar-busqueda">Ver todos los productos</button>
      </div>
    `;
    const btnLimpiar = document.getElementById("btn-limpiar-busqueda");
    if (btnLimpiar) {
      btnLimpiar.addEventListener("click", () => {
        categoriaActiva = "todas";
        busquedaActiva = "";
        const inputBuscar = document.getElementById("buscador-input");
        if (inputBuscar) inputBuscar.value = "";
        actualizarBotonesFiltro();
        renderizarCatalogo();
      });
    }
    return;
  }

  // Generación con template strings y bucle en el DOM
  let htmlTarjetas = "";
  for (let i = 0; i < productosFiltrados.length; i++) {
    const p = productosFiltrados[i];
    const ahorroKWh = calcularAhorroKWhMes(p.potenciaVieja, p.potenciaNueva, p.horasDia);
    const ahorroDinero = calcularAhorroDineroMes(ahorroKWh);

    htmlTarjetas += `
      <div class="card-producto">
        <img src="${p.imagen}" alt="${p.nombre}" class="img-fluid" style="height: 190px; width: 100%; object-fit: cover;">
        <div class="card-cuerpo">
          <span class="badge-ahorro mb-2 align-self-start">${obtenerNombreCategoria(p.categoria)}</span>
          <h5 class="card-title fs-6 fw-bold mb-1">${p.nombre}</h5>
          <p class="text-muted small mb-2">${p.descripcion}</p>
          
          <div class="p-2 mb-3 rounded" style="background-color: #f1f8f4; border-left: 3px solid #198754;">
            <div class="d-flex justify-content-between small">
              <span>Ahorro mensual:</span>
              <strong class="text-success">${ahorroKWh} kWh/mes</strong>
            </div>
            <div class="d-flex justify-content-between small">
              <span>Dinero ahorrado:</span>
              <strong class="text-success">${formatearMoneda(ahorroDinero)}/mes</strong>
            </div>
          </div>

          <div class="mt-auto d-flex justify-content-between align-items-center">
            <span class="fw-bold fs-5 text-dark">${formatearMoneda(p.precio)}</span>
            <button class="btn btn-primary btn-sm btn-agregar" data-id="${p.id}">
              + Agregar
            </button>
          </div>
        </div>
      </div>
    `;
  }

  contenedor.innerHTML = htmlTarjetas;

  // Asignar eventos de click a los botones generados
  const botonesAgregar = contenedor.querySelectorAll(".btn-agregar");
  botonesAgregar.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const prodId = parseInt(e.currentTarget.getAttribute("data-id"));
      agregarAlCarrito(prodId);
    });
  });
}

// ==========================================================================
// PROGRAMACIÓN DEL CARRITO DE COMPRAS (Requisito 7)
// ==========================================================================

function agregarAlCarrito(productoId) {
  const productoSeleccionado = productos.find((p) => p.id === productoId);
  if (!productoSeleccionado) return;

  const itemExistente = carrito.find((item) => item.id === productoId);
  if (itemExistente) {
    itemExistente.cantidad += 1;
  } else {
    carrito.push({
      ...productoSeleccionado,
      cantidad: 1
    });
  }

  actualizarCarritoDOM();
}

function cambiarCantidadItem(productoId, delta) {
  const item = carrito.find((i) => i.id === productoId);
  if (!item) return;

  item.cantidad += delta;
  if (item.cantidad <= 0) {
    carrito = carrito.filter((i) => i.id !== productoId);
  }
  actualizarCarritoDOM();
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarritoDOM();
}

function actualizarCarritoDOM() {
  const listaCarrito = document.getElementById("lista-carrito");
  const totalCarritoEl = document.getElementById("total-carrito");
  const ahorroTotalEl = document.getElementById("ahorro-total-carrito");
  const retornoEl = document.getElementById("tiempo-retorno-carrito");
  const contadorNavEl = document.getElementById("badge-carrito-nav");

  if (!listaCarrito) return;

  // Cálculos totales
  let totalCompra = 0;
  let ahorroMensualDineroTotal = 0;
  let ahorroMensualKWhTotal = 0;
  let cantidadTotalProductos = 0;

  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    totalCompra += item.precio * item.cantidad;
    cantidadTotalProductos += item.cantidad;

    const ahorroKWhItem = calcularAhorroKWhMes(item.potenciaVieja, item.potenciaNueva, item.horasDia);
    ahorroMensualKWhTotal += ahorroKWhItem * item.cantidad;
    ahorroMensualDineroTotal += calcularAhorroDineroMes(ahorroKWhItem) * item.cantidad;
  }

  // Actualizar badge en la navegación si existe
  if (contadorNavEl) {
    contadorNavEl.textContent = cantidadTotalProductos;
  }

  // Si está vacío
  if (carrito.length === 0) {
    listaCarrito.innerHTML = `
      <div class="text-center py-4 text-muted">
        <p class="mb-1">Tu carrito de ahorro está vacío.</p>
        <small>Agrega equipos eficientes para calcular tu ahorro.</small>
      </div>
    `;
    if (totalCarritoEl) totalCarritoEl.textContent = formatearMoneda(0);
    if (ahorroTotalEl) ahorroTotalEl.textContent = "$0 COP/mes";
    if (retornoEl) retornoEl.textContent = "0 meses";
    return;
  }

  // Generar lista de items
  let htmlItems = "";
  for (let i = 0; i < carrito.length; i++) {
    const item = carrito[i];
    const subtotal = item.precio * item.cantidad;

    htmlItems += `
      <div class="item-carrito">
        <div style="flex: 1; padding-right: 10px;">
          <h6 class="mb-0 text-truncate" style="max-width: 170px;" title="${item.nombre}">${item.nombre}</h6>
          <small class="text-muted">${formatearMoneda(item.precio)} c/u</small>
        </div>
        <div class="d-flex align-items-center gap-1">
          <button class="btn btn-outline-secondary btn-sm px-2 py-0 btn-restar" data-id="${item.id}">-</button>
          <span class="px-2 fw-bold">${item.cantidad}</span>
          <button class="btn btn-outline-secondary btn-sm px-2 py-0 btn-sumar" data-id="${item.id}">+</button>
        </div>
        <div class="text-end" style="min-width: 85px;">
          <strong class="d-block">${formatearMoneda(subtotal)}</strong>
        </div>
      </div>
    `;
  }

  listaCarrito.innerHTML = htmlItems;

  // Botones de sumar y restar
  listaCarrito.querySelectorAll(".btn-sumar").forEach((b) => {
    b.addEventListener("click", () => {
      cambiarCantidadItem(parseInt(b.getAttribute("data-id")), 1);
    });
  });

  listaCarrito.querySelectorAll(".btn-restar").forEach((b) => {
    b.addEventListener("click", () => {
      cambiarCantidadItem(parseInt(b.getAttribute("data-id")), -1);
    });
  });

  // Mostrar totales y cálculo de retorno
  if (totalCarritoEl) totalCarritoEl.textContent = formatearMoneda(totalCompra);
  if (ahorroTotalEl) {
    ahorroTotalEl.innerHTML = `<strong>${formatearMoneda(ahorroMensualDineroTotal)}/mes</strong> <span class="badge bg-success">(${Math.round(ahorroMensualKWhTotal)} kWh/mes)</span>`;
  }
  if (retornoEl) {
    const meses = calcularMesesRetorno(totalCompra, ahorroMensualDineroTotal);
    retornoEl.textContent = `${meses} meses aprox.`;
  }
}

// ==========================================================================
// FILTROS Y EVENTOS (Requisito 7)
// ==========================================================================

function actualizarBotonesFiltro() {
  const botones = document.querySelectorAll(".contenedor-filtros button");
  botones.forEach((btn) => {
    if (btn.getAttribute("data-categoria") === categoriaActiva) {
      btn.classList.add("activo");
    } else {
      btn.classList.remove("activo");
    }
  });
}

function inicializarEventos() {
  // Filtros por categoría (click y condicional)
  const contenedorFiltros = document.querySelector(".contenedor-filtros");
  if (contenedorFiltros) {
    contenedorFiltros.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const cat = e.target.getAttribute("data-categoria");
        categoriaActiva = cat;
        actualizarBotonesFiltro();
        renderizarCatalogo();
      }
    });
  }

  // Buscador reactivo (evento input)
  const inputBuscador = document.getElementById("buscador-input");
  if (inputBuscador) {
    inputBuscador.addEventListener("input", (e) => {
      busquedaActiva = e.target.value.trim();
      renderizarCatalogo();
    });
  }

  // Botón para vaciar carrito
  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      vaciarCarrito();
    });
  }

  // Botón simular compra
  const btnComprar = document.getElementById("btn-comprar");
  if (btnComprar) {
    btnComprar.addEventListener("click", () => {
      if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega equipos eficientes primero.");
        return;
      }
      alert("¡Felicitaciones! Has dado un paso clave para mitigar las tarifas de El Niño 2026. Te contactaremos para coordinar tu entrega e instalación.");
      vaciarCarrito();
    });
  }
}

// Inicialización al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  renderizarCatalogo();
  actualizarCarritoDOM();
  inicializarEventos();
});

