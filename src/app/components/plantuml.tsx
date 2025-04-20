import generatePlantUmlSvg from "@/lib/plantuml";

type PlantUMLProps = {
    source: string;
};

export default async function PlantUML({ source }: PlantUMLProps) {
    const src = await generatePlantUmlSvg(source);
    return <img src={src} alt="PlantUML diagram" />;
}
