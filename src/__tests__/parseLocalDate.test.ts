import { formatLocalDate } from "@/lib/util";

describe("formatLocalDate", () => {
    it("formats Jan 15, 1990 correctly", () => {
        expect(formatLocalDate({ year: 1990, month: 1, day: 15 })).toBe(
            "Jan 15, 1990",
        );
    });

    it("formats Feb 2, 2020 correctly", () => {
        expect(formatLocalDate({ year: 2020, month: 2, day: 2 })).toBe(
            "Feb 2, 2020",
        );
    });

    it("formats Mar 31, 2022 correctly", () => {
        expect(formatLocalDate({ year: 2022, month: 3, day: 31 })).toBe(
            "Mar 31, 2022",
        );
    });

    it("formats Apr 10, 2011 correctly", () => {
        expect(formatLocalDate({ year: 2011, month: 4, day: 10 })).toBe(
            "Apr 10, 2011",
        );
    });

    it("formats May 25, 2035 correctly", () => {
        expect(formatLocalDate({ year: 2035, month: 5, day: 25 })).toBe(
            "May 25, 2035",
        );
    });

    it("formats Jun 6, 2006 correctly", () => {
        expect(formatLocalDate({ year: 2006, month: 6, day: 6 })).toBe(
            "Jun 6, 2006",
        );
    });

    it("formats Jul 4, 1776 correctly", () => {
        expect(formatLocalDate({ year: 1776, month: 7, day: 4 })).toBe(
            "Jul 4, 1776",
        );
    });

    it("formats Aug 20, 2018 correctly", () => {
        expect(formatLocalDate({ year: 2018, month: 8, day: 20 })).toBe(
            "Aug 20, 2018",
        );
    });

    it("formats Sep 9, 2029 correctly", () => {
        expect(formatLocalDate({ year: 2029, month: 9, day: 9 })).toBe(
            "Sep 9, 2029",
        );
    });

    it("formats Oct 30, 2000 correctly", () => {
        expect(formatLocalDate({ year: 2000, month: 10, day: 30 })).toBe(
            "Oct 30, 2000",
        );
    });

    it("formats Nov 11, 2011 correctly", () => {
        expect(formatLocalDate({ year: 2011, month: 11, day: 11 })).toBe(
            "Nov 11, 2011",
        );
    });

    it("formats Dec 24, 2025 correctly", () => {
        expect(formatLocalDate({ year: 2025, month: 12, day: 24 })).toBe(
            "Dec 24, 2025",
        );
    });
});
