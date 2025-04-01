import { slugify } from "@/lib/util";

test("slugify", () => {
    expect(slugify("Java 21")).toBe("java-21");
});
