"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
/**
 * Возвращает объект ошибки линтера в необходимом виде
 * @param errorCode — Код ошибки
 * @param locationObject - Объект, описывающий локацию ошибочного элемента в JsonToAst интерфейсе
 * @return {object} Объект ошибки линтера, представленный в требуемом по заданию виде
 */
function getLinterErrorData(errorCode, locationObject) {
    const location = {
        end: {
            column: locationObject.end.column,
            line: locationObject.end.line,
        },
        start: {
            column: locationObject.start.column,
            line: locationObject.start.line,
        },
    };
    return {
        code: types_1.RuleKeys[errorCode],
        error: types_1.RuleErrorText[errorCode],
        location,
    };
}
exports.getLinterErrorData = getLinterErrorData;
/**
 * Проверяет, является ли объект определенным блоком
 * @param elem — Проверяемый объект
 * @param blockName - Строка с названием блока
 * @return {boolean}
 */
exports.isBlock = (elem, blockName) => elem.children.some((p) => p.key.value === "block" &&
    (p.value.type === "Literal" && p.value.value === blockName)) && !elem.children.some((p) => p.key.value === "elem")
    ? true
    : false;
/**
 * Проверяет, является ли объект определенным элементом
 * @param elem — Проверяемый объект
 * @param blockName - Строка с названием блока
 * @param elementName - Строка с названием элемента
 * @return {boolean}
 */
exports.isElement = (elem, blockName, elementName) => elem.children.some((p) => p.key.value === "elem" &&
    (p.value.type === "Literal" && p.value.value === elementName)) &&
    elem.children.some((p) => p.key.value === "block" &&
        (p.value.type === "Literal" && p.value.value === blockName))
    ? true
    : false;
/**
 * Возвращает объект в массиве mix данного элемента по заданным параметрам. Если такого объекта не существует, возвращает undefined.
 * @param elem — Обрабатываемый объект
 * @param blockName - Строка с названием блока, который должен быть в mix
 * @param elementName - Строка с названием элемента, который должен быть в mix (optional)
 * @param mods - Массив строк - модификаторов, которые должны быть у искомого объекта в mix (optional)
 * @return При соответствии параметрам возвращается найденный объект внутри массива mix, иначе возвращается undefined
 */
exports.getMixedObject = (elem, blockName, elementName, mods) => {
    let result;
    const mixProperty = elem.children.find((p) => p.key.value === "mix");
    if (typeof mixProperty !== "undefined" &&
        mixProperty.value.type === "Array") {
        mixProperty.value.children.forEach((mix) => {
            if (mix.type === "Object") {
                if (typeof elementName === "undefined") {
                    if (exports.isBlock(mix, blockName)) {
                        if (typeof mods === "undefined") {
                            result = mix;
                        }
                        else {
                            const modsObj = mix.children.find((p) => p.key.value === "mods");
                            if (typeof modsObj !== "undefined") {
                                if (mods.every((mod) => typeof exports.getModValue(modsObj.value, mod) !== "undefined")) {
                                    result = mix;
                                }
                            }
                        }
                    }
                }
                else {
                    if (exports.isElement(mix, blockName, elementName)) {
                        if (typeof mods === "undefined") {
                            result = mix;
                        }
                        else {
                            const modsObj = mix.children.find((p) => p.key.value === "mods");
                            if (typeof modsObj !== "undefined") {
                                if (mods.every((mod) => typeof exports.getModValue(modsObj.value, mod) !== "undefined")) {
                                    result = mix;
                                }
                            }
                        }
                    }
                }
            }
        });
    }
    return result;
};
/**
 * Возвращает значение модификатора по заданному имени.
 * @param modsObj — Объект модификаторов
 * @param modName - Строка с названием модификатора
 * @return При соответствии параметрам возвращается найденное значение модификатора, иначе возвращается undefined
 */
