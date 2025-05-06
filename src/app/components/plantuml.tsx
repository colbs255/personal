import Script from 'next/script';
import generatePlantUmlSvg from "@/lib/plantuml";

type PlantUMLProps = {
    source: string;
};

export default function PlantUML({ source }: PlantUMLProps) {
    const diagramPath = generatePlantUmlSvg(source);
    return (
        <>
        <div className="flex justify-center">
            <img id={diagramPath.light} src={diagramPath.light} className="justify-center" alt="PlantUML diagram" />
        </div>
        <Script id="theme-switch" strategy="afterInteractive">
        {`
          const img = document.getElementById('${diagramPath.light}');
          const mq = window.matchMedia('(prefers-color-scheme: dark)');
          const update = () => {
            img.src = mq.matches
              ? '${diagramPath.dark}'
              : '${diagramPath.light}';
          };
          mq.addEventListener('change', update);
          update();
        `}
      </Script>
        </>
    );
}
