import SectionHeader from "../SectionHeader";
import RichTextEditor from "./RichTextEditor";
import { useLocalStorage } from "../../hooks/useLocalStorage";

type MyStoryData = { enabled: boolean; title: string; content: string };

const DEFAULT_DATA: MyStoryData = { enabled: false, title: "My Story", content: "" };

export default function MyStory() {
  const [data, setData] = useLocalStorage<MyStoryData>("my-story-section", DEFAULT_DATA);

  return (
    <section aria-label="My Story">
      <SectionHeader
        title={data.title}
        onTitleChange={(title) => setData((prev) => ({ ...prev, title }))}
        enabled={data.enabled}
        onToggle={(enabled) => setData((prev) => ({ ...prev, enabled }))}
      />

      {data.enabled && (
        <div className="mt-10">
          <RichTextEditor
            value={data.content}
            onChange={(content) => setData((prev) => ({ ...prev, content }))}
          />
        </div>
      )}
    </section>
  );
}