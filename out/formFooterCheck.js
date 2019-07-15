"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
function checkFooterSpaceRules(footer, referenceSize) {
    const errors = [];
    ["space-v", "space-h"].forEach((mod) => {
        const mixObj = utils_1.getMixedObject(footer, "form", "item", [mod]);
        if (typeof mixObj !== "undefined") {
            if (typeof utils_1.getModsError(mixObj, mod, referenceSize, types_1.spaceValues, mod === "space-v" ? 0 : 1).modErrorObject !== "undefined") {
                errors.push(mod === "space-v"
                    ? utils_1.getLinterErrorData("FormFooterVerticalSpaceIsInvalid", footer.loc)
                    : utils_1.getLinterErrorData("FormFooterHorizontalSpaceIsInvalid", footer.loc));
            }
        }
        else {
            errors.push(mod === "space-v"
                ? utils_1.getLinterErrorData("FormFooterVerticalSpaceIsInvalid", footer.loc)
                : utils_1.getLinterErrorData("FormFooterHorizontalSpaceIsInvalid", footer.loc));
        }
    });
    return errors;
}
function checkFooterTextRule(footer, referenceSize) {
    const errors = [];
    const content = footer.children.find((p) => p.key.value === "content");
    if (typeof content !== "undefined") {
        utils_1.getInnerEntities(content.value, "text").forEach((textBlock) => {
            const { modErrorObject } = utils_1.getModsError(textBlock, "size", referenceSize, types_1.textSizeValues);
            if (typeof modErrorObject !== "undefined") {
                errors.push(utils_1.getLinterErrorData("FormFooterTextSizeIsInvalid", textBlock.loc));
            }
        });
    }
    return errors;
}
function checkFooterRules(formContent, referenceSize) {
    let errors = [];
    const headerElements = utils_1.getInnerEntities(formContent, "form", "footer");
    if (typeof headerElements !== "undefined") {
        headerElements.forEach((elem) => {
            errors = [
                ...errors,
                ...checkFooterTextRule(elem, referenceSize),
                ...checkFooterSpaceRules(elem, referenceSize),
            ];
        });
    }
    return errors;
}
exports.checkFooterRules = checkFooterRules;
//# sourceMappingURL=formFooterCheck.js.map