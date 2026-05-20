import { ExternalLink } from "lucide-react";

type Reference = {
  id: string;
  text: string;
  url?: string;
};

type ReferenceListProps = {
  references: Reference[];
};

export function ReferenceList({ references }: ReferenceListProps) {
  if (references.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 className="mb-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
        References
      </h3>
      <div className="rounded-lg border bg-card p-4">
        <ol className="space-y-3">
          {references.map((ref) => (
            <li className="flex gap-2 text-sm" key={ref.id}>
              <span
                className="font-medium text-muted-foreground"
                id={`ref-${ref.id}`}
              >
                {ref.id}
              </span>
              <div className="flex-1">
                <span className="text-muted-foreground">{ref.text}</span>
                {ref.url && (
                  <a
                    className="ml-2 inline-flex items-center gap-1 text-emerald-500 hover:underline"
                    href={ref.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <ExternalLink className="size-3" />
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
