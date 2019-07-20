"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const utils_1 = require("./utils");
function checkContentItemElementRules(formContent, referenceSize) {
    const errors = [];
    const contentItems = utils_1.getInnerEntities(formContent, "form", "content");
    if (typeof contentItems !== "undefined") {
        contentItems.forEach((elem) => {
            const contentItemElements = utils_1.getInnerEntities(elem, "form", "content-item", true);
            if (typeof contentItemElements !== "undefined") {
                contentItemElements.forEach((elem, i) => {
                    const mixObj = utils_1.getMixedObject(elem, "form", "item", ["indent-b"]);
                    if (typeof mixObj !== "undefined") {
                        if (typeof utils_1.getModsError(mixObj, "indent-b", referenceSize, types_1.spaceValues, 1).modErrorObject !== "undefined") {
                            errors.push(utils_1.getLinterErrorData("FormContentItemIndentIsInvalid", elem.loc));
                        }
                    }
                    else {
                        if (i !== contentItemElements.length - 1) {
                            errors.push(utils_1.getLinterErrorData("FormContentItemIndentIsInvalid", elem.loc));
                        }
                    }
                });
            }
        });
    }
    return errors;
}
exports.checkContentItemElementRules = checkContentItemElementRules;
//# sourceMappingURL=formContentItemElementCheck.js.map