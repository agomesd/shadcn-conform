import { rest } from "msw";

export const handlers = [
  rest.post("https://example.com/form", (req, res, ctx) => {
    console.log(req);
    return res(ctx.json({ message: "Form submitted" }), ctx.status(200));
  }),
];
