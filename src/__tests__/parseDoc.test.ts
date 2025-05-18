import { Doc } from "@/lib/types";
import { parseDoc } from "@/lib/util";

test("parseDoc", () => {
    const testData = `---
title: Test Title
publishedAt: 2025-04-01
tags: vim, git, testing
---

## Document`;
    const expected: Doc = {
        meta: {
            title: "Test Title",
            slug: "test-title",
            publishedAt: {
                day: 1,
                month: 4,
                year: 2025,
            },
            tags: ["vim", "git", "testing"],
        },
        content: "## Document",
    };
    expect(parseDoc(testData)).toStrictEqual(expected);
});
