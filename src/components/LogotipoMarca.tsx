import Image from "next/image";
import logo from "@/assets/logo-claro.png";

/**
 * Logotipo de NODO ÉTICO: emblema circular + nombre en texto.
 * Se usa en el encabezado y en el pie de página.
 */
export default function LogotipoMarca({
  className = "h-9 w-9",
  tamanoTexto = "text-lg",
  preload = false,
}: {
  className?: string;
  tamanoTexto?: string;
  preload?: boolean;
}) {
  return (
    <span className="flex items-center gap-2.5">
      <Image
        src={logo}
        alt=""
        aria-hidden="true"
        width={72}
        height={71}
        className={className}
        {...(preload ? { preload: true } : {})}
      />
      <span
        className={`${tamanoTexto} font-bold tracking-tight text-texto-principal`}
      >
        NODO<span className="text-neon-azul">ÉTICO</span>
      </span>
    </span>
  );
}