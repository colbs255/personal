import { DiagramPath } from "@/lib/types";

type PlantUMLProps = {
    path: DiagramPath;
};

export default function PlantUML({ path }: PlantUMLProps) {
    return (
        <div className="flex justify-center mb-2">
            <img
                src={path.light}
                className="justify-center dark:hidden"
                alt="PlantUML diagram (light)"
            />
            <img
                src={path.dark}
                className="justify-center hidden dark:block"
                alt="PlantUML diagram (dark)"
            />
        </div>
    );
}
