/**
 * @file .eslintrc.cjs
 * @description Reglas ESLint estrictas para Next + TS.
 * @responsibilities Enforzar buenas prácticas, prohibir @ts-ignore, y ordenar imports.
 * @dependencies eslint, eslint-config-next, @typescript-eslint.
 */
module.exports = {
  root: true, // raíz del proyecto
  parser: '@typescript-eslint/parser', // parser TS
  plugins: ['@typescript-eslint'], // plugin TS
  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended', 'prettier'], // presets
  rules: {
    // Prohíbe por completo usar // @ts-ignore (y similares se permiten por defecto)
    '@typescript-eslint/ban-ts-comment': [
      'error',
      { 'ts-ignore': true, 'ts-expect-error': false, 'ts-nocheck': false, 'ts-check': false }
    ],
    '@typescript-eslint/explicit-function-return-type': 'off', // legibilidad
    '@typescript-eslint/no-explicit-any': 'error', // sin any
    'no-console': ['warn', { allow: ['warn', 'error'] }], // limita console
    'prefer-const': 'error', // const preferido
    eqeqeq: ['error', 'always'] // igualdad estricta
  }
};
