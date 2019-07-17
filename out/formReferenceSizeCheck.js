"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
const getSizeEqualData = (formBlock, elem, referenceSize) => {
    const result = {
        errors: [],
        newReferenceSize: referenceSize,
    };
    if (utils_1.isBlock(elem, "input") || utils_1.isBlock(elem, "button")) {
        const { newReferenceValue, modErrorObject } = utils_1.getModsError(elem, "size", result.newReferenceSize, types_1.textSizeValues);
        if (typeof modErrorObject !== "undefined") {
            result.errors.push(utils_1.getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc));
        }
        result.newReferenceSize = newReferenceValue;
    }
    else if (elem.children.find((p) => p.key.value === "mix")) {
        const inputMix = utils_1.getMixedObject(elem, "input");
        const buttonMix = utils_1.getMixedObject(elem, "button");
        const labelMix = utils_1.getMixedObject(elem, "form", "label");
        [inputMix, buttonMix].forEach((mix) => {
            if (typeof mix !== "undefined") {
                const { newReferenceValue, modErrorObject } = utils_1.getModsError(mix, "size", result.newReferenceSize, types_1.textSizeValues);
                if (typeof modErrorObject !== "undefined") {
                    result.errors.push(utils_1.getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc));
                }
                result.newReferenceSize = newReferenceValue;
            }
        });
        if (typeof labelMix !== "undefined") {
            const content = elem.children.find((p) => p.key.value === "content");
            if (typeof content !== "undefined") {
                utils_1.getInnerEntities(content.value, "text").forEach((textBlock) => {
                    const { newReferenceValue, modErrorObject } = utils_1.getModsError(textBlock, "size", result.newReferenceSize, types_1.textSizeValues);
                    if (typeof modErrorObject !== "undefined") {
                        result.errors.push(utils_1.getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc));
                    }
                    result.newReferenceSize = newReferenceValue;
                });
            }
        }
    }
    else if (utils_1.isElement(elem, "form", "label")) {
        const content = elem.children.find((p) => p.key.value === "content");
        if (typeof content !== "undefined") {
            utils_1.getInnerEntities(content.value, "text").forEach((textBlock) => {
                const { newReferenceValue, modErrorObject } = utils_1.getModsError(textBlock, "size", result.newReferenceSize, types_1.textSizeValues);
                if (typeof modErrorObject !== "undefined") {
                    result.errors.push(utils_1.getLinterErrorData("FormElementsSizeShouldBeEqual", formBlock.loc));
                }
                result.newReferenceSize = newReferenceValue;
            });
        }
    }
    return result;
};
function checkFormContentSize(formBlock, formContent, refSize) {
    let referenceSize = refSize;
    let errors = [];
    switch (formContent.type) {
        case "Array":
            formContent.children.forEach((elem) => {
                if (elem.type === "Object") {
                    if (errors.length === 1) {
                        return { errors, referenceSize };
                    }
                    const checkData = getSizeEqualData(formBlock, elem, referenceSize);
                    errors = [...errors, ...checkData.errors];
                    if (typeof referenceSize === "undefined" &&
                        typeof checkData.newReferenceSize !== "undefined") {
                        referenceSize = checkData.newReferenceSize;
                    }
                    const innerContent = elem.children.find((p) => p.key.value === "content");
                    if (typeof innerContent !== "undefined") {
                        const data = checkFormContentSize(formBlock, innerContent.value, referenceSize);
                        if (errors.length === 1) {
                            return { errors, referenceSize };
                        }
                        errors = [...errors, ...data.errors];
                        referenceSize = data.referenceSize;
                    }
                }
            });
            break;
        case "Object":
            if (errors.length === 1) {
                return { errors, referenceSize };
            }
            const checkData = getSizeEqualData(formBlock, formContent, referenceSize);
            errors = [...errors, ...checkData.errors];
            if (typeof referenceSize === "undefined" &&
                typeof checkData.newReferenceSize !== "undefined") {
                referenceSize = checkData.newReferenceSize;
            }
            const innerContent = formContent.children.find((p) => p.key.value === "content");
            if (typeof innerContent !== "undefined") {
                const data = checkFormContentSize(formBlock, innerContent.value, referenceSize);
                if (errors.length === 1) {
                    return { errors, referenceSize };
                }
                errors = [...errors, ...data.errors];
                referenceSize = data.referenceSize;
            }
            break;
        default:
            break;
    }
    return { errors, referenceSize };
}
exports.checkFormContentSize = checkFormContentSize;
//# sourceMappingURL=formReferenceSizeCheck.js.map