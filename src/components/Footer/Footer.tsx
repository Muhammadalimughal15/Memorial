import { ExternalLink } from "lucide-react";
import ThemedButton from "../ui/ThemedButton";

type FooterProps = {
  author?: string;
  authorUrl?: string; // diya to naam click ho kar link khulega
  onViewLive?: () => void;
};

export default function Footer({
  author = "Muhammad Ali",
  authorUrl,
  onViewLive,
}: FooterProps) {
  const nameClass = "font-bold italic underline text-[color:var(--page-color)]";

  return (
    <footer className="mx-auto w-full max-w-[1100px] px-6 pb-10 pt-4">
      {/* ⬇️ YEH LINE BADLI HAI: items-center se dono beech mein aate hain */}
      <div className="flex flex-col items-center gap-3 text-center">
        <p className="text-sm">
          Made By{" "}
          {authorUrl ? (
            <a
              href={authorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`cursor-pointer ${nameClass}`}
            >
              {author}
            </a>
          ) : (
            <span className={nameClass}>{author}</span>
          )}
        </p>

        <ThemedButton
          size="md"
          onClick={onViewLive}
          icon={<ExternalLink size={16} />}
          className="gap-2"
        >
          View Live Page
        </ThemedButton>
      </div>
    </footer>
  );
}