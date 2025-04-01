import { parseDoc } from "@/lib/util";

test("parseDoc", () => {
    const testData = `---
title: Test Title
tags: vim, git, testing
---

## Document`;
const expected = {
    meta: { title: "Test Title", slug: "test-title", tags: ["vim", "git", "testing" ] },
    content: "## Document",
};
expect(parseDoc(testData)).toStrictEqual(expected);
});
