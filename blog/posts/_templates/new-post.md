<%*
const title = await tp.system.prompt("Post title");
const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const date = tp.date.now("YYYY-MM-DD");
await tp.file.move(`/posts/${date}-${slug}/index`);
-%>
---
title: "<% title %>"
description: ""
author: "Joseph Frimpong"
date: "<% date %>"
categories: []
draft: true
---

<% tp.file.cursor() %>
