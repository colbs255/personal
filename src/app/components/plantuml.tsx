import generatePlantUmlSvg from "@/lib/plantuml";

type PlantUMLProps = {
    source: string;
};

export default function PlantUML({ source }: PlantUMLProps) {
    const src = generatePlantUmlSvg(source);
    return <img src={src} alt="PlantUML diagram" />;
}
