require("../build/linter");
var chai = require("chai");

describe("Content item elements rules", function() {
  it("Content item elements should have correct indent-b size", function() {
    const object = `{
      "block": "form",
      "content": {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xxl" } }],
          "content": [
              {
                  "block": "form",
                  "elem":  "content-item",
                  "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "l" } }],
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              }
          ]
      }
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        error:
          "Строки формы должны отбиваться между собой с помощью модификатора нижнего отступа indent-b элемента item на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 16,
            line: 19,
          },
          start: {
            column: 15,
            line: 14,
          },
        },
      },
    ]);
  });

  it("Alone content item element should not have indent-b mix", function() {
    const object = `{
        "block": "form",
        "content": {
            "block": "form",
            "elem": "content",
            "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xxl" } }],
            "content": [
                {
                    "block": "form",
                    "elem":  "content-item",
                    "content": { "block": "input", "mods": { "size": "l" } }
                }
            ]
        }
      }`;
    chai.expect(lint(object)).to.eql([]);
  });

  it("Only last content item element should not has indent-b mix", function() {
    const object = `{
      "block": "form",
      "content": {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xxl" } }],
          "content": [
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              }
          ]
      }
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        error:
          "Строки формы должны отбиваться между собой с помощью модификатора нижнего отступа indent-b элемента item на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 16,
            line: 12,
          },
          start: {
            column: 15,
            line: 8,
          },
        },
      },
    ]);
  });

  it("Several content elements", function() {
    const object = `{
      "block": "form",
      "content": [
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xxl" } }],
          "content": [
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              }
          ]
        },
        {
          "block": "form",
          "elem": "content",
          "mix": [{ "block": "form", "elem": "item", "mods": {  "space-h": "xl", "space-v": "xxl" } }],
          "content": [
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "mix": [{ "block": "form", "elem": "item", "mods": { "indent-b": "xl" } }],
                  "content": { "block": "input", "mods": { "size": "l" } }
              },
              {
                  "block": "form",
                  "elem":  "content-item",
                  "content": { "block": "input", "mods": { "size": "l" } }
              }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        error:
          "Строки формы должны отбиваться между собой с помощью модификатора нижнего отступа indent-b элемента item на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 16,
            line: 13,
          },
          start: {
            column: 15,
            line: 9,
          },
        },
      },
      {
        code: "FORM.CONTENT_ITEM_INDENT_IS_INVALID",
        error:
          "Строки формы должны отбиваться между собой с помощью модификатора нижнего отступа indent-b элемента item на 1 шаг больше эталонного размера",
        location: {
          end: {
            column: 16,
            line: 36,
          },
          start: {
            column: 15,
            line: 32,
          },
        },
      },
    ]);
  });
});
