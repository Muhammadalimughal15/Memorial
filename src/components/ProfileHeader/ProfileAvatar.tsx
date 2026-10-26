import { useRef, useState, type ChangeEvent } from "react";
import { ImageIcon } from "lucide-react";
import ThemedButton from "../ui/ThemedButton";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { compressImage } from "../../utils/compressImage";

type ProfileAvatarProps = {
  defaultImage?: string;
};

export default function ProfileAvatar({
  defaultImage = "https://picsum.photos/id/1080/600/600",
}: ProfileAvatarProps) {
  const [image, setImage] = useLocalStorage<string>("profile-avatar-image", defaultImage);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) return setError("Please select a valid image file.");
    if (file.size > 5 * 1024 * 1024) return setError("Image size must be less than 5 MB.");

    try {
      // Avatar ke liye zyada se zyada 600px
      setImage(await compressImage(file, 600));
      setError("");
    } catch {
      setError("Image load nahi ho saki. Doosri image try karein.");
    }
  };

  return (
    <div className="shrink-0">
      <div
        className="relative h-[290px] w-[290px] border-[5px] border-[color:var(--page-color)] bg-cover bg-center"
        style={{ backgroundImage: `url("${image}")` }}
      >
        <ThemedButton
          onClick={() => fileRef.current?.click()}
          icon={<ImageIcon size={14} className="shrink-0" />}
          className="absolute bottom-2 right-2"
        >
          Change Image
        </ThemedButton>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFileChange} />
      </div>
      {error && <p role="alert" className="mt-2 text-sm">{error}</p>}
    </div>
  );
}