import { useRef, useState, type ChangeEvent } from "react";
import { SlidersHorizontal, ImageIcon } from "lucide-react";
import ThemedButton from "./ui/ThemedButton";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { compressImage } from "../utils/compressImage";

type ProfileBannerProps = {
  width?: number | string;
  height?: number | string;
  defaultImage?: string;
  onPageSetting?: () => void;
};

export default function ProfileBanner({
  width = "100%",
  height = 400,
  defaultImage = "https://picsum.photos/id/1018/1900/400",
  onPageSetting,
}: ProfileBannerProps) {
  const [image, setImage] = useLocalStorage<string>("profile-banner-image", defaultImage);
  const [error, setError] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    fileRef.current?.click();
  };

  const onFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image size must be less than 5 MB.");
      return;
    }

    try {
     
      const dataUrl = await compressImage(file, 1600);
      setImage(dataUrl);
      setError("");
    } catch {
      setError("Image load nahi ho saki. Doosri image try karein.");
    }
  };

  return (
    <div
      className="relative bg-cover bg-center font-['Poppins',sans-serif]"
      style={{
        width,
        height,
        backgroundImage: `url("${image}")`,
      }}
    >
 <ThemedButton
  onClick={onPageSetting}
  icon={<SlidersHorizontal size={14} className="shrink-0" />}
  className="fixed left-3 top-3 z-30 shadow-[0_2px_8px_rgba(0,0,0,0.3)] sm:left-5 sm:top-5"
>
  Page Setting
</ThemedButton>

      <ThemedButton
        onClick={openPicker}
        icon={<ImageIcon size={14} className="shrink-0" />}
        className="absolute right-3 top-3 sm:right-5 sm:top-5"
      >
        Change Image
      </ThemedButton>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        hidden
        onChange={onFileChange}
      />

      {error && (
        <p
          role="alert"
          className="absolute bottom-3 left-3 right-3 rounded bg-black/80 p-2 text-sm text-white sm:bottom-5 sm:left-5 sm:right-auto"
        >
          {error}
        </p>
      )}
    </div>
  );
}