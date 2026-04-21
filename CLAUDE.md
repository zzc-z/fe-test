CLAUDE.md
减少常见 LLM 编码错误的行为准则。可根据需要与项目特定指令合并。

权衡：这些准则倾向于谨慎而非速度。对于简单任务，请自行判断。

1. 先思考再编码
不要假设。不要隐藏困惑。明确权衡取舍。

在实现之前：

明确陈述你的假设。如果不确定，就问。
如果存在多种解读，列出它们——不要默默选择一种。
如果存在更简单的方案，说出来。必要时提出反对意见。
如果有不清楚的地方，停下来。指出困惑所在。提问。

2. 简洁优先
用最少的代码解决问题。不做推测性开发。

不添加未被要求的功能。
不为一次性代码创建抽象。
不添加未被要求的"灵活性"或"可配置性"。
不为不可能发生的场景添加错误处理。
如果你写了 200 行代码而 50 行就能搞定，重写它。
问自己："一个资深工程师会觉得这太复杂了吗？"如果是，就简化。

3. 精准修改
只改必须改的。只清理你自己制造的混乱。

编辑现有代码时：

不要"改进"相邻的代码、注释或格式。
不要重构没有问题的代码。
匹配现有风格，即使你会用不同的方式。
如果发现无关的死代码，提一下就好——不要删除。
当你的修改产生了孤立代码时：

移除因你的修改而变得无用的导入/变量/函数。
除非被要求，不要移除之前就存在的死代码。
检验标准：每一行改动都应该能直接追溯到用户的请求。

4. 目标驱动执行
定义成功标准。循环直到验证通过。

将任务转化为可验证的目标：

"添加验证" → "为无效输入编写测试，然后让测试通过"
"修复 bug" → "编写重现 bug 的测试，然后让测试通过"
"重构 X" → "确保重构前后测试都能通过"
对于多步骤任务，列出简要计划：

1. [步骤] → 验证：[检查项]
2. [步骤] → 验证：[检查项]
3. [步骤] → 验证：[检查项]
明确的成功标准能让你独立循环执行。模糊的标准（"让它能用"）则需要不断澄清。

这些准则是否有效的判断依据：diff 中不必要的改动更少，因过度复杂化而重写的次数更少，澄清问题发生在实现之前而非犯错之后。

## React 组件规范

### Context 放置规范
Context 必须放在专门的文件中（`/contexts/` 目录），禁止将 Context 定义写在组件文件里。

**错误：**
```tsx
// 禁止在 SortablePanel.tsx 中定义 PanelDragContext
export const PanelDragContext = React.createContext(...)
export default function SortablePanel() { ... }
```

**正确：**
```tsx
// contexts/PanelDragContext.ts
export const PanelDragContext = React.createContext(...)
```

### 目录结构（Next.js + Tailwind CSS）
```
src/
├── app/                    # Next.js App Router 页面
├── components/
│   ├── contexts/           # Context 定义放这里
│   │   └── PanelDragContext.ts
│   ├── panels/             # 具体业务面板组件
│   │   ├── MapPanel.tsx
│   │   ├── MusicPanel.tsx
│   │   └── ChatPanel.tsx
│   ├── Panel.tsx           # 通用面板组件
│   ├── SortablePanel.tsx   # 可排序面板包装器
│   └── PanelContainer.tsx  # 面板容器
└── hooks/                  # 自定义 Hooks
    └── usePanelState.ts
```

### 组件分类原则
- **通用组件**（如 Panel）：放在 `components/` 根目录，无业务逻辑
- **业务组件**（如 MapPanel）：放在 `components/panels/` 目录
- **包装器组件**（如 SortablePanel）：放在 `components/` 根目录，组合多个组件