-- Convert Obsidian callouts into Quarto callouts.
--
--   > [!warning] Optional title          ::: {.callout-warning title="Optional title"}
--   > Body text.                  ==>    Body text.
--                                        :::
--
-- A trailing "-" or "+" after the type ("> [!tip]- Title") makes the
-- callout collapsible (collapsed / expanded). Obsidian types without a
-- Quarto equivalent map to the closest of Quarto's five callout types.

local type_map = {
  note = "note", info = "note", todo = "note", abstract = "note",
  summary = "note", tldr = "note", example = "note", quote = "note",
  cite = "note",
  tip = "tip", hint = "tip", success = "tip", check = "tip", done = "tip",
  important = "important", question = "important", help = "important",
  faq = "important",
  warning = "warning", attention = "warning",
  caution = "caution", danger = "caution", error = "caution",
  failure = "caution", fail = "caution", missing = "caution", bug = "caution",
}

function BlockQuote(el)
  local first = el.content[1]
  if not first or (first.t ~= "Para" and first.t ~= "Plain") then
    return nil
  end
  local head = first.content[1]
  if not head or head.t ~= "Str" then
    return nil
  end
  local kind, fold = head.text:match("^%[!(%a+)%]([+-]?)$")
  if not kind then
    return nil
  end

  -- The first line after the marker is the title; the rest of that
  -- paragraph (after the first line break) is body text.
  local title, rest, in_rest = pandoc.Inlines {}, pandoc.Inlines {}, false
  for i = 2, #first.content do
    local x = first.content[i]
    if in_rest then
      rest:insert(x)
    elseif x.t == "SoftBreak" or x.t == "LineBreak" then
      in_rest = true
    elseif not (#title == 0 and x.t == "Space") then
      title:insert(x)
    end
  end

  local body = pandoc.Blocks {}
  if #rest > 0 then
    body:insert(pandoc.Para(rest))
  end
  for i = 2, #el.content do
    body:insert(el.content[i])
  end

  local attrs = {}
  if #title > 0 then
    attrs.title = pandoc.utils.stringify(title)
  end
  if fold ~= "" then
    attrs.collapse = (fold == "-") and "true" or "false"
  end
  local ctype = type_map[kind:lower()] or "note"
  return pandoc.Div(body, pandoc.Attr("", { "callout-" .. ctype }, attrs))
end
