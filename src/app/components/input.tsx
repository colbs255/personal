interface InputProps {
    placeholder?: string;
    onChange: (value: string) => void;
}
export default function Input(props: InputProps) {
    return (
        <input
            type="text"
            placeholder={props.placeholder ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    );
}
