---
title: Agents For LLM
date: 2026-02-10
category: CS
published: true
skills_cloud:
  - Agent
  - LLM
  - Tool Calling
  - RAG
---

# Agents 编写

>  Agent 可以理解为“带工具和流程的 LLM”。  普通对话模型只回答问题，Agent 会按目标主动拆解任务、调用工具、读取结果，再决定下一步。

## 最小可用结构

一个可工作的 Agent，通常只需要 5 个部分：

1. 目标：明确要完成什么，什么算完成。
2. 提示词：约束行为边界、输出格式、禁止项。
3. 工具：例如搜索、数据库、代码执行、HTTP 请求。
4. 状态：保存中间结果，避免每轮都“失忆”。
5. 循环：`思考 -> 调工具 -> 观察 -> 决策`，直到命中终止条件。
