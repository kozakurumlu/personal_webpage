import React from "react";

type Props = {
  markdown: string;
  className?: string;
};

// Minimal markdown renderer supporting headings, lists, code blocks, hr, blockquotes, and paragraphs.
// Inline formatting is intentionally minimal to avoid extra deps.
export default function MarkdownRenderer({ markdown, className }: Props) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const nodes: React.ReactNode[] = [];

  let i = 0;
  let inCode = false;
  let codeLang = "";
  let codeLines: string[] = [];
  let listBuffer: { ordered: boolean; items: string[] } | null = null;

  // Helper function to parse and render inline formatting (links, bold, italic)
  function renderTextWithFormatting(text: string, keyPrefix: string = ""): React.ReactNode[] {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let key = 0;

    while (remaining.length > 0) {
      // Find all potential matches: links, bold, italic
      // Note: Check bold before italic to avoid conflicts with **
      const mdLinkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
      const angleLinkMatch = remaining.match(/<([^>]+)>/);
      const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
      // For italic, match *text* but ensure it's not part of ** (bold pattern already checked first)
      const italicMatch = remaining.match(/\*([^*]+)\*/);

      // Find the earliest match
      let earliestMatch: { type: string; index: number; match: RegExpMatchArray } | null = null;

      if (mdLinkMatch && mdLinkMatch.index !== undefined) {
        earliestMatch = { type: "mdLink", index: mdLinkMatch.index, match: mdLinkMatch };
      }
      if (angleLinkMatch && angleLinkMatch.index !== undefined && 
          (!earliestMatch || angleLinkMatch.index < earliestMatch.index)) {
        earliestMatch = { type: "angleLink", index: angleLinkMatch.index, match: angleLinkMatch };
      }
      if (boldMatch && boldMatch.index !== undefined && 
          (!earliestMatch || boldMatch.index < earliestMatch.index)) {
        earliestMatch = { type: "bold", index: boldMatch.index, match: boldMatch };
      }
      if (italicMatch && italicMatch.index !== undefined && 
          (!earliestMatch || italicMatch.index < earliestMatch.index)) {
        earliestMatch = { type: "italic", index: italicMatch.index, match: italicMatch };
      }

      if (earliestMatch) {
        const { type, index, match } = earliestMatch;

        // Add text before the match
        if (index > 0) {
          parts.push(remaining.substring(0, index));
        }

        // Process the match based on type
        if (type === "mdLink") {
          const url = match[2];
          const linkText = match[1];
          parts.push(
            <a
              key={`${keyPrefix}link-${key++}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              {renderTextWithFormatting(linkText, `${keyPrefix}link-${key}-`)}
            </a>
          );
          remaining = remaining.substring(index + match[0].length);
        } else if (type === "angleLink") {
          const url = match[1];
          parts.push(
            <a
              key={`${keyPrefix}link-${key++}`}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:text-primary/80"
            >
              {url}
            </a>
          );
          remaining = remaining.substring(index + match[0].length);
        } else if (type === "bold") {
          const content = match[1];
          parts.push(
            <strong key={`${keyPrefix}bold-${key++}`} className="font-semibold">
              {renderTextWithFormatting(content, `${keyPrefix}bold-${key}-`)}
            </strong>
          );
          remaining = remaining.substring(index + match[0].length);
        } else if (type === "italic") {
          const content = match[1];
          parts.push(
            <em key={`${keyPrefix}italic-${key++}`} className="italic">
              {renderTextWithFormatting(content, `${keyPrefix}italic-${key}-`)}
            </em>
          );
          remaining = remaining.substring(index + match[0].length);
        }
      } else {
        // No more matches, add remaining text
        parts.push(remaining);
        break;
      }
    }

    return parts;
  }

  // Alias for backward compatibility
  function renderTextWithLinks(text: string): React.ReactNode[] {
    return renderTextWithFormatting(text);
  }

  function flushList() {
    if (!listBuffer) return;
    const { ordered, items } = listBuffer;
    const children = items.map((it, idx) => (
      <li key={idx} className="mb-2">{renderTextWithLinks(it)}</li>
    ));
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
          {renderTextWithLinks(quoteLines.join("\n"))}
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
      if (h1) nodes.push(<h1 key={`h1-${nodes.length}`} className="text-2xl font-semibold mt-8 mb-4">{renderTextWithLinks(text)}</h1>);
      else if (h2) nodes.push(<h2 key={`h2-${nodes.length}`} className="text-xl font-semibold mt-8 mb-3">{renderTextWithLinks(text)}</h2>);
      else nodes.push(<h3 key={`h3-${nodes.length}`} className="text-lg font-semibold mt-6 mb-2">{renderTextWithLinks(text)}</h3>);
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
    nodes.push(<p key={`p-${nodes.length}`} className="mb-4 leading-relaxed">{renderTextWithLinks(para.join(" "))}</p>);
  }

  return <div className={className}>{nodes}</div>;
}

