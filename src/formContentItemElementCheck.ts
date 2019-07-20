import * as jsonToAst from "json-to-ast";
import { ILinterProblem, RuleKeys, spaceValues } from "./types";
import {
  getInnerEntities,
  getLinterErrorData,
  getMixedObject,
  getModsError,
} from "./utils";

export function checkContentItemElementRules(
  formContent: jsonToAst.AstJsonEntity,
  referenceSize: string
) {
  const errors: ILinterProblem<RuleKeys>[] = [];

  const contentItems = getInnerEntities(formContent, "form", "content");
  if (typeof contentItems !== "undefined") {
    contentItems.forEach((elem) => {
      const contentItemElements = getInnerEntities(
        elem,
        "form",
        "content-item",
        true
      );
      if (typeof contentItemElements !== "undefined") {
        contentItemElements.forEach((elem, i) => {
          const mixObj = getMixedObject(elem, "form", "item", ["indent-b"]);
          if (typeof mixObj !== "undefined") {
            if (
              typeof getModsError(
                mixObj,
                "indent-b",
                referenceSize,
                spaceValues,
                1
              ).modErrorObject !== "undefined"
            ) {
              errors.push(
                getLinterErrorData("FormContentItemIndentIsInvalid", elem.loc)
              );
            }
          } else {
            if (i !== contentItemElements.length - 1) {
              errors.push(
                getLinterErrorData("FormContentItemIndentIsInvalid", elem.loc)
              );
            }
          }
        });
      }
    });
  }

  return errors;
}
