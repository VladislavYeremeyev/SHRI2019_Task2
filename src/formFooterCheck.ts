import * as jsonToAst from "json-to-ast";
import { ILinterProblem, RuleKeys, spaceValues, textSizeValues } from "./types";
import {
  getInnerEntities,
  getLinterErrorData,
  getMixedObject,
  getModsError,
} from "./utils";

/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки оступов элементов footer.
 * @param footer — объект c элементом footer
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
function checkFooterSpaceRules(
  footer: jsonToAst.AstObject,
  referenceSize: string
) {
  const errors: ILinterProblem<RuleKeys>[] = [];

  ["space-v", "space-h"].forEach((mod) => {
    const mixObj = getMixedObject(footer, "form", "item", [mod]);
    if (typeof mixObj !== "undefined") {
      if (
        typeof getModsError(
          mixObj,
          mod,
          referenceSize,
          spaceValues,
          mod === "space-v" ? 0 : 1
        ).modErrorObject !== "undefined"
      ) {
        errors.push(
          mod === "space-v"
            ? getLinterErrorData("FormFooterVerticalSpaceIsInvalid", footer.loc)
            : getLinterErrorData(
                "FormFooterHorizontalSpaceIsInvalid",
                footer.loc
              )
        );
      }
    } else {
      errors.push(
        mod === "space-v"
          ? getLinterErrorData("FormFooterVerticalSpaceIsInvalid", footer.loc)
          : getLinterErrorData("FormFooterHorizontalSpaceIsInvalid", footer.loc)
      );
    }
  });

  return errors;
}

/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки размеров текста внутри элементов footer.
 * @param footer — объект c элементом footer
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
function checkFooterTextRule(
  footer: jsonToAst.AstObject,
  referenceSize: string
) {
  const errors: ILinterProblem<RuleKeys>[] = [];

  const content = footer.children.find((p) => p.key.value === "content");
  if (typeof content !== "undefined") {
    getInnerEntities(content.value, "text").forEach((textBlock) => {
      const { modErrorObject } = getModsError(
        textBlock,
        "size",
        referenceSize,
        textSizeValues
      );
      if (typeof modErrorObject !== "undefined") {
        errors.push(
          getLinterErrorData("FormFooterTextSizeIsInvalid", textBlock.loc)
        );
      }
    });
  }

  return errors;
}

/**
 * Проверяет и возвращает ошибки, связанные с правилами проверки footer.
 * @param formContent — содержимое формы
 * @param referenceSize - Эталонный размер, вычисленный внутри данной формы
 * @return Возвращает массив ошибок, нарушающих правила
 */
export function checkFooterRules(
  formContent: jsonToAst.AstJsonEntity,
  referenceSize: string
) {
  let errors: ILinterProblem<RuleKeys>[] = [];

  const headerElements = getInnerEntities(formContent, "form", "footer");
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
