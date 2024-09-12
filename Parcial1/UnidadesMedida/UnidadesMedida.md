# Unidades de Medida en CSS

En CSS, las unidades de medida se utilizan para definir el tamaño de diversos elementos de la página web, como márgenes, padding, fuentes, anchos, alturas, etc. Existen varias unidades de medida, que se dividen en dos categorías principales:

    Unidades absolutas.
    Unidades relativas.

Éstas son algunas de las más comunes:

## Tabla de Unidades de Medida en CSS

| Unidad | Descripción                                                                 | Tipo       | Ejemplo de uso              |
|--------|-----------------------------------------------------------------------------|------------|-----------------------------|
| `px`   | **Píxeles**. Unidad absoluta que representa un punto en la pantalla.         | Absoluta   | `padding: 20px;`            |
| `%`    | **Porcentaje**. Relativa al valor del contenedor padre.                      | Relativa   | `height: 80%;`              |
| `em`   | Relativa al tamaño de la fuente del elemento padre.                         | Relativa   | `margin-left: 1.5em;`       |
| `rem`  | Relativa al tamaño de la fuente raíz (`html`).                              | Relativa   | `border-radius: 0.75rem;`   |
| `vw`   | **Viewport Width**. Relativa al ancho de la ventana del navegador.           | Relativa   | `min-width: 30vw;`          |
| `vh`   | **Viewport Height**. Relativa a la altura de la ventana del navegador.       | Relativa   | `max-height: 50vh;`         |
| `vmin` | Relativa al menor valor entre el ancho o la altura de la ventana del navegador. | Relativa | `font-size: 3vmin;`         |
| `vmax` | Relativa al mayor valor entre el ancho o la altura de la ventana del navegador. | Relativa | `min-height: 70vmax;`       |
| `cm`   | **Centímetros**. Unidad absoluta de medida física.                          | Absoluta   | `width: 15cm;`              |
| `mm`   | **Milímetros**. Unidad absoluta de medida física.                           | Absoluta   | `margin-top: 10mm;`         |
| `in`   | **Pulgadas**. Unidad absoluta de medida física (1 pulgada = 2.54 cm).        | Absoluta   | `height: 2in;`              |
| `pt`   | **Puntos**. Unidad absoluta de medida (1 punto = 1/72 de pulgada).           | Absoluta   | `font-size: 14pt;`          |
| `pc`   | **Picas**. Unidad absoluta de medida (1 pica = 12 puntos).                   | Absoluta   | `width: 3pc;`               |
| `ch`   | Relativa al ancho del carácter "0" en la fuente del elemento.                | Relativa   | `max-width: 40ch;`          |
| `ex`   | Relativa a la altura de la "x" en la fuente del elemento.                    | Relativa   | `line-height: 2ex;`         |

## Tipos de Unidades

- **Unidades Absolutas**: Las unidades absolutas en CSS son aquellas que tienen un tamaño fijo y no cambian en función de otros factores, como el tamaño de la ventana del navegador o el tamaño de la pantalla del dispositivo. Son útiles cuando se necesita un control preciso sobre el tamaño de un elemento, como márgenes, padding, dimensiones de cajas, fuentes, etc.
  
- **Unidades Relativas**: Las unidades relativas en CSS son aquellas cuyo valor depende del contexto en el que se utilizan. Esto significa que su tamaño puede variar en función de factores como el tamaño de la fuente, el tamaño del contenedor padre o la resolución de la pantalla. Las unidades relativas son fundamentales para crear diseños responsivos y adaptativos, ya que permiten que los elementos se ajusten dinámicamente al entorno en el que se visualizan.
