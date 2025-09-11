import React from "react";

type Props = {
  markdown: string;
  className?: string;
};

// Minimal markdown renderer supporting headings, lists, code blocks, hr, blockquotes, and paragraphs.
// Inline formatting is intentionally minimal to avoid extra deps.
export default function MarkdownRenderer({ markdown, className }: Props) {
  const lines = markdown.replaceAll("\r\n", "\n").split("\n");
  const nodes: React.ReactNode[] = [];

  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  function flushList() {
    if (!listBuffer) return;
    const { ordered, items } = listBuffer;
    const children = items.map((it, idx) => <li key={idx} className="mb-2">{it}</li>);
    nodes.push(
      ordered ? <ol className="list-decimal ml-6 mb-4" key={`ol-${nodes.length}`}>{children}</ol>
              : <ul className="list-disc ml-6 mb-4" key={`ul-${nodes.length}`}>{children}</ul>
    );
    listBuffer = null;
  }

  while (i < lines.length) {
    const line = lines[i];

    // Code block start/end
    const codeFence = line.match(/^```(.*)$/);
    if (codeFence) {
      if (!inCode) {
        inCode = true;
        codeLang = codeFence[1]?.trim() || "";
        codeLines = [];
      } else {
        // flush code
        nodes.push(
          <pre key={`pre-${nodes.length}`} className="mb-4 overflow-auto rounded bg-muted/40 p-3 text-sm">
            <code className={codeLang ? `language-${codeLang}` : undefined}>{codeLines.join("\n")}</code>
          </pre>
        );
        inCode = false;
        codeLang = "";
        codeLines = [];
      }
      i++;
      continue;
    }
    if (inCode) {
      codeLines.push(line);
      i++;
      continue;
    }

    // Horizontal rule
    if (/^\s*---+\s*$/.test(line)) {
      flushList();
      nodes.push(<hr key={`hr-${nodes.length}`} className="my-8" />);
      i++;
      continue;
    }

    // Blockquote
    if (/^>\s?/.test(line)) {
      flushList();
      const quoteLines: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i])) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      nodes.push(
        <blockquote key={`bq-${nodes.length}`} className="border-l-2 pl-4 italic text-muted-foreground mb-4">
          {quoteLines.join("\n")}
        </blockquote>
      );
      continue;
    }

    // Lists (unordered/ordered)
    const ul = line.match(/^\s*[-*]\s+(.*)$/);
    const ol = line.match(/^\s*\d+\.\s+(.*)$/);
    if (ul || ol) {
      const ordered = Boolean(ol);
      const content = (ul ?? ol)![1];
      if (!listBuffer) listBuffer = { ordered, items: [] };
      listBuffer.items.push(content);
      i++;
      // Continue aggregating consecutive list lines
      while (i < lines.length) {
        const next = lines[i];
        const nextUl = next.match(/^\s*[-*]\s+(.*)$/);
        const nextOl = next.match(/^\s*\d+\.\s+(.*)$/);
        if (!(nextUl || nextOl)) break;
        listBuffer.items.push((nextUl ?? nextOl)![1]);
        i++;
      }
      flushList();
      continue;
    }

    // Headings
    const h3 = line.match(/^###\s+(.*)$/);
    const h2 = line.match(/^##\s+(.*)$/);
    const h1 = line.match(/^#\s+(.*)$/);
    if (h3 || h2 || h1) {
      flushList();
      const text = (h1 ?? h2 ?? h3)![1];
      if (h1) nodes.push(<h1 key={`h1-${nodes.length}`} className="text-2xl font-semibold mt-8 mb-4">{text}</h1>);
      else if (h2) nodes.push(<h2 key={`h2-${nodes.length}`} className="text-xl font-semibold mt-8 mb-3">{text}</h2>);
      else nodes.push(<h3 key={`h3-${nodes.length}`} className="text-lg font-semibold mt-6 mb-2">{text}</h3>);
      i++;
      continue;
    }

    // Paragraphs (accumulate until blank)
    if (line.trim().length === 0) {
      flushList();
      i++;
      continue;
    }
    const para: string[] = [line];
    i++;
    while (i < lines.length && lines[i].trim().length > 0) {
      para.push(lines[i]);
      i++;
    }
    nodes.push(<p key={`p-${nodes.length}`} className="mb-4 leading-relaxed">{para.join(" ")}</p>);
  }

  return <div className={className}>{nodes}</div>;
}

