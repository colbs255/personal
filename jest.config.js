/** @type {import('ts-jest').JestConfigWithTsJest} **/
// Writing this in typescript requires ts-node...
module.exports = {
    transform: {
        "^.+\.tsx?$": ["ts-jest", {}],
    },
    moduleNameMapper: {
        "@/(.*)": "<rootDir>/src/$1",
    },
};
