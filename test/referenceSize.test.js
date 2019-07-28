require("../build/linter");
var chai = require("chai");

describe("Input and label sizes should be equal", function() {
  it("The lack of input, label or button in form causes error", function() {
    const object = `{
          "block": "form",
          "content": [
              {
                  "block": "form",
                  "elem": "label",
                  "content": {
                      "block": "list",
                      "mods": { "size": "l" }
                  }
              },
              { "block": "card", "mods": { "size": "l" } },
              { "block": "card", "mods": { "size": "s" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 15,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Several elements size errors should still return one form block error", function() {
    const object = `{
          "block": "form",
          "content": [
              {
                  "block": "form",
                  "elem": "label",
                  "content": {
                      "block": "text",
                      "mods": { "size": "l" }
                  }
              },
              { "block": "input", "mods": { "size": "xl" } },
              { "block": "button", "mods": { "size": "s" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 15,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Should not validate object which are not in form block", function() {
    const object = `{
        "block": "page",
        "content": [
        {
          "block": "form",
          "content": [
              { "block": "button", "mods": { "size": "s" } }
          ]
        },
        { "block": "button", "mods": { "size": "xxl" } }
      ]
    }`;
    chai.expect(lint(object)).to.eql([]);
  });

  it("Should output error if button block size is incorrect", function() {
    const object = `{
          "block": "form",
          "content": [
              {
                  "block": "form",
                  "elem": "label",
                  "content": {
                      "block": "text",
                      "mods": { "size": "l" }
                  }
              },
              { "block": "input", "mods": { "size": "l" } },
              { "block": "button", "mods": { "size": "s" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 15,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Should output error if input block size is incorrect", function() {
    const object = `{
          "block": "form",
          "content": [
              {
                  "block": "form",
                  "elem": "label",
                  "content": {
                      "block": "text",
                      "mods": { "size": "l" }
                  }
              },
              { "block": "input", "mods": { "size": "xxl" } },
              { "block": "button", "mods": { "size": "l" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 15,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Should output error if label text size is incorrect", function() {
    const object = `{
          "block": "form",
          "content": [
              {
                  "block": "form",
                  "elem": "label",
                  "content": {
                      "block": "text",
                      "mods": { "size": "l" }
                  }
              },
              { "block": "input", "mods": { "size": "l" } },
              {
                "block": "form",
                "elem": "label",
                "content": {
                    "block": "text",
                    "mods": { "size": "xxl" }
                }
              },
              { "block": "button", "mods": { "size": "l" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 23,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Should output error if block with incorrect size is deep-nested", function() {
    const object = `{
          "block": "form",
          "content": [
            {
              "block": "form",
              "elem": "label",
              "content": [
                {
                  "block": "list",
                  "content": [
                    {
                      "block": "text",
                      "mods": { "size": "l" }
                    }
                  ]
                },
                {
                  "block": "list",
                  "content": [
                    {
                      "block": "list",
                      "elem": "item",
                      "content": [
                        {
                          "block": "list",
                          "content": [
                            {
                              "elem": "item",
                              "content": [
                                { "block": "input", "mods": { "size": "xxl" } }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            { "block": "input", "mods": { "size": "l" } },
            { "block": "button", "mods": { "size": "l" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 44,
          },
          start: {
            column: 1,
            line: 1,
          },
        },
      },
    ]);
  });

  it("Should not output error if there is only one form element", function() {
    const object = `{
          "block": "form",
          "content": [
            { "block": "button", "mods": { "size": "l" } }
          ]
        }`;
    chai.expect(lint(object)).to.eql([]);
  });

  it("Should not output error if there are several form blocks with correct reference size in each form", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "form",
          "content": [
            { "block": "button", "mods": { "size": "l" } }
          ]
        },
        {
          "block": "form",
          "content": [
            { "block": "button", "mods": { "size": "xxl" } },
            { "block": "input", "mods": { "size": "xxl" } }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([]);
  });

  it("Each form should brings its own error", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "form",
          "content": [
            {
              "block": "form",
              "elem": "label",
              "content": [
                {
                  "block": "text",
                  "mods": { "size": "l" }
                }
              ]
            },
            { "block": "button", "mods": { "size": "s" } }
          ]
        },
        {
          "block": "form",
          "content": [
            { "block": "button", "mods": { "size": "xl" } },
            { "block": "input", "mods": { "size": "xxl" } }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 19,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 26,
          },
          start: {
            column: 9,
            line: 20,
          },
        },
      },
    ]);
  });

  it("Should output error if there is no size mod on element", function() {
    const object = `{
          "block": "page",
          "content": [
          {
            "block": "form",
            "content": [
                { "block": "button" },
                { "block": "button", "mods": { "size": "s" } }
            ]
          }
        ]
      }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 12,
            line: 10,
          },
          start: {
            column: 11,
            line: 4,
          },
        },
      },
    ]);
  });

  it("Mixed elements should be considered too", function() {
    const object = `{
      "block": "page",
      "content": [
        {
          "block": "form",
          "content": [
            { "block": "button", "mods": { "size": "s" } },
            {
              "block": "radio",
              "mix": [
                {
                  "block": "button",
                  "mods": { "size": "xl" }
                }
              ]
            }
          ]
        }
      ]
    }`;
    chai.expect(lint(object)).to.eql([
      {
        code: "FORM.INPUT_AND_LABEL_SIZES_SHOULD_BE_EQUAL",
        error: "Инпуты, кнопки и подписи в форме должны быть одного размера",
        location: {
          end: {
            column: 10,
            line: 18,
          },
          start: {
            column: 9,
            line: 4,
          },
        },
      },
    ]);
  });
});
