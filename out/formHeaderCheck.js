"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
function checkHeaderTextRule(header, referenceSize) {
    const errors = [];
    const content = header.children.find((p) => p.key.value === "content");
    if (typeof content !== "undefined") {
        utils_1.getInnerEntities(content.value, "text").forEach((textBlock) => {
            const { modErrorObject } = utils_1.getModsError(textBlock, "size", referenceSize, types_1.textSizeValues, 2);
            if (typeof modErrorObject !== "undefined") {
                errors.push(utils_1.getLinterErrorData("FormHeaderTextSizeIsInvalid", textBlock.loc));
            }
        });
    }
    return errors;
}
function checkHeaderSpaceRules(header, referenceSize) {
    const errors = [];
    ["space-v", "space-h"].forEach((mod) => {
        const mixObj = utils_1.getMixedObject(header, "form", "item", [mod]);
        if (typeof mixObj !== "undefined") {
            if (typeof utils_1.getModsError(mixObj, mod, referenceSize, types_1.spaceValues, mod === "space-v" ? 0 : 1).modErrorObject !== "undefined") {
                errors.push(mod === "space-v"
                    ? utils_1.getLinterErrorData("FormHeaderVerticalSpaceIsInvalid", header.loc)
                    : utils_1.getLinterErrorData("FormHeaderHorizontalSpaceIsInvalid", header.loc));
            }
        }
        else {
            errors.push(mod === "space-v"
                ? utils_1.getLinterErrorData("FormHeaderVerticalSpaceIsInvalid", header.loc)
                : utils_1.getLinterErrorData("FormHeaderHorizontalSpaceIsInvalid", header.loc));
        }
    });
    return errors;
}
function checkHeaderRules(formContent, referenceSize) {
    let errors = [];
    const headerElements = utils_1.getInnerEntities(formContent, "form", "header");
    if (typeof headerElements !== "undefined") {
        headerElements.forEach((elem) => {
            errors = [
                ...errors,
                ...checkHeaderTextRule(elem, referenceSize),
                ...checkHeaderSpaceRules(elem, referenceSize),
            ];
        });
    }
    return errors;
}
exports.checkHeaderRules = checkHeaderRules;
//# sourceMappingURL=formHeaderCheck.js.map