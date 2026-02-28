const path = require("path");
const PptxGenJS = require("pptxgenjs");

const pptx = new PptxGenJS();
pptx.layout = "LAYOUT_WIDE";
pptx.author = "Suhaokai";
pptx.company = "SUSTech";
pptx.subject = "Paper Notes Summary";
pptx.title = "Paper Notes Summary";
pptx.lang = "zh-CN";

const palette = {
  navy: "0B1F3A",
  blue: "1D4E89",
  cyan: "3E92CC",
  mint: "C6F1E7",
  white: "FFFFFF",
  light: "F5F9FF",
  dark: "102A43",
  gray: "51606F",
  green: "2F855A",
  orange: "D97706",
};

const assetsDir = path.join(__dirname, "..", "paper-notes", "assets");
const coverDate = "2026-02-24";

function addHeader(slide, title, subtitle) {
  slide.background = { color: palette.light };
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: 13.33,
    h: 0.9,
    fill: { color: palette.navy },
    line: { color: palette.navy },
  });
  slide.addText(title, {
    x: 0.5,
    y: 0.19,
    w: 8.8,
    h: 0.4,
    color: palette.white,
    bold: true,
    fontFace: "Calibri",
    fontSize: 24,
  });
  slide.addText(subtitle, {
    x: 9.2,
    y: 0.24,
    w: 3.5,
    h: 0.3,
    align: "right",
    color: "D4E1F2",
    fontFace: "Calibri",
    fontSize: 12,
  });
}

function addTwoColumnSlide(title, subtitle, leftTitle, rightTitle) {
  const slide = pptx.addSlide();
  addHeader(slide, title, subtitle);

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 0.45,
    y: 1.1,
    w: 6.15,
    h: 5.9,
    radius: 0.08,
    fill: { color: palette.white },
    line: { color: "D0DDEA", pt: 1 },
  });
  slide.addShape(pptx.ShapeType.roundRect, {
    x: 6.73,
    y: 1.1,
    w: 6.15,
    h: 5.9,
    radius: 0.08,
    fill: { color: palette.white },
    line: { color: "D0DDEA", pt: 1 },
  });
  slide.addText(leftTitle, {
    x: 0.75,
    y: 1.3,
    w: 5.5,
    h: 0.35,
    color: palette.dark,
    bold: true,
    fontFace: "Calibri",
    fontSize: 18,
  });
  slide.addText(rightTitle, {
    x: 7.03,
    y: 1.3,
    w: 5.5,
    h: 0.35,
    color: palette.dark,
    bold: true,
    fontFace: "Calibri",
    fontSize: 18,
  });
  return slide;
}

const cover = pptx.addSlide();
cover.background = { color: palette.dark };
cover.addShape(pptx.ShapeType.rect, {
  x: 0,
  y: 0,
  w: 13.33,
  h: 7.5,
  fill: { color: palette.dark },
  line: { color: palette.dark },
});
cover.addShape(pptx.ShapeType.roundRect, {
  x: 0.7,
  y: 0.75,
  w: 11.9,
  h: 6.0,
  radius: 0.1,
  fill: { color: "13315C", transparency: 5 },
  line: { color: "3E92CC", pt: 2 },
});
cover.addShape(pptx.ShapeType.roundRect, {
  x: 1.0,
  y: 1.2,
  w: 3.2,
  h: 0.52,
  radius: 0.06,
  fill: { color: palette.cyan },
  line: { color: palette.cyan },
});
cover.addText("World Model 论文总结", {
  x: 1.2,
  y: 1.33,
  w: 2.8,
  h: 0.3,
  color: palette.white,
  bold: true,
  fontFace: "Calibri",
  fontSize: 16,
});
cover.addText("Paper Notes Review Deck", {
  x: 1.0,
  y: 2.0,
  w: 11,
  h: 0.9,
  color: palette.white,
  bold: true,
  fontFace: "Calibri",
  fontSize: 46,
});
cover.addText("聚焦三篇近期机器人/强化学习论文：方法、结果与可落地启发", {
  x: 1.0,
  y: 3.0,
  w: 11.3,
  h: 0.6,
  color: "D0E3FF",
  fontFace: "Calibri",
  fontSize: 19,
});
cover.addText(`Prepared from project paper-notes | ${coverDate}`, {
  x: 1.0,
  y: 6.2,
  w: 11.2,
  h: 0.3,
  color: "A8C3E8",
  fontFace: "Calibri",
  fontSize: 13,
});