exports.getModValue = (modsObj, modName) => {
    let result;
    if (modsObj.type === "Object") {
        const modProperty = modsObj.children.find((p) => p.key.value === modName);
        if (typeof modProperty !== "undefined" &&
            modProperty.value.type === "Literal") {
            result = modProperty.value.value;
        }
    }
    return result;
};
/**
 * Возвращает объект с текущим эталонным размером и объект элемента, в котором присутствует ошибка в модификаторе,
 * если проверяемый объект является таковым
 * @param elem — Проверяемый объект
 * @param modName - Строка с названием модификатора
 * @param referenceValue - Найденное на текущий момент эталонное значение
 * @param expectedValues - Массив строк с доступными значениями модификатора
 * @param referenceValueOffset - Число ожидаемого отступа от эталонного значения (например, при эталоне l,
 * отступ со значением 2, будет ожидать значение - xxl). По умолчанию равен 0
 * @return Возвращает объект, содержащий найденный на текущий момент эталонный размер (string | undefined) и элемент проверки,
 * если значение его модификаторов нарушают правила
 */
exports.getModsError = (elem, modName, referenceValue, expectedValues, referenceValueOffset) => {
    let modErrorObject;
    let newReferenceValue = referenceValue;
    let offset = referenceValueOffset;
    if (typeof offset === "undefined") {
        offset = 0;
    }
    const mods = elem.children.find((p) => p.key.value === "mods");
    if (typeof mods !== "undefined") {
        const modValue = exports.getModValue(mods.value, modName);
        if (modValue !== "undefined" &&
            typeof modValue === "string" &&
            expectedValues.includes(expectedValues[expectedValues.indexOf(modValue)])) {
            if (typeof referenceValue === "undefined") {
                newReferenceValue = modValue;
            }
            else if (expectedValues[expectedValues.indexOf(referenceValue) + offset] !==
                modValue) {
                modErrorObject = elem;
            }
        }
        else {
            modErrorObject = elem;
        }
    }
    else {
        modErrorObject = elem;
    }
    return { newReferenceValue, modErrorObject };
};
/**
 * Возвращает массив объектов, соответсвующих критерию поиска по имени блока и элемента на любом уровне вложенности внутри данного элемента.
 * @param elem — Объект, внутри которого нужно провести поиск элементов
 * @param blockName - Строка с именем блока
 * @param elementName - Строка с именем элемента (optional)
 * @param level - Уровень вложенности, на котором проводится поиск (Если === 1, то совершит обход только потомков 1-го уровня)
 * @return Возвращает массив найденных элементов
 */
exports.getInnerEntities = (elem, blockName, elementName, level) => {
    let innerTextBlocks = [];
    switch (elem.type) {
        case "Array":
            elem.children.forEach((child) => {
                if (child.type === "Object") {
                    if ((typeof elementName === "undefined" && exports.isBlock(child, blockName)) ||
                        typeof exports.getMixedObject(child, blockName) !== "undefined" ||
                        ((typeof elementName !== "undefined" &&
                            exports.isElement(child, blockName, elementName)) ||
                            typeof exports.getMixedObject(child, blockName, elementName) !==
                                "undefined")) {
                        innerTextBlocks = [...innerTextBlocks, child];
                    }
                    if (level !== 1) {
                        const innerContent = child.children.find((p) => p.key.value === "content");
                        if (typeof innerContent !== "undefined") {
                            innerTextBlocks = [
                                ...innerTextBlocks,
                                ...exports.getInnerEntities(innerContent.value, blockName, elementName),
                            ];
                        }
                    }
                }
            });
            break;
        case "Object":
            if ((typeof elementName === "undefined" && exports.isBlock(elem, blockName)) ||
                typeof exports.getMixedObject(elem, blockName) !== "undefined" ||
                ((typeof elementName !== "undefined" &&
                    exports.isElement(elem, blockName, elementName)) ||
                    typeof exports.getMixedObject(elem, blockName, elementName) !== "undefined")) {
                innerTextBlocks = [...innerTextBlocks, elem];
            }
            if (level !== 1) {
                const innerContent = elem.children.find((p) => p.key.value === "content");
                if (typeof innerContent !== "undefined") {
                    innerTextBlocks = [
                        ...innerTextBlocks,
                        ...exports.getInnerEntities(innerContent.value, blockName, elementName),
                    ];
                }
            }
    }
    return innerTextBlocks;
};
//# sourceMappingURL=utils.js.map