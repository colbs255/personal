"use client";
import { DiagramPath } from "@/lib/types";

type PlantUMLProps = {
    path: DiagramPath;
};

export default function PlantUML({ path }: PlantUMLProps) {
    return (
        <div className="flex justify-center">
            <img id={path.light} src={path.dark} className="justify-center" alt="PlantUML diagram" />
        </div>
    );
}