const overview = addTwoColumnSlide(
  "目录与范围",
  "3 papers from /paper-notes",
  "本次覆盖论文",
  "统一观察视角"
);
overview.addText(
  [
    { text: "1. 1000 Layer Networks for Self-Supervised RL (2025)\n", options: { bold: true } },
    { text: "2. World Action Models are Zero-shot Policies (2026)\n", options: { bold: true } },
    { text: "3. DreamDojo: A Generalist Robot World Model (2026)", options: { bold: true } },
  ],
  {
    x: 0.8,
    y: 1.8,
    w: 5.6,
    h: 2.5,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 16,
    bullet: { indentPt: 14 },
    margin: 0,
    breakLine: true,
  }
);
overview.addText(
  [
    { text: "核心问题：", options: { bold: true } },
    { text: "如何同时提升泛化、可控性与实时性\n" },
    { text: "方法主线：", options: { bold: true } },
    { text: "深度扩展 / 联合视频动作建模 / 大规模视频预训练\n" },
    { text: "对比维度：", options: { bold: true } },
    { text: "数据规模、模型规模、实时推理、跨任务迁移" },
  ],
  {
    x: 7.1,
    y: 1.8,
    w: 5.5,
    h: 2.8,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
overview.addShape(pptx.ShapeType.roundRect, {
  x: 7.1,
  y: 4.9,
  w: 5.3,
  h: 1.6,
  radius: 0.05,
  fill: { color: palette.mint },
  line: { color: "88DCC4", pt: 1 },
});
overview.addText("输出目标：提炼可复用的研究路线，而不是逐条复述论文。", {
  x: 7.4,
  y: 5.35,
  w: 4.7,
  h: 0.8,
  color: "134E4A",
  fontFace: "Calibri",
  bold: true,
  fontSize: 16,
  valign: "mid",
  align: "center",
});

const scaledCrl = addTwoColumnSlide(
  "Paper 1 | Scaled CRL",
  "1000 Layer Networks for Self-Supervised RL",
  "问题与方法",
  "实验结论"
);
scaledCrl.addText(
  [
    { text: "目标：验证极深 MLP 是否能在 self-supervised RL 中形成可预测的 scaling law。\n" },
    { text: "关键改动：", options: { bold: true } },
    { text: "仅增加网络深度（4→1024），保持其它设置尽量一致。\n" },
    { text: "实现细节：", options: { bold: true } },
    { text: "Linear(1024)+LayerNorm+ReLU，每4层残差，异步并行训练。" },
  ],
  {
    x: 0.8,
    y: 1.85,
    w: 5.55,
    h: 2.65,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
scaledCrl.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 4.8,
  w: 5.4,
  h: 1.45,
  radius: 0.05,
  fill: { color: "E8F1FD" },
  line: { color: "BFD7F2", pt: 1 },
});
scaledCrl.addText("Critical Depth 出现在 32-64 层附近，性能出现非线性跃迁。", {
  x: 1.05,
  y: 5.25,
  w: 4.9,
  h: 0.7,
  color: palette.blue,
  bold: true,
  fontFace: "Calibri",
  fontSize: 15,
  align: "center",
});
scaledCrl.addText(
  [
    { text: "10任务平均分：", options: { bold: true } },
    { text: "50.6 → 62.4（+11.8）\n" },
    { text: "SOTA覆盖：", options: { bold: true } },
    { text: "8 / 10 tasks\n" },
    { text: "难任务样例：", options: { bold: true } },
    { text: "antmaze-umaze-diverse 34.9 → 66.8（约1.9x）" },
  ],
  {
    x: 7.05,
    y: 1.85,
    w: 5.55,
    h: 1.8,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
scaledCrl.addImage({
  path: path.join(assetsDir, "2503.14858-fig1-performance.png"),
  x: 7.05,
  y: 3.0,
  w: 5.4,
  h: 3.1,
});

const dreamZero = addTwoColumnSlide(
  "Paper 2 | DreamZero (WAM)",
  "World Action Models are Zero-shot Policies",
  "核心思想",
  "关键结果"
);
dreamZero.addText(
  [
    { text: "统一建模：", options: { bold: true } },
    { text: "联合预测未来视频与动作，而非仅 o→a。\n" },
    { text: "训练机制：", options: { bold: true } },
    { text: "chunk-wise joint flow matching + teacher forcing。\n" },
    { text: "系统优化：", options: { bold: true } },
    { text: "KV cache / CFG 并行 / 编译与量化，支撑实时闭环。" },
  ],
  {
    x: 0.8,
    y: 1.85,
    w: 5.55,
    h: 2.6,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
dreamZero.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 4.75,
  w: 5.4,
  h: 1.5,
  radius: 0.05,
  fill: { color: "EAFBF2" },
  line: { color: "BCEBD5", pt: 1 },
});
dreamZero.addText("14B 视频扩散策略实现约 7Hz 实机闭环控制。", {
  x: 1.05,
  y: 5.25,
  w: 4.9,
  h: 0.65,
  color: palette.green,
  bold: true,
  fontFace: "Calibri",
  fontSize: 15,
  align: "center",
});
dreamZero.addText(
  [
    { text: "AgiBot unseen tasks：", options: { bold: true } },
    { text: "39.5%，明显高于 pretrained VLA 16.3%\n" },
    { text: "DROID unseen：", options: { bold: true } },
    { text: "49% progress / 22.5% success\n" },
    { text: "跨 embodiment：", options: { bold: true } },
    { text: "仅10-20分钟视频，progress 38.3%→54.3%+" },
  ],
  {
    x: 7.05,
    y: 1.85,
    w: 5.55,
    h: 2.0,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
dreamZero.addImage({
  path: path.join(assetsDir, "2602.15922-fig4-arch.png"),
  x: 7.05,
  y: 3.0,
  w: 5.4,
  h: 3.1,
});

const dreamDojo = addTwoColumnSlide(
  "Paper 3 | DreamDojo",
  "A Generalist Robot World Model from Human Videos",
  "技术路线",
  "实验信号"
);
dreamDojo.addText(
  [
    { text: "三阶段：", options: { bold: true } },
    { text: "人类视频预训练 → 机器人后训练 → 蒸馏部署。\n" },
    { text: "核心模块：", options: { bold: true } },
    { text: "Latent Action Model + Teacher World Model + Student。\n" },
    { text: "关键创新：", options: { bold: true } },
    { text: "无动作标签人类视频中提取连续 latent action 作为控制代理。" },
  ],
  {
    x: 0.8,
    y: 1.85,
    w: 5.55,
    h: 2.7,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
dreamDojo.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 4.7,
  w: 5.45,
  h: 1.58,
  radius: 0.05,
  fill: { color: "FFF4E8" },
  line: { color: "F7D8B0", pt: 1 },
});
dreamDojo.addText("预训练总规模约 44,711 小时人类视频。", {
  x: 1.05,
  y: 5.25,
  w: 4.95,
  h: 0.7,
  color: palette.orange,
  bold: true,
  fontFace: "Calibri",
  fontSize: 15,
  align: "center",
});
dreamDojo.addText(
  [
    { text: "泛化：", options: { bold: true } },
    { text: "latent action 条件优于 action-free / w/o pretrain。\n" },
    { text: "主观评估：", options: { bold: true } },
    { text: "14B 模型在物理合理性与动作跟随上优于 Cosmos-Predict2.5。\n" },
    { text: "实时性：", options: { bold: true } },
    { text: "蒸馏后 student 10.81 FPS（teacher 2.72 FPS）。" },
  ],
  {
    x: 7.05,
    y: 1.85,
    w: 5.55,
    h: 2.3,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    margin: 0,
    breakLine: true,
  }
);
dreamDojo.addShape(pptx.ShapeType.roundRect, {
  x: 7.05,
  y: 4.3,
  w: 5.45,
  h: 2.0,
  radius: 0.08,
  fill: { color: "F0F6FF" },
  line: { color: "C6D9F5", pt: 1 },
});
dreamDojo.addText("三大取舍", {
  x: 7.3,
  y: 4.58,
  w: 4.8,
  h: 0.4,
  color: palette.blue,
  bold: true,
  fontFace: "Calibri",
  fontSize: 17,
});
dreamDojo.addText("1) 大规模预训练成本高\n2) 跨平台仍需后训练\n3) 可复现性受硬件约束", {
  x: 7.3,
  y: 5.0,
  w: 4.8,
  h: 1.1,
  color: palette.dark,
  fontFace: "Calibri",
  fontSize: 14,
  margin: 0,
  bullet: { indentPt: 14 },
});

const compare = pptx.addSlide();
addHeader(compare, "横向对比", "Method / Data / Real-time");
compare.addShape(pptx.ShapeType.roundRect, {
  x: 0.5,
  y: 1.1,
  w: 12.3,
  h: 5.9,
  radius: 0.06,
  fill: { color: palette.white },
  line: { color: "D0DDEA", pt: 1 },
});

const colX = [0.8, 3.4, 6.2, 8.8, 11.1];
const headers = ["论文", "核心方法", "数据规模", "实时性", "迁移/泛化"];
headers.forEach((h, i) => {
  compare.addText(h, {
    x: colX[i],
    y: 1.45,
    w: i === 0 ? 2.4 : 2.0,
    h: 0.35,
    color: palette.blue,
    bold: true,
    fontFace: "Calibri",
    fontSize: 14,
  });
});

function addRow(y, name, method, data, realtime, transfer) {
  compare.addShape(pptx.ShapeType.line, {
    x: 0.75,
    y: y - 0.1,
    w: 11.9,
    h: 0,
    line: { color: "DFE8F3", pt: 1 },
  });
  compare.addText(name, {
    x: colX[0],
    y,
    w: 2.45,
    h: 1.0,
    color: palette.dark,
    bold: true,
    fontFace: "Calibri",
    fontSize: 12.5,
    valign: "mid",
  });
  [method, data, realtime, transfer].forEach((text, idx) => {
    compare.addText(text, {
      x: colX[idx + 1],
      y,
      w: 2.05,
      h: 1.0,
      color: palette.dark,
      fontFace: "Calibri",
      fontSize: 12,
      margin: 0.01,
      valign: "mid",
    });
  });
}

addRow(
  2.0,
  "Scaled CRL",
  "极深MLP + CRL\n(深度4→1024)",
  "在线交互轨迹\n10个控制任务",
  "未强调实机实时",
  "8/10任务SOTA\n存在critical depth"
);
addRow(
  3.15,
  "DreamZero",
  "联合视频+动作\nflow matching",
  "500h机器人预训练\n+跨embodiment视频",
  "约7Hz闭环\n150ms级延迟",
  "zero-shot提升显著\n视频可促迁移"
);
addRow(
  4.3,
  "DreamDojo",
  "人类视频预训练\n+蒸馏student",
  "约44,711h人类视频\n+机器人后训练",
  "student 10.81FPS",
  "OOD更强\n但仍需后训练"
);

const takeaways = addTwoColumnSlide(
  "结论与下一步",
  "Actionable Takeaways",
  "共性发现",
  "可执行计划（建议）"
);
takeaways.addText(
  [
    { text: "1. 深度/规模扩展仍是第一驱动力，但必须配合训练稳定性设计。\n" },
    { text: "2. 仅做动作回归不足，世界状态建模可显著提升泛化。\n" },
    { text: "3. 实际部署瓶颈在系统优化与蒸馏，不只在模型精度。\n" },
    { text: "4. 多源视频数据是提升 OOD 的高杠杆方向。" },
  ],
  {
    x: 0.8,
    y: 1.9,
    w: 5.55,
    h: 3.2,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 15,
    bullet: { indentPt: 14 },
    margin: 0,
    breakLine: true,
  }
);
takeaways.addShape(pptx.ShapeType.roundRect, {
  x: 0.8,
  y: 5.4,
  w: 5.4,
  h: 0.85,
  radius: 0.05,
  fill: { color: "EAF5FF" },
  line: { color: "C8E1F8", pt: 1 },
});
takeaways.addText("建议把你后续笔记统一加上“计算成本/部署频率/可复现门槛”三列。", {
  x: 1.0,
  y: 5.65,
  w: 5.0,
  h: 0.35,
  color: palette.blue,
  fontFace: "Calibri",
  fontSize: 12.5,
  bold: true,
  align: "center",
});

takeaways.addText(
  [
    { text: "A. 复现实验模板\n", options: { bold: true } },
    { text: "按 paper-notes 模板固定记录：数据规模、吞吐、延迟。\n\n" },
    { text: "B. 方法路线优先级\n", options: { bold: true } },
    { text: "短期先做“深度扩展 + 异步系统”；中期引入联合视频动作建模。\n\n" },
    { text: "C. 评测补充\n", options: { bold: true } },
    { text: "加入 cross-embodiment 与 counterfactual 测试。", options: {} },
  ],
  {
    x: 7.05,
    y: 1.9,
    w: 5.5,
    h: 4.4,
    color: palette.dark,
    fontFace: "Calibri",
    fontSize: 14,
    margin: 0,
    breakLine: true,
  }
);

const outPath = path.join(__dirname, "..", "paper-notes", "paper-notes-summary.pptx");
pptx.writeFile({ fileName: outPath }).then(() => {
  console.log(`Generated: ${outPath}`);
});
