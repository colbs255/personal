import generatePlantUmlSvg from "@/lib/plantuml";

type PlantUMLProps = {
    source: string;
};

export default function PlantUML({ source }: PlantUMLProps) {
    const src = generatePlantUmlSvg(source);
    return (
        <div className="flex justify-center">
            <img src={src} className="justify-center" alt="PlantUML diagram" />
        </div>
    );
}
