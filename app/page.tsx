/**
 * @file app/page.tsx
 * @description Redirección simple a la ruta /atm.
 * @responsibilities Navegar automáticamente a la pantalla principal.
 * @dependencies next/navigation.
 * @diagram [Root] -> redirect(/atm)
 */
import { redirect } from 'next/navigation'; // redirect

export default function Root() {
  redirect('/atm'); // redirige
}
