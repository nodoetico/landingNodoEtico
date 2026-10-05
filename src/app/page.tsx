import Encabezado from "@/components/Encabezado";
import SeccionHero from "@/components/SeccionHero";
import SeccionServicios from "@/components/SeccionServicios";
import SeccionPorQueElegirnos from "@/components/SeccionPorQueElegirnos";
import SeccionTecnologias from "@/components/SeccionTecnologias";
import SeccionContacto from "@/components/SeccionContacto";
import PiePagina from "@/components/PiePagina";
import BotonWhatsApp from "@/components/BotonWhatsApp";
import DatosEstructurados from "@/components/DatosEstructurados";

/**
 * Página principal - Landing Page NODO ÉTICO
 * Ensambla todas las secciones de la landing page
 */
export default function PaginaPrincipal() {
  return (
    <>
      {/* Datos estructurados para buscadores */}
      <DatosEstructurados />

      <Encabezado />
      <main id="contenido">
        <SeccionHero />
        <SeccionServicios />
        <SeccionPorQueElegirnos />
        <SeccionTecnologias />
        <SeccionContacto />
      </main>
      <PiePagina />
      <BotonWhatsApp />
    </>
  );
}