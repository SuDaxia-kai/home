# World Model 学习笔记（Survey）

> 更新时间：2026-02-23  
> 维护方式：仅更新本 `md` 文件，网页自动渲染

## 0. 为什么需要 World Model

对机器人和通用智能来说，纯 model-free 方法通常样本效率低、泛化弱、可解释性不足。World model 的核心动机是：学习一个可压缩、可预测、可规划的环境动力学表示，让智能体在“想象空间”里先推演，再到真实环境执行。

- 样本效率：在 latent imagination 中生成大量训练轨迹。
- 长期规划：通过 rollout 处理延迟回报和多步决策。
- 迁移泛化：世界规律可复用，策略头可快速适配新任务。
- 安全与可控：可先在模型中做风险评估，再执行真实动作。

## 1. 统一问题定义

给定观测序列 $o_t$、动作 $a_t$、奖励 $r_t$，学习隐状态空间中的动力学：

- 表征模型：$z_t \sim q(z_t \mid o_{\le t}, a_{< t})$
- 转移模型：$p(z_{t+1} \mid z_t, a_t)$
- 观测/奖励头：$p(o_t \mid z_t)$, $p(r_t \mid z_t)$
- 终止头（可选）：$p(\mathrm{done}_t \mid z_t)$

常见训练目标是重建项 + 预测项 + 正则项（如 KL），然后在 learned model 上做策略优化或搜索。

## 2. 方法谱系（按研究主线）

### 2.1 生成式潜变量世界模型

典型线路：VAE/RSSM + imagination + actor-critic。代表工作包括 PlaNet、Dreamer 系列。关键特征是把高维像素压缩为可递推 latent 状态，并直接在 latent 轨迹上训练策略。

### 2.2 结合搜索的模型方法

典型线路：学习 dynamics + value/policy + tree search。代表如 MuZero 系列思想。其优势是规划深度更强，适合决策结构明显、离散动作或可搜索场景。

### 2.3 视频预测/生成驱动的 world model

近年趋势是引入 Transformer 与大规模视频预训练，让模型具备更强的时空一致性和开放世界先验。常见挑战是长时预测漂移、计算成本、在线控制闭环稳定性。

### 2.4 面向机器人控制的实用路线

在机器人中通常采用“任务相关潜空间 + 短时精确预测 + MPC/策略混合”的折中方案：牺牲部分生成质量，换取实时性与可控性。

## 3. 我当前的理解：设计要点与权衡

- 表示能力 vs 规划稳定性：latent 太自由会让 rollout 漂移更严重。
- 短期精度 vs 长期一致性：训练中要显式约束 multi-step prediction。
- 离线预训练 vs 在线适应：离线大模型强先验，在线更新保任务对齐。
- 模型偏差 vs 策略利用：policy 会 exploit 模型漏洞，需要保守机制。
- 端到端最优 vs 工程可用：机器人场景更在意实时、鲁棒、可调试。

## 4. 评测维度（读论文时可复用）

| 维度 | 关注问题 | 常见指标/现象 |
| --- | --- | --- |
| 样本效率 | 多少真实交互能达到可用性能 | steps-to-threshold、在线收敛速度 |
| 预测质量 | 短期与长期 rollout 是否可信 | n-step error、latent consistency |
| 控制性能 | 模型是否真正提升回报/成功率 | episode return、success rate |
| 泛化能力 | 跨场景、跨任务、跨扰动表现 | OOD 测试、domain shift 结果 |
| 工程代价 | 是否能在机器人系统稳定运行 | 推理延迟、显存、训练时长 |

## 5. 代表工作阅读清单（第一版）

1. World Models (Ha & Schmidhuber, 2018) - 早期框架化尝试。
2. PlaNet (Hafner et al., 2019) - latent dynamics + planning。
3. Dreamer / DreamerV2 / DreamerV3 - imagination actor-critic 主线。
4. MuZero 系列 - model-based search 的另一条主线。
5. 面向机器人控制的 latent model + MPC 论文（持续补充）。

备注：这部分先按“方法路径”组织，不按年份罗列，便于后续把新论文挂到对应分支下。

## 6. 增量更新日志（用于持续追加）

建议每读完一篇新论文，按下面格式补一条：

```text
[YYYY-MM-DD] 论文名
- 一句话贡献：
- 核心机制（表示/转移/规划）：
- 最关键实验结论：
- 对我当前课题的可迁移点：
- 下一步要验证的问题：
```

### [2026-02-23] 初始化版本

- 完成 World Model survey 框架搭建。
- 建立 6 个固定章节，后续只做增量修订。
- 下一步：补充 5-8 篇机器人方向近期论文到第 5 节。
