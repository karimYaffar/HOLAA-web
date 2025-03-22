/***************************************************************************************************
 * Zone JS is required by default for Angular itself.
 */
import 'zone.js';  // Importa zone.js
import 'default-passive-events'

/***************************************************************************************************
 * APPLICATION IMPORTS
 */
// Aquí puedes agregar otros polyfills si es necesario
(window as any)['global'] = window; // Esto es útil para algunas bibliotecas que dependen de `global`